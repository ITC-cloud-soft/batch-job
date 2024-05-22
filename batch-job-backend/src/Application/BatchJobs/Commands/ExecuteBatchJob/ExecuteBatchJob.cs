using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Infrastructure.Job;
using Microsoft.Extensions.Logging;
using Quartz;

namespace batch_job_backend.Application.BatchJob.Commands.ExecuteBatchJob;

public record ExecuteBatchJobCommand : IRequest<int>
{
    public int JobId { get; set; }
}

public class ExecuteBatchJobCommandValidator : AbstractValidator<ExecuteBatchJobCommand>
{
    public ExecuteBatchJobCommandValidator()
    {
    }
}

public class ExecuteBatchJobCommandHandler : IRequestHandler<ExecuteBatchJobCommand, int>
{
    private readonly IApplicationDbContext _context;
    private readonly ISchedulerFactory _schedulerFactory;
    private readonly ILogger _logger;
    public ExecuteBatchJobCommandHandler(IApplicationDbContext context, ISchedulerFactory schedulerFactory, ILogger<ExecuteBatchJobCommandHandler> logger)
    {
        _context = context;
        _schedulerFactory = schedulerFactory;
        _logger = logger;
    }

    /**
     * 我是客户，想执行定时任务, 并且定时任务执行完毕后,能执行其他的Trigger类型任务
     * 逻辑： 和查询定时任务，和Trigger任务一起放到job中顺序执行
     */
    public async Task<int> Handle(ExecuteBatchJobCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Start executing job [{}]", request.JobId);
        var job = _context.BatchJobs
            .AsNoTracking()
            .FirstOrDefault(x => x.Id == request.JobId);

        if (job == null)
        {
            _logger.LogError("Job not found [{}]", request.JobId);
            throw new NotFoundException("Job not found for Id [{}]", request.JobId.ToString());
        }

        // 查询是否有对应的trigger job
       var triggerJobList = _context.BatchJobs
            .AsNoTracking()
            .Where(x => x.JobTriggerId == request.JobId)
            .ToList();
       
       
       var jobKey = new JobKey(job.JobName, job.JobGroup);
       var triggerKey = new TriggerKey(job.JobName, job.JobGroup);
       
       var map = new JobDataMap
       {
           {JobConstants.Scheduled, job},
           {JobConstants.TriggerJobs, triggerJobList}
       };

        var scheduler = await _schedulerFactory.GetScheduler(cancellationToken);

        // 检查是否存在相同的 JobKey
        if (await scheduler.CheckExists(jobKey, cancellationToken))
        {
            // 删除现有的 Job
            await scheduler.DeleteJob(jobKey, cancellationToken);
            _logger.LogInformation("Existing job deleted: {JobName}", jobKey.Name);
        }
        
        var jobDetail = JobBuilder.Create<CallRemoteInterfaceJob>()
            .WithIdentity(jobKey)
            .SetJobData(map)
            .Build();

        var trigger = TriggerBuilder.Create()
            .WithIdentity(triggerKey)
            .StartNow()
            .WithCronSchedule(job?.CronExpression ?? "")
            .Build();

        await scheduler.ScheduleJob(jobDetail, trigger, cancellationToken);

        await scheduler.Start(cancellationToken);
        
        _logger.LogInformation("Job Started [{}]", job?.JobName);
        return 1;
    }
}

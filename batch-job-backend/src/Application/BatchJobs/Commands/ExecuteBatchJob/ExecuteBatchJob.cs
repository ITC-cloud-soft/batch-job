using System.Text.Json;
using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Domain.Entities;
using batch_job_backend.Infrastructure.Job;
using Microsoft.Extensions.Logging;
using Quartz;


namespace batch_job_backend.Application.BatchJob.Commands.ExecuteBatchJob;

public record ExecuteBatchJobCommand : IRequest
{
    public int JobId { get; set; }
}

public class ExecuteBatchJobCommandValidator : AbstractValidator<ExecuteBatchJobCommand>
{
    public ExecuteBatchJobCommandValidator()
    {
        RuleFor(x => x.JobId).GreaterThan(0).WithMessage("JobId must be greater than 0");
    }
}

public class ExecuteBatchJobCommandHandler : IRequestHandler<ExecuteBatchJobCommand>
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
    public async Task Handle(ExecuteBatchJobCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Start executing job [{JobId}]", request.JobId);

        // Step 1: Retrieve the job from the database
        var job = GetJob(request.JobId);
        Guard.Against.NotFound(request.JobId, job);

        // Step 2: Retrieve the trigger jobs associated with the main job
        var triggerJobList = GetTriggerJobs(request.JobId);

        // Step 3: Prepare JobDataMap
        var jobKey = new JobKey(job.JobName, job.JobGroup);
        var triggerKey = new TriggerKey(job.JobName, job.JobGroup);
        var jobDataMap = CreateJobDataMap(job, triggerJobList);

        // Step 4: Schedule the job with Quartz.NET
        await ScheduleJob(jobKey, triggerKey, jobDataMap, job.CronExpression ?? "", cancellationToken);

        _logger.LogInformation("Job Started [{JobName}]", job.JobName);
    }
    
    private BJob? GetJob(int jobId)
    {
        return _context.BatchJobs
            .AsNoTracking()
            .FirstOrDefault(x => x.Id == jobId);
    }

    private List<BJob> GetTriggerJobs(int jobId)
    {
        return _context.BatchJobs
            .AsNoTracking()
            .Where(x => x.JobTriggerId == jobId)
            .ToList();
    }
    
    private JobDataMap CreateJobDataMap(BJob job, List<BJob> triggerJobList)
    {
        return new JobDataMap
        {
            { JobConstants.Scheduled, JsonSerializer.Serialize(job) },
            { JobConstants.TriggerJobs, JsonSerializer.Serialize(triggerJobList) }
        };
    }
    private async Task ScheduleJob(JobKey jobKey, TriggerKey triggerKey, JobDataMap jobDataMap, string cronExpression, CancellationToken cancellationToken)
    {
        var scheduler = await _schedulerFactory.GetScheduler(cancellationToken);

        // Check if the job already exists
        if (await scheduler.CheckExists(jobKey, cancellationToken))
        {
            // Delete the existing job
            await scheduler.DeleteJob(jobKey, cancellationToken);
            _logger.LogInformation("Existing job deleted: {JobName}", jobKey.Name);
        }

        var jobDetail = JobBuilder.Create<CallRemoteInterfaceJob>()
            .WithIdentity(jobKey)
            .SetJobData(jobDataMap)
            .Build();

        var trigger = TriggerBuilder.Create()
            .WithIdentity(triggerKey)
            .StartNow()
            .WithCronSchedule(cronExpression)
            .Build();

        await scheduler.ScheduleJob(jobDetail, trigger, cancellationToken);
        await scheduler.Start(cancellationToken);
    }
}

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

    public async Task<int> Handle(ExecuteBatchJobCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Start executing job [{}]", request.JobId);
        var job = _context.BatchJobs.FirstOrDefault(x => x.Id == request.JobId);

        if (job == null)
        {
            _logger.LogError("Job not found [{}]", request.JobId);
            throw new NotFoundException("Job not found for Id [{}]", request.JobId.ToString());
        }
        
        var scheduler = await _schedulerFactory.GetScheduler(cancellationToken);

        var jobDetail = JobBuilder.Create<CallRemoteInterfaceJob>()
            .WithIdentity(job.JobName, job.JobGroup)
            .Build();

        var trigger = TriggerBuilder.Create()
            .WithIdentity(job.JobName,  job.JobGroup)
            .StartNow()
            .WithCronSchedule(job.CronExpression ?? "")
            .Build();

        await scheduler.ScheduleJob(jobDetail, trigger, cancellationToken);

        await scheduler.Start(cancellationToken);
        
        _logger.LogInformation("Job Started [{}]", job.JobName);
        return 1;
    }
}

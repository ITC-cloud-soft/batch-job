using batch_job_backend.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;
using Quartz;

namespace batch_job_backend.Application.BatchJob.Commands.StopBatchJob;

public record StopBatchJobCommand : IRequest
{
    public int JobId { get; set; }
}

public class StopBatchJobCommandValidator : AbstractValidator<StopBatchJobCommand>
{
    public StopBatchJobCommandValidator()
    {
    }
}

public class StopBatchJobCommandHandler : IRequestHandler<StopBatchJobCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ISchedulerFactory _schedulerFactory;
    private readonly ILogger _logger;
    public StopBatchJobCommandHandler(IApplicationDbContext context, ISchedulerFactory schedulerFactory, ILogger<StopBatchJobCommandHandler> logger)
    {
        _context = context;
        _schedulerFactory = schedulerFactory;
        _logger = logger;
    }

    public async Task Handle(StopBatchJobCommand request, CancellationToken cancellationToken)
    {  
        _logger.LogInformation("Job is stopping.");

        var job = _context.BatchJobs.FirstOrDefault(x => x.Id == request.JobId);

        Guard.Against.NotFound(request.JobId, job);
        
        IScheduler scheduler = await _schedulerFactory.GetScheduler(cancellationToken);
        // delete job
        await scheduler.DeleteJob(new JobKey(job.JobName, job.JobGroup), cancellationToken);
        // delete trigger
        await scheduler.UnscheduleJob(new TriggerKey(job.JobName, job.JobGroup), cancellationToken);
    }
}

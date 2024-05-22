using batch_job_backend.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;
using Quartz;

namespace batch_job_backend.Application.BatchJob.Commands.StopBatchJob;

public record StopBatchJobCommand : IRequest<int>
{
    public int JobId { get; set; }
}

public class StopBatchJobCommandValidator : AbstractValidator<StopBatchJobCommand>
{
    public StopBatchJobCommandValidator()
    {
    }
}

public class StopBatchJobCommandHandler : IRequestHandler<StopBatchJobCommand, int>
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

    public async Task<int> Handle(StopBatchJobCommand request, CancellationToken cancellationToken)
    {  
        _logger.LogInformation("Job is stopping.");
        
        IScheduler scheduler = await _schedulerFactory.GetScheduler(cancellationToken);
        
        await scheduler.DeleteJob(new JobKey("myJob"), cancellationToken);
        await scheduler.UnscheduleJob(new TriggerKey("myJobTrigger"), cancellationToken);

        return 1;
    }
}

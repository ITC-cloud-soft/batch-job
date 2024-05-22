using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Infrastructure.Job;
using Quartz;

namespace batch_job_backend.Application.BatchJob.Commands.ExecuteBatchJob;

public record ExecuteBatchJobCommand : IRequest<int>
{
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
    
    public ExecuteBatchJobCommandHandler(IApplicationDbContext context, ISchedulerFactory schedulerFactory)
    {
        _context = context;
        _schedulerFactory = schedulerFactory;
    }

    public async Task<int> Handle(ExecuteBatchJobCommand request, CancellationToken cancellationToken)
    {
        var scheduler = await _schedulerFactory.GetScheduler();

        var jobDetail = JobBuilder.Create<CallRemoteInterfaceJob>()
            .WithIdentity("myJob")
            .Build();

        var trigger = TriggerBuilder.Create()
            .WithIdentity("myJobTrigger")
            .StartNow()
            .WithSimpleSchedule(x => x.WithIntervalInSeconds(10).RepeatForever())
            .Build();

        await scheduler.ScheduleJob(jobDetail, trigger);

        await scheduler.Start();
        return 1;
    }
}

using batch_job_backend.Application.Common.Interfaces;

namespace batch_job_backend.Application.BatchJob.Commands.StopBatchJob;

public record StopBatchJobCommand : IRequest<int>
{
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

    public StopBatchJobCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public Task<int> Handle(StopBatchJobCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}

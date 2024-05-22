using batch_job_backend.Application.Common.Interfaces;

namespace batch_job_backend.Application.BatchJob.Commands.UpdateBatchJob;

public record UpdateBatchJobCommand : IRequest<int>
{
}

public class UpdateBatchJobCommandValidator : AbstractValidator<UpdateBatchJobCommand>
{
    public UpdateBatchJobCommandValidator()
    {
    }
}

public class UpdateBatchJobCommandHandler : IRequestHandler<UpdateBatchJobCommand, int>
{
    private readonly IApplicationDbContext _context;

    public UpdateBatchJobCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public Task<int> Handle(UpdateBatchJobCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}

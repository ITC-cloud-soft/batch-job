using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Application.Common.Models;
using batch_job_backend.Domain.Enums;

namespace batch_job_backend.Application.BatchJob.Queries.GetBatchJob;

public record GetBatchJobWithPaginationQuery : IRequest<PaginatedList<BatchJobVm>>
{
    public JobType JobType { get; set; }
}

public class GetBatchJobQueryValidator : AbstractValidator<GetBatchJobWithPaginationQuery>
{
    public GetBatchJobQueryValidator()
    {
    }
}

public class GetBatchJobQueryHandler : IRequestHandler<GetBatchJobWithPaginationQuery, PaginatedList<BatchJobVm>>
{
    private readonly IApplicationDbContext _context;

    public GetBatchJobQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public Task<PaginatedList<BatchJobVm>> Handle(GetBatchJobWithPaginationQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}

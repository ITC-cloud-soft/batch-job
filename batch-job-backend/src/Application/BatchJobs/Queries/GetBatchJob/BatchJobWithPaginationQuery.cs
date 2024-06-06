using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Application.Common.Mappings;
using batch_job_backend.Application.Common.Models;
using batch_job_backend.Domain.Enums;

namespace batch_job_backend.Application.BatchJobs.Queries.GetBatchJob;

public record BatchJobWithPaginationQuery : IRequest<PaginatedList<BatchJobVm>>
{
    public JobType JobType { get; set; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

public class GetBatchJobQueryValidator : AbstractValidator<BatchJobWithPaginationQuery>
{
    public GetBatchJobQueryValidator()
    {
    }
}

public class GetBatchJobQueryHandler : IRequestHandler<BatchJobWithPaginationQuery, PaginatedList<BatchJobVm>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    public GetBatchJobQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<BatchJobVm>> Handle(BatchJobWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var batchJobVms = await _context.BatchJobs
            .AsNoTracking()
            .Where(x => x.JobType == request.JobType)
            .ProjectTo<BatchJobVm>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);

        return batchJobVms;
    }
}

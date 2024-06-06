using System.Data;
using batch_job_backend.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;

namespace batch_job_backend.Application.BatchJobs.Queries.GetBatchJob;

public class BatchJobQuery: IRequest<BatchJobVm>
{
    public int Id { get; set; }
}

public class BatchJobQueryValidator : AbstractValidator<BatchJobQuery>{
    public BatchJobQueryValidator()
    {
        RuleFor(v => v.Id)
            .NotEmpty()
            .WithMessage("Id is required")
            .GreaterThan(0)
            .WithMessage("Id should be greater than 0");

    }
}

public class BatchJobQueryHandler : IRequestHandler<BatchJobQuery, BatchJobVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ILogger<BatchJobQueryHandler> _logger;

    public BatchJobQueryHandler(IApplicationDbContext context, IMapper mapper, ILogger<BatchJobQueryHandler> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<BatchJobVm> Handle(BatchJobQuery request, CancellationToken cancellationToken)
    {
        _logger.LogInformation("query batch job: {Id}", request.Id);
        var job = await _context.BatchJobs
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);
        BatchJobVm batchJobVm = _mapper.Map<BatchJobVm>(job);
        return batchJobVm;
    }
}

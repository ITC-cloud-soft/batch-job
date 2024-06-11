using batch_job_backend.Application.BatchJobs.Commands.ExecuteBatchJob;
using batch_job_backend.Application.BatchJobs.Commands.StopBatchJob;
using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Application.Mappings;
using batch_job_backend.Domain.Entities;
using Microsoft.Extensions.Logging;

namespace batch_job_backend.Application.BatchJobs.Commands.UpdateBatchJob;

public class UpdateBatchJobCommand :JobCommand, IRequest<BJob>,  IMapFrom<BJob>
{
    public int Id { get; set; }
}

public class UpdateBatchJobCommandValidator : AbstractValidator<UpdateBatchJobCommand>
{
    public UpdateBatchJobCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Job Id is required.");
        
        RuleFor(x => x.JobUrl)
            .NotEmpty().WithMessage("JobUrl is required.");
        
        RuleFor(x => x.JobName)
            .NotEmpty().WithMessage("Job name is required.");
    }
}

public class UpdateBatchJobCommandHandler : IRequestHandler<UpdateBatchJobCommand, BJob>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ISender _sender;
    private readonly ILogger _logger;
    public UpdateBatchJobCommandHandler(IApplicationDbContext context, IMapper mapper, ISender sender, ILogger<UpdateBatchJobCommandHandler> logger)
    {
        _context = context;
        _mapper = mapper;
        _sender = sender;
        _logger = logger;
    }

    public async Task<BJob> Handle(UpdateBatchJobCommand request, CancellationToken cancellationToken)
    {
        // validate if the job exists
        var job = await _context.BatchJobs
            .FirstOrDefaultAsync(x=> x.Id == request.Id, cancellationToken);
       
        Guard.Against.NotFound(request.Id, job);
        await using var transaction = await _context.BeginTransactionAsync(cancellationToken);
        try
        {
            // Stop quartz job
            await _sender.Send(new StopBatchJobCommand { JobId = request.Id });
        
            // Delete the job record from the database
            _context.BatchJobs.Remove(job);
            await _context.SaveChangesAsync(cancellationToken);
        
            // Create new job
            var entity = _mapper.Map<BJob>(request);
            await _context.BatchJobs.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            
            // Execute the job only when scheduled job
            if (string.Equals("0", job.ScheduleType))
            {
                await _sender.Send(new ExecuteBatchJobCommand { JobId = entity.Id });
            }
            
            // commit
            await transaction.CommitAsync(cancellationToken);
            return entity;
        }
        catch (Exception ex)
        {
            // Execute the job
            await _sender.Send(new ExecuteBatchJobCommand() { JobId = request.Id });
            await transaction.RollbackAsync(cancellationToken);
            _logger.LogError(ex, "Error updating batch job with id {JobId}", request.Id);
            throw;
        }
    }
}

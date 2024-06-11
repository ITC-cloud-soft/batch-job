using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Application.Common.Util;
using batch_job_backend.Application.Mappings;
using batch_job_backend.Domain.Entities;

namespace batch_job_backend.Application.BatchJobs.Commands.CreateBatchJob;

public class CreateBatchJobCommand : JobCommand, IRequest<BJob>,  IMapFrom<BJob>
{
   
}

public class CreateBatchJobCommandValidator : AbstractValidator<CreateBatchJobCommand>
{
    public CreateBatchJobCommandValidator()
    {
        RuleFor(x => x.JobUrl)
            .NotEmpty().WithMessage("JobUrl is required.");
        
        RuleFor(x => x.JobName)
            .NotEmpty().WithMessage("Job name is required.");
    }
}

public class CreateBatchJobCommandHandler : IRequestHandler<CreateBatchJobCommand, BJob>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    
    public CreateBatchJobCommandHandler(
        IApplicationDbContext context, 
        IMapper mapper
        )
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<BJob> Handle(CreateBatchJobCommand command, CancellationToken cancellationToken)
    {
        command.JobGroup = command.JobName;
        command.CronExpression = CronExpressionParser.GenerateCronExpression(command);
        command.CronExpressionStr = CronExpressionParser.GenerateCronExpressionString(command);
        
        var job = _mapper.Map<BJob>(command);
        await _context.BatchJobs.AddAsync(job, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return job;
    }
}

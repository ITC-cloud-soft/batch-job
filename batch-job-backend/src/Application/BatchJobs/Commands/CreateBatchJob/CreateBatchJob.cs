using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Application.Mappings;
using batch_job_backend.Domain.Entities;
using batch_job_backend.Domain.Enums;

namespace batch_job_backend.Application.BatchJobs.Commands.CreateBatchJob;

public record CreateBatchJobCommand : IRequest<BJob>,  IMapFrom<BJob>
{
    // バッチ名 (共通)
    public string? JobName { get; set; }
    
    public string? JobGroup { get; set; }
    
    // 定時周期 or Trigger (共通)
    public JobType JobType { get; set; }
    
    // バッチURL (共通)
    public string? JobUrl { get; set; }
    
    // 定時周期时间
    public string? CronExpression { get; set; }
    // バッチ起動日(定時周期)
    public ScheduleType? ScheduleType { get; set; }

    public int? Year { get; set; }
    public int? Month { get; set; }
    public int? Day { get; set; }
    public int? WeekDay { get; set; }
    public int? Hour { get; set; }
    public int? Minute { get; set; }
    public int? Second { get; set; }
    
    // Trigger トリガーファイル名 (Trigger)
    public int? JobTriggerId { get; set; }
    
    // バッチ番号 (Trigger)
    public int? JobNo{ get; set; }
    
    
}

public class CreateBatchJobCommandValidator : AbstractValidator<CreateBatchJobCommand>
{
    public CreateBatchJobCommandValidator()
    {
        // RuleFor(x => x.JobUrl)
        //     .NotEmpty().WithMessage("JobUrl is required.");
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
        var job = _mapper.Map<BJob>(command);
        await _context.BatchJobs.AddAsync(job, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return job;
    }

    private string generateCronExpression(BJob bJob)
    {
        return "";
    } 
}

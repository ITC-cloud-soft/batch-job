using batch_job_backend.Application.BatchJobs.Commands.ExecuteBatchJob;
using batch_job_backend.Application.BatchJobs.Commands.ExecuteBatchJob;
using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Application.Mappings;
using batch_job_backend.Domain.Entities;
using batch_job_backend.Domain.Enums;

namespace batch_job_backend.Application.BatchJobs.Commands.UpdateBatchJob;

public record UpdateBatchJobCommand : IRequest<BJob>,  IMapFrom<BJob>
{
    public int Id { get; set; }
    // バッチ名 (共通)
    public string JobName { get; set; } = "defaultJobName";
    public string JobGroup { get; set; } = "defaultGroupName";
    
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
    
    public int? JobTriggerId { get; set; }
    public int? JobNo{ get; set; }

}

public class UpdateBatchJobCommandValidator : AbstractValidator<UpdateBatchJobCommand>
{
    public UpdateBatchJobCommandValidator()
    {
    }
}

public class UpdateBatchJobCommandHandler : IRequestHandler<UpdateBatchJobCommand, BJob>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ISender _sender;
    public UpdateBatchJobCommandHandler(IApplicationDbContext context, IMapper mapper, ISender sender)
    {
        _context = context;
        _mapper = mapper;
        _sender = sender;
    }

    public async Task<BJob> Handle(UpdateBatchJobCommand request, CancellationToken cancellationToken)
    {
        
       var entity = await _context.BatchJobs
            .FirstOrDefaultAsync(x=> x.Id == request.Id, cancellationToken);
       
       Guard.Against.NotFound(request.Id, entity);
       
       // 映射
       _mapper.Map(request, entity);
       await _context.SaveChangesAsync(cancellationToken);
       
       // 找出schedule并执行
       if (entity.JobType == JobType.Scheduled)
       {
          await _sender.Send(new ExecuteBatchJobCommand() { JobId = entity.Id }, cancellationToken);
       }
        //  当前trigger job对应的scheduled job并执行,  entity.JobTriggerId == scheduler.Id
       if (entity.JobType == JobType.Trigger)
       {
           await _sender.Send(new ExecuteBatchJobCommand() { JobId = entity.JobTriggerId ?? 0 }, cancellationToken);

       }
       return entity;
    }
}

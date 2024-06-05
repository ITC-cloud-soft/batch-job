using batch_job_backend.Application.BatchJobs.Commands.ExecuteBatchJob;
using batch_job_backend.Application.BatchJobs.Commands.StopBatchJob;
using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Application.Mappings;
using batch_job_backend.Domain.Entities;
using batch_job_backend.Domain.Enums;
using Microsoft.Extensions.Logging;

namespace batch_job_backend.Application.BatchJobs.Commands.UpdateBatchJob;

public record UpdateBatchJobCommand : IRequest<BJob>,  IMapFrom<BJob>
{
    public int Id { get; set; }
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
    public int? ScheduleType { get; set; }

    public int? Year { get; set; }
    public int? Month { get; set; }
    public int? Day { get; set; }
    public int? WeekDay { get; set; }
    public int? Hour { get; set; }
    public int? Minute { get; set; }
    public int? Second { get; set; }
    
    // バッチ起動日 1-31
    public string[] BatchLaunchMonthDay { get; set; } = { };
    // バッチ起動日(曜日) 1-7 
    public string[] BatchLaunchWeekDay { get; set; } = { };
    
    // 間隔値
    public int LoopStep { get; set; }
    
    // 稼働時間帯
    public int WorkHourStart { get; set; }
    public int WorkHourEnd { get; set; }
    
    // Trigger トリガーファイル名 (Trigger)
    public int? JobTriggerId { get; set; }
    
    // バッチ番号 (Trigger)
    public int? JobNo{ get; set; }
    
    public int? Status { get; set; }
    // バッチ起動类型
    public int? StartType { get; set; }
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
            .AsNoTracking()
            .FirstOrDefaultAsync(x=> x.Id == request.Id, cancellationToken);
       
        Guard.Against.NotFound(request.Id, job);
        using var transaction = await _context.DataBase.BeginTransaction();
        
            try
            {
                // Stop quartz job
                await _sender.Send(new StopBatchJobCommand { JobId = request.Id });
            
                // Delete the job
                _context.BatchJobs.Remove(job);
                await _context.SaveChangesAsync(cancellationToken);
            
                // Create new job
                var entity = _mapper.Map<BJob>(request);
                await _context.BatchJobs.AddAsync(entity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                
                await transaction.CommitAsync(cancellationToken);
                return entity;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                _logger.LogError(ex, "Error updating batch job with id {JobId}", request.Id);
                throw;
            }
        
    }
}

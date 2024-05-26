
namespace batch_job_backend.Domain.Entities;

public class BJob: BaseAuditableEntity
{
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
    public ScheduleType ScheduleType { get; set; } = ScheduleType.No;

    public string? Year { get; set; }
    public string? Month { get; set; }
    public string? Day { get; set; }
    public string? WeekDay { get; set; }
    public string? Hour { get; set; }
    public string? Minute { get; set; }
    public string? Second { get; set; }
    
    
    // Trigger トリガーファイル名 (Trigger) => 对应的scheduled job的id
    // 可能有多个Trigger 对一个scheduled job 的情况
    public int?  JobTriggerId { get; set; }
    
    // バッチ番号 (Trigger)
    public int? JobNo{ get; set; }
    
    public TaskJobStatus Status { get; set; }
    
}
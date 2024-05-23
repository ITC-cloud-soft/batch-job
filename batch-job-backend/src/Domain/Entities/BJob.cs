
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
    public ScheduleType? ScheduleType { get; set; }

    public int? Year { get; set; }
    public int? Month { get; set; }
    public int? Day { get; set; }
    public int? WeekDay { get; set; }
    public int? Hour { get; set; }
    public int? Minute { get; set; }
    public int? Second { get; set; }
    
    
    // Trigger トリガーファイル名 (Trigger) => 对应的scheduled job的id
    // 可能有多个Trigger 对一个scheduled job 的情况
    public int?  JobTriggerId { get; set; }
    
    // バッチ番号 (Trigger)
    public int? JobNo{ get; set; }
    
    public TaskJobStatus Status { get; set; }
    
}

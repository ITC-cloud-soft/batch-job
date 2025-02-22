using batch_job_backend.Domain.Enums;

namespace batch_job_backend.Application.BatchJobs.Commands;

public class JobCommand
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
    public string? CronExpressionStr { get; set; }

    // バッチ起動日(定時周期)
    public string? ScheduleType { get; set; }

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

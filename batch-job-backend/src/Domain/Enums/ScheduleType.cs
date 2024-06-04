using System.ComponentModel;

namespace batch_job_backend.Domain.Enums;

public enum ScheduleType
{
    [Description("Default")]
    No = 0,
    [Description("年次処理")]
    Year = 1,
    [Description("月次処理")]
    Month = 2,
    [Description("週次処理")]
    Week = 3,
    [Description("日次処理")]
    Day = 4,
    [Description("時間隔処理")]
    Hour = 5,
    [Description("分間隔処理")]
    Minute = 6,
}

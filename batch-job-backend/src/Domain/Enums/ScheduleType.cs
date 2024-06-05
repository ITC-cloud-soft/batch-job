

namespace batch_job_backend.Domain.Enums
{
    public static class ScheduleType
    {
        public const string No = "0";
        public const string Year = "1";
        public const string Month = "2";
        public const string Week = "3";
        public const string Day = "4";
        public const string Hour = "5";
        public const string Minute = "6";

        public static readonly Dictionary<string, string> Descriptions = new Dictionary<string, string>
        {
            { No, "Default" },
            { Year, "年次処理" },
            { Month, "月次処理" },
            { Week, "週次処理" },
            { Day, "日次処理" },
            { Hour, "時間隔処理" },
            { Minute, "分間隔処理" }
        };

        public static string GetDescription(string value)
        {
            return Descriptions.TryGetValue(value, out var description) ? description : "Unknown";
        }
    }
}

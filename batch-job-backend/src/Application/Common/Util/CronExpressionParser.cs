namespace Microsoft.Extensions.DependencyInjection.Common.Util;

public class CronExpressionParser
{
    public string ConvertToDescription(string cronExpression)
    {
        // Cron expression format: "second minute hour day month weekday"
        var parts = cronExpression.Split(' ');
        if (parts.Length != 6)
        {
            throw new ArgumentException("Invalid Cron expression format.");
        }

        string second = parts[0];
        string minute = parts[1];
        string hour = parts[2];
        string day = parts[3];
        string month = parts[4];
        string weekday = parts[5];

        return "";
    }
    
   
    
    // 转换为Cron表达式
    public string ToCronExpression(string? secondC, string minuteC, string hourC, string dayC, string monthC, string weekdayC, string yearC )
    {
        // 使用 "*" 表示任何值
        string year = !string.IsNullOrEmpty(yearC) ?  yearC: "*";
        string month = !string.IsNullOrEmpty(monthC) ? monthC : "*";
        string day = !string.IsNullOrEmpty(dayC)  ? dayC : "*";
        string weekDay = !string.IsNullOrEmpty(weekdayC)  ? weekdayC : "*";
        string hour = !string.IsNullOrEmpty(hourC)  ? hourC : "*";
        string minute = !string.IsNullOrEmpty(minuteC) ? minuteC : "*";
        string second = !string.IsNullOrEmpty(minuteC) ? minuteC : "*"; // 默认为0秒

        return $"{second} {minute} {hour} {day} {month} {weekDay}";
    }
}

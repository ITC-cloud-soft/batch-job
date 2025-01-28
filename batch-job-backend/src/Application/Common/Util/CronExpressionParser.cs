using System.Globalization;
using batch_job_backend.Application.BatchJobs.Commands;
using batch_job_backend.Domain.Enums;

namespace batch_job_backend.Application.Common.Util;

public class CronExpressionParser
{
    // 1 Seconds: 0
    // 2 Minutes: *
    // 3 Hours: *
    // 4 Day-of-Month: *
    // 5 Month: *
    // 6 Day-of-Week: ?
    // 7 Year: *
    public static string GenerateCronExpression(JobCommand job)
    {
        var cronExpression = "";
        var batchLaunchMonthDay = string.Join(",", job.BatchLaunchMonthDay);
        switch (job.ScheduleType)
        {
            case ScheduleType.Year: cronExpression = $"0 {job.Minute} {job.Hour} {job.Day} {job.Month} ? *"; break;
            case ScheduleType.Month: cronExpression = $"0 {job.Minute} {job.Hour} {batchLaunchMonthDay} * ? *"; break;
            case ScheduleType.Week: cronExpression = $"0 {job.Minute} {job.Hour} ? * {job.WeekDay} *"; break;
            case ScheduleType.Day: cronExpression = $"0 {job.Minute} {job.Hour} * * ? *"; break;
            case ScheduleType.Hour: cronExpression = GenHourLoopCronExpression(job); break;
            case ScheduleType.Minute: cronExpression = GenMinLoopCronExpression(job); break;
        }
        return cronExpression;
    }
    
    private static string GenMonthDayString(string[] batchLaunchMonthDay)
    {
        return string.Join("日,", batchLaunchMonthDay) + "日";
    }

    private static string GenLoopString(int startType, string[] BatchLaunchMonthDay, string[] BatchLaunchWeekDay)
    {
        // バッチ起動日  
        if (startType == 1)
        {
            return GenMonthDayString(BatchLaunchMonthDay);
        }
        // バッチ起動曜日
        if (startType == 2)
        {
            return string.Join(",", BatchLaunchWeekDay.Select(x => GetWeekDayString("ja-JP", int.Parse(x))).ToList());
        }
        throw new InvalidOperationException("Invalid job start type");
    }

    private static string GetWeekDayString(string culture, int? dayOfWeek)
    {
        // 指定日本文化
        CultureInfo japaneseCulture = new (culture);
        DateTimeFormatInfo dtfi = japaneseCulture.DateTimeFormat;

        // 将整数转换为 DayOfWeek 枚举
        DayOfWeek day = (DayOfWeek)dayOfWeek!;
        // 获取当前日期的星期几（日语表示）
        return dtfi.GetDayName(day);

    }

    private static string GenMinLoopCronExpression(JobCommand job)
    {
        
        // バッチ起動日  
        if (job.StartType == 1)
        {
            var day = string.Join(",", job.BatchLaunchMonthDay);
            return $"0 0/{job.LoopStep} {job.WorkHourStart}-{job.WorkHourEnd} {day} * ? * ";
        }
        // バッチ起動曜日
        if (job.StartType == 2)
        {
            var weekDay = string.Join(",", job.BatchLaunchWeekDay.ToList());
            return $"0 0/{job.LoopStep} {job.WorkHourStart}-{job.WorkHourEnd} ? * {weekDay} * ";
        }

        throw new InvalidOperationException("Invalid job start type");
    }
    private static string GenHourLoopCronExpression(JobCommand job)
    {
        
        // バッチ起動日  
        if (job.StartType == 1)
        {
            var day = string.Join(",", job.BatchLaunchMonthDay);
            return $"0 0 0/{job.LoopStep} {day} * ? * ";
        }
        // バッチ起動曜日
        if (job.StartType == 2)
        {
            var weekDay = string.Join(",", job.BatchLaunchWeekDay);
            return $"0 0 0/{job.LoopStep} ? * {weekDay} * ";
        }

        throw new InvalidOperationException("Invalid job start type");
    }
}

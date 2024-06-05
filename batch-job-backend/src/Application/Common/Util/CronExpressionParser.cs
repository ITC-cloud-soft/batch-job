using batch_job_backend.Application.BatchJobs.Commands.CreateBatchJob;
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
    public static string GenerateCronExpression(CreateBatchJobCommand job)
    {
        var cronExpression = "";
        var batchLaunchMonthDay = string.Join(",", job.BatchLaunchMonthDay);
        switch (job.ScheduleType)
        {
            case ScheduleType.Year: cronExpression = $"0 {job.Minute} {job.Hour} {job.Day} {job.Month} ? *"; break;
            case ScheduleType.Month: cronExpression = $"0 {job.Minute} {job.Hour} {batchLaunchMonthDay} * ? *"; break;
            case ScheduleType.Week: cronExpression = $"0 {job.Minute} {job.Hour} ? * {job.WeekDay + 1} *"; break;
            case ScheduleType.Day: cronExpression = $"0 {job.Minute} {job.Hour} * * ? *"; break;
            case ScheduleType.Hour: cronExpression = GenHourLoopCronExpression(job); break;
            case ScheduleType.Minute: cronExpression = GenMinLoopCronExpression(job); break;
        }
        Console.WriteLine(cronExpression);
        return cronExpression;
    }

    private static string GenMinLoopCronExpression(CreateBatchJobCommand job)
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
            var weekDay = string.Join(",", job.BatchLaunchWeekDay);
            return $"0 0/{job.LoopStep} {job.WorkHourStart}-{job.WorkHourEnd} ? * {weekDay} * ";
        }

        throw new InvalidOperationException("Invalid job start type");
    }
    private static string GenHourLoopCronExpression(CreateBatchJobCommand job)
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

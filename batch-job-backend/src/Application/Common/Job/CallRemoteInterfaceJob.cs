using System.Text.Json;
using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Domain.Entities;
using Microsoft.Extensions.Logging;
using Quartz;

namespace batch_job_backend.Infrastructure.Job;

public class  CallRemoteInterfaceJob : IJob
{
    private readonly ILogger<CallRemoteInterfaceJob> _logger;


    public CallRemoteInterfaceJob(ILogger<CallRemoteInterfaceJob> logger)
    {
        _logger = logger;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        try
        {
            JobDataMap param = context.JobDetail.JobDataMap;

            string? jobJsonStr = param.GetString(JobConstants.Scheduled);
            string? triggerJsonStr = param.GetString(JobConstants.TriggerJobs);
            if (string.IsNullOrEmpty(jobJsonStr))
            {
                _logger.LogWarning("Job or trigger data is missing");
                return;
            }

            var job = JsonSerializer.Deserialize<BJob>(jobJsonStr);
            var triggerList = JsonSerializer.Deserialize<List<BJob>>(triggerJsonStr ?? "");

            var response = await GetRequest(job?.JobUrl ?? "");
            Console.WriteLine(response);
            foreach (BJob trigger in triggerList ?? Enumerable.Empty<BJob>())
            {
                // TODO 返回值处理
                _logger.LogInformation("Trigger: {TriggerId}", trigger.Id);
                var response2 = await GetRequest(job?.JobUrl ?? "");
                Console.WriteLine(response2);
            }

            _logger.LogInformation("CallRemoteInterfaceJob is executing.");
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while executing CallRemoteInterfaceJob.");
            throw;
        }
    }
    
    
    private async Task<string> GetRequest(string url)
    {
        HttpClient client = new HttpClient();
         
        try
        {
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
        catch (HttpRequestException e)
        {
            _logger.LogError($"Request error: {e.Message}");
            throw; // 重新抛出异常或者返回一个错误信息
        }
        catch (TaskCanceledException e)
        {
            _logger.LogError($"Request timed out: {e.Message}");
            throw; // 重新抛出异常或者返回一个错误信息
        }
        catch (Exception e)
        {
            _logger.LogError($"Unexpected error: {e.Message}");
            throw; // 重新抛出异常或者返回一个错误信息
        }
    }
}

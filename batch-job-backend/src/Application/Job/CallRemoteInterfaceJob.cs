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
        JobDataMap param = context.JobDetail.JobDataMap;

        var job = (BatchJob)param.Get(JobConstants.Scheduled);
        var triggers = (List<BatchJob>)param.Get(JobConstants.TriggerJobs);
        
        
        
        // string? url = param.ge(JobConstants.JobUrl);
        //
        // if (url == null)
        // {
        //     return;
        // }

        await Console.Out.WriteLineAsync("CallRemoteInterfaceJob is executing.");
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

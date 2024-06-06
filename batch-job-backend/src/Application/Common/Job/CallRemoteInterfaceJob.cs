using System.Text.Json;
using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Domain.Entities;
using Microsoft.Extensions.Logging;
using Quartz;

namespace batch_job_backend.Application.Common.Job;

public class  CallRemoteInterfaceJob : IJob
{
    private readonly ILogger<CallRemoteInterfaceJob> _logger;
    private readonly IApplicationDbContext _context;


    public CallRemoteInterfaceJob(ILogger<CallRemoteInterfaceJob> logger, IApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        try
        {
            _logger.LogInformation("Job CallRemoteInterfaceJob Start");
            
            // get scheduled job from job parameters
            JobDataMap param = context.JobDetail.JobDataMap;
            string? jobJsonStr = param.GetString(JobConstants.Scheduled);
            
            if (string.IsNullOrEmpty(jobJsonStr))
            {
                throw new ArgumentException("Invalid job parameters");
            }
            
            var job = JsonSerializer.Deserialize<BJob>(jobJsonStr!);
         
            if (job == null)
            {
                throw new ArgumentException("Invalid job parameters: Deserialized job is null");
            }
            
            var triggerList = GetTriggerJobs(job!.Id);

            if (string.IsNullOrEmpty(job.JobUrl))
            {
                throw new ArgumentException("Invalid job parameters");
            }
            
            _logger.LogInformation("Execute scheduled job: {TriggerId}", job.Id);
            var response = await GetRequest(job.JobUrl);
            LogResponse(response);
            
            foreach (BJob trigger in triggerList )
            {
                _logger.LogInformation("Execute trigger job: {TriggerId}", trigger.Id);
                var triggerResponse = await GetRequest(trigger.JobUrl!);
                LogResponse(triggerResponse);
            }

            _logger.LogInformation("CallRemoteInterfaceJob is executing");
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while executing CallRemoteInterfaceJob");
            throw;
        }
    }
    
    
    private async Task<string> GetRequest(string url)
    {
        HttpClient client = new ();
         
        try
        {
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
        catch (HttpRequestException e)
        {
            _logger.LogError("Request error: {Message}", e.Message);
            throw; // 重新抛出异常或者返回一个错误信息
        }
        catch (TaskCanceledException e)
        {
            _logger.LogError("Request timed out: {Message}", e.Message);
            throw; // 重新抛出异常或者返回一个错误信息
        }
        catch (Exception e)
        {
            _logger.LogError("Unexpected error: {Message}", e.Message);
            throw; // 重新抛出异常或者返回一个错误信息
        }
    }
    
    private List<BJob> GetTriggerJobs(int jobId)
    {
        return _context.BatchJobs
            .AsNoTracking()
            .Where(x => x.JobTriggerId == jobId)
            .ToList();
    }
    
    
    private void LogResponse(string response)
    {
        _logger.LogInformation("Response: {Response}", response);
    }
}

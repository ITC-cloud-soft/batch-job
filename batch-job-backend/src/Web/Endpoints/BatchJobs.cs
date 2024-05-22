using batch_job_backend.Application.BatchJob.Commands.ExecuteBatchJob;
using batch_job_backend.Application.BatchJob.Commands.StopBatchJob;
using batch_job_backend.Application.BatchJobs.Commands.CreateBatchJob;
using batch_job_backend.Domain.Entities;

namespace batch_job_backend.Web.Endpoints;

public class BatchJobs : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateJob)
            .MapPost(ExecuteJob, "start/{jobId}")
            .MapPost(StopJob, "stop/{jobId}");
    }

    private Task<BatchJob> CreateJob(ISender sender, CreateBatchJobCommand command)
    {
        return sender.Send(command);
    }
    
    private async Task<int> ExecuteJob(ISender sender,  int jobId )
    {
        return await sender.Send(new ExecuteBatchJobCommand {JobId = jobId});
    }
    
    private async Task StopJob(ISender sender,  int jobId)
    {
         await sender.Send(new StopBatchJobCommand{JobId = jobId});
    }
}

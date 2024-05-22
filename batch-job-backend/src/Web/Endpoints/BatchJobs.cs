using batch_job_backend.Application.BatchJob.Commands.ExecuteBatchJob;
using batch_job_backend.Application.BatchJob.Commands.StopBatchJob;
using batch_job_backend.Application.BatchJobs.Commands.CreateBatchJob;

namespace batch_job_backend.Web.Endpoints;

public class BatchJobs : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateJob)
            .MapDelete(StopJob, "{jobId}");
    }

    public Task<Domain.Entities.BatchJob> CreateJob(ISender sender, CreateBatchJobCommand command)
    {
        return sender.Send(command);
    }
    
    public async Task<int> ExecuteJob(ISender sender, ExecuteBatchJobCommand command)
    {
        return await sender.Send(command);
    }
    
    public async Task<int> StopJob(ISender sender,  int jobId)
    {
        return await sender.Send(new StopBatchJobCommand(){JobId = jobId});
    }
}

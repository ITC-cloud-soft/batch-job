using batch_job_backend.Application.BatchJob.Commands.ExecuteBatchJob;
using batch_job_backend.Application.BatchJob.Commands.StopBatchJob;
using batch_job_backend.Application.BatchJob.Commands.UpdateBatchJob;
using batch_job_backend.Application.BatchJob.Queries.GetBatchJob;
using batch_job_backend.Application.BatchJobs.Commands.CreateBatchJob;
using batch_job_backend.Application.BatchJobs.Queries.GetBatchJob;
using batch_job_backend.Application.Common.Models;
using batch_job_backend.Domain.Entities;

namespace batch_job_backend.Web.Endpoints;

public class BatchJobs : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateJob)
            .MapPut(UpdateJob, "{jobId}")
            .MapGet(Query)
            .MapGet(ExecuteJob, "start/{jobId}")
            .MapDelete(StopJob, "stop/{jobId}");

    }

    private Task<BJob> CreateJob(ISender sender, CreateBatchJobCommand command)
    {
        return sender.Send(command);
    }
    
    private async Task ExecuteJob(ISender sender,  int jobId )
    {
        await sender.Send(new ExecuteBatchJobCommand {JobId = jobId});
    }
    
    private async Task StopJob(ISender sender,  int jobId)
    {
        await sender.Send(new StopBatchJobCommand{JobId = jobId});
    }
    
    private async Task<BJob> UpdateJob(ISender sender,int jobId, UpdateBatchJobCommand command)
    {
        if (jobId != command.Id)
        {
            throw new ArgumentException("Invalid job id");
        }
        return await sender.Send(command);
    }
    
    private async Task<PaginatedList<BatchJobVm>> Query(ISender sender, [AsParameters] GetBatchJobWithPaginationQuery query)
    {
        return await sender.Send(query);
    }

}

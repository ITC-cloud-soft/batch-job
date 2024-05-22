using batch_job_backend.Application.BatchJob.Commands.CreateBatchJob;

namespace batch_job_backend.Web.Endpoints;

public class BatchJobs : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(CreateJob);
    }

    public Task<int> CreateJob(ISender sender, CreateBatchJobCommand command)
    {
        return sender.Send(command);
    }
}

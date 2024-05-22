using Quartz;

namespace batch_job_backend.Infrastructure.Job;

public class CallRemoteInterfaceJob : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        await Console.Out.WriteLineAsync("CallRemoteInterfaceJob is executing.");
    }
}

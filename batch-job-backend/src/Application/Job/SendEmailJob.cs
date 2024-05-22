using Quartz;

namespace batch_job_backend.Infrastructure.Job;

public class SendEmailJob : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        // Code that sends a periodic email to the user (for example)
        // Note: This method must always return a value 
        // This is especially important for trigger listeners watching job execution 
        await Console.Out.WriteLineAsync("HelloJob is executing.");
    }
}

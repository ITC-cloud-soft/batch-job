namespace batch_job_backend.Domain.Entities;

public enum TaskStatus
{
    Enqueued = 0,
    Scheduled = 1,
    Processing = 2,
    Succeeded = 3,
    Failed = 4,
    Deleted = 5,
    Awaiting = 6,
}

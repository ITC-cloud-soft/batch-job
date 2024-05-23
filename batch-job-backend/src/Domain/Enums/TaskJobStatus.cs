namespace batch_job_backend.Domain.Enums;

public enum TaskJobStatus
{
    Enqueued = 0,
    Scheduled = 1,
    Processing = 2,
    Succeeded = 3,
    Failed = 4,
    Deleted = 5,
    Awaiting = 6,
    Stop = 6,
}

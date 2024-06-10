using System.ComponentModel;

namespace batch_job_backend.Domain.Enums;

public enum TaskJobStatus
{
    [JobStatus("Enqueued", "The job is enqueued and waiting to be processed.", "blue")]
    Enqueued = 0,
    [JobStatus("Scheduled", "The job is scheduled to be processed at a specific time.", "cyan")]
    Scheduled = 1,
    [JobStatus("アクティブ", "The job is currently being processed.", "green")]
    Processing = 2,
    [JobStatus("Succeeded", "The job has been processed successfully.", "green")]
    Succeeded = 3,
    [JobStatus("Failed", "The job has failed during processing.", "red")]
    Failed = 4,
    [JobStatus("Deleted", "The job has been deleted and will not be processed.", "gray")]
    Deleted = 5,
    [JobStatus("Awaiting", "The job is awaiting further actions or conditions.", "purple")]
    Awaiting = 6,
    [JobStatus("停止", "The job has been stopped.", "black")]
    Stop = 7,
    [JobStatus("Paused", "The job is paused and can be resumed later.", "yellow")]
    Paused = 8,
    [JobStatus("Canceled", "The job has been canceled and will not be processed.", "brown")]
    Canceled = 9,
    [JobStatus("Rescheduled", "The job has been rescheduled to a different time.", "teal")]
    Rescheduled = 10
}

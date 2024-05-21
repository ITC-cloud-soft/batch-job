namespace batch_job_backend.Domain.Entities;

/**
 * 执行历史
 */
public class TaskHistory: BaseAuditableEntity
{
    public int JobId { get; set; }
    
    public DateTime ExecutionTime { get; set; }
    
    public TaskStatus Status { get; set; }
    
    public DateTime Log { get; set; }
}

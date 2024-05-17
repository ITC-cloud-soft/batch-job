namespace batch_job_backend.Domain.Entities;

public class Job: BaseAuditableEntity
{
    public string? Name { get; set; }
    public string? BatchUrl { get; set; }
}

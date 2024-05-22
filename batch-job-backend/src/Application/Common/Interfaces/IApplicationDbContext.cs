using batch_job_backend.Domain.Entities;

namespace batch_job_backend.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    DbSet<Domain.Entities.BatchJob> BatchJobs { get; }
    
    DbSet<TaskHistory> TaskHistories { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}

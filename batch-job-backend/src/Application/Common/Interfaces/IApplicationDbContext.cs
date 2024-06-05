using batch_job_backend.Domain.Entities;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

namespace batch_job_backend.Application.Common.Interfaces;

public interface IApplicationDbContext 
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    DbSet<BJob> BatchJobs { get; }
    
    DbSet<TaskHistory> TaskHistories { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    Task<IDbContextTransaction> BeginTransactionAsync(
        CancellationToken cancellationToken = default(CancellationToken));

}

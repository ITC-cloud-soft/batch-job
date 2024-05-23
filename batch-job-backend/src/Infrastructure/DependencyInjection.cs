using batch_job_backend.Application.Common.Interfaces;
using batch_job_backend.Domain.Constants;
using batch_job_backend.Infrastructure.Data;
using batch_job_backend.Infrastructure.Data.Interceptors;
using batch_job_backend.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Quartz;

namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        Guard.Against.Null(connectionString, message: "Connection string 'DefaultConnection' not found.");

        services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
        services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());

            options.UseMySql(connectionString,
                new MySqlServerVersion(new Version(8, 0, 32))); //
        });

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitialiser>();

        services
            .AddDefaultIdentity<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddSingleton(TimeProvider.System);
        services.AddTransient<IIdentityService, IdentityService>();

        services.AddAuthorization(options =>
            options.AddPolicy(Policies.CanPurge, policy => policy.RequireRole(Roles.Administrator)));

        services.AddQuartz(q =>
        {
            // 配置 Quartz 使用数据库持久化
            q.UsePersistentStore(options =>
            {
                options.UseProperties = true;
                options.UseMySqlConnector(mysqlOptions =>
                {
                    mysqlOptions.ConnectionString = connectionString;
                    mysqlOptions.TablePrefix = "QRTZ_";
                });
                options.UseClustering();
                options.UseNewtonsoftJsonSerializer();
            });
        });
        // 添加 Quartz Hosted Service
        services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
        return services;
    }
}

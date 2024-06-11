using System.Reflection;
using batch_job_backend.Application.BatchJobs.Commands;
using batch_job_backend.Application.BatchJobs.Commands.UpdateBatchJob;
using batch_job_backend.Application.BatchJobs.Queries.GetBatchJob;
using batch_job_backend.Application.BatchJobs.Commands.CreateBatchJob;
using batch_job_backend.Application.Common.Util;
using batch_job_backend.Domain.Entities;
using batch_job_backend.Domain.Enums;

namespace batch_job_backend.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
    }

    private void ApplyMappingsFromAssembly(Assembly assembly)
    {
        var mapFromType = typeof(IMapFrom<>);
        
        var mappingMethodName = nameof(IMapFrom<object>.Mapping);
        
        bool HasInterface(Type t) => t.IsGenericType && t.GetGenericTypeDefinition() == mapFromType;
        
        var types = assembly.GetExportedTypes().Where(t => t.GetInterfaces().Any(HasInterface)).ToList();
        
        var argumentTypes = new [] { typeof(Profile) };
        
        foreach (var type in types)
        {
            var instance = Activator.CreateInstance(type);
        
            var methodInfo = type.GetMethod(mappingMethodName);
        
            if (methodInfo != null)
            {
                methodInfo.Invoke(instance, new object[] { this });
            }
            else
            {
                var interfaces = type.GetInterfaces().Where(HasInterface).ToList();
        
                if (interfaces.Count > 0)
                {
                    foreach (var @interface in interfaces)
                    {
                        var interfaceMethodInfo = @interface.GetMethod(mappingMethodName, argumentTypes);
        
                        interfaceMethodInfo?.Invoke(instance, new object[] { this });
                    }
                }
            }
        }

        CreateMap<JobCommand, BJob>()
            .ForMember(dest => dest.CronExpression, opt => opt.MapFrom(src => CronExpressionParser.GenerateCronExpression(src)))
            .ForMember(dest => dest.CronExpressionStr, opt => opt.MapFrom(src => CronExpressionParser.GenerateCronExpressionString(src)))
            .ForMember(dest => dest.BatchLaunchMonthDay, opt => opt.MapFrom(src => string.Join(",", src.BatchLaunchMonthDay)))
            .ForMember(dest => dest.BatchLaunchWeedDay, opt => opt.MapFrom(src => string.Join(",", src.BatchLaunchWeekDay)));

      
        CreateMap<BJob, BatchJobVm>()
            .ForMember(dest => dest.BatchLaunchMonthDay, opt => opt.MapFrom(src => MapBatchLaunchDay(src.BatchLaunchMonthDay)))
            .ForMember(dest => dest.BatchLaunchWeekDay, opt => opt.MapFrom(src => MapBatchLaunchDay(src.BatchLaunchWeedDay)))
            .ForMember(dest => dest.TaskJobStatusDes, opt => opt.MapFrom(src => src.Status.GetShortDescription()))
            .ForMember(dest => dest.TaskJobStatusColor, opt => opt.MapFrom(src => src.Status.GetColor()))
            .ForMember(dest => dest.ScheduleTypeStr, opt => opt.MapFrom(src => GetDes(src)));
        
    }
    
    private static string GetDes(BJob job)
    {
        return string.IsNullOrEmpty(job.ScheduleType) ? "" : ScheduleType.GetDescription(job.ScheduleType);
    }        
    
    private static string[] MapBatchLaunchDay(string? MapBatchLaunchDay)
    {
        return string.IsNullOrEmpty(MapBatchLaunchDay) ? new string[] { } : MapBatchLaunchDay.Split(",");
    }
}

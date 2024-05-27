using System.Reflection;
using batch_job_backend.Application.BatchJobs.Commands.UpdateBatchJob;
using batch_job_backend.Application.BatchJobs.Queries.GetBatchJob;
using batch_job_backend.Application.BatchJobs.Commands.CreateBatchJob;
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
        
        var argumentTypes = new Type[] { typeof(Profile) };
        
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
        CreateMap<CreateBatchJobCommand, BJob>();
        CreateMap<UpdateBatchJobCommand, BJob>();
        CreateMap<BJob, BatchJobVm>()
            .ForMember(dest => dest.TaskJobStatusDes, opt => opt.MapFrom(src => src.Status.GetShortDescription()))
            .ForMember(dest => dest.TaskJobStatusColor, opt => opt.MapFrom(src => src.Status.GetColor()))
            .ForMember(dest => dest.ScheduleTypeStr, opt => opt.MapFrom(src => src.ScheduleType.GetDescription()));
        
    }
}

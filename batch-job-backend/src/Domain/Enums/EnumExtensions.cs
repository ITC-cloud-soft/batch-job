using System.ComponentModel;
using Ardalis.GuardClauses;

namespace batch_job_backend.Domain.Enums;

public static class EnumExtensions
{
    public static TAttribute GetAttribute<TAttribute>(this Enum value) where TAttribute : Attribute
    {

        var type = value.GetType();
       
        var field = type.GetField(value.ToString());
        Guard.Against.NotFound(value.ToString(), field);
        
        var attribute = Attribute.GetCustomAttribute(field, typeof(TAttribute));
        Guard.Against.NotFound(value.ToString(), attribute);
        
        return (TAttribute)attribute;
    }

    public static string GetShortDescription(this Enum value)
    {
        var attribute = value.GetAttribute<JobStatusAttribute>();
        return attribute == null ? value.ToString() : attribute.ShortDescription;
    }

    public static string GetDetailedDescription(this Enum value)
    {
        var attribute = value.GetAttribute<JobStatusAttribute>();
        return attribute == null ? value.ToString() : attribute.DetailedDescription;
    }

    public static string GetColor(this Enum value)
    {
        var attribute = value.GetAttribute<JobStatusAttribute>();
        return attribute == null ? "none" : attribute.Color;
    }
    
    public static string GetDescription(this Enum value)
    {
        var attribute = value.GetAttribute<DescriptionAttribute>();
        return attribute == null ? value.ToString() : attribute.Description;
    }
}

namespace batch_job_backend.Domain.Enums;

[AttributeUsage(AttributeTargets.Field, Inherited = false, AllowMultiple = false)]
sealed class JobStatusAttribute : Attribute
{
    public string ShortDescription { get; }
    public string DetailedDescription { get; }
    public string Color { get; }

    public JobStatusAttribute(string shortDescription, string detailedDescription, string color)
    {
        ShortDescription = shortDescription;
        DetailedDescription = detailedDescription;
        Color = color;
    }
}

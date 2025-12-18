using MathLearning.Domain.Common;

namespace MathLearning.Domain.Entities;

public class Tag : BaseEntity, IAuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;

    // Navigation properties
    public virtual ICollection<CourseTag> CourseTags { get; set; } = new List<CourseTag>();
}

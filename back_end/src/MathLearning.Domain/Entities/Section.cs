using MathLearning.Domain.Common;

namespace MathLearning.Domain.Entities;

public class Section : BaseEntity, IAuditableEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; } = 0;
    public int DurationInMinutes { get; set; } = 0;

    // Foreign keys
    public Guid CourseId { get; set; }

    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}

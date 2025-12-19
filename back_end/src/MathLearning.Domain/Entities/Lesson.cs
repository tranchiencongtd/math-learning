using MathLearning.Domain.Common;
using MathLearning.Domain.Enums;

namespace MathLearning.Domain.Entities;

public class Lesson : BaseEntity, IAuditableEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Content { get; set; }
    public LessonType Type { get; set; } = LessonType.Video;
    public string? VideoUrl { get; set; }
    public int DurationInMinutes { get; set; } = 0;
    public int DisplayOrder { get; set; } = 0;
    public bool IsFreePreview { get; set; } = false;
    public string? Resources { get; set; } // JSON array of resources

    // Foreign keys
    public Guid SectionId { get; set; }

    // Navigation properties
    public virtual Section Section { get; set; } = null!;
    public virtual ICollection<LessonProgress> LessonProgresses { get; set; } = new List<LessonProgress>();
}

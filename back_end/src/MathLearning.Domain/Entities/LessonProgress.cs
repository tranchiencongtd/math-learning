using MathLearning.Domain.Common;

namespace MathLearning.Domain.Entities;

public class LessonProgress : BaseEntity, IAuditableEntity
{
    public bool IsCompleted { get; set; } = false;
    public DateTime? CompletedAt { get; set; }
    public int WatchedDurationInSeconds { get; set; } = 0;
    public int LastPositionInSeconds { get; set; } = 0;
    public string? Notes { get; set; }

    // Foreign keys
    public Guid UserId { get; set; }
    public Guid LessonId { get; set; }

    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Lesson Lesson { get; set; } = null!;
}

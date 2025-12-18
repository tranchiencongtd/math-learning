using MathLearning.Domain.Common;

namespace MathLearning.Domain.Entities;

public class Review : BaseEntity, IAuditableEntity
{
    public int Rating { get; set; } // 1-5
    public string? Comment { get; set; }
    public bool IsApproved { get; set; } = false;
    public int HelpfulCount { get; set; } = 0;

    // Foreign keys
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }

    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Course Course { get; set; } = null!;
}

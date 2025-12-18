using MathLearning.Domain.Common;
using MathLearning.Domain.Enums;

namespace MathLearning.Domain.Entities;

public class Enrollment : BaseEntity, IAuditableEntity
{
    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
    public EnrollmentStatus Status { get; set; } = EnrollmentStatus.Active;
    public int ProgressPercentage { get; set; } = 0;
    public decimal PricePaid { get; set; }
    public DateTime? ExpiresAt { get; set; }

    // Foreign keys
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }

    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Course Course { get; set; } = null!;
    public virtual Payment? Payment { get; set; }
}

using MathLearning.Domain.Common;

namespace MathLearning.Domain.Entities;

public class Certificate : BaseEntity, IAuditableEntity
{
    public string CertificateNumber { get; set; } = string.Empty;
    public string CertificateUrl { get; set; } = string.Empty;
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
    public string CourseName { get; set; } = string.Empty;
    public string StudentName { get; set; } = string.Empty;
    public string InstructorName { get; set; } = string.Empty;

    // Foreign keys
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }

    // Navigation properties
    public virtual User User { get; set; } = null!;
}

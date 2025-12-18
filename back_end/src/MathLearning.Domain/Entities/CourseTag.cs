using MathLearning.Domain.Common;

namespace MathLearning.Domain.Entities;

public class CourseTag : BaseEntity
{
    public Guid CourseId { get; set; }
    public Guid TagId { get; set; }

    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual Tag Tag { get; set; } = null!;
}

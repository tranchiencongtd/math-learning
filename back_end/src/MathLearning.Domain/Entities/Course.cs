using MathLearning.Domain.Common;
using MathLearning.Domain.Enums;

namespace MathLearning.Domain.Entities;

public class Course : BaseEntity, IAuditableEntity
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? PreviewVideoUrl { get; set; }
    public decimal Price { get; set; }
    public decimal? DiscountPrice { get; set; }
    public CourseLevel Level { get; set; } = CourseLevel.Beginner;
    public CourseStatus Status { get; set; } = CourseStatus.Draft;
    public string? Language { get; set; } = "Vietnamese";
    public int DurationInMinutes { get; set; }
    public string? Requirements { get; set; }
    public string? WhatYouWillLearn { get; set; }
    public string? TargetAudience { get; set; }
    public bool IsFeatured { get; set; } = false;
    public double AverageRating { get; set; } = 0;
    public int TotalStudents { get; set; } = 0;
    public int TotalReviews { get; set; } = 0;

    // Foreign keys
    public Guid InstructorId { get; set; }
    public Guid CategoryId { get; set; }

    // Navigation properties
    public virtual User Instructor { get; set; } = null!;
    public virtual Category Category { get; set; } = null!;
    public virtual ICollection<Section> Sections { get; set; } = new List<Section>();
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
    public virtual ICollection<CourseTag> CourseTags { get; set; } = new List<CourseTag>();
}

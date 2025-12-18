using MathLearning.Domain.Enums;

namespace MathLearning.Application.Features.Courses.DTOs;

public record CourseDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Slug { get; init; } = string.Empty;
    public string? ShortDescription { get; init; }
    public string? ThumbnailUrl { get; init; }
    public decimal Price { get; init; }
    public decimal? DiscountPrice { get; init; }
    public CourseLevel Level { get; init; }
    public int DurationInMinutes { get; init; }
    public double AverageRating { get; init; }
    public int TotalStudents { get; init; }
    public int TotalReviews { get; init; }
    public string InstructorName { get; init; } = string.Empty;
    public string CategoryName { get; init; } = string.Empty;
    public bool IsFeatured { get; init; }
}

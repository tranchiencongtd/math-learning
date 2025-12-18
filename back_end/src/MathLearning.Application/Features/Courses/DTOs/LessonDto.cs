using MathLearning.Domain.Enums;

namespace MathLearning.Application.Features.Courses.DTOs;

public record LessonDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string? Description { get; init; }
    public LessonType Type { get; init; }
    public int DurationInMinutes { get; init; }
    public int DisplayOrder { get; init; }
    public bool IsFreePreview { get; init; }
}

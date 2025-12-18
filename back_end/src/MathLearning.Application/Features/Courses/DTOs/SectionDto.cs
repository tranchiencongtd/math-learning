namespace MathLearning.Application.Features.Courses.DTOs;

public record SectionDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string? Description { get; init; }
    public int DisplayOrder { get; init; }
    public int DurationInMinutes { get; init; }
    public List<LessonDto> Lessons { get; init; } = new();
}

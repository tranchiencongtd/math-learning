namespace MathLearning.Application.Features.Courses.DTOs;

public record ReviewDto
{
    public Guid Id { get; init; }
    public int Rating { get; init; }
    public string? Comment { get; init; }
    public string UserName { get; init; } = string.Empty;
    public string? UserAvatar { get; init; }
    public int HelpfulCount { get; init; }
    public DateTime CreatedAt { get; init; }
}

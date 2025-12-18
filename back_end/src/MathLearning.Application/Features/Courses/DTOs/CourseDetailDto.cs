using MathLearning.Domain.Enums;

namespace MathLearning.Application.Features.Courses.DTOs;

public record CourseDetailDto : CourseDto
{
    public string Description { get; init; } = string.Empty;
    public string? PreviewVideoUrl { get; init; }
    public string? Requirements { get; init; }
    public string? WhatYouWillLearn { get; init; }
    public string? TargetAudience { get; init; }
    public string? Language { get; init; }
    public string? InstructorAvatar { get; init; }
    public Guid InstructorId { get; init; }
    public Guid CategoryId { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
    public List<SectionDto> Sections { get; init; } = new();
    public List<string> Tags { get; init; } = new();
}

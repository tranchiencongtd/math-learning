namespace MathLearning.Application.Features.Categories.DTOs;

public record CategoryDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Slug { get; init; } = string.Empty;
    public string? Description { get; init; }
    public string? IconUrl { get; init; }
    public int DisplayOrder { get; init; }
    public bool IsActive { get; init; }
    public Guid? ParentCategoryId { get; init; }
}

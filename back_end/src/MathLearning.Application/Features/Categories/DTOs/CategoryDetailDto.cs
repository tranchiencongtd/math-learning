namespace MathLearning.Application.Features.Categories.DTOs;

public record CategoryDetailDto : CategoryDto
{
    public int CoursesCount { get; init; }
    public List<CategoryDto> SubCategories { get; init; } = new();
}

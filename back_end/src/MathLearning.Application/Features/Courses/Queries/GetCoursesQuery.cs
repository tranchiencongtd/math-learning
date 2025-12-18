using MathLearning.Application.Common.Models;
using MathLearning.Application.Features.Courses.DTOs;
using MathLearning.Domain.Enums;
using MediatR;

namespace MathLearning.Application.Features.Courses.Queries;

public record GetCoursesQuery : IRequest<PaginatedList<CourseDto>>
{
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 12;
    public string? SearchTerm { get; init; }
    public Guid? CategoryId { get; init; }
    public CourseLevel? Level { get; init; }
    public decimal? MinPrice { get; init; }
    public decimal? MaxPrice { get; init; }
    public double? MinRating { get; init; }
    public string? SortBy { get; init; } = "newest"; // newest, popular, rating, price-low, price-high
    public bool? IsFeatured { get; init; }
}

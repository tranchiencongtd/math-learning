using MathLearning.Application.Features.Categories.DTOs;
using MediatR;

namespace MathLearning.Application.Features.Categories.Queries;

public record GetCategoriesQuery : IRequest<List<CategoryDto>>;

using MathLearning.Application.Features.Courses.DTOs;
using MediatR;

namespace MathLearning.Application.Features.Courses.Queries;

public record GetCourseBySlugQuery(string Slug) : IRequest<CourseDetailDto?>;

using Asp.Versioning;
using MathLearning.Application.Common.Models;
using MathLearning.Application.Features.Courses.DTOs;
using MathLearning.Application.Features.Courses.Queries;
using MathLearning.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MathLearning.API.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CoursesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PaginatedList<CourseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCourses(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 12,
        [FromQuery] string? search = null,
        [FromQuery] Guid? categoryId = null,
        [FromQuery] CourseLevel? level = null,
        [FromQuery] decimal? minPrice = null,
        [FromQuery] decimal? maxPrice = null,
        [FromQuery] double? minRating = null,
        [FromQuery] string sortBy = "newest",
        [FromQuery] bool? isFeatured = null)
    {
        var query = new GetCoursesQuery
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            SearchTerm = search,
            CategoryId = categoryId,
            Level = level,
            MinPrice = minPrice,
            MaxPrice = maxPrice,
            MinRating = minRating,
            SortBy = sortBy,
            IsFeatured = isFeatured
        };

        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpGet("{slug}")]
    [ProducesResponseType(typeof(CourseDetailDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCourseBySlug(string slug)
    {
        var query = new GetCourseBySlugQuery(slug);
        var result = await _mediator.Send(query);

        if (result == null)
        {
            return NotFound(new { message = "Course not found" });
        }

        return Ok(result);
    }

    [HttpGet("featured")]
    [ProducesResponseType(typeof(List<CourseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetFeaturedCourses([FromQuery] int limit = 8)
    {
        var query = new GetCoursesQuery
        {
            PageNumber = 1,
            PageSize = limit,
            IsFeatured = true,
            SortBy = "rating"
        };

        var result = await _mediator.Send(query);
        return Ok(result.Items);
    }

    [HttpGet("popular")]
    [ProducesResponseType(typeof(List<CourseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPopularCourses([FromQuery] int limit = 8)
    {
        var query = new GetCoursesQuery
        {
            PageNumber = 1,
            PageSize = limit,
            SortBy = "popular"
        };

        var result = await _mediator.Send(query);
        return Ok(result.Items);
    }
}

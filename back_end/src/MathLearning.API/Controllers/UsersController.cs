using Asp.Versioning;
using MathLearning.Application.Common.Interfaces;
using MathLearning.Application.Features.Auth.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MathLearning.API.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ICurrentUserService _currentUserService;
    private readonly IApplicationDbContext _context;

    public UsersController(
        IMediator mediator, 
        ICurrentUserService currentUserService,
        IApplicationDbContext context)
    {
        _mediator = mediator;
        _currentUserService = currentUserService;
        _context = context;
    }

    [HttpGet("me")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = _currentUserService.UserId;
        if (!userId.HasValue)
        {
            return Unauthorized();
        }

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId.Value);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            AvatarUrl = user.AvatarUrl,
            Bio = user.Bio,
            Role = user.Role,
            IsEmailVerified = user.IsEmailVerified,
            LastLoginAt = user.LastLoginAt,
            CreatedAt = user.CreatedAt
        });
    }

    [HttpGet("me/enrollments")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMyEnrollments()
    {
        var userId = _currentUserService.UserId;
        if (!userId.HasValue)
        {
            return Unauthorized();
        }

        var enrollments = await _context.Enrollments
            .Include(e => e.Course)
                .ThenInclude(c => c.Instructor)
            .Include(e => e.Course)
                .ThenInclude(c => c.Category)
            .Where(e => e.UserId == userId.Value)
            .OrderByDescending(e => e.EnrolledAt)
            .Select(e => new
            {
                e.Id,
                e.EnrolledAt,
                e.ProgressPercentage,
                e.Status,
                Course = new
                {
                    e.Course.Id,
                    e.Course.Title,
                    e.Course.Slug,
                    e.Course.ThumbnailUrl,
                    InstructorName = e.Course.Instructor.FirstName + " " + e.Course.Instructor.LastName,
                    CategoryName = e.Course.Category.Name
                }
            })
            .ToListAsync();

        return Ok(enrollments);
    }
}

using Asp.Versioning;
using MathLearning.Application.Common.Models;
using MathLearning.Application.Features.Auth.Commands;
using MathLearning.Application.Features.Auth.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MathLearning.API.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(Result<AuthResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var command = new LoginCommand(request.Email, request.Password);
        var result = await _mediator.Send(command);

        if (!result.Succeeded)
        {
            return BadRequest(new { message = result.Errors.FirstOrDefault() });
        }

        return Ok(result.Data);
    }

    [HttpPost("register")]
    [ProducesResponseType(typeof(Result<AuthResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var command = new RegisterCommand(
            request.Email,
            request.Password,
            request.ConfirmPassword,
            request.FirstName,
            request.LastName
        );
        var result = await _mediator.Send(command);

        if (!result.Succeeded)
        {
            return BadRequest(new { message = result.Errors.FirstOrDefault() });
        }

        return Ok(result.Data);
    }

    [HttpPost("refresh-token")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        // TODO: Implement refresh token logic
        await Task.CompletedTask;
        return Ok();
    }

    [HttpPost("logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Logout()
    {
        // TODO: Invalidate refresh token
        await Task.CompletedTask;
        return Ok(new { message = "Logged out successfully" });
    }
}

public record RefreshTokenRequest(string RefreshToken);

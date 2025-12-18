using MathLearning.Application.Common.Models;
using MathLearning.Application.Features.Auth.DTOs;
using MediatR;

namespace MathLearning.Application.Features.Auth.Commands;

public record RegisterCommand(
    string Email,
    string Password,
    string ConfirmPassword,
    string FirstName,
    string LastName
) : IRequest<Result<AuthResponse>>;

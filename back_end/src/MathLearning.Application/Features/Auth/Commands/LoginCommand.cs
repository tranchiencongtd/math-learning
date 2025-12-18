using MathLearning.Application.Common.Models;
using MathLearning.Application.Features.Auth.DTOs;
using MediatR;

namespace MathLearning.Application.Features.Auth.Commands;

public record LoginCommand(string Email, string Password) : IRequest<Result<AuthResponse>>;

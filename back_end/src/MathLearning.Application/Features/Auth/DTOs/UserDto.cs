using MathLearning.Domain.Enums;

namespace MathLearning.Application.Features.Auth.DTOs;

public record UserDto
{
    public Guid Id { get; init; }
    public string Email { get; init; } = string.Empty;
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";
    public string? AvatarUrl { get; init; }
    public string? Bio { get; init; }
    public UserRole Role { get; init; }
    public bool IsEmailVerified { get; init; }
    public DateTime? LastLoginAt { get; init; }
    public DateTime CreatedAt { get; init; }
}

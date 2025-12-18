namespace MathLearning.Application.Features.Auth.DTOs;

public record AuthResponse(
    UserDto User,
    string AccessToken,
    string RefreshToken,
    DateTime ExpiresAt
);

namespace MathLearning.Application.Features.Auth.DTOs;

public record RegisterRequest(
    string Email,
    string Password,
    string ConfirmPassword,
    string FirstName,
    string LastName
);

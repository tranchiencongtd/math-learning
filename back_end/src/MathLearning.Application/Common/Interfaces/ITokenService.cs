using MathLearning.Domain.Entities;

namespace MathLearning.Application.Common.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    Task<(string AccessToken, string RefreshToken)> GenerateTokensAsync(User user);
    Task<bool> ValidateRefreshTokenAsync(Guid userId, string refreshToken);
}

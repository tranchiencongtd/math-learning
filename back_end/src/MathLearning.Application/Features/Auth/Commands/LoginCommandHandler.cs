using AutoMapper;
using MathLearning.Application.Common.Interfaces;
using MathLearning.Application.Common.Models;
using MathLearning.Application.Features.Auth.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace MathLearning.Application.Features.Auth.Commands;

public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<AuthResponse>>
{
    private readonly IApplicationDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public LoginCommandHandler(
        IApplicationDbContext context,
        ITokenService tokenService,
        IMapper mapper)
    {
        _context = context;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    public async Task<Result<AuthResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email && !u.IsDeleted, cancellationToken);

        if (user == null)
        {
            return Result<AuthResponse>.Failure("Invalid email or password.");
        }

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Result<AuthResponse>.Failure("Invalid email or password.");
        }

        user.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(cancellationToken);

        var (accessToken, refreshToken) = await _tokenService.GenerateTokensAsync(user);

        var response = new AuthResponse(
            _mapper.Map<UserDto>(user),
            accessToken,
            refreshToken,
            DateTime.UtcNow.AddHours(1)
        );

        return Result<AuthResponse>.Success(response);
    }
}

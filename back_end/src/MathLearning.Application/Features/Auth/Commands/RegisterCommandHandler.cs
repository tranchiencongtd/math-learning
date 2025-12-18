using AutoMapper;
using MathLearning.Application.Common.Interfaces;
using MathLearning.Application.Common.Models;
using MathLearning.Application.Features.Auth.DTOs;
using MathLearning.Domain.Entities;
using MathLearning.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace MathLearning.Application.Features.Auth.Commands;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result<AuthResponse>>
{
    private readonly IApplicationDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly IEmailService _emailService;
    private readonly IMapper _mapper;

    public RegisterCommandHandler(
        IApplicationDbContext context,
        ITokenService tokenService,
        IEmailService emailService,
        IMapper mapper)
    {
        _context = context;
        _tokenService = tokenService;
        _emailService = emailService;
        _mapper = mapper;
    }

    public async Task<Result<AuthResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        // Check if email exists
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (existingUser != null)
        {
            return Result<AuthResponse>.Failure("Email is already registered.");
        }

        // Create new user
        var user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Role = UserRole.Student,
            LastLoginAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync(cancellationToken);

        // Send welcome email
        await _emailService.SendWelcomeEmailAsync(user.Email, user.FullName);

        // Generate tokens
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

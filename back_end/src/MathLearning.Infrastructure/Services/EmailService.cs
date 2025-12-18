using MathLearning.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MathLearning.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendEmailAsync(string to, string subject, string body, bool isHtml = true)
    {
        // In production, implement with actual email service (SendGrid, SMTP, etc.)
        _logger.LogInformation("Sending email to {To}: {Subject}", to, subject);
        await Task.CompletedTask;
    }

    public async Task SendWelcomeEmailAsync(string to, string userName)
    {
        var subject = "Chào mừng bạn đến với MathLearning!";
        var body = $@"
            <h1>Xin chào {userName}!</h1>
            <p>Cảm ơn bạn đã đăng ký tài khoản MathLearning.</p>
            <p>Hãy bắt đầu hành trình học tập của bạn ngay hôm nay!</p>
        ";
        await SendEmailAsync(to, subject, body);
    }

    public async Task SendPasswordResetEmailAsync(string to, string resetToken)
    {
        var subject = "Đặt lại mật khẩu";
        var resetUrl = $"{_configuration["App:ClientUrl"]}/reset-password?token={resetToken}";
        var body = $@"
            <h1>Đặt lại mật khẩu</h1>
            <p>Bạn đã yêu cầu đặt lại mật khẩu. Click vào link bên dưới:</p>
            <a href='{resetUrl}'>Đặt lại mật khẩu</a>
            <p>Link này sẽ hết hạn sau 1 giờ.</p>
        ";
        await SendEmailAsync(to, subject, body);
    }

    public async Task SendEnrollmentConfirmationEmailAsync(string to, string userName, string courseName)
    {
        var subject = $"Xác nhận đăng ký khóa học: {courseName}";
        var body = $@"
            <h1>Chúc mừng {userName}!</h1>
            <p>Bạn đã đăng ký thành công khóa học: <strong>{courseName}</strong></p>
            <p>Hãy bắt đầu học ngay!</p>
        ";
        await SendEmailAsync(to, subject, body);
    }

    public async Task SendCertificateEmailAsync(string to, string userName, string courseName, string certificateUrl)
    {
        var subject = $"Chứng chỉ hoàn thành khóa học: {courseName}";
        var body = $@"
            <h1>Chúc mừng {userName}!</h1>
            <p>Bạn đã hoàn thành xuất sắc khóa học: <strong>{courseName}</strong></p>
            <p>Tải chứng chỉ của bạn: <a href='{certificateUrl}'>Tải xuống</a></p>
        ";
        await SendEmailAsync(to, subject, body);
    }
}

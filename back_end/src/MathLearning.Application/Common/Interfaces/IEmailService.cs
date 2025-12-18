namespace MathLearning.Application.Common.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body, bool isHtml = true);
    Task SendWelcomeEmailAsync(string to, string userName);
    Task SendPasswordResetEmailAsync(string to, string resetToken);
    Task SendEnrollmentConfirmationEmailAsync(string to, string userName, string courseName);
    Task SendCertificateEmailAsync(string to, string userName, string courseName, string certificateUrl);
}

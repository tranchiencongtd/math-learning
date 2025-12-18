using MathLearning.Domain.Enums;

namespace MathLearning.Application.Common.Interfaces;

public interface IPaymentService
{
    Task<PaymentResult> ProcessPaymentAsync(PaymentRequest request);
    Task<PaymentResult> VerifyPaymentAsync(string transactionId, PaymentMethod method);
    Task<bool> RefundPaymentAsync(string transactionId, decimal amount);
}

public record PaymentRequest(
    decimal Amount,
    string Currency,
    PaymentMethod Method,
    string CustomerEmail,
    string Description,
    string ReturnUrl,
    string CancelUrl
);

public record PaymentResult(
    bool Success,
    string? TransactionId,
    string? PaymentUrl,
    string? ErrorMessage
);

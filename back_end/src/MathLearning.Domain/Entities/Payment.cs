using MathLearning.Domain.Common;
using MathLearning.Domain.Enums;

namespace MathLearning.Domain.Entities;

public class Payment : BaseEntity, IAuditableEntity
{
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "VND";
    public PaymentMethod Method { get; set; }
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public string? TransactionId { get; set; }
    public string? PaymentGatewayResponse { get; set; }
    public DateTime? PaidAt { get; set; }
    public string? CouponCode { get; set; }
    public decimal? DiscountAmount { get; set; }

    // Foreign keys
    public Guid EnrollmentId { get; set; }

    // Navigation properties
    public virtual Enrollment Enrollment { get; set; } = null!;
}

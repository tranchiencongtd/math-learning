using MathLearning.Domain.Common;
using MathLearning.Domain.Enums;

namespace MathLearning.Domain.Entities;

public class Coupon : BaseEntity, IAuditableEntity
{
    public string Code { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DiscountType DiscountType { get; set; } = DiscountType.Percentage;
    public decimal DiscountValue { get; set; }
    public decimal? MinPurchaseAmount { get; set; }
    public decimal? MaxDiscountAmount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? UsageLimit { get; set; }
    public int UsageCount { get; set; } = 0;
    public bool IsActive { get; set; } = true;

    // Optional: Apply to specific course
    public Guid? CourseId { get; set; }
}

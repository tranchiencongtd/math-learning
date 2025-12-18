using MathLearning.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MathLearning.Infrastructure.Persistence.Configurations;

public class CouponConfiguration : IEntityTypeConfiguration<Coupon>
{
    public void Configure(EntityTypeBuilder<Coupon> builder)
    {
        builder.ToTable("coupons");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Code)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(c => c.Code)
            .IsUnique();

        builder.Property(c => c.Description)
            .HasMaxLength(500);

        builder.Property(c => c.DiscountType)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.DiscountValue)
            .HasPrecision(18, 2);

        builder.Property(c => c.MinPurchaseAmount)
            .HasPrecision(18, 2);

        builder.Property(c => c.MaxDiscountAmount)
            .HasPrecision(18, 2);

        builder.HasQueryFilter(c => !c.IsDeleted);
    }
}

using MathLearning.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MathLearning.Infrastructure.Persistence.Configurations;

public class CertificateConfiguration : IEntityTypeConfiguration<Certificate>
{
    public void Configure(EntityTypeBuilder<Certificate> builder)
    {
        builder.ToTable("certificates");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.CertificateNumber)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(c => c.CertificateNumber)
            .IsUnique();

        builder.Property(c => c.CertificateUrl)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(c => c.CourseName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(c => c.StudentName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.InstructorName)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasOne(c => c.User)
            .WithMany(u => u.Certificates)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasQueryFilter(c => !c.IsDeleted);
    }
}

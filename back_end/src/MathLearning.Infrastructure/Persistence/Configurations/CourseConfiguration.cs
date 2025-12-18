using MathLearning.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MathLearning.Infrastructure.Persistence.Configurations;

public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.ToTable("courses");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(c => c.Slug)
            .IsRequired()
            .HasMaxLength(250);

        builder.HasIndex(c => c.Slug)
            .IsUnique();

        builder.Property(c => c.Description)
            .IsRequired();

        builder.Property(c => c.ShortDescription)
            .HasMaxLength(500);

        builder.Property(c => c.ThumbnailUrl)
            .HasMaxLength(500);

        builder.Property(c => c.PreviewVideoUrl)
            .HasMaxLength(500);

        builder.Property(c => c.Price)
            .HasPrecision(18, 2);

        builder.Property(c => c.DiscountPrice)
            .HasPrecision(18, 2);

        builder.Property(c => c.Level)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.Status)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(c => c.Language)
            .HasMaxLength(50);

        builder.Property(c => c.AverageRating)
            .HasPrecision(3, 2);

        builder.HasOne(c => c.Instructor)
            .WithMany(u => u.InstructorCourses)
            .HasForeignKey(c => c.InstructorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(c => c.Category)
            .WithMany(cat => cat.Courses)
            .HasForeignKey(c => c.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasQueryFilter(c => !c.IsDeleted);
    }
}

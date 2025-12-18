using MathLearning.Application.Common.Interfaces;
using MathLearning.Domain.Common;
using MathLearning.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace MathLearning.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    private readonly ICurrentUserService _currentUserService;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        ICurrentUserService currentUserService) : base(options)
    {
        _currentUserService = currentUserService;
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Course> Courses => Set<Course>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Section> Sections => Set<Section>();
    public DbSet<Lesson> Lessons => Set<Lesson>();
    public DbSet<Enrollment> Enrollments => Set<Enrollment>();
    public DbSet<LessonProgress> LessonProgresses => Set<LessonProgress>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Certificate> Certificates => Set<Certificate>();
    public DbSet<Tag> Tags => Set<Tag>();
    public DbSet<CourseTag> CourseTags => Set<CourseTag>();
    public DbSet<Coupon> Coupons => Set<Coupon>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    if (entry.Entity is IAuditableEntity addedAuditableEntity)
                    {
                        addedAuditableEntity.CreatedAt = DateTime.UtcNow;
                        addedAuditableEntity.CreatedBy = _currentUserService.UserId?.ToString();
                    }
                    break;
                case EntityState.Modified:
                    if (entry.Entity is IAuditableEntity modifiedAuditableEntity)
                    {
                        modifiedAuditableEntity.UpdatedAt = DateTime.UtcNow;
                        modifiedAuditableEntity.UpdatedBy = _currentUserService.UserId?.ToString();
                    }
                    break;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}

using MathLearning.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MathLearning.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<Course> Courses { get; }
    DbSet<Category> Categories { get; }
    DbSet<Section> Sections { get; }
    DbSet<Lesson> Lessons { get; }
    DbSet<Enrollment> Enrollments { get; }
    DbSet<LessonProgress> LessonProgresses { get; }
    DbSet<Review> Reviews { get; }
    DbSet<Payment> Payments { get; }
    DbSet<Certificate> Certificates { get; }
    DbSet<Tag> Tags { get; }
    DbSet<CourseTag> CourseTags { get; }
    DbSet<Coupon> Coupons { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}

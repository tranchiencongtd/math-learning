using MathLearning.Domain.Common;

namespace MathLearning.Domain.Entities;

public class Category : BaseEntity, IAuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? IconUrl { get; set; }
    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;

    // Self-referencing for subcategories
    public Guid? ParentCategoryId { get; set; }
    public virtual Category? ParentCategory { get; set; }
    public virtual ICollection<Category> SubCategories { get; set; } = new List<Category>();

    // Navigation properties
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}

using AutoMapper;
using MathLearning.Application.Common.Interfaces;
using MathLearning.Application.Features.Courses.DTOs;
using MathLearning.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace MathLearning.Application.Features.Courses.Queries;

public class GetCourseBySlugQueryHandler : IRequestHandler<GetCourseBySlugQuery, CourseDetailDto?>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCourseBySlugQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CourseDetailDto?> Handle(GetCourseBySlugQuery request, CancellationToken cancellationToken)
    {
        var course = await _context.Courses
            .Include(c => c.Instructor)
            .Include(c => c.Category)
            .Include(c => c.Sections.OrderBy(s => s.DisplayOrder))
                .ThenInclude(s => s.Lessons.OrderBy(l => l.DisplayOrder))
            .Include(c => c.CourseTags)
                .ThenInclude(ct => ct.Tag)
            .FirstOrDefaultAsync(c => 
                c.Slug == request.Slug && 
                c.Status == CourseStatus.Published && 
                !c.IsDeleted, cancellationToken);

        if (course == null) return null;

        var dto = _mapper.Map<CourseDetailDto>(course);
        return dto with 
        { 
            Tags = course.CourseTags.Select(ct => ct.Tag.Name).ToList() 
        };
    }
}

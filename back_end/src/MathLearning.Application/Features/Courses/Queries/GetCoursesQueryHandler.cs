using AutoMapper;
using AutoMapper.QueryableExtensions;
using MathLearning.Application.Common.Interfaces;
using MathLearning.Application.Common.Models;
using MathLearning.Application.Features.Courses.DTOs;
using MathLearning.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace MathLearning.Application.Features.Courses.Queries;

public class GetCoursesQueryHandler : IRequestHandler<GetCoursesQuery, PaginatedList<CourseDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCoursesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<CourseDto>> Handle(GetCoursesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Courses
            .Include(c => c.Instructor)
            .Include(c => c.Category)
            .Where(c => c.Status == CourseStatus.Published && !c.IsDeleted)
            .AsQueryable();

        // Apply filters
        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var searchTerm = request.SearchTerm.ToLower();
            query = query.Where(c => 
                c.Title.ToLower().Contains(searchTerm) || 
                c.Description.ToLower().Contains(searchTerm));
        }

        if (request.CategoryId.HasValue)
        {
            query = query.Where(c => c.CategoryId == request.CategoryId.Value);
        }

        if (request.Level.HasValue)
        {
            query = query.Where(c => c.Level == request.Level.Value);
        }

        if (request.MinPrice.HasValue)
        {
            query = query.Where(c => (c.DiscountPrice ?? c.Price) >= request.MinPrice.Value);
        }

        if (request.MaxPrice.HasValue)
        {
            query = query.Where(c => (c.DiscountPrice ?? c.Price) <= request.MaxPrice.Value);
        }

        if (request.MinRating.HasValue)
        {
            query = query.Where(c => c.AverageRating >= request.MinRating.Value);
        }

        if (request.IsFeatured.HasValue)
        {
            query = query.Where(c => c.IsFeatured == request.IsFeatured.Value);
        }

        // Apply sorting
        query = request.SortBy?.ToLower() switch
        {
            "popular" => query.OrderByDescending(c => c.TotalStudents),
            "rating" => query.OrderByDescending(c => c.AverageRating),
            "price-low" => query.OrderBy(c => c.DiscountPrice ?? c.Price),
            "price-high" => query.OrderByDescending(c => c.DiscountPrice ?? c.Price),
            _ => query.OrderByDescending(c => c.CreatedAt)
        };

        return await PaginatedList<CourseDto>.CreateAsync(
            query.ProjectTo<CourseDto>(_mapper.ConfigurationProvider),
            request.PageNumber,
            request.PageSize,
            cancellationToken);
    }
}

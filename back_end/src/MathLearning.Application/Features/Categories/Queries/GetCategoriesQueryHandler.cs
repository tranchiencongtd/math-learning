using AutoMapper;
using MathLearning.Application.Common.Interfaces;
using MathLearning.Application.Features.Categories.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace MathLearning.Application.Features.Categories.Queries;

public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, List<CategoryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<CategoryDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _context.Categories
            .Where(c => c.IsActive && !c.IsDeleted && c.ParentCategoryId == null)
            .OrderBy(c => c.DisplayOrder)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<CategoryDto>>(categories);
    }
}

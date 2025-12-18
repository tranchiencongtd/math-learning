using AutoMapper;
using MathLearning.Application.Features.Auth.DTOs;
using MathLearning.Application.Features.Categories.DTOs;
using MathLearning.Application.Features.Courses.DTOs;
using MathLearning.Domain.Entities;

namespace MathLearning.Application.Common.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User mappings
        CreateMap<User, UserDto>();

        // Category mappings
        CreateMap<Category, CategoryDto>();
        CreateMap<Category, CategoryDetailDto>()
            .ForMember(dest => dest.CoursesCount, opt => opt.MapFrom(src => src.Courses.Count));

        // Course mappings
        CreateMap<Course, CourseDto>()
            .ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.FullName))
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));

        CreateMap<Course, CourseDetailDto>()
            .ForMember(dest => dest.InstructorName, opt => opt.MapFrom(src => src.Instructor.FullName))
            .ForMember(dest => dest.InstructorAvatar, opt => opt.MapFrom(src => src.Instructor.AvatarUrl))
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.Sections, opt => opt.MapFrom(src => src.Sections.OrderBy(s => s.DisplayOrder)));

        // Section mappings
        CreateMap<Section, SectionDto>()
            .ForMember(dest => dest.Lessons, opt => opt.MapFrom(src => src.Lessons.OrderBy(l => l.DisplayOrder)));

        // Lesson mappings
        CreateMap<Lesson, LessonDto>();

        // Review mappings
        CreateMap<Review, ReviewDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.FullName))
            .ForMember(dest => dest.UserAvatar, opt => opt.MapFrom(src => src.User.AvatarUrl));
    }
}

using MathLearning.Domain.Entities;
using MathLearning.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MathLearning.Infrastructure.Persistence;

public static class SeedData
{
    public static async Task SeedAsync(ApplicationDbContext context, ILogger logger)
    {
        try
        {
            await SeedCategoriesAsync(context);
            await SeedUsersAsync(context);
            await SeedCoursesAsync(context);
            await SeedTagsAsync(context);
            await SeedReviewsAsync(context);

            logger.LogInformation("Seed data completed successfully.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    private static async Task SeedCategoriesAsync(ApplicationDbContext context)
    {
        if (await context.Categories.AnyAsync()) return;

        var categories = new List<Category>
        {
            // Parent Categories
            new Category
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Name = "Toán Cơ Bản",
                Slug = "toan-co-ban",
                Description = "Các khóa học toán cơ bản cho học sinh từ lớp 1 đến lớp 5",
                IconUrl = "https://img.icons8.com/color/96/calculator.png",
                DisplayOrder = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Name = "Toán Trung Học",
                Slug = "toan-trung-hoc",
                Description = "Các khóa học toán cho học sinh THCS và THPT",
                IconUrl = "https://img.icons8.com/color/96/math.png",
                DisplayOrder = 2,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Name = "Toán Đại Học",
                Slug = "toan-dai-hoc",
                Description = "Các khóa học toán cao cấp cho sinh viên đại học",
                IconUrl = "https://img.icons8.com/color/96/university.png",
                DisplayOrder = 3,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                Name = "Luyện Thi",
                Slug = "luyen-thi",
                Description = "Các khóa học luyện thi đại học, học sinh giỏi",
                IconUrl = "https://img.icons8.com/color/96/test-passed.png",
                DisplayOrder = 4,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },

            // Sub Categories - Toán Cơ Bản
            new Category
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111112"),
                Name = "Số Học",
                Slug = "so-hoc",
                Description = "Học về các con số và phép tính cơ bản",
                ParentCategoryId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                DisplayOrder = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111113"),
                Name = "Hình Học Cơ Bản",
                Slug = "hinh-hoc-co-ban",
                Description = "Học về các hình học cơ bản",
                ParentCategoryId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                DisplayOrder = 2,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },

            // Sub Categories - Toán Trung Học
            new Category
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222221"),
                Name = "Đại Số",
                Slug = "dai-so",
                Description = "Các khóa học về đại số",
                ParentCategoryId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                DisplayOrder = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222223"),
                Name = "Hình Học",
                Slug = "hinh-hoc",
                Description = "Các khóa học về hình học",
                ParentCategoryId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                DisplayOrder = 2,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222224"),
                Name = "Giải Tích",
                Slug = "giai-tich",
                Description = "Các khóa học về giải tích",
                ParentCategoryId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                DisplayOrder = 3,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },

            // Sub Categories - Toán Đại Học
            new Category
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333331"),
                Name = "Giải Tích 1",
                Slug = "giai-tich-1",
                Description = "Giải tích một biến",
                ParentCategoryId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                DisplayOrder = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333332"),
                Name = "Đại Số Tuyến Tính",
                Slug = "dai-so-tuyen-tinh",
                Description = "Ma trận, định thức, không gian vector",
                ParentCategoryId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                DisplayOrder = 2,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new Category
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333334"),
                Name = "Xác Suất Thống Kê",
                Slug = "xac-suat-thong-ke",
                Description = "Xác suất và thống kê ứng dụng",
                ParentCategoryId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                DisplayOrder = 3,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Categories.AddRangeAsync(categories);
        await context.SaveChangesAsync();
    }

    private static async Task SeedUsersAsync(ApplicationDbContext context)
    {
        if (await context.Users.AnyAsync()) return;

        // Password: "Password123!" - hashed with BCrypt
        var passwordHash = BCrypt.Net.BCrypt.HashPassword("Password123!");

        var users = new List<User>
        {
            // Admin
            new User
            {
                Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                Email = "admin@mathlearning.com",
                PasswordHash = passwordHash,
                FirstName = "Admin",
                LastName = "System",
                Role = UserRole.Admin,
                IsEmailVerified = true,
                AvatarUrl = "https://ui-avatars.com/api/?name=Admin+System&background=6366f1&color=fff",
                Bio = "Quản trị viên hệ thống",
                CreatedAt = DateTime.UtcNow
            },

            // Instructors
            new User
            {
                Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                Email = "nguyenvana@mathlearning.com",
                PasswordHash = passwordHash,
                FirstName = "Văn A",
                LastName = "Nguyễn",
                Role = UserRole.Instructor,
                IsEmailVerified = true,
                AvatarUrl = "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=10b981&color=fff",
                Bio = "Thạc sĩ Toán học, 10 năm kinh nghiệm giảng dạy. Chuyên gia về Giải tích và Đại số.",
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Id = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                Email = "tranthib@mathlearning.com",
                PasswordHash = passwordHash,
                FirstName = "Thị B",
                LastName = "Trần",
                Role = UserRole.Instructor,
                IsEmailVerified = true,
                AvatarUrl = "https://ui-avatars.com/api/?name=Tran+Thi+B&background=f59e0b&color=fff",
                Bio = "Tiến sĩ Toán học, giảng viên Đại học Bách Khoa. Chuyên gia về Xác suất thống kê.",
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Id = Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                Email = "levanc@mathlearning.com",
                PasswordHash = passwordHash,
                FirstName = "Văn C",
                LastName = "Lê",
                Role = UserRole.Instructor,
                IsEmailVerified = true,
                AvatarUrl = "https://ui-avatars.com/api/?name=Le+Van+C&background=ef4444&color=fff",
                Bio = "Giáo viên Toán THPT chuyên, nhiều năm kinh nghiệm luyện thi đại học và học sinh giỏi.",
                CreatedAt = DateTime.UtcNow
            },

            // Students
            new User
            {
                Id = Guid.Parse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                Email = "student1@gmail.com",
                PasswordHash = passwordHash,
                FirstName = "Minh",
                LastName = "Phạm",
                Role = UserRole.Student,
                IsEmailVerified = true,
                AvatarUrl = "https://ui-avatars.com/api/?name=Pham+Minh&background=8b5cf6&color=fff",
                Bio = "Học sinh lớp 12, đam mê toán học",
                CreatedAt = DateTime.UtcNow
            },
            new User
            {
                Id = Guid.Parse("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                Email = "student2@gmail.com",
                PasswordHash = passwordHash,
                FirstName = "Hương",
                LastName = "Hoàng",
                Role = UserRole.Student,
                IsEmailVerified = true,
                AvatarUrl = "https://ui-avatars.com/api/?name=Hoang+Huong&background=ec4899&color=fff",
                Bio = "Sinh viên năm 2, Đại học Bách Khoa",
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Users.AddRangeAsync(users);
        await context.SaveChangesAsync();
    }

    private static async Task SeedCoursesAsync(ApplicationDbContext context)
    {
        if (await context.Courses.AnyAsync()) return;

        var instructorId1 = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
        var instructorId2 = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc");
        var instructorId3 = Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd");

        var courses = new List<Course>
        {
            // Course 1: Giải Tích 12
            new Course
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                Title = "Giải Tích 12 - Từ Cơ Bản Đến Nâng Cao",
                Slug = "giai-tich-12-tu-co-ban-den-nang-cao",
                Description = "Khóa học Giải tích 12 đầy đủ nhất, bao gồm: Ứng dụng đạo hàm, Nguyên hàm - Tích phân, Số phức. Phù hợp cho học sinh lớp 12 chuẩn bị thi THPT Quốc gia.",
                ShortDescription = "Khóa học Giải tích 12 toàn diện cho kỳ thi THPT Quốc gia",
                ThumbnailUrl = "https://img.youtube.com/vi/WUvTyaaNkzM/maxresdefault.jpg",
                PreviewVideoUrl = "https://www.youtube.com/watch?v=WUvTyaaNkzM",
                Price = 599000,
                DiscountPrice = 399000,
                Level = CourseLevel.Intermediate,
                Status = CourseStatus.Published,
                Language = "Vietnamese",
                DurationInMinutes = 1800,
                Requirements = "Kiến thức Toán lớp 11, Đạo hàm cơ bản",
                WhatYouWillLearn = "Nắm vững lý thuyết Giải tích 12|Giải thành thạo các dạng bài tập|Tự tin làm bài thi THPT Quốc gia|Phương pháp giải nhanh trắc nghiệm",
                TargetAudience = "Học sinh lớp 12|Học sinh ôn thi THPT Quốc gia|Người muốn củng cố kiến thức Giải tích",
                IsFeatured = true,
                AverageRating = 4.8,
                TotalStudents = 1250,
                TotalReviews = 89,
                InstructorId = instructorId1,
                CategoryId = Guid.Parse("22222222-2222-2222-2222-222222222224"),
                CreatedAt = DateTime.UtcNow
            },

            // Course 2: Đại Số Tuyến Tính
            new Course
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                Title = "Đại Số Tuyến Tính - Toàn Tập",
                Slug = "dai-so-tuyen-tinh-toan-tap",
                Description = "Khóa học Đại số tuyến tính đầy đủ cho sinh viên đại học. Bao gồm: Ma trận, Định thức, Hệ phương trình tuyến tính, Không gian vector, Giá trị riêng và Vector riêng.",
                ShortDescription = "Đại số tuyến tính từ A-Z cho sinh viên",
                ThumbnailUrl = "https://img.youtube.com/vi/fNk_zzaMoSs/maxresdefault.jpg",
                PreviewVideoUrl = "https://www.youtube.com/watch?v=fNk_zzaMoSs",
                Price = 799000,
                DiscountPrice = 549000,
                Level = CourseLevel.Intermediate,
                Status = CourseStatus.Published,
                Language = "Vietnamese",
                DurationInMinutes = 2400,
                Requirements = "Kiến thức Toán THPT, Ma trận cơ bản",
                WhatYouWillLearn = "Hiểu sâu về Ma trận và Định thức|Giải hệ phương trình tuyến tính|Nắm vững không gian Vector|Tính giá trị riêng, vector riêng",
                TargetAudience = "Sinh viên đại học năm 1-2|Sinh viên các ngành kỹ thuật|Người cần học Đại số tuyến tính",
                IsFeatured = true,
                AverageRating = 4.9,
                TotalStudents = 856,
                TotalReviews = 67,
                InstructorId = instructorId2,
                CategoryId = Guid.Parse("33333333-3333-3333-3333-333333333332"),
                CreatedAt = DateTime.UtcNow
            },

            // Course 3: Hình Học 10
            new Course
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000003"),
                Title = "Hình Học 10 - Vector và Tọa Độ",
                Slug = "hinh-hoc-10-vector-va-toa-do",
                Description = "Khóa học Hình học 10 chuyên sâu về Vector và Phương pháp tọa độ trong mặt phẳng. Giúp học sinh nắm vững nền tảng cho các năm học tiếp theo.",
                ShortDescription = "Hình học 10 với Vector và Tọa độ",
                ThumbnailUrl = "https://img.youtube.com/vi/k7RM-ot2NWY/maxresdefault.jpg",
                PreviewVideoUrl = "https://www.youtube.com/watch?v=k7RM-ot2NWY",
                Price = 399000,
                DiscountPrice = 299000,
                Level = CourseLevel.Beginner,
                Status = CourseStatus.Published,
                Language = "Vietnamese",
                DurationInMinutes = 1200,
                Requirements = "Kiến thức Toán lớp 9",
                WhatYouWillLearn = "Hiểu về Vector và các phép toán|Phương pháp tọa độ trong mặt phẳng|Phương trình đường thẳng, đường tròn|Giải các bài toán hình học bằng tọa độ",
                TargetAudience = "Học sinh lớp 10|Học sinh chuẩn bị lên lớp 10|Phụ huynh muốn dạy kèm con",
                IsFeatured = false,
                AverageRating = 4.7,
                TotalStudents = 2100,
                TotalReviews = 156,
                InstructorId = instructorId3,
                CategoryId = Guid.Parse("22222222-2222-2222-2222-222222222223"),
                CreatedAt = DateTime.UtcNow
            },

            // Course 4: Xác Suất Thống Kê
            new Course
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000004"),
                Title = "Xác Suất Thống Kê Ứng Dụng",
                Slug = "xac-suat-thong-ke-ung-dung",
                Description = "Khóa học Xác suất thống kê cho sinh viên đại học và người đi làm. Ứng dụng trong phân tích dữ liệu, Machine Learning và các lĩnh vực khác.",
                ShortDescription = "Xác suất thống kê cho Data Science",
                ThumbnailUrl = "https://img.youtube.com/vi/uzkc-qNVoOk/maxresdefault.jpg",
                PreviewVideoUrl = "https://www.youtube.com/watch?v=uzkc-qNVoOk",
                Price = 899000,
                DiscountPrice = 649000,
                Level = CourseLevel.Advanced,
                Status = CourseStatus.Published,
                Language = "Vietnamese",
                DurationInMinutes = 3000,
                Requirements = "Giải tích cơ bản, Đại số tuyến tính cơ bản",
                WhatYouWillLearn = "Lý thuyết xác suất cơ bản và nâng cao|Các phân phối xác suất quan trọng|Ước lượng và kiểm định giả thuyết|Ứng dụng trong Data Science",
                TargetAudience = "Sinh viên đại học|Data Analyst, Data Scientist|Người muốn học Machine Learning",
                IsFeatured = true,
                AverageRating = 4.6,
                TotalStudents = 678,
                TotalReviews = 45,
                InstructorId = instructorId2,
                CategoryId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                CreatedAt = DateTime.UtcNow
            },

            // Course 5: Luyện Thi THPT Quốc Gia
            new Course
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000005"),
                Title = "Luyện Thi THPT Quốc Gia - Toán Học",
                Slug = "luyen-thi-thpt-quoc-gia-toan-hoc",
                Description = "Khóa học luyện thi THPT Quốc gia môn Toán toàn diện. Bao gồm tất cả chuyên đề từ lớp 10-12, phương pháp giải nhanh, đề thi thử và chữa đề chi tiết.",
                ShortDescription = "Luyện thi THPT QG môn Toán toàn diện",
                ThumbnailUrl = "https://img.youtube.com/vi/pTnEG_WGd2Q/maxresdefault.jpg",
                PreviewVideoUrl = "https://www.youtube.com/watch?v=pTnEG_WGd2Q",
                Price = 1299000,
                DiscountPrice = 899000,
                Level = CourseLevel.AllLevels,
                Status = CourseStatus.Published,
                Language = "Vietnamese",
                DurationInMinutes = 6000,
                Requirements = "Kiến thức Toán THPT cơ bản",
                WhatYouWillLearn = "Ôn tập toàn bộ kiến thức Toán THPT|Phương pháp giải nhanh trắc nghiệm|Chiến thuật làm bài thi|Đạt 8+ điểm thi THPT Quốc gia",
                TargetAudience = "Học sinh lớp 12|Học sinh ôn thi lại|Học sinh muốn cải thiện điểm Toán",
                IsFeatured = true,
                AverageRating = 4.9,
                TotalStudents = 3500,
                TotalReviews = 234,
                InstructorId = instructorId3,
                CategoryId = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                CreatedAt = DateTime.UtcNow
            },

            // Course 6: Toán Tư Duy Cho Bé
            new Course
            {
                Id = Guid.Parse("10000000-0000-0000-0000-000000000006"),
                Title = "Toán Tư Duy Cho Bé 6-8 Tuổi",
                Slug = "toan-tu-duy-cho-be-6-8-tuoi",
                Description = "Khóa học Toán tư duy dành cho trẻ em 6-8 tuổi. Phát triển tư duy logic, khả năng giải quyết vấn đề thông qua các bài toán vui nhộn và trò chơi.",
                ShortDescription = "Phát triển tư duy Toán cho bé",
                ThumbnailUrl = "https://img.youtube.com/vi/pTnEG_WGd2Q/maxresdefault.jpg",
                PreviewVideoUrl = "https://www.youtube.com/watch?v=wE5xtxXnhgU",
                Price = 299000,
                DiscountPrice = 199000,
                Level = CourseLevel.Beginner,
                Status = CourseStatus.Published,
                Language = "Vietnamese",
                DurationInMinutes = 600,
                Requirements = "Không yêu cầu kiến thức trước",
                WhatYouWillLearn = "Phát triển tư duy logic|Làm quen với số và phép tính|Giải các bài toán đố vui|Yêu thích môn Toán",
                TargetAudience = "Trẻ em 6-8 tuổi|Phụ huynh muốn dạy con|Giáo viên mầm non, tiểu học",
                IsFeatured = false,
                AverageRating = 4.8,
                TotalStudents = 1890,
                TotalReviews = 178,
                InstructorId = instructorId1,
                CategoryId = Guid.Parse("11111111-1111-1111-1111-111111111112"),
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Courses.AddRangeAsync(courses);
        await context.SaveChangesAsync();

        // Seed Sections and Lessons for Course 1 (Giải Tích 12)
        await SeedSectionsAndLessonsAsync(context);
    }

    private static async Task SeedSectionsAndLessonsAsync(ApplicationDbContext context)
    {
        if (await context.Sections.AnyAsync()) return;

        var courseId1 = Guid.Parse("10000000-0000-0000-0000-000000000001");

        var sections = new List<Section>
        {
            // Section 1
            new Section
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                Title = "Chương 1: Ứng Dụng Đạo Hàm",
                Description = "Tìm hiểu về ứng dụng của đạo hàm trong khảo sát hàm số",
                DisplayOrder = 1,
                DurationInMinutes = 300,
                CourseId = courseId1,
                CreatedAt = DateTime.UtcNow
            },
            // Section 2
            new Section
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                Title = "Chương 2: Nguyên Hàm - Tích Phân",
                Description = "Học về nguyên hàm, tích phân và ứng dụng",
                DisplayOrder = 2,
                DurationInMinutes = 400,
                CourseId = courseId1,
                CreatedAt = DateTime.UtcNow
            },
            // Section 3
            new Section
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000003"),
                Title = "Chương 3: Số Phức",
                Description = "Tìm hiểu về số phức và các phép toán",
                DisplayOrder = 3,
                DurationInMinutes = 250,
                CourseId = courseId1,
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Sections.AddRangeAsync(sections);
        await context.SaveChangesAsync();

        // Seed Lessons
        var lessons = new List<Lesson>
        {
            // Section 1 Lessons
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000001"),
                Title = "Bài 1: Sự đồng biến, nghịch biến của hàm số",
                Description = "Tìm hiểu về tính đơn điệu của hàm số",
                Content = "Trong bài học này, chúng ta sẽ học về cách xác định tính đồng biến, nghịch biến của hàm số thông qua dấu của đạo hàm.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=WUvTyaaNkzM",
                DurationInMinutes = 25,
                DisplayOrder = 1,
                IsFreePreview = true,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                CreatedAt = DateTime.UtcNow
            },
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000002"),
                Title = "Bài 2: Cực trị của hàm số",
                Description = "Học cách tìm cực đại, cực tiểu của hàm số",
                Content = "Bài học về định nghĩa và cách tìm cực trị của hàm số.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=QE5SuZ4YZ4o",
                DurationInMinutes = 30,
                DisplayOrder = 2,
                IsFreePreview = false,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                CreatedAt = DateTime.UtcNow
            },
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000003"),
                Title = "Bài 3: Giá trị lớn nhất, nhỏ nhất của hàm số",
                Description = "Phương pháp tìm GTLN, GTNN",
                Content = "Học cách tìm giá trị lớn nhất, nhỏ nhất của hàm số trên một đoạn.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=UxVbDJ3ERas",
                DurationInMinutes = 35,
                DisplayOrder = 3,
                IsFreePreview = false,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                CreatedAt = DateTime.UtcNow
            },
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000004"),
                Title = "Bài 4: Đường tiệm cận",
                Description = "Tìm hiểu về đường tiệm cận đứng và tiệm cận ngang",
                Content = "Định nghĩa và cách tìm đường tiệm cận của đồ thị hàm số.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=5vkfMFJLIIo",
                DurationInMinutes = 28,
                DisplayOrder = 4,
                IsFreePreview = false,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                CreatedAt = DateTime.UtcNow
            },
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000005"),
                Title = "Bài tập: Ứng dụng đạo hàm",
                Description = "Bài tập tổng hợp chương 1",
                Content = "Các bài tập từ cơ bản đến nâng cao về ứng dụng đạo hàm.",
                Type = LessonType.Quiz,
                DurationInMinutes = 45,
                DisplayOrder = 5,
                IsFreePreview = false,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                CreatedAt = DateTime.UtcNow
            },

            // Section 2 Lessons
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000006"),
                Title = "Bài 1: Nguyên hàm",
                Description = "Khái niệm và công thức nguyên hàm cơ bản",
                Content = "Định nghĩa nguyên hàm, các công thức nguyên hàm cơ bản.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=rfG8ce4nNh0",
                DurationInMinutes = 32,
                DisplayOrder = 1,
                IsFreePreview = true,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                CreatedAt = DateTime.UtcNow
            },
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000007"),
                Title = "Bài 2: Tích phân",
                Description = "Định nghĩa và tính chất của tích phân",
                Content = "Học về tích phân xác định và các tính chất quan trọng.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=rCWOdfQ3cwQ",
                DurationInMinutes = 40,
                DisplayOrder = 2,
                IsFreePreview = false,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                CreatedAt = DateTime.UtcNow
            },
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000008"),
                Title = "Bài 3: Phương pháp tính tích phân",
                Description = "Các phương pháp đổi biến và tích phân từng phần",
                Content = "Học các phương pháp tính tích phân nâng cao.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=H9eCT6f_Ftw",
                DurationInMinutes = 45,
                DisplayOrder = 3,
                IsFreePreview = false,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                CreatedAt = DateTime.UtcNow
            },
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000009"),
                Title = "Bài 4: Ứng dụng của tích phân",
                Description = "Tính diện tích, thể tích bằng tích phân",
                Content = "Ứng dụng tích phân trong tính diện tích hình phẳng và thể tích vật thể tròn xoay.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=7gigNsz4Oe8",
                DurationInMinutes = 38,
                DisplayOrder = 4,
                IsFreePreview = false,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                CreatedAt = DateTime.UtcNow
            },

            // Section 3 Lessons
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000010"),
                Title = "Bài 1: Số phức - Khái niệm cơ bản",
                Description = "Định nghĩa số phức, dạng đại số",
                Content = "Tìm hiểu về số phức, phần thực, phần ảo và dạng đại số.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=Z49hXoN7JWY",
                DurationInMinutes = 28,
                DisplayOrder = 1,
                IsFreePreview = true,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000003"),
                CreatedAt = DateTime.UtcNow
            },
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000011"),
                Title = "Bài 2: Các phép toán trên số phức",
                Description = "Cộng, trừ, nhân, chia số phức",
                Content = "Học các phép toán cơ bản với số phức.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=BZxZ_eEuJBM",
                DurationInMinutes = 35,
                DisplayOrder = 2,
                IsFreePreview = false,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000003"),
                CreatedAt = DateTime.UtcNow
            },
            new Lesson
            {
                Id = Guid.Parse("30000000-0000-0000-0000-000000000012"),
                Title = "Bài 3: Môđun và Argument của số phức",
                Description = "Biểu diễn hình học số phức",
                Content = "Tìm hiểu về môđun, argument và biểu diễn số phức trên mặt phẳng.",
                Type = LessonType.Video,
                VideoUrl = "https://www.youtube.com/watch?v=meNlOzdSz-w",
                DurationInMinutes = 32,
                DisplayOrder = 3,
                IsFreePreview = false,
                SectionId = Guid.Parse("20000000-0000-0000-0000-000000000003"),
                CreatedAt = DateTime.UtcNow
            }
        };

        await context.Lessons.AddRangeAsync(lessons);
        await context.SaveChangesAsync();
    }

    private static async Task SeedTagsAsync(ApplicationDbContext context)
    {
        if (await context.Tags.AnyAsync()) return;

        var tags = new List<Tag>
        {
            new Tag { Id = Guid.NewGuid(), Name = "Giải tích", Slug = "giai-tich", CreatedAt = DateTime.UtcNow },
            new Tag { Id = Guid.NewGuid(), Name = "Đại số", Slug = "dai-so", CreatedAt = DateTime.UtcNow },
            new Tag { Id = Guid.NewGuid(), Name = "Hình học", Slug = "hinh-hoc", CreatedAt = DateTime.UtcNow },
            new Tag { Id = Guid.NewGuid(), Name = "Luyện thi", Slug = "luyen-thi", CreatedAt = DateTime.UtcNow },
            new Tag { Id = Guid.NewGuid(), Name = "THPT Quốc gia", Slug = "thpt-quoc-gia", CreatedAt = DateTime.UtcNow },
            new Tag { Id = Guid.NewGuid(), Name = "Toán cao cấp", Slug = "toan-cao-cap", CreatedAt = DateTime.UtcNow },
            new Tag { Id = Guid.NewGuid(), Name = "Xác suất", Slug = "xac-suat", CreatedAt = DateTime.UtcNow },
            new Tag { Id = Guid.NewGuid(), Name = "Thống kê", Slug = "thong-ke", CreatedAt = DateTime.UtcNow },
            new Tag { Id = Guid.NewGuid(), Name = "Data Science", Slug = "data-science", CreatedAt = DateTime.UtcNow },
            new Tag { Id = Guid.NewGuid(), Name = "Toán tư duy", Slug = "toan-tu-duy", CreatedAt = DateTime.UtcNow }
        };

        await context.Tags.AddRangeAsync(tags);
        await context.SaveChangesAsync();
    }

    private static async Task SeedReviewsAsync(ApplicationDbContext context)
    {
        if (await context.Reviews.AnyAsync()) return;

        var studentId1 = Guid.Parse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee");
        var studentId2 = Guid.Parse("ffffffff-ffff-ffff-ffff-ffffffffffff");

        var reviews = new List<Review>
        {
            // Reviews for Course 1: Giải Tích 12 (each user only reviews once per course)
            new Review
            {
                Id = Guid.NewGuid(),
                Rating = 5,
                Comment = "Khóa học tuyệt vời! Thầy giảng rất dễ hiểu, có nhiều bài tập thực hành. Sau khóa học mình đã tự tin hơn rất nhiều khi làm bài thi.",
                IsApproved = true,
                HelpfulCount = 24,
                UserId = studentId1,
                CourseId = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                CreatedAt = DateTime.UtcNow.AddDays(-14)
            },
            new Review
            {
                Id = Guid.NewGuid(),
                Rating = 5,
                Comment = "Nội dung đầy đủ từ cơ bản đến nâng cao. Recommend cho ai muốn học Giải tích 12 từ đầu.",
                IsApproved = true,
                HelpfulCount = 18,
                UserId = studentId2,
                CourseId = Guid.Parse("10000000-0000-0000-0000-000000000001"),
                CreatedAt = DateTime.UtcNow.AddDays(-30)
            },

            // Reviews for Course 2: Đại Số Tuyến Tính
            new Review
            {
                Id = Guid.NewGuid(),
                Rating = 5,
                Comment = "Là sinh viên năm nhất, mình thấy khóa học này giúp mình hiểu rõ hơn rất nhiều so với học trên lớp. Cảm ơn cô!",
                IsApproved = true,
                HelpfulCount = 32,
                UserId = studentId2,
                CourseId = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                CreatedAt = DateTime.UtcNow.AddDays(-10)
            },
            new Review
            {
                Id = Guid.NewGuid(),
                Rating = 5,
                Comment = "Phần không gian vector và ánh xạ tuyến tính được giảng rất kỹ. Đáng đồng tiền bát gạo!",
                IsApproved = true,
                HelpfulCount = 28,
                UserId = studentId1,
                CourseId = Guid.Parse("10000000-0000-0000-0000-000000000002"),
                CreatedAt = DateTime.UtcNow.AddDays(-25)
            },

            // Reviews for Course 5: Luyện Thi THPT
            new Review
            {
                Id = Guid.NewGuid(),
                Rating = 5,
                Comment = "Mình đã tăng từ 6 điểm lên 8.5 điểm sau khi học khóa này. Các mẹo giải nhanh trắc nghiệm rất hữu ích!",
                IsApproved = true,
                HelpfulCount = 56,
                UserId = studentId1,
                CourseId = Guid.Parse("10000000-0000-0000-0000-000000000005"),
                CreatedAt = DateTime.UtcNow.AddDays(-7)
            },
            new Review
            {
                Id = Guid.NewGuid(),
                Rating = 5,
                Comment = "Thầy dạy rất tận tâm, giải đáp thắc mắc nhanh chóng. Khóa học xứng đáng 5 sao!",
                IsApproved = true,
                HelpfulCount = 45,
                UserId = studentId2,
                CourseId = Guid.Parse("10000000-0000-0000-0000-000000000005"),
                CreatedAt = DateTime.UtcNow.AddDays(-20)
            }
        };

        await context.Reviews.AddRangeAsync(reviews);
        await context.SaveChangesAsync();
    }
}

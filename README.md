# MathLearning - Online Learning Platform

Nền tảng học trực tuyến giống Coursera, được xây dựng với .NET 10 và Next.js.

## 🚀 Công nghệ sử dụng

### Backend (.NET 10)
- **Clean Architecture**: Domain, Application, Infrastructure, API
- **Entity Framework Core**: Code-first với PostgreSQL
- **MediatR**: CQRS Pattern
- **FluentValidation**: Validation
- **AutoMapper**: Object mapping
- **JWT Authentication**: Bảo mật
- **Redis**: Caching (optional)

### Frontend (Next.js 15)
- **React 19**: UI Library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Zustand**: State management
- **React Hook Form**: Form handling
- **Axios**: HTTP client

## 📁 Cấu trúc dự án

```
math-learning/
├── back_end/
│   ├── MathLearning.sln
│   └── src/
│       ├── MathLearning.API/           # REST API
│       ├── MathLearning.Application/   # Business logic
│       ├── MathLearning.Domain/        # Entities & interfaces
│       └── MathLearning.Infrastructure/ # Database & services
│
└── front_end/
    ├── client/                         # Student portal
    └── admin/                          # Admin dashboard
```

## 🛠️ Cài đặt

### Yêu cầu
- .NET 10 SDK
- Node.js 18+
- PostgreSQL 15+
- Redis (optional)

### Backend

```bash
cd back_end

# Restore packages
dotnet restore

# Update database
dotnet ef database update --project src/MathLearning.Infrastructure --startup-project src/MathLearning.API

# Run API
dotnet run --project src/MathLearning.API
```

API sẽ chạy tại: http://localhost:5000

### Frontend - Client

```bash
cd front_end/client

# Install dependencies
npm install

# Run development server
npm run dev
```

Client sẽ chạy tại: http://localhost:3000

### Frontend - Admin

```bash
cd front_end/admin

# Install dependencies
npm install

# Run development server
npm run dev
```

Admin sẽ chạy tại: http://localhost:3001

## 📝 Cấu hình

### appsettings.json (Backend)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=MathLearning;Username=postgres;Password=yourpassword"
  },
  "Jwt": {
    "Key": "your-super-secret-key-at-least-32-characters",
    "Issuer": "MathLearning",
    "Audience": "MathLearning",
    "ExpirationInMinutes": 60
  }
}
```

## 🎨 Thiết kế

Màu sắc và font được lấy cảm hứng từ [dotnet.microsoft.com](https://dotnet.microsoft.com):

- **Primary Color**: #512BD4 (Purple)
- **Secondary Color**: #06B6D4 (Cyan)
- **Font Family**: Segoe UI

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký

### Courses
- `GET /api/courses` - Danh sách khóa học
- `GET /api/courses/{id}` - Chi tiết khóa học
- `POST /api/courses` - Tạo khóa học (Admin)
- `PUT /api/courses/{id}` - Cập nhật khóa học (Admin)
- `DELETE /api/courses/{id}` - Xóa khóa học (Admin)

### Categories
- `GET /api/categories` - Danh sách danh mục
- `POST /api/categories` - Tạo danh mục (Admin)

### Users
- `GET /api/users` - Danh sách người dùng (Admin)
- `GET /api/users/{id}` - Chi tiết người dùng
- `PUT /api/users/{id}` - Cập nhật người dùng

## 🔐 Bảo mật

- JWT Bearer Authentication
- BCrypt Password Hashing
- Role-based Authorization (Student, Instructor, Admin)
- Input Validation với FluentValidation

## 📦 Database Schema

### Entities
- User, Course, Category, Section, Lesson
- Enrollment, LessonProgress, Review
- Quiz, Question, Answer, QuizAttempt
- Payment, Certificate, Coupon, Tag

## 🚧 Roadmap

- [ ] Video streaming với HLS
- [ ] Payment integration (VNPay, Momo)
- [ ] Real-time notifications
- [ ] Discussion forum
- [ ] Mobile app (React Native)

## 📄 License

MIT License

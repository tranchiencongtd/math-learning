"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlayCircleIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LockClosedIcon,
  PlayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";

// Mock course data
const course = {
  id: "1",
  title: "Complete Web Development Bootcamp 2024",
  slug: "complete-web-development-bootcamp-2024",
  description:
    "Trở thành Full-Stack Web Developer với khóa học đầy đủ nhất về HTML, CSS, JavaScript, React, Node.js, MongoDB và nhiều hơn nữa!",
  thumbnail:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
  instructor: {
    name: "Nguyễn Văn A",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    title: "Senior Full-Stack Developer",
    bio: "10+ năm kinh nghiệm trong ngành công nghệ. Đã đào tạo hơn 50,000 học viên trực tuyến.",
    courses: 12,
    students: 45000,
    rating: 4.8,
  },
  price: 499000,
  originalPrice: 1299000,
  rating: 4.8,
  reviewsCount: 2345,
  studentsCount: 15420,
  duration: "42 giờ",
  lessonsCount: 280,
  level: "Tất cả cấp độ",
  language: "Tiếng Việt",
  lastUpdated: "Tháng 1, 2024",
  whatYouWillLearn: [
    "Xây dựng 25+ dự án thực tế để portfolio của bạn",
    "Thành thạo HTML5, CSS3, JavaScript ES6+",
    "Học React.js từ cơ bản đến nâng cao",
    "Xây dựng RESTful APIs với Node.js & Express",
    "Làm việc với cơ sở dữ liệu MongoDB & PostgreSQL",
    "Deploy ứng dụng lên cloud (AWS, Vercel, Railway)",
    "Git & GitHub workflow chuyên nghiệp",
    "Authentication với JWT & OAuth",
  ],
  requirements: [
    "Không cần kinh nghiệm lập trình trước đó",
    "Máy tính có kết nối internet",
    "Sẵn sàng học và thực hành",
  ],
  sections: [
    {
      id: "1",
      title: "Giới thiệu & Chuẩn bị môi trường",
      duration: "45 phút",
      lessons: [
        { id: "1-1", title: "Chào mừng đến với khóa học", duration: "05:00", type: "video", isPreview: true },
        { id: "1-2", title: "Cài đặt VS Code", duration: "10:00", type: "video", isPreview: true },
        { id: "1-3", title: "Cài đặt Node.js & npm", duration: "08:00", type: "video", isPreview: false },
        { id: "1-4", title: "Giới thiệu về Git", duration: "12:00", type: "video", isPreview: false },
        { id: "1-5", title: "Tài liệu khóa học", duration: "", type: "document", isPreview: true },
      ],
    },
    {
      id: "2",
      title: "HTML5 - Nền tảng Web",
      duration: "3 giờ 20 phút",
      lessons: [
        { id: "2-1", title: "HTML là gì?", duration: "15:00", type: "video", isPreview: true },
        { id: "2-2", title: "Cấu trúc trang HTML", duration: "20:00", type: "video", isPreview: false },
        { id: "2-3", title: "Các thẻ văn bản cơ bản", duration: "25:00", type: "video", isPreview: false },
        { id: "2-4", title: "Links và Images", duration: "18:00", type: "video", isPreview: false },
        { id: "2-5", title: "Forms và Input", duration: "30:00", type: "video", isPreview: false },
        { id: "2-6", title: "Semantic HTML", duration: "22:00", type: "video", isPreview: false },
        { id: "2-7", title: "Bài tập thực hành", duration: "", type: "quiz", isPreview: false },
      ],
    },
    {
      id: "3",
      title: "CSS3 - Styling Web",
      duration: "5 giờ 45 phút",
      lessons: [
        { id: "3-1", title: "CSS cơ bản", duration: "20:00", type: "video", isPreview: false },
        { id: "3-2", title: "Selectors & Specificity", duration: "25:00", type: "video", isPreview: false },
        { id: "3-3", title: "Box Model", duration: "18:00", type: "video", isPreview: false },
        { id: "3-4", title: "Flexbox Layout", duration: "35:00", type: "video", isPreview: false },
        { id: "3-5", title: "CSS Grid", duration: "40:00", type: "video", isPreview: false },
        { id: "3-6", title: "Responsive Design", duration: "30:00", type: "video", isPreview: false },
      ],
    },
    {
      id: "4",
      title: "JavaScript - Lập trình Web",
      duration: "8 giờ 30 phút",
      lessons: [
        { id: "4-1", title: "JavaScript cơ bản", duration: "25:00", type: "video", isPreview: false },
        { id: "4-2", title: "Variables & Data Types", duration: "20:00", type: "video", isPreview: false },
        { id: "4-3", title: "Functions & Scope", duration: "30:00", type: "video", isPreview: false },
        { id: "4-4", title: "DOM Manipulation", duration: "45:00", type: "video", isPreview: false },
        { id: "4-5", title: "Events & Event Handling", duration: "35:00", type: "video", isPreview: false },
      ],
    },
  ],
  reviews: [
    {
      id: "1",
      user: { name: "Trần Minh B", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" },
      rating: 5,
      date: "2 tuần trước",
      content: "Khóa học tuyệt vời! Thầy giảng rất dễ hiểu, có nhiều bài tập thực hành. Sau khóa học mình đã tìm được việc làm web developer.",
    },
    {
      id: "2",
      user: { name: "Lê Thị C", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" },
      rating: 5,
      date: "1 tháng trước",
      content: "Nội dung đầy đủ từ cơ bản đến nâng cao. Recommend cho ai muốn học web development từ đầu.",
    },
    {
      id: "3",
      user: { name: "Phạm Văn D", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face" },
      rating: 4,
      date: "1 tháng trước",
      content: "Khóa học rất chi tiết. Tuy nhiên phần backend có thể thêm nhiều ví dụ thực tế hơn.",
    },
  ],
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export default function CourseDetailPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"]);
  const [cardStyle, setCardStyle] = useState<"fixed" | "absolute">("fixed");
  const [cardBottom, setCardBottom] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );

  // Stop card at content bottom (before footer)
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current && cardRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const cardHeight = cardRef.current.offsetHeight;
        const cardTopOffset = 80; // top-20 = 80px
        const buffer = 20; // padding before footer
        
        // Calculate where card bottom would be if fixed
        const cardBottomIfFixed = cardTopOffset + cardHeight;
        
        // If content bottom is above card bottom position, switch to absolute
        if (contentRect.bottom < cardBottomIfFixed + buffer) {
          setCardStyle("absolute");
          // Calculate the absolute bottom position
          const contentBottom = contentRef.current.offsetTop + contentRef.current.offsetHeight;
          setCardBottom(contentBottom - cardHeight - buffer);
        } else {
          setCardStyle("fixed");
          setCardBottom(null);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Check initial state
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Course Card - Desktop (Sticky like Udemy) */}
      <div 
        className={`hidden lg:block ${cardStyle === "fixed" ? "fixed inset-x-0 top-0" : ""} z-40 pointer-events-none`}
        style={cardStyle === "absolute" ? { position: "absolute", top: cardBottom ?? 0, left: 0, right: 0 } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${
              cardStyle === "fixed" ? "absolute right-8 top-20" : "absolute right-8"
            } w-[340px] max-h-[calc(100vh-120px)] overflow-y-auto bg-white rounded-lg shadow-2xl pointer-events-auto`}
          >
            <div className="relative aspect-video">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition group">
                <PlayCircleIcon className="w-16 h-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
              </button>
              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
                Xem trước khóa học
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(course.price)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(course.originalPrice)}
                </span>
                <span className="text-sm font-medium text-green-600">
                  -{Math.round((1 - course.price / course.originalPrice) * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-red-600">
                <ClockIcon className="w-4 h-4" />
                <span className="font-medium">Còn 2 ngày với mức giá này!</span>
              </div>

              <div className="space-y-3">
                <button className="w-full btn bg-primary-500 text-white hover:bg-primary-600 py-3 text-base font-bold">
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  Thêm vào giỏ hàng
                </button>
                <button className="w-full btn border-2 border-gray-900 text-gray-900 hover:bg-gray-100 py-2.5 font-bold">
                  Mua ngay
                </button>
              </div>

              <p className="text-center text-xs text-gray-500">
                Đảm bảo hoàn tiền trong 30 ngày
              </p>

              <div className="border-t pt-4 space-y-2.5 text-sm">
                <p className="font-bold text-gray-900">Khóa học bao gồm:</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <PlayCircleIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{course.duration} video theo yêu cầu</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DocumentTextIcon className="w-4 h-4 flex-shrink-0" />
                  <span>{totalLessons} bài học</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ClockIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Truy cập trọn đời</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Chứng chỉ hoàn thành</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-primary-500 text-sm">
                  <HeartIcon className="w-5 h-5" />
                  <span>Yêu thích</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-primary-500 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pr-[400px]">
          <div className="space-y-6">
            {/* Course Info */}
            <nav className="text-sm text-gray-400">
              <Link href="/" className="hover:text-white">
                Trang chủ
              </Link>
              <span className="mx-2">/</span>
              <Link href="/courses" className="hover:text-white">
                Khóa học
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Web Development</span>
            </nav>

            <h1 className="text-3xl lg:text-4xl font-bold">{course.title}</h1>

            <p className="text-lg text-gray-300">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="font-bold">{course.rating}</span>
                <span className="text-gray-400">({course.reviewsCount} đánh giá)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                <UsersIcon className="w-5 h-5" />
                <span>{course.studentsCount.toLocaleString()} học viên</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="text-sm text-gray-400">Giảng viên</p>
                <p className="font-medium">{course.instructor.name}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span>Cập nhật: {course.lastUpdated}</span>
              <span>•</span>
              <span>{course.language}</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pr-[400px]">
        <div className="space-y-12">
            {/* What you'll learn */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Những gì bạn sẽ học được
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Course content */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Nội dung khóa học</h2>
                <p className="text-sm text-gray-500">
                  {course.sections.length} phần • {totalLessons} bài học • {course.duration}
                </p>
              </div>

              <div className="border rounded-xl overflow-hidden bg-white">
                {course.sections.map((section) => (
                  <div key={section.id} className="border-b last:border-b-0">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        {expandedSections.includes(section.id) ? (
                          <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                        )}
                        <span className="font-medium text-gray-900">{section.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {section.lessons.length} bài • {section.duration}
                      </span>
                    </button>

                    {expandedSections.includes(section.id) && (
                      <div className="bg-gray-50 border-t">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between px-4 py-3 hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.type === "video" ? (
                                <PlayIcon className="w-4 h-4 text-gray-400" />
                              ) : lesson.type === "quiz" ? (
                                <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                              ) : (
                                <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                              )}
                              <span className="text-gray-700">{lesson.title}</span>
                              {lesson.isPreview && (
                                <span className="text-xs text-primary-500 font-medium">
                                  Xem trước
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              {lesson.duration && <span>{lesson.duration}</span>}
                              {!lesson.isPreview && (
                                <LockClosedIcon className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Requirements */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Yêu cầu</h2>
              <ul className="space-y-3">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Instructor */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Giảng viên</h2>
              <div className="bg-white rounded-xl p-6 border">
                <div className="flex items-start gap-6">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {course.instructor.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{course.instructor.title}</p>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span>{course.instructor.rating} Đánh giá</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-5 h-5 text-gray-400" />
                        <span>{course.instructor.students.toLocaleString()} Học viên</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PlayCircleIcon className="w-5 h-5 text-gray-400" />
                        <span>{course.instructor.courses} Khóa học</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Reviews */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Đánh giá từ học viên
                </h2>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-6 h-6 text-yellow-400" />
                  <span className="text-xl font-bold">{course.rating}</span>
                  <span className="text-gray-500">({course.reviewsCount} đánh giá)</span>
                </div>
              </div>

              <div className="space-y-6">
                {course.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl p-6 border">
                    <div className="flex items-start gap-4">
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{review.user.name}</p>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 text-primary-500 font-medium hover:underline">
                Xem tất cả đánh giá →
              </button>
            </motion.section>
        </div>
      </div>

      {/* Mobile Fixed Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-2xl font-bold text-gray-900">{formatPrice(course.price)}</p>
            <p className="text-sm text-gray-500 line-through">
              {formatPrice(course.originalPrice)}
            </p>
          </div>
          <button className="btn bg-primary-500 text-white hover:bg-primary-600 px-8 py-3">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}

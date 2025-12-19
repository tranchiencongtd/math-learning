"use client";

import { useState, useEffect, useRef, use } from "react";
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
import { coursesApi } from "@/lib/api";

// Types
interface Lesson {
  id: string;
  title: string;
  description?: string;
  type: string;
  durationInMinutes: number;
  displayOrder: number;
  isFreePreview: boolean;
}

interface Section {
  id: string;
  title: string;
  description?: string;
  displayOrder: number;
  durationInMinutes: number;
  lessons: Lesson[];
}

interface Review {
  id: string;
  rating: number;
  comment?: string;
  userName: string;
  userAvatar?: string;
  helpfulCount: number;
  createdAt: string;
}

interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  price: number;
  discountPrice?: number;
  level: string;
  durationInMinutes: number;
  averageRating: number;
  totalStudents: number;
  totalReviews: number;
  instructorName: string;
  instructorAvatar?: string;
  instructorId: string;
  categoryName: string;
  categoryId: string;
  isFeatured: boolean;
  requirements?: string;
  whatYouWillLearn?: string;
  targetAudience?: string;
  language?: string;
  createdAt: string;
  updatedAt?: string;
  sections: Section[];
  tags: string[];
  reviews: Review[];
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [cardStyle, setCardStyle] = useState<"fixed" | "absolute">("fixed");
  const [cardBottom, setCardBottom] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await coursesApi.getBySlug(slug);
        setCourse(response.data);
        // Expand first section by default
        if (response.data.sections.length > 0) {
          setExpandedSections([response.data.sections[0].id]);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Không thể tải thông tin khóa học");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalLessons = course?.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  ) ?? 0;

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
  }, [course]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải khóa học...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Không tìm thấy khóa học"}
          </h1>
          <Link href="/courses" className="btn bg-primary-500 text-white hover:bg-primary-600">
            Quay lại danh sách khóa học
          </Link>
        </div>
      </div>
    );
  }

  // Helper values
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) return `${hours} giờ ${mins} phút`;
    if (hours > 0) return `${hours} giờ`;
    return `${mins} phút`;
  };

  const totalDuration = formatDuration(course.durationInMinutes);
  const discountPercent = course.discountPrice 
    ? Math.round((1 - course.discountPrice / course.price) * 100)
    : 0;
  const displayPrice = course.discountPrice || course.price;
  const originalPrice = course.discountPrice ? course.price : null;

  // Helper to convert level to Vietnamese
  const getLevelText = (level: string) => {
    const levelMap: Record<string, string> = {
      "Beginner": "Cơ bản",
      "Intermediate": "Trung cấp", 
      "Advanced": "Nâng cao",
      "AllLevels": "Tất cả cấp độ",
      "0": "Cơ bản",
      "1": "Trung cấp",
      "2": "Nâng cao",
      "3": "Tất cả cấp độ",
    };
    return levelMap[level] || level;
  };

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
                src={course.thumbnailUrl || "/images/course-placeholder.jpg"}
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
                  {formatPrice(displayPrice)}
                </span>
                {originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      -{discountPercent}%
                    </span>
                  </>
                )}
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
                  <span>{totalDuration} video theo yêu cầu</span>
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
              <span className="text-white">{course.categoryName}</span>
            </nav>

            <h1 className="text-3xl lg:text-4xl font-bold">{course.title}</h1>

            <p className="text-lg text-gray-300">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="font-bold">{course.averageRating.toFixed(1)}</span>
                <span className="text-gray-400">({course.totalReviews} đánh giá)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                <UsersIcon className="w-5 h-5" />
                <span>{course.totalStudents.toLocaleString()} học viên</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src={course.instructorAvatar || "/images/avatar-placeholder.jpg"}
                alt={course.instructorName}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="text-sm text-gray-400">Giảng viên</p>
                <p className="font-medium">{course.instructorName}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <span>Cập nhật: {new Date(course.updatedAt || course.createdAt).toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}</span>
              <span>•</span>
              <span>{course.language === "Vietnamese" ? "Tiếng Việt" : course.language || "Tiếng Việt"}</span>
              <span>•</span>
              <span>{getLevelText(course.level)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pr-[400px]">
        <div className="space-y-12">
            {/* What you'll learn */}
            {course.whatYouWillLearn && (
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
                {course.whatYouWillLearn.split(/[|\n]/).filter(item => item.trim()).map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item.trim()}</span>
                  </div>
                ))}
              </div>
            </motion.section>
            )}

            {/* Course content */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Nội dung khóa học</h2>
                <p className="text-sm text-gray-500">
                  {course.sections.length} phần • {totalLessons} bài học • {totalDuration}
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
                        {section.lessons.length} bài • {formatDuration(section.durationInMinutes)}
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
                              {lesson.isFreePreview && (
                                <span className="text-xs text-primary-500 font-medium">
                                  Xem trước
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              {lesson.durationInMinutes > 0 && <span>{lesson.durationInMinutes} phút</span>}
                              {!lesson.isFreePreview && (
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
            {course.requirements && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Yêu cầu</h2>
              <ul className="space-y-3">
                {course.requirements.split(/[,|]/).filter(req => req.trim()).map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2" />
                    <span className="text-gray-700">{req.trim()}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
            )}

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
                    src={course.instructorAvatar || "/images/avatar-placeholder.jpg"}
                    alt={course.instructorName}
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {course.instructorName}
                    </h3>
                    <p className="text-gray-600 mb-4">Giảng viên</p>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span>{course.averageRating.toFixed(1)} Đánh giá</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-5 h-5 text-gray-400" />
                        <span>{course.totalStudents.toLocaleString()} Học viên</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Reviews */}
            {(course.totalReviews > 0 || course.reviews?.length > 0) && (
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
                  <span className="text-xl font-bold">{course.averageRating.toFixed(1)}</span>
                  <span className="text-gray-500">({course.totalReviews} đánh giá)</span>
                </div>
              </div>

              {course.reviews?.length > 0 ? (
                <div className="space-y-6">
                  {course.reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl p-6 border">
                      <div className="flex items-start gap-4">
                        <Image
                          src={review.userAvatar || "/images/avatar-placeholder.jpg"}
                          alt={review.userName}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{review.userName}</p>
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
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                          {review.helpfulCount > 0 && (
                            <p className="text-sm text-gray-500 mt-2">
                              {review.helpfulCount} người thấy hữu ích
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Chưa có đánh giá nào.</p>
              )}
            </motion.section>
            )}
        </div>
      </div>

      {/* Mobile Fixed Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-2xl font-bold text-gray-900">{formatPrice(displayPrice)}</p>
            {originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              {formatPrice(originalPrice)}
            </p>
            )}
          </div>
          <button className="btn bg-primary-500 text-white hover:bg-primary-600 px-8 py-3">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}

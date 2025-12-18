"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { StarIcon, ClockIcon, UserGroupIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { Course, PaginatedList } from "@/types";

// Mock data
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2024",
    slug: "complete-web-development-bootcamp",
    description: "Learn web development from scratch",
    shortDescription: "Full-stack web development course",
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    price: 1499000,
    discountPrice: 499000,
    level: "Beginner",
    status: "Published",
    durationInMinutes: 3120,
    averageRating: 4.8,
    totalStudents: 15420,
    totalReviews: 2341,
    isFeatured: true,
    instructorId: "1",
    instructorName: "Nguyễn Văn A",
    categoryId: "1",
    categoryName: "Web Development",
    createdAt: new Date().toISOString(),
  },
  // Add more mock courses...
];

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "popular", label: "Phổ biến nhất" },
  { value: "rating", label: "Đánh giá cao" },
  { value: "price-low", label: "Giá thấp đến cao" },
  { value: "price-high", label: "Giá cao đến thấp" },
];

const levelOptions = [
  { value: "", label: "Tất cả" },
  { value: "Beginner", label: "Cơ bản" },
  { value: "Intermediate", label: "Trung cấp" },
  { value: "Advanced", label: "Nâng cao" },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export function CoursesContent() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [level, setLevel] = useState(searchParams.get("level") || "");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
          <h3 className="font-semibold text-lg mb-4">Bộ lọc</h3>

          {/* Level Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Cấp độ</h4>
            <div className="space-y-2">
              {levelOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="level"
                    value={option.value}
                    checked={level === option.value}
                    onChange={(e) => setLevel(e.target.value)}
                    className="text-primary-500"
                  />
                  <span className="ml-2 text-gray-600">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Giá</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="text-primary-500" />
                <span className="ml-2 text-gray-600">Miễn phí</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="text-primary-500" />
                <span className="ml-2 text-gray-600">Có phí</span>
              </label>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Đánh giá</h4>
            <div className="space-y-2">
              {[4.5, 4, 3.5, 3].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input type="checkbox" className="text-primary-500" />
                  <span className="ml-2 text-gray-600 flex items-center">
                    {rating}+ <StarIcon className="w-4 h-4 text-yellow-400 ml-1" />
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="flex-grow">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <p className="text-gray-600">
            Hiển thị <span className="font-semibold">{courses.length}</span> khóa học
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn btn-ghost"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Bộ lọc
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input py-2 px-4"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/courses/${course.slug}`}>
                <div className="card group h-full">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={course.thumbnailUrl || "/images/placeholder.jpg"}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                        {course.categoryName}
                      </span>
                    </div>
                    {course.discountPrice && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                          -{Math.round((1 - course.discountPrice / course.price) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{course.instructorName}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium text-gray-900">{course.averageRating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{course.totalStudents.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{Math.round(course.durationInMinutes / 60)}h</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary-500">
                        {formatPrice(course.discountPrice || course.price)}
                      </span>
                      {course.discountPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(course.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

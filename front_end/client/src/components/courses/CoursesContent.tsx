"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { StarIcon, ClockIcon, UserGroupIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { Course, PaginatedList, Category } from "@/types";
import { coursesApi, categoriesApi } from "@/lib/api";

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
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [level, setLevel] = useState(searchParams.get("level") || "");
  const [categoryId, setCategoryId] = useState(searchParams.get("category") || "");
  const [showFilters, setShowFilters] = useState(false);

  const fetchCourses = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setIsFiltering(true);
      }
      const response = await coursesApi.getAll({
        pageNumber: currentPage,
        pageSize: 12,
        sortBy,
        level: level || undefined,
        categoryId: categoryId || undefined,
      });
      
      const data = response.data as PaginatedList<Course>;
      setCourses(data.items);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Không thể tải khóa học. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
      setIsFiltering(false);
    }
  }, [currentPage, sortBy, level, categoryId]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoriesApi.getAll();
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Initial load
  useEffect(() => {
    fetchCourses(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter/sort changes
  useEffect(() => {
    if (!loading) {
      fetchCourses(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, level, categoryId, currentPage]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="aspect-video bg-gray-200 rounded-t-xl" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={fetchCourses} className="btn btn-primary">
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <div className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
          <h3 className="font-semibold text-lg mb-4">Bộ lọc</h3>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Danh mục</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={categoryId === ""}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="text-primary-500"
                />
                <span className="ml-2 text-gray-600">Tất cả</span>
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={categoryId === cat.id}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="text-primary-500"
                  />
                  <span className="ml-2 text-gray-600">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

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
            Hiển thị <span className="font-semibold">{totalCount}</span> khóa học
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Bộ lọc</span>
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg py-2.5 pl-4 pr-10 text-gray-700 font-medium cursor-pointer hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {courses.length === 0 && !isFiltering ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy khóa học nào.</p>
          </div>
        ) : (
          <div className={`relative ${isFiltering ? 'opacity-50 pointer-events-none' : ''} transition-opacity duration-200`}>
            {isFiltering && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
              >
                <Link href={`/courses/${course.slug}`}>
                  <div className="card group h-full">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={course.thumbnailUrl || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"}
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
                    <div className="p-5 flex flex-col">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12 group-hover:text-primary-500 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 truncate">{course.instructorName}</p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium text-gray-900">{course.averageRating.toFixed(1)}</span>
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
                      <div className="flex items-center gap-2 mt-auto">
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-ghost disabled:opacity-50"
            >
              Trước
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-ghost"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-ghost disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

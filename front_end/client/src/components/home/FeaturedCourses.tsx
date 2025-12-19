"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { StarIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { coursesApi } from "@/lib/api";
import { Course } from "@/types";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        setLoading(true);
        const response = await coursesApi.getFeatured(8);
        setCourses(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching featured courses:", err);
        setError("Không thể tải khóa học. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  if (loading) {
    return (
      <section className="pb-20 pt-10 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Khóa học <span className="gradient-text">nổi bật</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pb-20 pt-10 bg-gray-50">
        <div className="container-custom text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="pb-20 pt-10 bg-gray-50">
        <div className="container-custom text-center">
          <p className="text-gray-500">Chưa có khóa học nổi bật nào.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 pt-10 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-4"
          >
            Khóa học <span className="gradient-text">nổi bật</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá các khóa học được đánh giá cao nhất từ các chuyên gia hàng đầu trong ngành
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/courses" className="btn btn-primary">
            Xem tất cả khóa học
          </Link>
        </div>
      </div>
    </section>
  );
}

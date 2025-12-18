"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { StarIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/solid";

// Mock data - will be replaced with API call
const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2024",
    slug: "complete-web-development-bootcamp",
    instructor: "Nguyễn Văn A",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    price: 1499000,
    discountPrice: 499000,
    rating: 4.8,
    totalStudents: 15420,
    duration: 52,
    level: "Beginner",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Machine Learning A-Z: AI, Python & R",
    slug: "machine-learning-az",
    instructor: "Trần Thị B",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop",
    price: 1999000,
    discountPrice: 699000,
    rating: 4.9,
    totalStudents: 8750,
    duration: 45,
    level: "Intermediate",
    category: "Data Science",
  },
  {
    id: 3,
    title: "React Native - Build Mobile Apps",
    slug: "react-native-mobile-apps",
    instructor: "Lê Văn C",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    price: 1299000,
    discountPrice: 399000,
    rating: 4.7,
    totalStudents: 6200,
    duration: 38,
    level: "Intermediate",
    category: "Mobile Development",
  },
  {
    id: 4,
    title: "AWS Certified Solutions Architect",
    slug: "aws-certified-solutions-architect",
    instructor: "Phạm Thị D",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    price: 2499000,
    discountPrice: 899000,
    rating: 4.9,
    totalStudents: 12300,
    duration: 65,
    level: "Advanced",
    category: "Cloud Computing",
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export function FeaturedCourses() {
  return (
    <section className="py-20 bg-gray-50">
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
          {featuredCourses.map((course, index) => (
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
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                        {course.category}
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
                    <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium text-gray-900">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{course.totalStudents.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{course.duration}h</span>
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

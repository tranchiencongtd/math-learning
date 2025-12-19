"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  PaintBrushIcon,
  CpuChipIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { categoriesApi } from "@/lib/api";
import { Category } from "@/types";

// Map icon theo tên category
const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "web-development": CodeBracketIcon,
  "data-science": ChartBarIcon,
  "mobile-development": DevicePhoneMobileIcon,
  "cloud-computing": CloudIcon,
  "ui-ux-design": PaintBrushIcon,
  "artificial-intelligence": CpuChipIcon,
  "default": AcademicCapIcon,
};

// Map màu sắc theo index
const colorMap = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-green-500",
  "from-yellow-500 to-orange-500",
];

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesApi.getAll();
        setCategories(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Không thể tải danh mục. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getIcon = (slug: string) => {
    return iconMap[slug] || iconMap["default"];
  };

  const getColor = (index: number) => {
    return colorMap[index % colorMap.length];
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Khám phá <span className="gradient-text">danh mục</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                  <div className="flex-grow space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
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
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <p className="text-gray-500">Chưa có danh mục nào.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title mb-4"
          >
            Khám phá <span className="gradient-text">danh mục</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tìm kiếm khóa học phù hợp với mục tiêu nghề nghiệp của bạn
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = getIcon(category.slug);
            const color = getColor(index);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/courses?category=${category.slug}`}>
                  <div className="group relative overflow-hidden rounded-2xl bg-gray-50 p-6 hover:shadow-lg transition-all duration-300">
                    {/* Background gradient on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    <div className="relative flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-500 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {category.description || "Khám phá các khóa học trong danh mục này"}
                        </p>
                        <p className="text-sm font-medium text-primary-500">
                          {category.coursesCount || 0} khóa học
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

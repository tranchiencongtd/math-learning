"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  PaintBrushIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const categories = [
  {
    name: "Web Development",
    slug: "web-development",
    description: "HTML, CSS, JavaScript, React, Node.js",
    icon: CodeBracketIcon,
    color: "from-blue-500 to-cyan-500",
    coursesCount: 120,
  },
  {
    name: "Data Science",
    slug: "data-science",
    description: "Python, Machine Learning, AI, Analytics",
    icon: ChartBarIcon,
    color: "from-purple-500 to-pink-500",
    coursesCount: 85,
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description: "React Native, Flutter, iOS, Android",
    icon: DevicePhoneMobileIcon,
    color: "from-green-500 to-emerald-500",
    coursesCount: 64,
  },
  {
    name: "Cloud Computing",
    slug: "cloud-computing",
    description: "AWS, Azure, GCP, DevOps",
    icon: CloudIcon,
    color: "from-orange-500 to-red-500",
    coursesCount: 78,
  },
  {
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Figma, Adobe XD, Prototyping",
    icon: PaintBrushIcon,
    color: "from-pink-500 to-rose-500",
    coursesCount: 52,
  },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "Deep Learning, NLP, Computer Vision",
    icon: CpuChipIcon,
    color: "from-indigo-500 to-purple-500",
    coursesCount: 43,
  },
];

export function Categories() {
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
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/courses?category=${category.slug}`}>
                <div className="group relative overflow-hidden rounded-2xl bg-gray-50 p-6 hover:shadow-lg transition-all duration-300">
                  {/* Background gradient on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}
                    >
                      <category.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-500 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {category.description}
                      </p>
                      <p className="text-sm font-medium text-primary-500">
                        {category.coursesCount} khóa học
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

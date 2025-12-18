"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const mockCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2024",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=60&fit=crop",
    instructor: "Nguyễn Văn A",
    category: "Web Development",
    price: 499000,
    students: 1542,
    rating: 4.8,
    status: "Published",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Machine Learning A-Z: AI, Python & R",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=100&h=60&fit=crop",
    instructor: "Trần Thị B",
    category: "Data Science",
    price: 699000,
    students: 875,
    rating: 4.9,
    status: "Published",
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    title: "React Native - Build Mobile Apps",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=60&fit=crop",
    instructor: "Lê Văn C",
    category: "Mobile Development",
    price: 399000,
    students: 620,
    rating: 4.7,
    status: "Draft",
    createdAt: "2024-02-10",
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý khóa học</h1>
          <p className="text-gray-600">Quản lý tất cả các khóa học trên hệ thống</p>
        </div>
        <Link href="/dashboard/courses/create" className="btn btn-primary">
          <PlusIcon className="w-5 h-5 mr-2" />
          Thêm khóa học
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input w-auto"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Bản nháp</option>
            <option value="pending">Chờ duyệt</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Khóa học</th>
                <th className="table-header">Giảng viên</th>
                <th className="table-header">Danh mục</th>
                <th className="table-header">Giá</th>
                <th className="table-header">Học viên</th>
                <th className="table-header">Trạng thái</th>
                <th className="table-header">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-10 rounded overflow-hidden">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="max-w-xs">
                        <p className="font-medium text-gray-900 truncate">{course.title}</p>
                        <p className="text-sm text-gray-500">⭐ {course.rating}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-gray-600">{course.instructor}</td>
                  <td className="table-cell">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {course.category}
                    </span>
                  </td>
                  <td className="table-cell font-medium">{formatPrice(course.price)}</td>
                  <td className="table-cell text-gray-600">{course.students}</td>
                  <td className="table-cell">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {course.status === "Published" ? "Đã xuất bản" : "Bản nháp"}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-500 hover:text-primary-500 hover:bg-gray-100 rounded-lg">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-primary-500 hover:bg-gray-100 rounded-lg">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị 1-{filteredCourses.length} trong số {mockCourses.length} khóa học
          </p>
          <div className="flex gap-2">
            <button className="btn btn-secondary" disabled>
              Trước
            </button>
            <button className="btn btn-secondary">Sau</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

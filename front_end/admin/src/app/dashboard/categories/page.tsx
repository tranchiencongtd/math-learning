"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const mockCategories = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description: "HTML, CSS, JavaScript, React, Node.js",
    coursesCount: 120,
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "2",
    name: "Data Science",
    slug: "data-science",
    description: "Python, Machine Learning, AI, Analytics",
    coursesCount: 85,
    isActive: true,
    displayOrder: 2,
  },
  {
    id: "3",
    name: "Mobile Development",
    slug: "mobile-development",
    description: "React Native, Flutter, iOS, Android",
    coursesCount: 64,
    isActive: true,
    displayOrder: 3,
  },
  {
    id: "4",
    name: "Cloud Computing",
    slug: "cloud-computing",
    description: "AWS, Azure, GCP, DevOps",
    coursesCount: 78,
    isActive: true,
    displayOrder: 4,
  },
];

export default function CategoriesPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-600">Quản lý các danh mục khóa học</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <PlusIcon className="w-5 h-5 mr-2" />
          Thêm danh mục
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">/{category.slug}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  category.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {category.isActive ? "Hoạt động" : "Ẩn"}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{category.description}</p>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{category.coursesCount} khóa học</p>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-primary-500 hover:bg-gray-100 rounded-lg">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for adding/editing category */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-xl font-bold mb-4">Thêm danh mục mới</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên danh mục
                </label>
                <input type="text" className="input" placeholder="Web Development" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input type="text" className="input" placeholder="web-development" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea className="input" rows={3} placeholder="Mô tả danh mục..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn btn-secondary"
                >
                  Hủy
                </button>
                <button type="submit" className="flex-1 btn btn-primary">
                  Lưu
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeftIcon, PhotoIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import toast from "react-hot-toast";

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz";
  duration: string;
}

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "Giới thiệu khóa học",
      lessons: [
        { id: "1-1", title: "Tổng quan khóa học", type: "video", duration: "05:00" },
      ],
    },
  ]);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: "Phần mới",
      lessons: [],
    };
    setSections([...sections, newSection]);
  };

  const addLesson = (sectionId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: `${sectionId}-${Date.now()}`,
                  title: "Bài học mới",
                  type: "video",
                  duration: "00:00",
                },
              ],
            }
          : section
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Khóa học đã được tạo thành công!");
    router.push("/dashboard/courses");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/courses"
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tạo khóa học mới</h1>
          <p className="text-gray-600">Điền thông tin chi tiết cho khóa học</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h2 className="font-semibold text-gray-900 mb-4">Thông tin cơ bản</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề khóa học
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="VD: Complete Web Development Bootcamp 2024"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả ngắn
                </label>
                <textarea
                  className="input"
                  rows={3}
                  placeholder="Mô tả ngắn gọn về khóa học..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả chi tiết
                </label>
                <textarea
                  className="input"
                  rows={6}
                  placeholder="Mô tả chi tiết về những gì học viên sẽ học..."
                />
              </div>
            </div>
          </motion.div>

          {/* Curriculum */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Nội dung khóa học</h2>
              <button type="button" onClick={addSection} className="btn btn-secondary text-sm">
                <PlusIcon className="w-4 h-4 mr-1" />
                Thêm phần
              </button>
            </div>

            <div className="space-y-4">
              {sections.map((section, sectionIndex) => (
                <div key={section.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-gray-500">
                      Phần {sectionIndex + 1}:
                    </span>
                    <input
                      type="text"
                      className="flex-1 input py-1"
                      value={section.title}
                      onChange={(e) =>
                        setSections(
                          sections.map((s) =>
                            s.id === section.id ? { ...s, title: e.target.value } : s
                          )
                        )
                      }
                    />
                    <button
                      type="button"
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 ml-6 mb-2 p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm text-gray-500">
                        {sectionIndex + 1}.{lessonIndex + 1}
                      </span>
                      <input
                        type="text"
                        className="flex-1 input py-1 text-sm"
                        value={lesson.title}
                        onChange={() => {}}
                      />
                      <select className="input py-1 text-sm w-auto">
                        <option value="video">Video</option>
                        <option value="text">Bài viết</option>
                        <option value="quiz">Bài kiểm tra</option>
                      </select>
                      <button
                        type="button"
                        className="p-1 text-red-500 hover:bg-red-100 rounded"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addLesson(section.id)}
                    className="ml-6 mt-2 text-sm text-primary-500 hover:underline flex items-center gap-1"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Thêm bài học
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h2 className="font-semibold text-gray-900 mb-4">Ảnh bìa</h2>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-2">Kéo thả hoặc click để upload</p>
              <p className="text-xs text-gray-400">PNG, JPG tối đa 2MB</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h2 className="font-semibold text-gray-900 mb-4">Cài đặt</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <select className="input">
                  <option value="">Chọn danh mục</option>
                  <option value="web">Web Development</option>
                  <option value="data">Data Science</option>
                  <option value="mobile">Mobile Development</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cấp độ
                </label>
                <select className="input">
                  <option value="beginner">Cơ bản</option>
                  <option value="intermediate">Trung cấp</option>
                  <option value="advanced">Nâng cao</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá (VNĐ)
                </label>
                <input type="number" className="input" placeholder="499000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select className="input">
                  <option value="draft">Bản nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary"
              >
                {isSubmitting ? "Đang lưu..." : "Tạo khóa học"}
              </button>
              <button type="button" className="w-full btn btn-secondary">
                Lưu bản nháp
              </button>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const mockUsers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "Student",
    enrollments: 5,
    joinedAt: "2024-01-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    role: "Instructor",
    enrollments: 0,
    courses: 3,
    joinedAt: "2023-12-01",
    status: "Active",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    role: "Student",
    enrollments: 12,
    joinedAt: "2024-02-10",
    status: "Active",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    role: "Admin",
    joinedAt: "2023-06-01",
    status: "Active",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
          <p className="text-gray-600">Quản lý tài khoản người dùng trên hệ thống</p>
        </div>
        <button className="btn btn-primary">
          <PlusIcon className="w-5 h-5 mr-2" />
          Thêm người dùng
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="input w-auto"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="student">Học viên</option>
            <option value="instructor">Giảng viên</option>
            <option value="admin">Admin</option>
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
                <th className="table-header">Người dùng</th>
                <th className="table-header">Vai trò</th>
                <th className="table-header">Khóa học</th>
                <th className="table-header">Ngày tham gia</th>
                <th className="table-header">Trạng thái</th>
                <th className="table-header">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "Instructor"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role === "Admin"
                        ? "Admin"
                        : user.role === "Instructor"
                        ? "Giảng viên"
                        : "Học viên"}
                    </span>
                  </td>
                  <td className="table-cell text-gray-600">
                    {user.role === "Instructor"
                      ? `${user.courses || 0} khóa học`
                      : `${user.enrollments || 0} đăng ký`}
                  </td>
                  <td className="table-cell text-gray-600">{user.joinedAt}</td>
                  <td className="table-cell">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Hoạt động
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
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
            Hiển thị 1-{filteredUsers.length} trong số {mockUsers.length} người dùng
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

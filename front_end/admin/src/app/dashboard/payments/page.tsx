"use client";

import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const mockPayments = [
  {
    id: "PAY-001",
    student: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    course: "Complete Web Development Bootcamp",
    amount: 499000,
    method: "VNPay",
    status: "completed",
    createdAt: "2024-01-15 10:30",
  },
  {
    id: "PAY-002",
    student: "Trần Thị B",
    email: "tranthib@email.com",
    course: "Machine Learning A-Z",
    amount: 699000,
    method: "Momo",
    status: "completed",
    createdAt: "2024-01-15 11:45",
  },
  {
    id: "PAY-003",
    student: "Lê Văn C",
    email: "levanc@email.com",
    course: "React Native - Build Mobile Apps",
    amount: 399000,
    method: "Bank Transfer",
    status: "pending",
    createdAt: "2024-01-15 14:20",
  },
  {
    id: "PAY-004",
    student: "Phạm Thị D",
    email: "phamthid@email.com",
    course: "AWS Certified Solutions Architect",
    amount: 899000,
    method: "VNPay",
    status: "failed",
    createdAt: "2024-01-15 15:10",
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case "pending":
      return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    case "failed":
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Thành công";
    case "pending":
      return "Đang xử lý";
    case "failed":
      return "Thất bại";
    default:
      return status;
  }
};

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = mockPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý thanh toán</h1>
        <p className="text-gray-600">Theo dõi tất cả các giao dịch trên hệ thống</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="card p-6">
          <p className="text-sm text-gray-500">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500">Giao dịch thành công</p>
          <p className="text-2xl font-bold text-gray-900">
            {mockPayments.filter((p) => p.status === "completed").length}
          </p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-500">Đang chờ xử lý</p>
          <p className="text-2xl font-bold text-yellow-600">
            {mockPayments.filter((p) => p.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã hoặc tên..."
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
            <option value="completed">Thành công</option>
            <option value="pending">Đang xử lý</option>
            <option value="failed">Thất bại</option>
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
                <th className="table-header">Mã GD</th>
                <th className="table-header">Học viên</th>
                <th className="table-header">Khóa học</th>
                <th className="table-header">Số tiền</th>
                <th className="table-header">Phương thức</th>
                <th className="table-header">Trạng thái</th>
                <th className="table-header">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="table-cell font-mono text-sm">{payment.id}</td>
                  <td className="table-cell">
                    <div>
                      <p className="font-medium text-gray-900">{payment.student}</p>
                      <p className="text-sm text-gray-500">{payment.email}</p>
                    </div>
                  </td>
                  <td className="table-cell text-gray-600 max-w-xs truncate">
                    {payment.course}
                  </td>
                  <td className="table-cell font-medium">{formatPrice(payment.amount)}</td>
                  <td className="table-cell text-gray-600">{payment.method}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <span
                        className={`text-sm font-medium ${
                          payment.status === "completed"
                            ? "text-green-600"
                            : payment.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell text-gray-500 text-sm">{payment.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị 1-{filteredPayments.length} trong số {mockPayments.length} giao dịch
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

"use client";

import { motion } from "framer-motion";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsPage() {
  // Revenue chart data
  const revenueData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Doanh thu (triệu VNĐ)",
        data: [120, 150, 180, 220, 190, 240, 280, 320, 290, 350, 380, 420],
        borderColor: "#512BD4",
        backgroundColor: "rgba(81, 43, 212, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Enrollments chart data
  const enrollmentsData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
    datasets: [
      {
        label: "Đăng ký mới",
        data: [320, 450, 380, 520, 620, 580],
        backgroundColor: "#512BD4",
        borderRadius: 8,
      },
    ],
  };

  // Categories distribution
  const categoriesData = {
    labels: ["Web Development", "Data Science", "Mobile", "Cloud", "Khác"],
    datasets: [
      {
        data: [35, 25, 18, 15, 7],
        backgroundColor: ["#512BD4", "#06b6d4", "#f59e0b", "#10b981", "#6b7280"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Thống kê & Phân tích</h1>
        <p className="text-gray-600">Tổng quan về hiệu suất hệ thống</p>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900">Doanh thu theo tháng</h2>
            <select className="input w-auto text-sm">
              <option>Năm 2024</option>
              <option>Năm 2023</option>
            </select>
          </div>
          <div className="h-72">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Enrollments Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-gray-900">Đăng ký mới</h2>
            <select className="input w-auto text-sm">
              <option>6 tháng gần đây</option>
              <option>12 tháng gần đây</option>
            </select>
          </div>
          <div className="h-72">
            <Bar data={enrollmentsData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Categories Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h2 className="font-semibold text-gray-900 mb-6">Phân bố danh mục</h2>
          <div className="h-64">
            <Doughnut
              data={categoriesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Top Instructors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6 lg:col-span-2"
        >
          <h2 className="font-semibold text-gray-900 mb-6">Giảng viên hàng đầu</h2>
          <div className="space-y-4">
            {[
              { name: "Nguyễn Văn A", courses: 12, students: 4520, revenue: "₫ 1.2 tỷ" },
              { name: "Trần Thị B", courses: 8, students: 3210, revenue: "₫ 890 triệu" },
              { name: "Lê Văn C", courses: 6, students: 2450, revenue: "₫ 650 triệu" },
              { name: "Phạm Thị D", courses: 5, students: 1820, revenue: "₫ 480 triệu" },
            ].map((instructor, index) => (
              <div key={instructor.name} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{instructor.name}</p>
                  <p className="text-sm text-gray-500">{instructor.courses} khóa học</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{instructor.students}</p>
                  <p className="text-sm text-gray-500">học viên</p>
                </div>
                <div className="text-right w-32">
                  <p className="font-medium text-green-600">{instructor.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

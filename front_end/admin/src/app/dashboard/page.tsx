"use client";

import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Tổng khóa học",
    value: "245",
    change: "+12%",
    changeType: "increase",
    icon: AcademicCapIcon,
    color: "bg-blue-500",
  },
  {
    name: "Học viên",
    value: "15,420",
    change: "+23%",
    changeType: "increase",
    icon: UsersIcon,
    color: "bg-green-500",
  },
  {
    name: "Doanh thu tháng",
    value: "₫ 245,000,000",
    change: "+18%",
    changeType: "increase",
    icon: CurrencyDollarIcon,
    color: "bg-purple-500",
  },
  {
    name: "Tỷ lệ hoàn thành",
    value: "68%",
    change: "-2%",
    changeType: "decrease",
    icon: ChartBarIcon,
    color: "bg-orange-500",
  },
];

const recentEnrollments = [
  {
    id: 1,
    student: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    course: "Complete Web Development Bootcamp",
    amount: "₫ 499,000",
    date: "2 phút trước",
  },
  {
    id: 2,
    student: "Trần Thị B",
    email: "tranthib@email.com",
    course: "Machine Learning A-Z",
    amount: "₫ 699,000",
    date: "15 phút trước",
  },
  {
    id: 3,
    student: "Lê Văn C",
    email: "levanc@email.com",
    course: "React Native - Build Mobile Apps",
    amount: "₫ 399,000",
    date: "1 giờ trước",
  },
  {
    id: 4,
    student: "Phạm Thị D",
    email: "phamthid@email.com",
    course: "AWS Certified Solutions Architect",
    amount: "₫ 899,000",
    date: "2 giờ trước",
  },
];

const topCourses = [
  { name: "Complete Web Development Bootcamp", students: 1542, revenue: "₫ 769,458,000" },
  { name: "Machine Learning A-Z", students: 875, revenue: "₫ 611,625,000" },
  { name: "React Native - Build Mobile Apps", students: 620, revenue: "₫ 247,380,000" },
  { name: "AWS Certified Solutions Architect", students: 412, revenue: "₫ 370,388,000" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Tổng quan về hoạt động của hệ thống</p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span
                className={`flex items-center text-sm font-medium ${
                  stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.changeType === "increase" ? (
                  <ArrowUpIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent enrollments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="p-6 border-b">
            <h2 className="font-semibold text-gray-900">Đăng ký gần đây</h2>
          </div>
          <div className="divide-y">
            {recentEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{enrollment.student}</p>
                    <p className="text-sm text-gray-500">{enrollment.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{enrollment.amount}</p>
                    <p className="text-sm text-gray-500">{enrollment.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <button className="text-sm text-primary-500 hover:underline">
              Xem tất cả →
            </button>
          </div>
        </motion.div>

        {/* Top courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="p-6 border-b">
            <h2 className="font-semibold text-gray-900">Khóa học bán chạy</h2>
          </div>
          <div className="divide-y">
            {topCourses.map((course, index) => (
              <div key={course.name} className="p-4 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 font-medium">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{course.name}</p>
                    <p className="text-sm text-gray-500">{course.students} học viên</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{course.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <button className="text-sm text-primary-500 hover:underline">
              Xem tất cả →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

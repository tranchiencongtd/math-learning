"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Minh Tuấn",
    role: "Frontend Developer tại FPT Software",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content:
      "Sau khi hoàn thành khóa học React tại MathLearning, tôi đã được nhận vào làm việc tại FPT. Nội dung học thực tế và giảng viên rất tận tâm.",
    rating: 5,
    course: "Complete React Developer Course",
  },
  {
    id: 2,
    name: "Trần Thị Mai",
    role: "Data Analyst tại Vingroup",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content:
      "Khóa học Data Science giúp tôi chuyển ngành thành công. Cách giảng dạy dễ hiểu, có nhiều bài tập thực hành và dự án thực tế.",
    rating: 5,
    course: "Data Science Bootcamp",
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    role: "Full Stack Developer tại Shopee",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    content:
      "Tôi đã học rất nhiều khóa học trên MathLearning. Chất lượng video tuyệt vời, hỗ trợ nhanh chóng và cộng đồng rất thân thiện.",
    rating: 5,
    course: "Node.js & MongoDB Masterclass",
  },
];

export function Testimonials() {
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
            Học viên <span className="gradient-text">nói gì</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hàng nghìn học viên đã thành công trong sự nghiệp nhờ MathLearning
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg h-full flex flex-col">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 mb-6 flex-grow">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Course */}
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-primary-500 font-medium">
                    📚 {testimonial.course}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

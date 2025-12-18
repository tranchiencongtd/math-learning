"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function CallToAction() {
  return (
    <section className="py-20 bg-hero-pattern">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu hành trình của bạn?
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Tham gia cùng hơn 50,000 học viên đang học tập mỗi ngày trên MathLearning. 
            Đăng ký miễn phí và bắt đầu học ngay hôm nay!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Đăng ký miễn phí
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/courses"
              className="btn bg-white/20 text-white border border-white/30 hover:bg-white/30 px-8 py-4 text-lg"
            >
              Xem khóa học
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

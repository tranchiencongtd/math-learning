"use client";

import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  TrophyIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: AcademicCapIcon,
    title: "Giảng viên chất lượng",
    description: "Học từ các chuyên gia hàng đầu trong ngành với nhiều năm kinh nghiệm thực tế.",
  },
  {
    icon: ClockIcon,
    title: "Học mọi lúc mọi nơi",
    description: "Truy cập không giới hạn vào tất cả các khóa học, học theo tốc độ của riêng bạn.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Đa nền tảng",
    description: "Học trên máy tính, điện thoại hoặc máy tính bảng với trải nghiệm liền mạch.",
  },
  {
    icon: TrophyIcon,
    title: "Chứng chỉ được công nhận",
    description: "Nhận chứng chỉ hoàn thành được các doanh nghiệp công nhận.",
  },
  {
    icon: UserGroupIcon,
    title: "Cộng đồng học tập",
    description: "Tham gia cộng đồng sôi động với hàng nghìn học viên và giảng viên.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Cam kết hoàn tiền",
    description: "Hoàn tiền 100% trong vòng 30 ngày nếu bạn không hài lòng.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-primary-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Tại sao chọn <span className="text-primary-300">MathLearning</span>?
          </motion.h2>
          <p className="text-primary-200 max-w-2xl mx-auto text-lg">
            Chúng tôi cam kết mang đến trải nghiệm học tập tốt nhất cho bạn
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-primary-800/50 rounded-2xl p-6 border border-primary-700 hover:bg-primary-800 hover:border-primary-500 transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-primary-200 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

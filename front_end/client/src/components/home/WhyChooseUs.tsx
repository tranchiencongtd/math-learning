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
    <section className="py-20 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Tại sao chọn <span className="text-primary-400">MathLearning</span>?
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm học tập tốt nhất cho bạn
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary-500/50 transition-all duration-300">
                <div className="w-14 h-14 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

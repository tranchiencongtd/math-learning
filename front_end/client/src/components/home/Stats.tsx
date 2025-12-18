"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50,000+", label: "Học viên", icon: "👨‍🎓" },
  { value: "500+", label: "Khóa học", icon: "📚" },
  { value: "100+", label: "Giảng viên", icon: "👨‍🏫" },
  { value: "98%", label: "Hài lòng", icon: "⭐" },
];

export function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

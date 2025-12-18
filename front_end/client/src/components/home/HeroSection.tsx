"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon, ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-hero-pattern min-h-[90vh] flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6">
              🎓 Hơn 10,000 học viên đang học
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Toán thầy Công
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300">
                ....................
              </span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl">
              Nền tảng học trực tuyến hàng đầu với các khóa học chất lượng cao từ các chuyên gia.
              Bắt đầu hành trình phát triển kỹ năng của bạn ngay hôm nay.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Khám phá khóa học
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="btn bg-white/20 text-white border border-white/30 hover:bg-white/30 px-8 py-4 text-lg"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Xem giới thiệu
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-gray-300 mb-4">Được dạy bởi các thầy cô nhiều kinh nghiệm</p>
              <div className="flex items-center gap-8 opacity-60">
                <div className="text-white text-xl font-bold">Thầy Trần Chiến</div>
                <div className="text-white text-xl font-bold">Thầy Công</div>
                <div className="text-white text-xl font-bold">Cô Hạnh</div>
                <div className="text-white text-xl font-bold">...</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative w-full h-[650px]">
                <Image
                  src="https://raw.githubusercontent.com/toanthaycong/toanthaycong.github.io/refs/heads/main/assets/images/home/2.png"
                  alt="Toán thầy Công"
                  fill
                  className="object-contain scale-150"
                  priority
                />
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hoàn thành</p>
                    <p className="text-sm text-gray-500">Khóa học</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Chứng chỉ</p>
                    <p className="text-sm text-gray-500">Được công nhận</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/WTx_d1E3Sbo?autoplay=1"
                title="Video giới thiệu"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

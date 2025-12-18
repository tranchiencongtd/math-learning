"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Khóa học", href: "/courses" },
  { name: "Lộ trình", href: "/learning-paths" },
  { name: "Giảng viên", href: "/instructors" },
  { name: "Về chúng tôi", href: "/about" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container-custom" aria-label="Global">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Math<span className="text-primary-500">Learning</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-700 hover:text-primary-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search & Auth */}
          <div className="flex items-center gap-x-4">
            {/* Search - Inline */}
            <div ref={searchRef} className="relative flex items-center">
              <div
                className={`flex items-center overflow-hidden transition-all duration-200 ${
                  searchOpen ? "w-48 md:w-64" : "w-0"
                }`}
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full h-9 px-3 text-sm border border-gray-300 rounded-lg outline-none"
                />
              </div>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-gray-500 hover:text-primary-500 hover:bg-gray-100 rounded-xl transition-colors ml-1"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-x-4">
              <Link
                href="/login"
                className="text-base font-medium text-gray-700 hover:text-primary-500 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="btn btn-primary text-base py-2 px-5"
              >
                Bắt đầu học
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container-custom py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-base font-medium text-gray-700 hover:text-primary-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t flex flex-col gap-3">
                <Link href="/login" className="btn btn-secondary">
                  Đăng nhập
                </Link>
                <Link href="/register" className="btn btn-primary">
                  Bắt đầu học
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

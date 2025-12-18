import Link from "next/link";

const footerLinks = {
  platform: [
    { name: "Khóa học", href: "/courses" },
    { name: "Lộ trình học", href: "/learning-paths" },
    { name: "Giảng viên", href: "/instructors" },
    { name: "Doanh nghiệp", href: "/enterprise" },
  ],
  company: [
    { name: "Về chúng tôi", href: "/about" },
    { name: "Tuyển dụng", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Liên hệ", href: "/contact" },
  ],
  support: [
    { name: "Trung tâm trợ giúp", href: "/help" },
    { name: "Điều khoản sử dụng", href: "/terms" },
    { name: "Chính sách bảo mật", href: "/privacy" },
    { name: "FAQ", href: "/faq" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "YouTube", href: "#", icon: "youtube" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Twitter", href: "#", icon: "twitter" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-white">
                Math<span className="text-primary-400">Learning</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Nền tảng học trực tuyến hàng đầu với các khóa học chất lượng cao từ các chuyên gia.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Nền tảng</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Công ty</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} MathLearning. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Powered by .NET 10 & Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}

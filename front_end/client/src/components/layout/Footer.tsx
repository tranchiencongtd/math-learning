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
  { 
    name: "Facebook", 
    href: "#", 
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    hoverColor: "hover:bg-blue-600"
  },
  { 
    name: "TikTok", 
    href: "#", 
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    ),
    hoverColor: "hover:bg-black"
  },
  { 
    name: "Zalo", 
    href: "#", 
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.08c-.18.227-.482.378-.794.378H7.764c-.624 0-.987-.56-.687-1.058l4.03-6.747H7.764a.677.677 0 01-.677-.677v-.474c0-.374.303-.677.677-.677h8.47c.624 0 .987.56.687 1.058l-4.03 6.747h3.343c.374 0 .677.303.677.677v.474a.677.677 0 01-.017.299z"/>
      </svg>
    ),
    hoverColor: "hover:bg-blue-500"
  },
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
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${item.hoverColor} transition-colors`}
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
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

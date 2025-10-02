import {
  Send,
  MessageCircle,
  Twitter,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import { QuickLinks } from "../shared/constants/footer";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800/50">
      <div className="container mx-auto px-4 py-12">
        {/* Logo &  Links */}

        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-start md:gap-20 max-w-3xl">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 via-red-600 to-pink-600 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white drop-shadow-md"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="pl-4">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  WatchParty
                </h1>
                <p className="text-xs text-zinc-400 font-medium">
                  Xem phim cùng bạn bè
                </p>
              </div>
            </div>
          </Link>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-zinc-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Send className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-zinc-800 hover:bg-indigo-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-zinc-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-zinc-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-zinc-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-zinc-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        <div className="mt-10 space-y-6 text-left">
          {/* Menu */}
          <div className="flex flex-wrap gap-6 text-zinc-200 text-sm font-medium ">
            {QuickLinks.map((item) => (
              <ul key={item.id}>
                <li className="hover:text-orange-300 cursor-pointer">
                  {item.title}
                </li>
              </ul>
            ))}
          </div>

          {/* Description */}
          <p className="max-w-3xl text-zinc-400 text-sm leading-relaxed">
            WatchParty – Xem phim online cùng bạn bè. Kho phim đa dạng từ Việt
            Nam, Hàn Quốc, Trung Quốc, Mỹ, Nhật Bản, Âu... với chất lượng cao.
            Trải nghiệm phim trực tuyến 2024 chất lượng 4K!
          </p>

          {/* Copyright */}
          <p className="text-zinc-400 text-sm">© 2024 WatchParty</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

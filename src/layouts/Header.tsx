import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, LogOut, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../shared/hooks/useAuth";

export default function Header() {
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    toast.success("Đăng xuất thành công!");
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/80 shadow-2xl shadow-black/20">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-all duration-300 group"
          >
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
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                WatchParty
              </h1>
              <p className="text-xs text-zinc-400 font-medium">
                Xem phim cùng bạn bè
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm phim, phòng xem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-md font-medium">
            <Link
              to="/"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              to="/"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Phim
            </Link>
            <Link
              to="/"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Phòng xem
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-all duration-300 border border-zinc-700"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium hidden sm:inline">
                    {username}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-zinc-800">
                      <p className="text-sm text-zinc-400">Xin chào!</p>
                      <p className="text-white font-semibold">{username}</p>
                    </div>
                    <button
                      onClick={handleSettings}
                      className="w-full px-4 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Cài đặt
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-orange-500/25"
              >
                <User className="w-5 h-5" />
                <span>Thành viên</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

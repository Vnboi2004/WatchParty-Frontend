import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-zinc-700 flex items-center justify-center p-4">
      <form className="w-full max-w-xl bg-zinc-900 border border-zinc-800/50 rounded-2xl shadow-lg shadow-orange-500/10 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
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
        </div>

        <h1 className="text-3xl font-bold text-center mb-10 text-white">
          Đăng nhập
        </h1>

        <div className="flex flex-col gap-6 max-w-sm mx-auto px-6">
          {/* Email Field */}
          <div>
            <label className="text-zinc-200 text-sm font-medium mb-2 block">
              Tên đăng nhập
            </label>
            <input
              type="text"
              placeholder="Email hoặc SĐT"
              className="bg-zinc-800 text-white p-3 px-4 outline-none border border-zinc-700 rounded-xl w-full transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:bg-zinc-750"
            />
            <p className="text-sm text-red-400 mt-2 min-h-[20px]"></p>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-zinc-200 text-sm font-medium mb-2 block">
              Mật khẩu
            </label>
            <div className="relative w-full">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="bg-zinc-800 text-white p-3 px-4 outline-none border border-zinc-700 rounded-xl w-full transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:bg-zinc-750"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm select-none">
                Hiện
              </span>
            </div>
            <p className="text-sm text-red-400 mt-2 min-h-[20px]"></p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-zinc-400 hover:text-orange-300 transition-colors duration-300 hover:underline"
            >
              Quên mật khẩu?
            </Link>
            <button
              type="submit"
              className="bg-gradient-to-br from-orange-500 to-pink-600 px-8 py-3 rounded-xl text-white font-medium hover:from-orange-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25"
            >
              Đăng nhập
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center pt-6 border-t border-zinc-800/50">
            <p className="text-zinc-400 text-sm">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-orange-400 hover:text-orange-300 transition-colors duration-300 font-medium hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

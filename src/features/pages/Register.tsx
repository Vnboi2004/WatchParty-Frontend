import { Link } from "react-router-dom";
const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-zinc-700 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800/50 rounded-2xl shadow-lg shadow-orange-500/10 py-8">
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

        <form className="px-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Đăng ký tài khoản
          </h1>

          <div className="flex flex-col gap-5 max-w-md mx-auto">
            {/* Email */}
            <div>
              <label className="text-zinc-200 text-sm font-medium mb-2 block">
                Email
              </label>
              <input
                type="text"
                placeholder="Nhập địa chỉ email"
                className="bg-zinc-800 text-white p-3 outline-none border border-zinc-700 rounded-xl w-full transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:bg-zinc-750"
              />
              <div className="text-sm text-red-400 mt-2 min-h-[20px]"></div>
            </div>

            {/* Password */}
            <div>
              <label className="text-zinc-200 text-sm font-medium mb-2 block">
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="bg-zinc-800 text-white p-3 outline-none border border-zinc-700 rounded-xl w-full transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:bg-zinc-750"
              />
              <div className="text-sm text-red-400 mt-2 min-h-[20px]"></div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-zinc-200 text-sm font-medium mb-2 block">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                className="bg-zinc-800 text-white p-3 outline-none border border-zinc-700 rounded-xl w-full transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:bg-zinc-750"
              />
              <div className="text-sm text-red-400 mt-2 min-h-[20px]"></div>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-zinc-200 text-sm font-medium mb-2 block">
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className="bg-zinc-800 text-white p-3 outline-none border border-zinc-700 rounded-xl w-full transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:bg-zinc-750"
              />
              <div className="text-sm text-red-400 mt-2 min-h-[20px]"></div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-zinc-200 text-sm font-medium mb-2 block">
                Số điện thoại
              </label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                className="bg-zinc-800 text-white p-3 outline-none border border-zinc-700 rounded-xl w-full transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 hover:bg-zinc-750"
              />
              <div className="text-sm text-red-400 mt-2 min-h-[20px]"></div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-gradient-to-br from-orange-500 to-pink-600 px-12 py-3 rounded-xl text-white font-medium hover:from-orange-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full max-w-xs"
              >
                Đăng ký
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-6 border-t border-zinc-800/50 mt-4">
              <p className="text-zinc-400 text-sm">
                Đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="text-orange-400 hover:text-orange-300 transition-colors duration-300 font-medium hover:underline"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

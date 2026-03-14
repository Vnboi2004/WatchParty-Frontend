import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../shared/hooks/useAuth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ. Vui lòng kiểm tra lại!");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);

    try {
      await register({ username, email, password });
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-600/5 to-pink-600/5"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-zinc-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-zinc-900 to-transparent"></div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col lg:flex-row bg-zinc-900 border border-zinc-800/50 rounded-2xl shadow-2xl shadow-orange-500/10 overflow-hidden">
        {/* Left Side: Image */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-orange-500/20 to-pink-600/20 relative">
          <img
            src="cinema-seats-background.jpg"
            alt="WatchParty Illustration"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Tham gia ngay!</h2>
            <p className="text-zinc-300">
              Tạo tài khoản để khám phá thế giới phim ảnh cùng bạn bè.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-1/2 p-8 flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Đăng ký
          </h1>
          {error && (
            <div className="bg-red-900/50 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all disabled:opacity-50"
                placeholder="Tên đăng nhập"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-600 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all disabled:opacity-50"
                placeholder="Email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-10 py-3 bg-zinc-800/50 border border-zinc-600 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all disabled:opacity-50"
                placeholder="Mật khẩu"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-10 py-3 bg-zinc-800/50 border border-zinc-600 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all disabled:opacity-50"
                placeholder="Xác nhận mật khẩu"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 text-white py-3 rounded-md font-semibold hover:opacity-90 transition-all duration-300 shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-zinc-400 text-sm">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-orange-400 hover:text-orange-300 transition-colors duration-300 font-medium hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

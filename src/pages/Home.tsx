import { useNavigate } from "react-router-dom";
import { useHome } from "../shared/hooks/useHome";
import { Play, Users, VideoIcon, VideoOff } from "lucide-react";

export default function Home() {
  const {
    liveRooms,
    movies,
    selectedMovie,
    setSelectedMovie,
    showCreateModal,
    setShowCreateModal,
    showManualCreateModal,
    setShowManualCreateModal,
    roomName,
    setRoomName,
    youtubeId,
    setYoutubeId,
    loading,
    handleMovieClick,
    handleManualCreate,
    handleSubmitCreateRoom,
    handleSubmitManualCreate,
    handleJoinRoom,
  } = useHome();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <div
        className="relative h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/cinema-seats-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-10">
            Xem Phim Cùng Bạn Bè
          </h1>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Quản lý
            </button>
            <button
              onClick={handleManualCreate}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-orange-500/25"
            >
              <Play className="w-5 h-5" />
              Tạo mới
            </button>
          </div>
        </div>
      </div>

      {/* Công Chiếu Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Công Chiếu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Movie Card 1 */}
          <div className="relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 cursor-pointer">
            <div className="relative h-64 overflow-hidden">
              <img
                src="/home-card1-doremon.jpg"
                alt="Doraemon"
                className="w-full h-full object-cover transition-transform duration-300"
              />
              <div className="absolute bottom-1 left-3 bg-black/80 border-red-600 border-2 text-red-600 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
                <VideoOff strokeWidth={2.5} className="w-3 h-3" />
                Đã kết thúc
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold mb-2">
                [S13] Doraemon - Tuyển Tập 6 - Tổng Hợp Doraemon Mùa 13 Lồng
                Tiếng Mới Nhất
              </h3>
              <p className="text-zinc-400 text-sm">P.1 - T.26 - Doraemon</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-orange-500 text-sm font-semibold">
                  Bộ Phim
                </span>
                <span className="text-zinc-500 text-sm">• 2 tháng trước</span>
              </div>
            </div>
          </div>

          {/* Movie Card 2 */}
          <div className="relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 cursor-pointer">
            <div className="relative h-64 overflow-hidden">
              <img
                src="/home-card2-conan.jpg"
                alt="Thám Tử Lừng Danh Conan"
                className="w-full h-full object-cover transition-transform duration-300"
              />
              <div className="absolute bottom-1 left-3 bg-black/80 border-red-600 border-2 text-red-600 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
                <VideoOff strokeWidth={2.5} className="w-3 h-3" />
                Đã kết thúc
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold  mb-2">
                Thám Tử Lừng Danh Conan - Tập 939 | Ma Bom Nhảy Ra Khỏi Cuốn
                Sách Hình Nổi (P2)
              </h3>
              <p className="text-zinc-400 text-sm">
                Thánm Tử Lừng Danh Conan - Tập 939 | Ma Bom Nhảy Ra Khởi
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-orange-500 text-sm font-semibold">
                  Bộ Phim
                </span>
                <span className="text-zinc-500 text-sm">• 2 tháng trước</span>
              </div>
            </div>
          </div>

          {/* Movie Card 3 */}
          <div className="relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 cursor-pointer">
            <div className="relative h-64 overflow-hidden">
              <img
                src="/home-card3-kny.jpg"
                alt="Kimetsu No Yaiba"
                className="w-full h-full object-cover transition-transform duration-300"
              />
              <div className="absolute bottom-1 left-3 bg-black/80 border-red-600 border-2 text-red-600 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
                <VideoOff strokeWidth={2.5} className="w-3 h-3" />
                Đã kết thúc
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">
                FULL MOVIE - Pháo Đài Vô Cực | Thanh Gươm Diệt Quỷ - Kimetsu No
                Yaiba | Anime79 Review
              </h3>
              <p className="text-zinc-400 text-sm">
                FULL MOVIE - Pháo Đài Vô Cực | Thanh Gươm Diệt Qủy - Kimetsu No
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-orange-500 text-sm font-semibold">
                  Bộ Phim
                </span>
                <span className="text-zinc-500 text-sm">• 2 tháng trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chọn Video Để Tạo Phòng Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <VideoIcon className="w-8 h-8 text-orange-500" />
            Chọn Video Để Tạo Phòng
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={
                    movie.thumbnailUrl ||
                    `https://img.youtube.com/vi/${movie.youTubeId}/hqdefault.jpg`
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-orange-500 rounded-full p-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{movie.title}</h3>
                <p className="text-zinc-400 text-sm">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Xem Chung Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Xem Chung</h2>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition border border-zinc-700">
              Mới nhất
            </button>
            <button className="px-4 py-2 bg-zinc-900 text-zinc-400 rounded-lg hover:bg-zinc-800 transition border border-zinc-800">
              Phổ biến
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => handleJoinRoom(room.roomCode)}
              className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${room.youTubeId}/hqdefault.jpg`}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                  LIVE
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <span className="font-mono">{room.roomCode}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{room.name}</h3>
                <p className="text-zinc-400 text-sm">Nhấn để tham gia</p>
              </div>
            </div>
          ))}

          <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src="/home-faptv.jpg"
                alt="FAPtv"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-3 bg-black/80 border-red-600 border-2 text-red-600 text-xs px-3 py-1.5 rounded-md flex items-center gap-2">
                <VideoOff strokeWidth={2.5} className="h-3 w-3" />
                Đã kết thúc
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">
                FAPtv Cơm Nguội: Tập 243 - Mảnh Đất Quê Hương (Phim HÀI TẾT
                2021)
              </h3>
              <p className="text-zinc-400 text-sm">Đã kết thúc 2 giờ trước</p>
            </div>
          </div>

          <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src="/home-khoailangthang.jpg"
                alt="khoailangthang"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-3 bg-black/80 border-red-600 border-2 text-red-600 text-xs px-3 py-1.5 rounded-md flex items-center gap-2">
                <VideoOff strokeWidth={2.5} className="h-3 w-3" />
                Đã kết thúc
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">
                Khoai du lịch bằng nhà di động ở Châu Âu |Hành trình Thụy Sĩ -
                Đức - Áo
              </h3>
              <p className="text-zinc-400 text-sm">Đã kết thúc 5 giờ trước</p>
            </div>
          </div>

          <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src="/home-xomtui.jpg"
                alt="Xóm tui"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-3 bg-black/80 border-red-600 border-2 text-red-600 text-xs px-3 py-1.5 rounded-md flex items-center gap-2">
                <VideoOff strokeWidth={2.5} className="h-3 w-3" />
                Đã kết thúc
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">
                CHUYỆN XÓM TUI WEBDRAMA| FULL 3 TẬP | Má Giàu, Việt Anh, Thu
                Trang, Tiến Luật, Lê Giang,Huỳnh Phương
              </h3>
              <p className="text-zinc-400 text-sm">Đã kết thúc 1 ngày trước</p>
            </div>
          </div>

          <div className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src="/home-cold.jpg"
                alt="Ended Room"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-3 bg-black/80 border-red-600 border-2 text-red-600 text-xs px-3 py-1.5 rounded-md flex items-center gap-2">
                <VideoOff strokeWidth={2.5} className="h-3 w-3" />
                Đã kết thúc
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-1">
                Ngôi Làng Lạnh Nhất Trái Đất (-71°C)
              </h3>
              <p className="text-zinc-400 text-sm">Đã kết thúc 1 ngày trước</p>
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-zinc-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Tạo phòng xem
            </h2>
            <div className="mb-4 p-3 bg-zinc-800 rounded-lg border border-zinc-700">
              <p className="text-zinc-400 text-sm mb-1">Video đã chọn:</p>
              <p className="text-white font-semibold">{selectedMovie.title}</p>
            </div>
            <form onSubmit={handleSubmitCreateRoom} className="space-y-4">
              <div>
                <label className="block text-zinc-300 font-medium mb-2">
                  Tên phòng
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="VD: Phòng xem phim của tôi"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setSelectedMovie(null);
                  }}
                  className="flex-1 px-4 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition border border-zinc-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-orange-500/25"
                >
                  {loading ? "Đang tạo..." : "Tạo phòng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showManualCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-zinc-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Tạo phòng thủ công
            </h2>
            <form onSubmit={handleSubmitManualCreate} className="space-y-4">
              <div>
                <label className="block text-zinc-300 font-medium mb-2">
                  Tên phòng
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="VD: Phòng xem phim của tôi"
                  required
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-medium mb-2">
                  YouTube Video ID
                </label>
                <input
                  type="text"
                  value={youtubeId}
                  onChange={(e) => setYoutubeId(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="VD: jfKfPfyJRdk"
                  required
                />
                <p className="text-zinc-500 text-xs mt-1">
                  Lấy ID từ URL YouTube: youtube.com/watch?v=
                  <span className="text-orange-500">jfKfPfyJRdk</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowManualCreateModal(false)}
                  className="flex-1 px-4 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition border border-zinc-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-orange-500/25"
                >
                  {loading ? "Đang tạo..." : "Tạo phòng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

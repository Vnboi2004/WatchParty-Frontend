import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import { apiService } from "../../services/api";
import type { Movie, Room } from "../types";

// Custom hook cho logic Home
export const useHome = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [liveRooms, setLiveRooms] = useState<Room[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showManualCreateModal, setShowManualCreateModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies();
    loadActiveRooms();
  }, []);

  const loadMovies = async () => {
    try {
      const data = await apiService.getMovies();
      setMovies(data);
    } catch (err) {
      console.error("[v0] Failed to load movies:", err);
    }
  };

  const loadActiveRooms = async () => {
    try {
      const data = await apiService.getActiveRooms();
      setLiveRooms(data);
    } catch (err) {
      console.error("[v0] Failed to load active rooms:", err);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để tạo phòng");
      navigate("/login");
      return;
    }
    setSelectedMovie(movie);
    setRoomName(`Phòng xem ${movie.title}`);
    setShowCreateModal(true);
  };

  const handleManualCreate = () => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để tạo phòng");
      navigate("/login");
      return;
    }
    setShowManualCreateModal(true);
  };

  const handleSubmitCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovie) return;
    setLoading(true);

    try {
      const room = await apiService.createRoom({
        name: roomName,
        youTubeId: selectedMovie.youTubeId,
      });
      toast.success(`Phòng đã tạo! Mã: ${room.roomCode}`);
      setShowCreateModal(false);
      navigate(`/room/${room.roomCode}`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Tạo phòng thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitManualCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const room = await apiService.createRoom({
        name: roomName,
        youTubeId: youtubeId,
      });
      toast.success(`Phòng đã tạo! Mã: ${room.roomCode}`);
      setShowManualCreateModal(false);
      navigate(`/room/${room.roomCode}`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Tạo phòng thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = (roomCode: string) => {
    if (!isAuthenticated) {
      toast.error("Vui lòng đăng nhập để tham gia phòng");
      navigate("/register");
      return;
    }
    navigate(`/room/${roomCode}`);
  };

  return {
    // States
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
    // Handlers
    handleMovieClick,
    handleManualCreate,
    handleSubmitCreateRoom,
    handleSubmitManualCreate,
    handleJoinRoom,
    loadMovies,
    loadActiveRooms,
  };
};

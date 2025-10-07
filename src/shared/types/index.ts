export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  username: string;
}

export interface Room {
  id: string;
  name: string;
  roomCode: string;
  hostId: string;
  videoUrl: string;
  currentTime: number;
  isPlaying: boolean;
  createdAt: string;
}

export interface RoomMember {
  id: string;
  roomId: string;
  userId: string;
  isHost: boolean;
  joinAt: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  sentAt: string;
}

export interface CreateRoomRequest {
  name: string;
  videoUrl?: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface FooterItem {
  id: number;
  title: string;
  link: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
}

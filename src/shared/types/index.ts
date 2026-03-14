export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
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
  youTubeId: string;
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
export interface CreateRoomRequest {
  name: string;
  youTubeId: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  sentAt: string;
}
export interface RoomState {
  youTubeId: string;
  currentTime: number;
  isPlaying: boolean;
  hostId: string;
}

export interface Movie {
  id: string;
  title: string;
  youTubeId: string;
  thumbnailUrl: string;
  description: string;
  sourceType: string;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
}

export interface ChatMsg {
  userId: string;
  username: string;
  message: string;
  isSystem?: boolean;
  timestamp?: Date;
}

export interface FooterItem {
  id: number;
  title: string;
  link: string;
}

import { useParams } from "react-router-dom";
import { useRoom } from "../shared/hooks/useRoom";
import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  MessageSquare,
  Send,
  Share2,
  Loader2,
  ChevronsRight,
  ChevronsLeft,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Room() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const {
    room,
    isHost,
    chatMessages,
    error,
    loading,
    viewerCount,
    username,
    chatBoxRef,
    playerReady,
    playerContainerRef,
    handleSeek,
    handleSync,
    handleSendChat,
    handleLeaveRoom,
  } = useRoom(roomCode);

  const [chatInput, setChatInput] = useState("");
  const [showChat, setShowChat] = useState(true);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <div className="text-2xl text-white">Đang tải phòng...</div>
          <p className="text-zinc-400 mt-2">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg max-w-md text-center">
          <p className="text-lg font-semibold mb-2">Lỗi</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLeaveRoom}
              className="p-2 hover:bg-zinc-800 rounded-lg transition text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                  LIVE
                </span>
                <h1 className="text-white font-semibold">{room?.name}</h1>
              </div>
              <p className="text-zinc-400 text-sm">Mã: {roomCode}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChat(!showChat)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              {showChat ? "Ẩn chat" : "Hiện chat"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Video Player Section */}
        <div className={`flex-1 flex flex-col ${showChat ? "" : "w-full"}`}>
          {/* YouTube Player Container */}
          <div
            ref={playerContainerRef}
            className="flex-1 bg-black flex items-center justify-center relative"
          >
            <div
              id="youtube-player"
              className="w-full h-full"
              style={{
                minHeight: "400px",
              }}
            />

            {/* Loading overlay */}
            {!playerReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                <div className="text-white text-lg flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                  <p>Loading video...</p>
                </div>
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="bg-zinc-900 border-t border-zinc-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {username?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {username}
                    </p>
                    <p className="text-zinc-400 text-xs">
                      {isHost ? "👑 Host" : "Người xem"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{viewerCount} đang xem</span>
                </div>

                {isHost && playerReady && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSeek(-5)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition text-sm"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSeek(5)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition text-sm"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {!isHost && playerReady && (
                  <button
                    onClick={handleSync}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition text-sm flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Đồng bộ
                  </button>
                )}

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(roomCode!);
                    toast.success("Đã copy mã phòng!");
                  }}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition text-zinc-400"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat ? (
          <div className="w-96 bg-zinc-900 border-l border-zinc-800 flex flex-col">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                <h3 className="text-white font-semibold">Chat</h3>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-zinc-400 hover:text-white transition text-sm"
              >
                Ẩn
              </button>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatBoxRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            >
              {chatMessages.map((msg, idx) => {
                const isOwnMessage = msg.username === username;
                const timestamp = msg.timestamp
                  ? formatTime(msg.timestamp)
                  : formatTime(new Date());

                return (
                  <div key={idx}>
                    {msg.isSystem ? (
                      <div className="flex justify-center my-2">
                        <div className="bg-zinc-800/50 text-zinc-400 text-xs px-3 py-1 rounded-full">
                          {msg.message}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex ${
                          isOwnMessage ? "justify-end" : "justify-start"
                        } mb-2`}
                      >
                        <div
                          className={`flex gap-2 max-w-[80%] ${
                            isOwnMessage ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          {/* Avatar */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                              isOwnMessage
                                ? "bg-gradient-to-br from-orange-500 to-pink-600"
                                : "bg-gradient-to-br from-blue-500 to-purple-600"
                            }`}
                          >
                            {msg.username[0]?.toUpperCase()}
                          </div>

                          {/* Message bubble */}
                          <div
                            className={`flex flex-col ${
                              isOwnMessage ? "items-end" : "items-start"
                            }`}
                          >
                            {/* Username - only show for other users */}
                            {!isOwnMessage && (
                              <p className="text-zinc-400 text-xs mb-1 px-1">
                                {msg.username}
                              </p>
                            )}

                            {/* Message content */}
                            <div
                              className={`rounded-2xl px-4 py-2 ${
                                isOwnMessage
                                  ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-tr-sm"
                                  : "bg-zinc-800 text-white rounded-tl-sm"
                              }`}
                            >
                              <p className="text-sm break-words">
                                {msg.message}
                              </p>
                            </div>

                            {/* Timestamp */}
                            <p className="text-zinc-500 text-[10px] mt-1 px-1">
                              {timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <div className="px-4 py-3 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && chatInput.trim()) {
                      e.preventDefault();
                      handleSendChat(chatInput).then(() => setChatInput(""));
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  placeholder="Nhắn tin..."
                />
                <button
                  onClick={async () => {
                    if (chatInput.trim()) {
                      await handleSendChat(chatInput);
                      setChatInput("");
                    }
                  }}
                  disabled={!chatInput.trim()}
                  className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="m-4">
            <button
              onClick={() => setShowChat(true)}
              className="fixed right-4 z-50 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-2 rounded-md shadow-lg hover:opacity-90 transition flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-semibold">Hiện chat</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

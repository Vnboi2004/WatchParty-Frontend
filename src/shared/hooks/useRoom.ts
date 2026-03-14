import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Room as RoomType, RoomState, ChatMsg } from "../types";
import { signalRService } from "../../services/signalr";
import * as signalR from "@microsoft/signalr";
import toast from "react-hot-toast";
import { apiService } from "../../services/api";
import { useAuth } from "./useAuth";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    ytApiReady?: boolean;
  }
}

export const useRoom = (roomCode: string | undefined) => {
  const { token, userId, username } = useAuth();
  const navigate = useNavigate();

  const [room, setRoom] = useState<RoomType | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [viewerCount, setViewerCount] = useState(1);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const isLeavingRef = useRef(false);
  const pendingSyncRef = useRef<RoomState | null>(null);
  const initializingRef = useRef(false); // ✅ Prevent multiple inits
  const hasJoinedRef = useRef(false); // ✅ Track if already joined

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        console.log("[useRoom] YouTube API already loaded");
        window.ytApiReady = true;
        return;
      }

      if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        console.log("[useRoom] YouTube API script already exists");
        return;
      }

      console.log("[useRoom] Loading YouTube API script...");
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        console.log("[useRoom] ✅ YouTube API Ready");
        window.ytApiReady = true;
      };
    };

    loadYouTubeAPI();
  }, []);

  useEffect(() => {
    if (!token || !roomCode) {
      setError("Yêu cầu đăng nhập để tham gia phòng");
      setLoading(false);
      navigate("/login");
      return;
    }

    if (initializingRef.current) {
      console.log("[useRoom] Already initializing, skip");
      return;
    }

    initializingRef.current = true;
    isLeavingRef.current = false;
    hasJoinedRef.current = false;

    initializeRoom();

    return () => {
      console.log("[useRoom] Component unmounting, cleanup");
      cleanupRoom();
    };
  }, [roomCode, token]); 

  useEffect(() => {
    console.log("[useRoom] Player init check:", {
      hasContainer: !!playerContainerRef.current,
      hasRoom: !!room,
      videoId: room?.youTubeId,
      hasPlayer: !!playerRef.current,
      ytReady: !!(window.YT && window.YT.Player && window.ytApiReady),
    });

    if (!playerContainerRef.current || !room?.youTubeId || playerRef.current) {
      return;
    }

    if (!window.YT || !window.YT.Player) {
      console.log("[useRoom] YouTube API not ready, retrying in 500ms...");
      const timer = setTimeout(() => {
        if (room?.youTubeId && !playerRef.current) {
          initializeYouTubePlayer(room.youTubeId);
        }
      }, 500);
      return () => clearTimeout(timer);
    }

    console.log("[useRoom] Initializing YouTube player NOW");
    initializeYouTubePlayer(room.youTubeId);
  }, [room, playerContainerRef.current]); // ✅ Watch full room object and container

  const cleanupRoom = async () => {
    console.log("[useRoom] Cleanup starting...");
    isLeavingRef.current = true;
    hasJoinedRef.current = false;
    initializingRef.current = false;

    const conn = signalRService.getConnection();
    if (conn) {
      conn.off("OnUserJoin");
      conn.off("OnUserLeave");
      conn.off("OnPlay");
      conn.off("OnPause");
      conn.off("OnSeek");
      conn.off("OnChangeVideo");
      conn.off("ReceiveChat");
      conn.off("ReceiveRoomState");
      conn.off("OnHostChanged");
      conn.off("Error");
    }

    if (connected && roomCode) {
      try {
        await signalRService.leaveRoom(roomCode);
      } catch (err) {
        console.warn("[useRoom] Leave room error:", err);
      }
    }

    await signalRService.disconnect();

    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (err) {
        console.warn("[useRoom] Player destroy error:", err);
      }
      playerRef.current = null;
    }

    setConnected(false);
    setPlayerReady(false);
    pendingSyncRef.current = null;
  };

  const initializeRoom = async () => {
    setLoading(true);
    setError("");
    pendingSyncRef.current = null;

    try {
      console.log("[useRoom] Initializing room:", roomCode);

      const roomData = await apiService.getRoomByCode(roomCode!);
      console.log("[useRoom] Room data:", roomData);

      if (!roomData) {
        throw new Error("Phòng không tồn tại");
      }

      setRoom(roomData);
      const isHostUser = roomData.hostId === userId;
      setIsHost(isHostUser);
      console.log("[useRoom] Is host:", isHostUser);

      console.log("[useRoom] Connecting SignalR...");
      await signalRService.connect(token!);
      setConnected(true);
      console.log("[useRoom] SignalR connected");

      const conn = signalRService.getConnection()!;
      setupSignalRListeners(conn, isHostUser);

      console.log("[useRoom] Joining room...");
      await signalRService.joinRoom(roomCode!);
      hasJoinedRef.current = true;
      console.log("[useRoom] Joined successfully");

      // ✅ Wait for room state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("[useRoom] Requesting host state...");
      await signalRService.requestHostState(roomCode!);

      setLoading(false);
      initializingRef.current = false; // ✅ Done initializing
      console.log("[useRoom] Initialization complete");
    } catch (err: any) {
      console.error("[useRoom] Init error:", err);

      const errorMsg = err.message || "Không thể tham gia phòng";
      toast.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      initializingRef.current = false;

      await signalRService.disconnect();
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const initializeYouTubePlayer = (videoId: string) => {
    if (playerRef.current) {
      console.log("[useRoom] Player already exists");
      return;
    }

    const container = document.getElementById("youtube-player");
    if (!container) {
      console.error("[useRoom] Container not found!");
      return;
    }

    if (!window.YT || !window.YT.Player) {
      console.warn("[useRoom] YT not ready, retrying...");
      setTimeout(() => initializeYouTubePlayer(videoId), 500);
      return;
    }

    try {
      console.log("[useRoom] 🎬 Creating player for:", videoId);

      playerRef.current = new window.YT.Player("youtube-player", {
        height: "100%",
        width: "100%",
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: isHost ? 1 : 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            console.log("[useRoom] ✅✅✅ Player READY!");
            setPlayerReady(true);

            if (pendingSyncRef.current) {
              console.log(
                "[useRoom] Syncing pending state:",
                pendingSyncRef.current
              );
              setTimeout(() => {
                syncPlayerState(pendingSyncRef.current!);
                pendingSyncRef.current = null;
              }, 1000);
            }
          },
          onStateChange: (event: any) => {
            if (!isHost || !playerRef.current) return;

            const currentTime = playerRef.current.getCurrentTime();

            if (event.data === window.YT.PlayerState.PLAYING) {
              signalRService.play(roomCode!, currentTime).catch(console.error);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              signalRService.pause(roomCode!, currentTime).catch(console.error);
            }
          },
          onError: (event: any) => {
            console.error("[useRoom] ❌ Player error:", event.data);
            let errorMsg = "Lỗi phát video";

            switch (event.data) {
              case 2:
                errorMsg = "Video ID không hợp lệ";
                break;
              case 5:
                errorMsg = "Lỗi HTML5 player";
                break;
              case 100:
                errorMsg = "Video không tồn tại";
                break;
              case 101:
              case 150:
                errorMsg = "Video không cho phép nhúng";
                break;
            }

            toast.error(errorMsg);
          },
        },
      });

      console.log("[useRoom] ✅ Player instance created");
    } catch (err) {
      console.error("[useRoom] ❌ Player init error:", err);
      toast.error("Lỗi khởi tạo player");
    }
  };

  const setupSignalRListeners = (
    conn: signalR.HubConnection,
    hostFlag: boolean
  ) => {
    console.log("[useRoom] Setup listeners, isHost:", hostFlag);

    conn.off("OnUserJoin");
    conn.off("OnUserLeave");
    conn.off("OnPlay");
    conn.off("OnPause");
    conn.off("OnSeek");
    conn.off("OnChangeVideo");
    conn.off("ReceiveChat");
    conn.off("ReceiveRoomState");
    conn.off("OnHostChanged");
    conn.off("Error");

    conn.on("OnUserJoin", (uid: string, uname: string, count: number) => {
      if (uid !== userId) {
        addSystemMessage(`${uname} đã vào phòng`);
      }
      setViewerCount(count);
    });

    conn.on("OnUserLeave", (uid: string, uname: string, count: number) => {
      addSystemMessage(`${uname} đã rời phòng`);
      setViewerCount(count);
    });

    conn.on("OnPlay", (time: number) => {
      console.log("[useRoom] 📢 Play command:", time);
      if (!hostFlag && playerRef.current) {
        try {
          playerRef.current.seekTo(time, true);
          playerRef.current.playVideo();
        } catch (err) {
          console.error("[useRoom] Play error:", err);
        }
      }
    });

    conn.on("OnPause", (time: number) => {
      console.log("[useRoom] 📢 Pause command:", time);
      if (!hostFlag && playerRef.current) {
        try {
          playerRef.current.seekTo(time, true);
          playerRef.current.pauseVideo();
        } catch (err) {
          console.error("[useRoom] Pause error:", err);
        }
      }
    });

    conn.on("OnSeek", (time: number) => {
      console.log("[useRoom] 📢 Seek command:", time);
      if (!hostFlag && playerRef.current) {
        try {
          playerRef.current.seekTo(time, true);
        } catch (err) {
          console.error("[useRoom] Seek error:", err);
        }
      }
    });

    conn.on("OnChangeVideo", (youTubeId: string) => {
      if (playerRef.current) {
        playerRef.current.loadVideoById(youTubeId);
      }
      addSystemMessage("Video đã được thay đổi");
      setRoom((prev) => (prev ? { ...prev, youTubeId } : null));
    });

    conn.on("ReceiveChat", (uid: string, uname: string, msg: string) => {
      setChatMessages((prev) => [
        ...prev,
        { userId: uid, username: uname, message: msg, isSystem: false },
      ]);
    });

    conn.on("ReceiveRoomState", (state: RoomState) => {
      console.log("[useRoom] 📢 Room state received:", state);

      if (playerRef.current) {
        try {
          const currentVideo = playerRef.current.getVideoData()?.video_id;

          if (currentVideo !== state.youTubeId) {
            console.log("[useRoom] Loading new video:", state.youTubeId);
            playerRef.current.loadVideoById(state.youTubeId);
            setTimeout(() => syncPlayerState(state), 2000);
          } else {
            syncPlayerState(state);
          }
        } catch (err) {
          console.error("[useRoom] Receive state error:", err);
          pendingSyncRef.current = state;
        }
      } else {
        console.log("[useRoom] Player not ready, queueing sync");
        pendingSyncRef.current = state;
      }

      setRoom((prev) => (prev ? { ...prev, ...state } : null));
    });

    conn.on("OnHostChanged", (newHostId: string, newHostName: string) => {
      addSystemMessage(`👑 ${newHostName} đã trở thành Host mới!`);

      const isNewHost = newHostId === userId;
      setIsHost(isNewHost);

      if (isNewHost) {
        toast.success("Bạn đã trở thành Host mới!");
      }

      if (playerRef.current && room) {
        try {
          const currentVideoId =
            playerRef.current.getVideoData()?.video_id || room.youTubeId;
          const currentTime = playerRef.current.getCurrentTime() || 0;

          playerRef.current.destroy();
          playerRef.current = null;
          setPlayerReady(false);

          setTimeout(() => {
            initializeYouTubePlayer(currentVideoId);
            setTimeout(() => {
              if (playerRef.current) {
                playerRef.current.seekTo(currentTime, true);
              }
            }, 1000);
          }, 300);
        } catch (err) {
          console.warn("[useRoom] Player recreation error:", err);
        }
      }
    });

    conn.on("Error", (errorMsg: string) => {
      console.error("[useRoom] Server error:", errorMsg);
      toast.error(errorMsg);
    });

    // ✅ CRITICAL: Don't reconnect automatically if we're leaving
    conn.onclose((err) => {
      console.log("[useRoom] Connection closed:", err);
      setConnected(false);

      if (!isLeavingRef.current) {
      }
    });

    conn.onreconnecting((err) => {
      console.log("[useRoom] Reconnecting:", err);
      setConnected(false);
    });

    conn.onreconnected(() => {
      console.log("[useRoom] Reconnected");
      setConnected(true);
      toast.success("Đã kết nối lại!");

      if (roomCode && !isLeavingRef.current && !hasJoinedRef.current) {
        signalRService.joinRoom(roomCode).catch(console.error);
        hasJoinedRef.current = true;
        signalRService.requestHostState(roomCode).catch(console.error);
      }
    });
  };

  const syncPlayerState = (state: RoomState) => {
    if (!playerRef.current) {
      console.warn("[useRoom] Cannot sync - player not exists");
      return;
    }

    console.log("[useRoom] 🔄 Syncing state:", state);

    try {
      playerRef.current.seekTo(state.currentTime, true);

      if (state.isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }

      console.log("[useRoom] ✅ Sync complete");
    } catch (err) {
      console.error("[useRoom] Sync error:", err);
    }
  };

  const addSystemMessage = useCallback((msg: string) => {
    setChatMessages((prev) => [
      ...prev,
      {
        userId: "system",
        username: "Hệ thống",
        message: msg,
        isSystem: true,
      },
    ]);
  }, []);

  const handleSeek = useCallback(
    async (seconds: number) => {
      if (
        !isHost ||
        !playerRef.current ||
        !roomCode ||
        !connected ||
        !playerReady
      ) {
        return;
      }

      try {
        const currentTime = playerRef.current.getCurrentTime();
        const newTime = Math.max(0, currentTime + seconds);

        playerRef.current.seekTo(newTime, true);
        await signalRService.seek(roomCode, newTime);
      } catch (err) {
        console.error("[useRoom] Seek error:", err);
        toast.error("Không thể tua video");
      }
    },
    [isHost, roomCode, connected, playerReady]
  );

  const handleSync = useCallback(async () => {
    if (!roomCode || !connected) {
      toast.error("Chưa kết nối đến phòng");
      return;
    }

    try {
      await signalRService.requestHostState(roomCode);
      toast.success("Đã đồng bộ với Host");
    } catch (err) {
      console.error("[useRoom] Sync error:", err);
      toast.error("Không thể đồng bộ");
    }
  }, [roomCode, connected]);

  const handleSendChat = useCallback(
    async (message: string) => {
      if (!message.trim() || !roomCode || !connected) return;

      try {
        await signalRService.sendChat(roomCode, message);
      } catch (err) {
        console.error("[useRoom] Chat error:", err);
        toast.error("Không thể gửi tin nhắn");
      }
    },
    [roomCode, connected]
  );

  const handleLeaveRoom = useCallback(async () => {
    isLeavingRef.current = true;
    hasJoinedRef.current = false;
    await cleanupRoom();
    toast.success("Đã rời phòng");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      isLeavingRef.current = true;
      await cleanupRoom();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return {
    room,
    isHost,
    chatMessages,
    error,
    loading,
    viewerCount,
    username,
    chatBoxRef,
    playerContainerRef,
    playerRef,
    playerReady,
    handleSeek,
    handleSync,
    handleSendChat,
    handleLeaveRoom,
  };
};

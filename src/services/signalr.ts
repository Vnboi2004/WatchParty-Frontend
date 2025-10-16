import * as signalR from "@microsoft/signalr";
import type { RoomState } from "../shared/types";

const HUB_URL =
  import.meta.env.VITE_HUB_URL || "http://localhost:5284/watchpartyhub";

export class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private retryCount = 0;
  private maxRetries = 5;

  async connect(token: string): Promise<signalR.HubConnection> {
    console.log("[SignalR] 🔌 Connecting to hub:", HUB_URL);
    console.log(
      "[SignalR] Token (first 30 chars):",
      token.substring(0, 30) + "..."
    );

    if (this.connection) {
      console.log("[SignalR] Closing existing connection...");
      await this.disconnect();
    }

    // ✅ CRITICAL: Pass token via accessTokenFactory
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => {
          console.log(
            "[SignalR] 🎫 accessTokenFactory called - returning token"
          );
          return token;
        },
        withCredentials: false, // Set to false for CORS
        skipNegotiation: false,
        transport:
          signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.ServerSentEvents |
          signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          // Custom retry logic
          if (retryContext.elapsedMilliseconds < 60000) {
            // Retry every 2s for first minute
            return 2000;
          }
          return null; // Stop retrying after 1 minute
        },
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // ✅ Setup connection event handlers
    this.connection.onclose((error) => {
      console.log("[SignalR] ❌ Connection closed", error);
    });

    this.connection.onreconnecting((error) => {
      console.log("[SignalR] 🔄 Reconnecting...", error);
    });

    this.connection.onreconnected((connectionId) => {
      console.log("[SignalR] ✅ Reconnected with ID:", connectionId);
      this.retryCount = 0;
    });

    try {
      console.log("[SignalR] Starting connection...");
      await this.connection.start();
      this.retryCount = 0;
      console.log(
        "[SignalR] ✅ Connected successfully with ID:",
        this.connection.connectionId
      );
      console.log("[SignalR] Connection state:", this.connection.state);
      return this.connection;
    } catch (error: any) {
      console.error(
        "[SignalR] ❌ Connect failed (attempt " +
          (this.retryCount + 1) +
          "/" +
          this.maxRetries +
          "):",
        error
      );

      // More detailed error logging
      if (error.statusCode) {
        console.error("[SignalR] HTTP Status:", error.statusCode);
      }
      if (error.message) {
        console.error("[SignalR] Error message:", error.message);
      }

      this.retryCount++;

      if (this.retryCount < this.maxRetries) {
        console.log("[SignalR] Retrying connect in 2s...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return this.connect(token);
      }

      const errorMessage =
        error.statusCode === 401
          ? "Lỗi xác thực. Vui lòng đăng nhập lại."
          : "Không thể kết nối đến SignalR. Kiểm tra mạng hoặc server.";

      throw new Error(errorMessage);
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      const state = this.connection.state;
      console.log("[SignalR] Disconnecting... Current state:", state);

      try {
        if (
          state === signalR.HubConnectionState.Connected ||
          state === signalR.HubConnectionState.Connecting
        ) {
          await this.connection.stop();
          console.log("[SignalR] ✅ Disconnected successfully");
        }
      } catch (err) {
        console.warn("[SignalR] ⚠️ Disconnect warning:", err);
      }

      this.connection = null;
    }
  }

  getConnection(): signalR.HubConnection | null {
    return this.connection;
  }

  private ensureConnected(): void {
    if (
      !this.connection ||
      this.connection.state !== signalR.HubConnectionState.Connected
    ) {
      throw new Error("SignalR không kết nối. Vui lòng thử lại.");
    }
  }

  async joinRoom(roomCode: string): Promise<void> {
    this.ensureConnected();
    console.log("[SignalR] 🚪 Joining room:", roomCode);

    try {
      await this.connection!.invoke("JoinRoom", roomCode);
      console.log("[SignalR] ✅ Joined room successfully");
    } catch (err) {
      console.error("[SignalR] ❌ Join room failed:", err);
      throw err;
    }
  }

  async leaveRoom(roomCode: string): Promise<void> {
    if (
      !this.connection ||
      this.connection.state !== signalR.HubConnectionState.Connected
    ) {
      console.warn("[SignalR] Cannot leave room - not connected");
      return;
    }

    console.log("[SignalR] 🚪 Leaving room:", roomCode);

    try {
      await this.connection.invoke("LeaveRoom", roomCode);
      console.log("[SignalR] ✅ Left room successfully");
    } catch (err) {
      console.warn("[SignalR] ⚠️ Leave room warning:", err);
    }
  }

  async play(roomCode: string, time: number): Promise<void> {
    this.ensureConnected();
    console.log("[SignalR] ▶️ Sending play:", roomCode, time);
    await this.connection!.invoke("Play", roomCode, time);
  }

  async pause(roomCode: string, time: number): Promise<void> {
    this.ensureConnected();
    console.log("[SignalR] ⏸️ Sending pause:", roomCode, time);
    await this.connection!.invoke("Pause", roomCode, time);
  }

  async seek(roomCode: string, time: number): Promise<void> {
    this.ensureConnected();
    console.log("[SignalR] ⏩ Sending seek:", roomCode, time);
    await this.connection!.invoke("Seek", roomCode, time);
  }

  async changeVideo(roomCode: string, youTubeId: string): Promise<void> {
    this.ensureConnected();
    console.log("[SignalR] 🔄 Changing video:", roomCode, youTubeId);
    await this.connection!.invoke("ChangeVideo", roomCode, youTubeId);
  }

  async requestHostState(roomCode: string): Promise<void> {
    this.ensureConnected();
    console.log("[SignalR] 📡 Requesting host state:", roomCode);
    await this.connection!.invoke("RequestHostState", roomCode);
  }

  async sendChat(roomCode: string, message: string): Promise<void> {
    this.ensureConnected();
    await this.connection!.invoke("SendChat", roomCode, message);
  }

  // Event listeners
  onUserJoin(
    callback: (userId: string, username: string, count: number) => void
  ): void {
    this.connection?.on("OnUserJoin", callback);
  }

  onUserLeave(
    callback: (userId: string, username: string, count: number) => void
  ): void {
    this.connection?.on("OnUserLeave", callback);
  }

  onPlay(callback: (time: number) => void): void {
    this.connection?.on("OnPlay", callback);
  }

  onPause(callback: (time: number) => void): void {
    this.connection?.on("OnPause", callback);
  }

  onSeek(callback: (time: number) => void): void {
    this.connection?.on("OnSeek", callback);
  }

  onChangeVideo(callback: (youTubeId: string) => void): void {
    this.connection?.on("OnChangeVideo", callback);
  }

  onReceiveChat(
    callback: (userId: string, username: string, message: string) => void
  ): void {
    this.connection?.on("ReceiveChat", callback);
  }

  onReceiveRoomState(callback: (state: RoomState) => void): void {
    this.connection?.on("ReceiveRoomState", callback);
  }

  onHostChanged(
    callback: (newHostId: string, newHostName: string) => void
  ): void {
    this.connection?.on("OnHostChanged", callback);
  }

  onError(callback: (error: string) => void): void {
    this.connection?.on("Error", callback);
  }
}

export const signalRService = new SignalRService();

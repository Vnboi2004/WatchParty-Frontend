# Cấu trúc dự án Frontend - WatchParty

```
├── src/
│   ├── app/                           # Cấu hình & core app
│   │   ├── providers/                 # Các Provider (AuthProvider, SocketProvider, ThemeProvider)
│   │   ├── router/                    # Router: routes.tsx, PrivateRoute, RoleBasedRoute
│   │   ├── store/                     # State management: react-query client, zustand/redux store
│   │   └── config.ts                  # Cấu hình chung (API base, env)
│   ├── layouts/                       # Layout cho toàn trang
│   │   ├── MainLayout.tsx             # Layout chính
│   │   └── WatchRoomLayout.tsx        # Layout phòng xem (player trung tâm, member trái, chat phải)
│   ├── features/                      # Các module theo tính năng
│   │   ├── auth/                      # Xác thực (login/register)
│   │   │   ├── api.ts                 # API Auth
│   │   │   ├── hooks/                 # Hook useAuth
│   │   │   └── pages/                 # Trang Login.tsx, Register.tsx
│   │   ├── room/                      # Quản lý phòng
│   │   │   ├── api.ts
│   │   │   ├── hooks/                 # Hook useRoom, useRoomSync
│   │   │   ├── components/            # RoomCard, RoomList, CreateRoomModal
│   │   │   └── pages/RoomPage.tsx     # Trang phòng xem
│   │   ├── player/                    # Video Player
│   │   │   ├── components/            # VideoPlayer.tsx (HTML5/YT wrapper)
│   │   │   └── hooks/usePlayerSync.ts # Hook đồng bộ player
│   │   ├── chat/                      # Chat & Voice
│   │   │   ├── components/            # ChatList, ChatInput, VoiceControls
│   │   │   └── hooks/useChat.ts       # Hook chat realtime
│   │   ├── friends/                   # Quản lý bạn bè
│   │   └── profile/                   # Quản lý hồ sơ cá nhân
│   ├── shared/                        # Thành phần tái sử dụng
│   │   ├── components/                # Button, Modal, Icon, Avatar
│   │   ├── hooks/                     # useDebounce, useToast
│   │   ├── utils/                     # Helper (formatTime, clamp, ...)
│   │   ├── types/                     # Kiểu dữ liệu chung (User, Room, Msg)
│   │   └── constants/                 # Hằng số
│   ├── assets/                        # Hình ảnh, icon, font
│   ├── App.tsx                        # Root component
│   ├── main.tsx                       # Entry point
│   └── index.css                      # Global CSS (tailwind import)
├── package.json                       # Danh sách dependencies & scripts
└── README.md                          # Tài liệu dự án
```

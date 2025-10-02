export interface NavbarItem {
  id: number;
  title: string;
  link: string;
}

export const NavbarMenu: NavbarItem[] = [
  { id: 1, title: "Trang chủ", link: "/" },
  { id: 2, title: "Phòng xem", link: "/rooms" },
  { id: 3, title: "Phòng của tôi", link: "/my-room" },
  { id: 4, title: "Bạn bè", link: "/friends" },
];

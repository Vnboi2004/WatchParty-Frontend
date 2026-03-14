import { NavLink } from "react-router-dom";
import { NavbarMenu } from "../constants/navbarMenu";

const Navbar = () => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {NavbarMenu.map((item) => (
        <NavLink
          key={item.id}
          to={item.link}
          className={({ isActive }) =>
            `relative font-medium tracking-tight transition-all duration-300 group ${
              isActive ? "text-orange-300" : "text-white/90 hover:text-white"
            }`
          }
        >
          {item.title}
          {/* Underline effect: hover w-full, active luôn full */}
          <span
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-300 origin-left ${
              w-0 group-hover:w-full"
          />
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;

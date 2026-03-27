import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdWork,
  MdAddCircle,
  MdBarChart,
  MdBookmark,
} from "react-icons/md";
import "./Navbar.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { to: "/applications", label: "Applications", icon: <MdWork /> },
  { to: "/applications/new", label: "Add Job", icon: <MdAddCircle /> },
  { to: "/analytics", label: "Analytics", icon: <MdBarChart /> },
  { to: "/bookmarks", label: "Bookmarks", icon: <MdBookmark /> },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <MdWork className="brand-icon" />
        <span>JobTracker</span>
      </div>
      <ul className="nav-links">
        {navItems.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

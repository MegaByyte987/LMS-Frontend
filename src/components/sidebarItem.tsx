import { NavLink } from "react-router";

interface SidebarItemProps {
  to: string;
  label: string;
  icon?: React.JSX.Element;
}

export default function SidebarItem({ to, label, icon }: SidebarItemProps) {
  return (
    <li className="w-full px-4">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `w-full flex items-center gap-3 px-4 py-2 rounded-md ${
            isActive
              ? "bg-black text-white hover:opacity-80"
              : "hover:bg-emerald-700"
          }`
        }
      >
        {icon && <span className="text-xl">{icon}</span>}
        <p className="text-lg">{label}</p>
      </NavLink>
    </li>
  );
}

import { useNavigate } from "react-router";
import Button from "./button";
import SidebarItem from "./sidebarItem";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-[20%] h-full bg-amber-200">
      {/* Title and Logo */}
      <div className="h-[10%] flex items-center justify-center">
        <h1 className="text-lg font-bold">LMS APP</h1>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col w-full justify-between h-[90%]">
        <ul className="flex flex-col gap-1 w-full">
          <SidebarItem to="/books" label="Books" />
          <SidebarItem to="/members" label="Members" />
          <SidebarItem to="/transactions" label="Transactions" />
        </ul>
        <Button
          type="button"
          label="Logout"
          className="bg-black rounded-none py-4 cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          buttonIcon={<LogOut />}
        />
      </div>
    </aside>
  );
}
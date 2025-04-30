import { Outlet } from "react-router";
import Sidebar from "../components/sidebar";

export default function AppLayout() {
  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      {/* content body */}
      <div className="w-[80%] h-full flex justify-center pt-8">
        {/* Outlet renders the matching child route of a parent route
          parent route: "/" - AppLayout
          child routes: "/books", "/members", ...
        */}
        <Outlet />
      </div>
    </div>
  );
}
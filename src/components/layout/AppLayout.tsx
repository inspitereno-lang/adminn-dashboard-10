import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

const AppLayout = () => (
  <div className="flex min-h-screen bg-background">
    <Sidebar />
    <main className="flex-1 p-4 sm:p-6 pb-20 sm:pb-6 overflow-auto">
      <Outlet />
    </main>
    <MobileNav />
  </div>
);

export default AppLayout;

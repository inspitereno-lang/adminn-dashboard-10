import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

const AppLayout = () => (
  <div className="flex min-h-screen bg-background">
    <Sidebar />
    <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto">
      <Outlet />
    </main>
    <MobileNav />
  </div>
);

export default AppLayout;

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck, Receipt, BarChart3, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Home" },
  { to: "/employees", icon: Users, label: "Staff" },
  { to: "/attendance", icon: CalendarCheck, label: "Attend." },
  { to: "/expenses", icon: Receipt, label: "Expenses" },
  { to: "/reports", icon: BarChart3, label: "Reports" },
];

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-lg">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={20} />
              {label}
            </NavLink>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut size={20} />
          Out
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;

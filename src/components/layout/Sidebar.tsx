import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  MapPin, 
  Store, 
  Box, 
  AlertTriangle, 
  Receipt, 
  BarChart3, 
  LogOut, 
  LogIn 
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/employees", icon: Users, label: "Employees" },
  { to: "/routes", icon: Map, label: "Routes & Shops" },
  { to: "/tracking", icon: MapPin, label: "Live Tracking" },
  { to: "/visits", icon: Store, label: "Shop Visits" },
  { to: "/stock", icon: Box, label: "Stock Reports" },
  { to: "/missed", icon: AlertTriangle, label: "Missed Shops" },
  { to: "/expenses", icon: Receipt, label: "Expenses" },
  { to: "/reports", icon: BarChart3, label: "Analytics" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card min-h-screen p-4">
      <div className="px-3 py-6 mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-primary leading-tight">Field Connect</h1>
        <p className="text-xs text-muted-foreground mt-1 font-medium tracking-wide uppercase">Admin Portal</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-2 pb-4">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon size={18} className={isActive ? "text-primary-foreground" : "text-muted-foreground"} />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 flex flex-col gap-2">
        <Separator className="mb-2" />
        {isAuthenticated ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 shadow-sm"
            onClick={() => navigate("/login")}
          >
            <LogIn size={18} />
            Login
          </Button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

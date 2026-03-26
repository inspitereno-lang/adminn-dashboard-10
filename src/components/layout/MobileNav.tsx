import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu,
  LogOut 
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  MapPin, 
  Store, 
  Box, 
  AlertTriangle, 
  Receipt, 
  BarChart3 
} from "lucide-react";

/**
 * Mobile Navigation:
 * Since there are 9 items, a single bottom bar is too crowded.
 * We will use a mixed approach: top picks on bottom bar, and a "More" drawer.
 */

const mainNavItems = [
  { to: "/", icon: LayoutDashboard, label: "Home" },
  { to: "/employees", icon: Users, label: "Staff" },
  { to: "/routes", icon: Map, label: "Routes" },
  { to: "/tracking", icon: MapPin, label: "Track" },
];

const moreNavItems = [
  { to: "/visits", icon: Store, label: "Visits" },
  { to: "/stock", icon: Box, label: "Stock" },
  { to: "/missed", icon: AlertTriangle, label: "Missed" },
  { to: "/expenses", icon: Receipt, label: "Expenses" },
  { to: "/reports", icon: BarChart3, label: "Analytics" },
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-lg pb-safe">
      <div className="flex justify-between items-center py-2 px-2">
        {mainNavItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex flex-col flex-1 items-center gap-1 px-1 py-1 text-[10px] font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={20} className={isActive ? "text-primary" : "text-muted-foreground"} />
              <span className="truncate w-full text-center">{label}</span>
            </NavLink>
          );
        })}
        
        {/* More Menu using Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col flex-1 items-center gap-1 px-1 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors">
              <Menu size={20} />
              <span className="truncate w-full text-center">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl pb-8">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="grid grid-cols-4 gap-y-6 pt-6">
              {moreNavItems.map(({ to, icon: Icon, label }) => {
                const isActive = location.pathname === to;
                return (
                  <NavLink
                    key={to}
                    to={to}
                    className={`flex flex-col items-center gap-2 text-[11px] font-medium transition-colors ${
                      isActive ? "text-primary" : "text-slate-600"
                    }`}
                  >
                    <div className={`p-3 rounded-full ${isActive ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon size={22} />
                    </div>
                    {label}
                  </NavLink>
                );
              })}
              
              <button
                onClick={handleLogout}
                className="flex flex-col items-center justify-start pt-0 gap-2 text-[11px] font-medium text-slate-600 hover:text-destructive transition-colors"
              >
                <div className="p-3 rounded-full bg-slate-100 text-slate-500 hover:bg-destructive/10 hover:text-destructive">
                  <LogOut size={22} />
                </div>
                 Logout
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileNav;

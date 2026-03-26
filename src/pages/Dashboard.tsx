import { useNavigate } from "react-router-dom";
import { 
  Users, 
  UserCheck, 
  Map, 
  Store, 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  Clock, 
  Bell, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  Zap,
  LayoutGrid
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import mapImage from "@/assets/map-placeholder.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const recentActivity = [
  { id: 1, name: "Ravi Kumar", action: "Checked in at Connaught Place", time: "9:02 AM", type: "checkin" },
  { id: 2, name: "Priya Sharma", action: "Submitted ₹1,200 expense", time: "9:15 AM", type: "expense" },
  { id: 3, name: "Amit Verma", action: "Checked in at Sector 18", time: "9:30 AM", type: "checkin" },
  { id: 4, name: "Suresh Patel", action: "Late check-in at MG Road", time: "10:05 AM", type: "late" },
  { id: 5, name: "Meena Devi", action: "Applied for leave", time: "8:30 AM", type: "leave" },
];

const quickAlerts = [
  { text: "5 expenses pending approval", type: "urgent", path: "/expenses" },
  { text: "3 staff haven't checked in yet", type: "urgent", path: "/tracking" },
  { text: "Neha Singh on leave tomorrow", type: "leave", path: "/employees" },
];

const topPerformers = [
  { name: "Ravi Kumar", visits: 28, rate: "98%", trend: "up" },
  { name: "Priya Sharma", visits: 25, rate: "95%", trend: "up" },
  { name: "Amit Verma", visits: 22, rate: "92%", trend: "down" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold text-foreground tracking-tight uppercase">Command Center</h2>
          <p className="text-xs sm:text-sm font-bold text-muted-foreground mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Operational Overview — {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-border shadow-sm hidden sm:flex" onClick={() => toast.info("No new announcements")}>
             <Bell size={20} className="text-primary" />
          </Button>
          <Button className="h-10 sm:h-11 px-4 sm:px-6 rounded-2xl shadow-lg shadow-primary/20 font-bold gap-2 text-sm" onClick={() => navigate('/routes')}>
             <Zap size={18} /> New Mission
          </Button>
        </div>
      </div>

      {/* Alerts Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {quickAlerts.map((alert, i) => (
          <div 
            key={i} 
            onClick={() => navigate(alert.path)}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] group ${
              alert.type === "urgent" 
                ? "bg-destructive/5 border-destructive/20 hover:bg-destructive/10" 
                : alert.type === "leave"
                ? "bg-black border-black hover:bg-black/90 text-white shadow-xl shadow-black/10"
                : "bg-warning/5 border-warning/20 hover:bg-warning/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${alert.type === "urgent" ? "bg-destructive animate-ping" : alert.type === "leave" ? "bg-white animate-pulse" : "bg-warning"}`} />
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${alert.type === "urgent" ? "text-destructive" : alert.type === "leave" ? "text-white" : "text-warning-foreground"}`}>{alert.text}</span>
            </div>
            <ChevronRight size={14} className={alert.type === "urgent" ? "text-destructive" : alert.type === "leave" ? "text-white" : "text-warning-foreground"} />
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div onClick={() => navigate('/employees')} className="cursor-pointer group">
          <StatCard title="Active Fleet" value={36} icon={UserCheck} subtitle="82% Capacity" />
        </div>
        <div onClick={() => navigate('/routes')} className="cursor-pointer group">
          <StatCard title="Live Missions" value={12} icon={Map} subtitle="4 Finalized" />
        </div>
        <div onClick={() => navigate('/visits')} className="cursor-pointer group">
          <StatCard title="Visit Volume" value={145} icon={Store} subtitle="+12% vs yest" />
        </div>
        <div onClick={() => navigate('/missed')} className="cursor-pointer group">
          <StatCard title="Shop Friction" value={8} icon={AlertTriangle} subtitle="Needs Re-route" />
        </div>
        <div onClick={() => navigate('/stock')} className="cursor-pointer group">
          <StatCard title="Inventory Logs" value={856} icon={Package} subtitle="Verified today" />
        </div>
      </div>

      {/* Map Section */}
      <Card className="shadow-2xl border-border overflow-hidden relative rounded-3xl group/map">
        <div className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-6 flex items-center justify-between pointer-events-none">
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-3 shadow-2xl pointer-events-auto">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground">Operational Heatmap</h3>
            <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground mt-0.5 hidden sm:block">22 professional units active in target zones</p>
          </div>
          <Button 
            variant="secondary" 
            className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-3 shadow-2xl pointer-events-auto font-bold uppercase text-[9px] sm:text-[10px] tracking-widest gap-1 sm:gap-2 hover:bg-primary hover:text-white transition-all"
            onClick={() => navigate('/tracking')}
          >
            <span className="hidden sm:inline">Launch Tracker</span><span className="sm:hidden">Track</span> <ArrowUpRight size={14} />
          </Button>
        </div>
        <div className="relative group-hover/map:scale-[1.01] transition-transform duration-700">
          <img
            src={mapImage}
            alt="Staff locations map"
            className="w-full h-64 sm:h-80 md:h-[400px] object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 pointer-events-auto">
            <Card className="bg-background/80 backdrop-blur-xl border-border/50 shadow-2xl p-2 sm:p-4 rounded-xl sm:rounded-2xl border">
              <div className="flex gap-3 sm:gap-8 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1 sm:gap-2"><span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]" /> Field (22)</div>
                <div className="flex items-center gap-1 sm:gap-2"><span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> Base (14)</div>
                <div className="hidden sm:flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-muted-foreground opacity-50" /> Standby (12)</div>
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-2xl border-border rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/20">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
              <Clock size={16} className="text-primary" /> Live Activity Feed
            </h3>
            <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest hover:bg-primary/5 text-primary" onClick={() => navigate('/visits')}>Integrate Data</Button>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-5 hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[10px] font-bold shadow-lg shadow-black/5 shrink-0 ${
                      item.type === "checkin" ? "bg-success/10 text-success" :
                      item.type === "checkout" ? "bg-primary/10 text-primary" :
                      item.type === "expense" ? "bg-warning/10 text-warning" :
                      item.type === "late" ? "bg-destructive/10 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {item.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">{item.name}</p>
                      <p className="text-[11px] font-medium text-muted-foreground truncate opacity-70 uppercase tracking-tighter">{item.action}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[9px] font-bold opacity-50 bg-muted/50 border-none px-2 rounded-lg">{item.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance & Summary */}
        <div className="space-y-6">
          <Card className="shadow-2xl border-border rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/20">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" /> Elite Performers
              </h3>
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest hover:bg-primary/5 text-primary" onClick={() => navigate('/reports')}>Full Stats</Button>
            </div>
            <CardContent className="p-6 space-y-5">
              {topPerformers.map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/50 transition-all cursor-default border border-transparent hover:border-border/50">
                  <span className="text-sm font-bold text-muted-foreground/30 w-5">#0{i + 1}</span>
                  <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground shadow-inner">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground uppercase tracking-tight">{p.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground opacity-70 uppercase tracking-widest">{p.visits} Targets Locked</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-success">{p.rate}</span>
                    {p.trend === 'up' ? <ArrowUpRight size={12} className="text-success" /> : <ArrowDownRight size={12} className="text-destructive" />}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => toast.success("Attendance synced", { description: "Current attendance at 92.4% for the month." })}
              className="bg-primary/5 border border-primary/20 rounded-3xl p-6 text-center cursor-pointer hover:bg-primary/10 transition-all shadow-xl shadow-primary/5"
            >
              <p className="text-3xl font-bold text-primary leading-none mb-2">92%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">Fleet Attendance</p>
            </div>
            <div 
              onClick={() => navigate('/expenses')}
              className="bg-card border border-border rounded-3xl p-6 text-center cursor-pointer hover:scale-[1.02] transition-all shadow-2xl"
            >
              <p className="text-3xl font-bold text-foreground leading-none mb-2">₹1.2L</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">OPEX Outflow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

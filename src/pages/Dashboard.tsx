import { Users, UserCheck, IndianRupee, MapPin, TrendingUp, Clock, Bell, ChevronRight } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import mapImage from "@/assets/map-placeholder.jpg";

const recentActivity = [
  { name: "Ravi Kumar", action: "Checked in at Connaught Place", time: "9:02 AM", type: "checkin" },
  { name: "Priya Sharma", action: "Submitted ₹1,200 expense", time: "9:15 AM", type: "expense" },
  { name: "Amit Verma", action: "Checked in at Sector 18", time: "9:30 AM", type: "checkin" },
  { name: "Neha Singh", action: "Checked out from Office", time: "5:05 PM", type: "checkout" },
  { name: "Suresh Patel", action: "Late check-in at MG Road", time: "10:05 AM", type: "late" },
  { name: "Meena Devi", action: "Applied for leave", time: "8:30 AM", type: "leave" },
];

const quickAlerts = [
  { text: "5 expenses pending approval", urgent: true },
  { text: "3 staff haven't checked in yet", urgent: true },
  { text: "Neha Singh on leave tomorrow", urgent: false },
];

const topPerformers = [
  { name: "Ravi Kumar", visits: 28, rate: "98%" },
  { name: "Priya Sharma", visits: 25, rate: "95%" },
  { name: "Amit Verma", visits: 22, rate: "92%" },
];

const Dashboard = () => (
  <div className="space-y-5">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Good Morning, Admin 👋</h2>
        <p className="text-sm text-muted-foreground">Here's what's happening today — March 26, 2026</p>
      </div>
      <div className="relative hidden sm:block">
        <Bell size={20} className="text-muted-foreground" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-bold text-destructive-foreground flex items-center justify-center">3</span>
      </div>
    </div>

    {/* Alerts Banner */}
    <div className="bg-accent border border-primary/20 rounded-lg p-3 space-y-1.5">
      {quickAlerts.map((alert, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${alert.urgent ? "bg-destructive" : "bg-warning"}`} />
          <span className="text-accent-foreground">{alert.text}</span>
        </div>
      ))}
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <StatCard title="Total Staff" value={48} icon={Users} subtitle="3 new this month" />
      <StatCard title="Active Today" value={36} icon={UserCheck} subtitle="75% attendance" />
      <StatCard title="Today's Expenses" value="₹12,450" icon={IndianRupee} subtitle="5 pending" />
      <StatCard title="On Field" value={22} icon={MapPin} subtitle="14 in office" />
    </div>

    {/* Map */}
    <div className="bg-card rounded-lg shadow-card border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <h3 className="text-sm font-medium text-foreground">Live Staff Locations</h3>
          <p className="text-xs text-muted-foreground">22 staff members on field right now</p>
        </div>
        <span className="flex items-center gap-1 text-xs text-primary font-medium cursor-pointer">
          View all <ChevronRight size={14} />
        </span>
      </div>
      <div className="relative">
        <img
          src={mapImage}
          alt="Staff locations map"
          className="w-full h-48 sm:h-56 md:h-72 object-cover"
          loading="lazy"
          width={1200}
          height={600}
        />
        <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border shadow-card">
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /> 22 On field</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> 14 In office</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> 12 Off</span>
          </div>
        </div>
      </div>
    </div>

    {/* Two column layout on desktop */}
    <div className="grid md:grid-cols-2 gap-5">
      {/* Recent Activity */}
      <div className="bg-card rounded-lg shadow-card border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Clock size={15} className="text-muted-foreground" /> Recent Activity
          </h3>
          <span className="text-xs text-primary font-medium cursor-pointer">View all</span>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  item.type === "checkin" ? "bg-success/10 text-success" :
                  item.type === "checkout" ? "bg-primary/10 text-primary" :
                  item.type === "expense" ? "bg-warning/10 text-warning" :
                  item.type === "late" ? "bg-destructive/10 text-destructive" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {item.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.action}</p>
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-card rounded-lg shadow-card border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
            <TrendingUp size={15} className="text-muted-foreground" /> Top Performers (This Month)
          </h3>
        </div>
        <div className="space-y-3">
          {topPerformers.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-accent-foreground">
                {p.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.visits} field visits</p>
              </div>
              <span className="text-sm font-semibold text-success">{p.rate}</span>
            </div>
          ))}
        </div>

        {/* Quick Summary */}
        <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">92%</p>
            <p className="text-[10px] text-muted-foreground">Avg Attendance</p>
          </div>
          <div className="bg-muted rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">₹1.2L</p>
            <p className="text-[10px] text-muted-foreground">Monthly Expenses</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;

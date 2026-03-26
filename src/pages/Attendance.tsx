import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Clock, MapPin, ChevronRight, User, Filter, Download, CheckCircle2, XCircle, AlertCircle, Coffee, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const attendanceData = [
  { id: 1, name: "Ravi Kumar", role: "Field Agent", checkIn: "9:02 AM", checkOut: "6:10 PM", status: "Present", location: "Connaught Place", hours: "9h 08m" },
  { id: 2, name: "Priya Sharma", role: "Supervisor", checkIn: "9:15 AM", checkOut: "5:45 PM", status: "Present", location: "Sector 18, Noida", hours: "8h 30m" },
  { id: 3, name: "Amit Verma", role: "Field Agent", checkIn: "9:30 AM", checkOut: "—", status: "Present", location: "MG Road", hours: "Working..." },
  { id: 4, name: "Neha Singh", role: "Driver", checkIn: "—", checkOut: "—", status: "Absent", location: "—", hours: "—" },
  { id: 5, name: "Suresh Patel", role: "Field Agent", checkIn: "10:05 AM", checkOut: "—", status: "Late", location: "Rajouri Garden", hours: "Working..." },
  { id: 6, name: "Vikram Tiwari", role: "Field Agent", checkIn: "8:55 AM", checkOut: "6:00 PM", status: "Present", location: "Karol Bagh", hours: "9h 05m" },
  { id: 7, name: "Anjali Gupta", role: "Driver", checkIn: "9:00 AM", checkOut: "5:30 PM", status: "Present", location: "Saket", hours: "8h 30m" },
  { id: 8, name: "Meena Devi", role: "Supervisor", checkIn: "—", checkOut: "—", status: "Leave", location: "—", hours: "—" },
];

const statusConfig: Record<string, { bg: string; text: string; dot: string; icon: any }> = {
  Present: { bg: "bg-success/10", text: "text-success", dot: "bg-success", icon: CheckCircle2 },
  Absent: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive", icon: XCircle },
  Late: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning", icon: AlertCircle },
  Leave: { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground", icon: Coffee },
};

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");

  const filtered = attendanceData.filter(a => {
    const statusMatch = filter === "all" || a.status.toLowerCase() === filter;
    const empMatch = employeeFilter === "all" || a.name === employeeFilter;
    return statusMatch && empMatch;
  });

  const stats = [
    { label: "Total Workforce", value: attendanceData.length, color: "bg-primary/10 text-primary", icon: User },
    { label: "On Duty", value: attendanceData.filter(a => a.status === "Present").length, color: "bg-success/10 text-success", icon: CheckCircle2 },
    { label: "Missed Shift", value: attendanceData.filter(a => a.status === "Absent").length, color: "bg-destructive/10 text-destructive", icon: XCircle },
    { label: "Delayed", value: attendanceData.filter(a => a.status === "Late").length, color: "bg-warning/10 text-warning", icon: AlertCircle },
  ];

  const handleExport = () => {
    toast.promise(new Promise(res => setTimeout(res, 1500)), {
      loading: "Compiling attendance records...",
      success: "Attendance report exported successfully",
      error: "Export failed"
    });
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-3xl font-bold text-foreground tracking-tight uppercase">Workforce Attendance</h2>
          <p className="text-xs sm:text-sm font-bold text-muted-foreground mt-1 flex items-center gap-2 uppercase tracking-tighter">
            Real-time compliance tracking and labor analytics
          </p>
        </div>
        <Button onClick={handleExport} className="h-10 sm:h-11 px-4 sm:px-6 rounded-2xl shadow-lg shadow-primary/20 font-bold gap-2 text-sm w-full sm:w-auto">
          <Download size={18} /> Export Log
        </Button>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={i} className="border-border shadow-2xl rounded-3xl overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={cn("p-3 rounded-2xl", s.color)}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 sm:gap-6 items-start">
        {/* Sidebar Controls */}
        <div className="space-y-6">
          <Card className="border-border shadow-2xl rounded-3xl overflow-hidden p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-2xl border-none p-0"
            />
          </Card>

          <Card className="border-border shadow-2xl rounded-3xl overflow-hidden p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Advanced Filters</h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-muted-foreground/70">Compliance Status</label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="h-10 rounded-xl border-border bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">Full Spectrum</SelectItem>
                    <SelectItem value="present">Active Duty</SelectItem>
                    <SelectItem value="absent">Absence Log</SelectItem>
                    <SelectItem value="late">Tardy Entries</SelectItem>
                    <SelectItem value="leave">Approve Leaves</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-muted-foreground/70">Personnel Search</label>
                <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                  <SelectTrigger className="h-10 rounded-xl border-border bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">All Personnel</SelectItem>
                    {attendanceData.map(a => (
                      <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Key</h4>
               <div className="grid grid-cols-2 gap-2">
                 {Object.entries(statusConfig).map(([key, cfg]) => (
                   <div key={key} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight">
                     <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                     {key}
                   </div>
                 ))}
               </div>
            </div>
          </Card>
        </div>

        {/* Dynamic Attendance List */}
        <Card className="border-border shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Filter size={16} className="text-primary" /> Log View: {date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </h3>
            <Badge variant="outline" className="text-[10px] font-bold uppercase px-3 py-1 rounded-xl bg-background border-border shadow-sm">
              {filtered.length} Entries Found
            </Badge>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {filtered.length === 0 ? (
                <div className="p-20 text-center space-y-3">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto opacity-20">
                    <Search size={32} />
                  </div>
                  <p className="text-sm font-bold uppercase text-muted-foreground tracking-widest">No matching records</p>
                </div>
              ) : (
                filtered.map((item) => {
                  const cfg = statusConfig[item.status] || statusConfig.Present;
                  const Icon = cfg.icon;
                  return (
                    <div key={item.id} className="p-5 hover:bg-primary/5 transition-all group border-l-4 border-l-transparent hover:border-l-primary cursor-pointer">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-bold shadow-lg shadow-black/5 shrink-0 transition-transform group-hover:scale-105", cfg.bg, cfg.text)}>
                            {item.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-foreground uppercase tracking-tight group-hover:text-primary transition-colors flex items-center gap-2">
                              {item.name}
                              <Badge variant="outline" className="text-[8px] font-bold opacity-40 py-0 h-4 border-muted-foreground/20">{item.role}</Badge>
                            </h4>
                            <div className="flex items-center gap-4 mt-1">
                               <span className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground/70 uppercase">
                                 <MapPin size={10} className="text-primary/50" /> {item.location || "N/A"}
                               </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <Badge className={cn("rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest gap-1.5 border-none shadow-sm", cfg.bg, cfg.text)}>
                            <Icon size={12} strokeWidth={3} />
                            {item.status}
                          </Badge>
                          {item.status !== "Absent" && item.status !== "Leave" && (
                             <span className="text-[10px] font-bold text-foreground flex items-center gap-1">
                               {item.hours} <Clock size={10} className="text-muted-foreground/50" />
                             </span>
                          )}
                        </div>
                      </div>

                      {item.status !== "Absent" && item.status !== "Leave" && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="bg-muted/30 rounded-xl p-3 border border-border/50">
                            <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Entry Stamp</p>
                            <p className="text-xs font-bold text-foreground uppercase">{item.checkIn}</p>
                          </div>
                          <div className="bg-muted/30 rounded-xl p-3 border border-border/50">
                            <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Exit Stamp</p>
                            <p className="text-xs font-bold text-foreground uppercase">{item.checkOut}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;

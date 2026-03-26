import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Clock, MapPin, ChevronRight } from "lucide-react";

const attendanceData = [
  { name: "Ravi Kumar", role: "Field Agent", checkIn: "9:02 AM", checkOut: "6:10 PM", status: "Present", location: "Connaught Place", hours: "9h 08m" },
  { name: "Priya Sharma", role: "Supervisor", checkIn: "9:15 AM", checkOut: "5:45 PM", status: "Present", location: "Sector 18, Noida", hours: "8h 30m" },
  { name: "Amit Verma", role: "Field Agent", checkIn: "9:30 AM", checkOut: "—", status: "Present", location: "MG Road", hours: "Working..." },
  { name: "Neha Singh", role: "Driver", checkIn: "—", checkOut: "—", status: "Absent", location: "—", hours: "—" },
  { name: "Suresh Patel", role: "Field Agent", checkIn: "10:05 AM", checkOut: "—", status: "Late", location: "Rajouri Garden", hours: "Working..." },
  { name: "Vikram Tiwari", role: "Field Agent", checkIn: "8:55 AM", checkOut: "6:00 PM", status: "Present", location: "Karol Bagh", hours: "9h 05m" },
  { name: "Anjali Gupta", role: "Driver", checkIn: "9:00 AM", checkOut: "5:30 PM", status: "Present", location: "Saket", hours: "8h 30m" },
  { name: "Meena Devi", role: "Supervisor", checkIn: "—", checkOut: "—", status: "Leave", location: "—", hours: "—" },
];

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  Present: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  Absent: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
  Late: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  Leave: { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground" },
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

  const presentCount = attendanceData.filter(a => a.status === "Present").length;
  const absentCount = attendanceData.filter(a => a.status === "Absent").length;
  const lateCount = attendanceData.filter(a => a.status === "Late").length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Attendance</h2>
        <p className="text-sm text-muted-foreground">Track daily check-ins and hours</p>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total", value: attendanceData.length, color: "bg-primary/10 text-primary" },
          { label: "Present", value: presentCount, color: "bg-success/10 text-success" },
          { label: "Absent", value: absentCount, color: "bg-destructive/10 text-destructive" },
          { label: "Late", value: lateCount, color: "bg-warning/10 text-warning" },
        ].map((s, i) => (
          <div key={i} className={`rounded-lg p-3 text-center ${s.color}`}>
            <p className="text-lg font-bold">{s.value}</p>
            <p className="text-[10px] font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-5">
        {/* Calendar */}
        <div className="bg-card rounded-lg border border-border shadow-card p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className={cn("pointer-events-auto")}
          />
          <div className="mt-3 pt-3 border-t border-border px-2">
            <p className="text-xs font-medium text-foreground mb-2">Legend</p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success" /> Present</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-destructive" /> Absent</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warning" /> Late</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> On Leave</div>
            </div>
          </div>
        </div>

        {/* Attendance List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="leave">Leave</SelectItem>
              </SelectContent>
            </Select>
            <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {attendanceData.map(a => (
                  <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {filtered.map((item, i) => {
              const cfg = statusConfig[item.status] || statusConfig.Present;
              return (
                <div key={i} className="bg-card rounded-lg border border-border shadow-card p-4 hover:shadow-card-hover transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${cfg.bg} ${cfg.text}`}>
                        {item.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.role}</p>
                      </div>
                    </div>
                    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5", cfg.bg, cfg.text)}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {item.status}
                    </span>
                  </div>
                  {item.status !== "Absent" && item.status !== "Leave" && (
                    <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Clock size={12} /> In: {item.checkIn}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} /> Out: {item.checkOut}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={12} /> {item.location}</span>
                      <span className="font-medium text-foreground ml-auto">{item.hours}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

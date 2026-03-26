import { useState } from "react";
import { Plus, Search, Phone, MapPin, MoreVertical, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const employees = [
  { id: 1, name: "Ravi Kumar", role: "Field Agent", status: "Active", phone: "+91 98765 43210", email: "ravi@staffhub.in", location: "Connaught Place, Delhi", joined: "Jan 2024", avatar: "RK" },
  { id: 2, name: "Priya Sharma", role: "Supervisor", status: "Active", phone: "+91 98765 43211", email: "priya@staffhub.in", location: "Sector 18, Noida", joined: "Mar 2023", avatar: "PS" },
  { id: 3, name: "Amit Verma", role: "Field Agent", status: "Active", phone: "+91 98765 43212", email: "amit@staffhub.in", location: "MG Road, Gurgaon", joined: "Jun 2024", avatar: "AV" },
  { id: 4, name: "Neha Singh", role: "Driver", status: "On Leave", phone: "+91 98765 43213", email: "neha@staffhub.in", location: "Dwarka, Delhi", joined: "Aug 2023", avatar: "NS" },
  { id: 5, name: "Suresh Patel", role: "Field Agent", status: "Active", phone: "+91 98765 43214", email: "suresh@staffhub.in", location: "Rajouri Garden, Delhi", joined: "Nov 2024", avatar: "SP" },
  { id: 6, name: "Meena Devi", role: "Supervisor", status: "Inactive", phone: "+91 98765 43215", email: "meena@staffhub.in", location: "Laxmi Nagar, Delhi", joined: "Feb 2023", avatar: "MD" },
  { id: 7, name: "Vikram Tiwari", role: "Field Agent", status: "Active", phone: "+91 98765 43216", email: "vikram@staffhub.in", location: "Karol Bagh, Delhi", joined: "Sep 2024", avatar: "VT" },
  { id: 8, name: "Anjali Gupta", role: "Driver", status: "Active", phone: "+91 98765 43217", email: "anjali@staffhub.in", location: "Saket, Delhi", joined: "Dec 2024", avatar: "AG" },
];

const roleColors: Record<string, string> = {
  "Field Agent": "bg-primary/10 text-primary",
  "Supervisor": "bg-warning/10 text-warning",
  "Driver": "bg-success/10 text-success",
};

const Employees = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || e.role === roleFilter;
    return matchSearch && matchRole;
  });

  const activeCount = employees.filter(e => e.status === "Active").length;
  const onLeaveCount = employees.filter(e => e.status === "On Leave").length;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Employees</h2>
          <p className="text-sm text-muted-foreground">
            {employees.length} total · {activeCount} active · {onLeaveCount} on leave
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus size={16} /> Add
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label>Full Name</Label><Input placeholder="Enter full name" className="mt-1.5" /></div>
              <div>
                <Label>Role</Label>
                <Select>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="field-agent">Field Agent</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Phone Number</Label><Input placeholder="+91" className="mt-1.5" /></div>
              <div><Label>Email</Label><Input placeholder="name@company.in" className="mt-1.5" type="email" /></div>
              <div><Label>Base Location</Label><Input placeholder="e.g. Connaught Place, Delhi" className="mt-1.5" /></div>
              <Button className="w-full">Save Employee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or role..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Field Agent">Field Agent</SelectItem>
            <SelectItem value="Supervisor">Supervisor</SelectItem>
            <SelectItem value="Driver">Driver</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Employee Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map(emp => (
          <div key={emp.id} className="bg-card rounded-lg border border-border p-4 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold ${roleColors[emp.role] || "bg-accent text-accent-foreground"}`}>
                  {emp.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={emp.status === "Active" ? "default" : emp.status === "On Leave" ? "secondary" : "outline"} className="text-[10px]">
                  {emp.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded hover:bg-muted"><MoreVertical size={14} className="text-muted-foreground" /></button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Attendance</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Phone size={12} /> {emp.phone}</div>
              <div className="flex items-center gap-2"><Mail size={12} /> {emp.email}</div>
              <div className="flex items-center gap-2"><MapPin size={12} /> {emp.location}</div>
            </div>
            <div className="mt-3 pt-3 border-t border-border text-[11px] text-muted-foreground">
              Joined {emp.joined}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10">
          <p className="text-sm text-muted-foreground">No employees found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Employees;

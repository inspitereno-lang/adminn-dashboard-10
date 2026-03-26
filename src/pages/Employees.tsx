import { useState } from "react";
import { Plus, Search, Phone, MapPin, MoreVertical, Mail, Trash2, UserPlus, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const initialEmployees = [
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
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // New Employee State
  const [newEmp, setNewEmp] = useState({
    name: "",
    role: "Field Agent",
    phone: "",
    email: "",
    location: ""
  });

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                       e.role.toLowerCase().includes(search.toLowerCase()) ||
                       e.location.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || e.role === roleFilter;
    return matchSearch && matchRole;
  });

  const activeCount = employees.filter(e => e.status === "Active").length;
  const onLeaveCount = employees.filter(e => e.status === "On Leave").length;

  const handleAddEmployee = () => {
    if (!newEmp.name || !newEmp.phone || !newEmp.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const employee = {
      id: employees.length + 1,
      ...newEmp,
      status: "Active",
      joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      avatar: newEmp.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)
    };

    setEmployees([employee, ...employees]);
    setIsAddDialogOpen(false);
    setNewEmp({ name: "", role: "Field Agent", phone: "", email: "", location: "" });
    toast.success("Employee Added", {
      description: `${employee.name} has been successfully added.`
    });
  };

  const handleDeleteEmployee = (id: number) => {
    const empToDelete = employees.find(e => e.id === id);
    setEmployees(employees.filter(e => e.id !== id));
    toast.info("Employee Removed", {
      description: `${empToDelete?.name}'s record has been deleted.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Employees</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {employees.length} total · {activeCount} active · {onLeaveCount} on leave
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-md">
              <Plus size={18} /> Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. John Doe" 
                  value={newEmp.name}
                  onChange={e => setNewEmp({...newEmp, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={newEmp.role} onValueChange={v => setNewEmp({...newEmp, role: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Field Agent" className="flex items-center gap-2"><UserPlus size={14} className="mr-2 inline" /> Field Agent</SelectItem>
                    <SelectItem value="Supervisor" className="flex items-center gap-2"><ShieldCheck size={14} className="mr-2 inline" /> Supervisor</SelectItem>
                    <SelectItem value="Driver" className="flex items-center gap-2"><Truck size={14} className="mr-2 inline" /> Driver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+91" 
                    value={newEmp.phone}
                    onChange={e => setNewEmp({...newEmp, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    placeholder="name@company.in" 
                    type="email" 
                    value={newEmp.email}
                    onChange={e => setNewEmp({...newEmp, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Base Location</Label>
                <Input 
                  id="location" 
                  placeholder="e.g. Connaught Place, Delhi" 
                  value={newEmp.location}
                  onChange={e => setNewEmp({...newEmp, location: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddEmployee} className="px-8">Save Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <Card className="p-4 border-border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search by name, role or location..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="pl-10 h-10" 
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-48 h-10">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Field Agent">Field Agent</SelectItem>
              <SelectItem value="Supervisor">Supervisor</SelectItem>
              <SelectItem value="Driver">Driver</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Employee Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map(emp => (
          <div key={emp.id} className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => handleDeleteEmployee(emp.id)} className="p-1.5 rounded-full hover:bg-destructive/10 text-destructive/70 hover:text-destructive">
                 <Trash2 size={16} />
               </button>
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shadow-inner ${roleColors[emp.role] || "bg-accent text-accent-foreground"}`}>
                {emp.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base text-foreground truncate">{emp.name}</h3>
                  <Badge variant={emp.status === "Active" ? "default" : emp.status === "On Leave" ? "secondary" : "outline"} className={`text-[10px] uppercase font-bold tracking-wider ${
                    emp.status === 'Active' ? 'bg-success/10 text-success border-success/20 hover:bg-success/20' : ''
                  }`}>
                    {emp.status}
                  </Badge>
                </div>
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                   {emp.role}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1 border-t border-border/50">
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium group/item hover:text-foreground transition-colors">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center group-hover/item:bg-primary/10 group-hover/item:text-primary"><Phone size={12} /></div> {emp.phone}
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium group/item hover:text-foreground transition-colors">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center group-hover/item:bg-primary/10 group-hover/item:text-primary"><Mail size={12} /></div> <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium group/item hover:text-foreground transition-colors">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center group-hover/item:bg-primary/10 group-hover/item:text-primary"><MapPin size={12} /></div> <span className="truncate">{emp.location}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 flex items-center justify-between">
               <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">Joined {emp.joined}</span>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-muted">
                      <MoreVertical size={16} className="text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => toast.success("Assignment Workflow", { description: `Assigning new route to ${emp.name}...` })}><UserPlus size={14} /> Assign Route</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => toast.success("Alert Sent", { description: `SMS alert has been sent to ${emp.phone}` })}><Mail size={14} /> Send SMS Alert</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive gap-2 cursor-pointer" onClick={() => handleDeleteEmployee(emp.id)}><Trash2 size={14} /> Delete Profile</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="py-20 flex flex-col items-center justify-center border-dashed border-2">
          <Search size={40} className="text-muted-foreground mb-4 opacity-20" />
          <p className="text-lg font-medium text-foreground">No employees found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          <Button variant="link" onClick={() => {setSearch(""); setRoleFilter("all");}} className="mt-2 text-primary">Clear all filters</Button>
        </Card>
      )}
    </div>
  );
};


export default Employees;

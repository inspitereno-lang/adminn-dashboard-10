import React, { useState } from "react";
import { Plus, MapPin, Phone, Users, Search, MoreVertical, Edit3, Trash2, Store, CheckCircle2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const initialRoutes = [
  { id: 1, name: "South Delhi Retail", assignedTo: "Ravi Kumar", shopCount: 15, status: "In Progress", date: "Today" },
  { id: 2, name: "Gurgaon Sector 14-29", assignedTo: "Amit Verma", shopCount: 22, status: "Pending", date: "Tomorrow" },
  { id: 3, name: "Noida Electronic City", assignedTo: "Priya Sharma", shopCount: 8, status: "Completed", date: "Yesterday" },
];

const dummyEmployees = ["Ravi Kumar", "Amit Verma", "Priya Sharma", "Suresh Patel"];

const RouteManagement = () => {
  const [routes, setRoutes] = useState(initialRoutes);
  const [searchTerm, setSearchTerm] = useState("");
  const [shops, setShops] = useState([{ id: 1, name: "", location: "", contact: "" }]);
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  
  // New Route Form State
  const [newRouteName, setNewRouteName] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");

  const addShopField = () => {
    setShops([...shops, { id: Date.now(), name: "", location: "", contact: "" }]);
  };

  const removeShopField = (id: number) => {
    if (shops.length > 1) {
      setShops(shops.filter(shop => shop.id !== id));
    }
  };

  const handleCreateRoute = () => {
    if (!newRouteName || !assignedEmployee) {
      toast.error("Missing Information", {
        description: "Please provide a route name and assign an agent."
      });
      return;
    }

    const newRoute = {
      id: routes.length + 1,
      name: newRouteName,
      assignedTo: assignedEmployee,
      shopCount: shops.length,
      status: "Pending" as const,
      date: "Scheduled"
    };

    setRoutes([newRoute, ...routes]);
    setIsAddRouteOpen(false);
    setNewRouteName("");
    setAssignedEmployee("");
    setShops([{ id: 1, name: "", location: "", contact: "" }]);
    
    toast.success("Route Created Successfully", {
      description: `assigned to ${assignedEmployee} with ${newRoute.shopCount} shops.`
    });
  };

  const handleDeleteRoute = (id: number) => {
    const routeToDelete = routes.find(r => r.id === id);
    setRoutes(routes.filter(r => r.id !== id));
    toast.info("Route Deleted", {
      description: `"${routeToDelete?.name}" has been removed.`
    });
  };

  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Route & Shop Management</h1>
          <p className="text-muted-foreground mt-1">Create routes, add shops, and assign to field agents.</p>
        </div>
        
        <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-md hover:shadow-lg transition-all px-6 py-6 rounded-xl">
              <Plus size={20} /> Create New Route
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Configure New Route</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Route Basics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-semibold">Route Name</Label>
                  <Input 
                    placeholder="e.g. South Delhi Electronics" 
                    value={newRouteName}
                    onChange={e => setNewRouteName(e.target.value)}
                    className="h-11 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Assign To Employee</Label>
                  <Select value={assignedEmployee} onValueChange={setAssignedEmployee}>
                    <SelectTrigger className="h-11 shadow-sm">
                      <SelectValue placeholder="Select an agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyEmployees.map((emp, i) => (
                        <SelectItem key={i} value={emp} className="gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">{emp.split(" ").map(n=>n[0]).join("")}</div>
                            {emp}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Shops List */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <Label className="text-lg font-bold flex items-center gap-2">
                    <Store size={18} className="text-primary" /> Shops to Visit
                    <Badge variant="secondary" className="ml-2">{shops.length}</Badge>
                  </Label>
                  <Button variant="outline" size="sm" onClick={addShopField} className="gap-1.5 h-9 font-semibold border-primary/20 hover:bg-primary/5 hover:text-primary transition-all">
                    <Plus size={16} /> Add Stop
                  </Button>
                </div>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {shops.map((shop, index) => (
                    <Card key={shop.id} className="border-border shadow-sm hover:border-primary/20 transition-colors">
                      <CardContent className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-1 flex justify-center border-r border-border pr-2">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shadow-inner">
                            {index + 1}
                          </div>
                        </div>
                        <div className="md:col-span-3 space-y-1.5">
                          <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Shop Name</Label>
                          <Input placeholder="e.g. Gupta Electronics" className="h-9" />
                        </div>
                        <div className="md:col-span-4 space-y-1.5">
                          <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1"><MapPin size={12}/> Location</Label>
                          <div className="flex gap-2">
                            <Input placeholder="Search location..." className="h-9 flex-1" />
                            <Button variant="secondary" size="icon" className="h-9 w-9 shrink-0 shadow-sm" title="Drop pin on map">
                               <MapPin size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="md:col-span-3 space-y-1.5">
                          <Label className="text-xs uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1"><Phone size={12}/> Contact (Optional)</Label>
                          <Input placeholder="+91" className="h-9" />
                        </div>
                        <div className="md:col-span-1 flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                            onClick={() => removeShopField(shop.id)}
                            disabled={shops.length === 1}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <DialogFooter className="pt-4 border-t gap-3">
                <Button variant="ghost" onClick={() => setIsAddRouteOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateRoute} className="px-10 h-11 shadow-lg shadow-primary/20 font-bold rounded-xl">Save & Dispatch Route</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Routes List */}
      <Card className="border-border shadow-card overflow-hidden rounded-2xl">
        <CardHeader className="pb-4 bg-muted/30 border-b border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
               <CardTitle className="text-xl">Active & Scheduled Routes</CardTitle>
               <Badge variant="outline" className="bg-background">{filteredRoutes.length}</Badge>
            </div>
            <div className="relative w-full sm:w-72">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" />
              <Input 
                placeholder="Search by route or agent..." 
                className="pl-10 h-10 shadow-sm bg-background border-border/60" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredRoutes.length > 0 ? (
            <div className="divide-y divide-border/50">
              {filteredRoutes.map((route) => (
                <div key={route.id} className="p-5 sm:p-6 hover:bg-muted/30 transition-all flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between group">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${
                        route.status === 'Completed' ? 'bg-success/10 text-success' : 
                        route.status === 'In Progress' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600'
                      }`}>
                         <Navigation size={18} />
                      </div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{route.name}</h3>
                      <Badge variant={
                        route.status === "Completed" ? "default" : 
                        route.status === "In Progress" ? "secondary" : "outline"
                      } className={`font-bold tracking-wide text-[10px] uppercase px-2 py-0.5 ${
                        route.status === "In Progress" ? "bg-primary/10 text-primary border-primary/20" : 
                        route.status === "Completed" ? "bg-success text-success-foreground" : "border-muted-foreground/30"
                      }`}>
                        {route.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                      <div className="flex items-center gap-2 font-semibold bg-accent/30 text-accent-foreground px-3 py-1 rounded-full border border-border/50">
                        <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold">{route.assignedTo.split(" ").map(n=>n[0]).join("")}</div>
                        {route.assignedTo}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground font-medium">
                        <Store size={15} className="text-primary/70" /> {route.shopCount} Shop Locations
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground font-medium">
                         <CheckCircle2 size={15} className="text-success/70" /> {route.date}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-border/50">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9 px-4 gap-2 font-bold shadow-sm flex-1 lg:flex-none"
                      onClick={() => toast.info("Map View", { description: `Loading route nodes for ${route.name}...` })}
                    >
                      <MapPin size={14} /> View Map
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted transition-colors">
                          <MoreVertical size={18} className="text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-1.5 shadow-xl border-border/40">
                        <DropdownMenuItem className="gap-2.5 py-2.5 cursor-pointer font-medium" onClick={() => toast.success("Edit Workflow Triggered", { description: `Opening scheduler for ${route.name}` })}><Edit3 size={16} className="text-primary/70" /> Edit Schedule</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2.5 py-2.5 cursor-pointer font-medium" onClick={() => toast.info("Personnel Update", { description: "Select new dispatcher from the organization chart." })}><Users size={16} className="text-primary/70" /> Change Dispatcher</DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive gap-2.5 py-2.5 cursor-pointer font-medium hover:bg-destructive/5"
                          onClick={() => handleDeleteRoute(route.id)}
                        >
                          <Trash2 size={16} /> Cancel Route
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center px-4 text-center">
               <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                 <Search size={30} className="text-muted-foreground opacity-30" />
               </div>
               <h3 className="font-bold text-lg">No routes found</h3>
               <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-1">Try searching with a different keyword or create a brand new route to get started.</p>
               <Button variant="link" onClick={() => setSearchTerm("")} className="mt-2 text-primary">Clear all filters</Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Route Efficiency Tip */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
         <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
           <Navigation size={32} className="text-primary animate-pulse" />
         </div>
         <div className="flex-1 space-y-1 text-center md:text-left">
           <h4 className="font-bold text-lg text-primary">Optimize your dispatch flow</h4>
           <p className="text-sm text-foreground/70 leading-relaxed font-medium">Assigning employees based on their base location can reduce travel time by up to 35% and increase daily shop coverage.</p>
         </div>
         <Button 
           className="bg-primary hover:bg-primary/90 shadow-md h-11 px-8 rounded-xl font-bold"
           onClick={() => toast.promise(new Promise(res => setTimeout(res, 2000)), {
             loading: 'Analyzing route nodes...',
             success: 'Routes optimized by 22%!',
             error: 'Optimization failed',
           })}
         >
           Try Route Optimizer
         </Button>
      </div>
    </div>
  );
};

export default RouteManagement;


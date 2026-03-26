import React, { useState } from "react";
import { Plus, MapPin, Phone, Users, Search, MoreVertical, Edit3, Trash2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const dummyRoutes = [
  { id: 1, name: "South Delhi Retail", assignedTo: "Ravi Kumar", shopCount: 15, status: "In Progress", date: "Today" },
  { id: 2, name: "Gurgaon Sector 14-29", assignedTo: "Amit Verma", shopCount: 22, status: "Pending", date: "Tomorrow" },
  { id: 3, name: "Noida Electronic City", assignedTo: "Priya Sharma", shopCount: 8, status: "Completed", date: "Yesterday" },
];

const dummyEmployees = ["Ravi Kumar", "Amit Verma", "Priya Sharma", "Suresh Patel"];

const RouteManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shops, setShops] = useState([{ id: 1, name: "", location: "", contact: "" }]);

  const addShopField = () => {
    setShops([...shops, { id: shops.length + 1, name: "", location: "", contact: "" }]);
  };

  const removeShopField = (id: number) => {
    if (shops.length > 1) {
      setShops(shops.filter(shop => shop.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Route & Shop Management</h1>
          <p className="text-muted-foreground mt-1">Create routes, add shops, and assign to field agents.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-md hover:shadow-lg transition-all">
              <Plus size={18} /> Create New Route
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create Route</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Route Basics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Route Name</Label>
                  <Input placeholder="e.g. South Delhi Electronics" />
                </div>
                <div className="space-y-2">
                  <Label>Assign To Employee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyEmployees.map((emp, i) => (
                        <SelectItem key={i} value={emp}>{emp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Shops List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-lg">Shops to Visit</Label>
                  <Button variant="outline" size="sm" onClick={addShopField} className="gap-1.5 h-8">
                    <Plus size={14} /> Add Shop
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {shops.map((shop, index) => (
                    <Card key={shop.id} className="border-border shadow-sm">
                      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-1 flex justify-center border-r border-border pr-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="md:col-span-3 space-y-1">
                          <Label className="text-xs">Shop Name</Label>
                          <Input placeholder="e.g. Gupta Electronics" className="h-8" />
                        </div>
                        <div className="md:col-span-4 space-y-1">
                          <Label className="text-xs flex items-center gap-1"><MapPin size={12}/> Location</Label>
                          <div className="flex gap-2">
                            <Input placeholder="Search location..." className="h-8 flex-1" />
                            <Button variant="secondary" size="icon" className="h-8 w-8 shrink-0" title="Drop pin on map">
                               <MapPin size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="md:col-span-3 space-y-1">
                          <Label className="text-xs flex items-center gap-1"><Phone size={12}/> Contact (Optional)</Label>
                          <Input placeholder="+91" className="h-8" />
                        </div>
                        <div className="md:col-span-1 flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeShopField(shop.id)}
                            disabled={shops.length === 1}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
                <Button variant="outline">Cancel</Button>
                <Button className="px-8 shadow-md">Create & Assign Route</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Routes List */}
      <Card className="border-border shadow-card">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Existing Routes</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search routes..." 
                className="pl-9 h-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {dummyRoutes.map((route) => (
              <div key={route.id} className="p-4 sm:p-5 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{route.name}</h3>
                    <Badge variant={
                      route.status === "Completed" ? "default" : 
                      route.status === "In Progress" ? "secondary" : "outline"
                    } className={route.status === "In Progress" ? "bg-primary/10 text-primary border-primary/20" : ""}>
                      {route.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-0.5 rounded-md text-foreground/80 font-medium">
                      <Users size={14} className="text-primary"/> {route.assignedTo}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Store size={14} /> {route.shopCount} Shops
                    </span>
                    <span className="flex items-center gap-1.5 text-xs bg-muted px-2 py-0.5 rounded-md">
                       Scheduled: {route.date}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <Button variant="outline" size="sm" className="h-8">View Map</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2"><Edit3 size={14} /> Edit Route</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Users size={14} /> Re-assign</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive gap-2"><Trash2 size={14} /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteManagement;

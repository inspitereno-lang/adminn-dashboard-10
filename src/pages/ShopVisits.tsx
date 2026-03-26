import React, { useState } from "react";
import { Search, Calendar as CalendarIcon, Filter, Image as ImageIcon, MapPin, X, CheckCircle2, Clock, AlertCircle, Eye, Map, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import receipt1 from "@/assets/receipt-1.jpg";
import receipt2 from "@/assets/receipt-2.jpg";
import receipt3 from "@/assets/receipt-3.jpg";

const mockPhotos = [receipt1, receipt2, receipt3];

const initialVisits = [
  { id: 1, shopName: "Gupta Electronics", location: "South Ex, New Delhi", agent: "Ravi Kumar", status: "Visited", time: "10:30 AM", hasPhoto: true, photoIdx: 0 },
  { id: 2, shopName: "Sharma Mobile Point", location: "Lajpat Nagar, Delhi", agent: "Amit Verma", status: "Not Open", time: "11:15 AM", hasPhoto: true, photoIdx: 1 },
  { id: 3, shopName: "Verma Communications", location: "Green Park, Delhi", agent: "Ravi Kumar", status: "Skipped", time: "12:00 PM", hasPhoto: false },
  { id: 4, shopName: "Tech Hub", location: "Hauz Khas, Delhi", agent: "Priya Sharma", status: "Visited", time: "01:45 PM", hasPhoto: true, photoIdx: 2 },
  { id: 5, shopName: "Mittal Accessories", location: "Nehru Place, Delhi", agent: "Amit Verma", status: "Visited", time: "02:30 PM", hasPhoto: true, photoIdx: 0 },
  { id: 6, shopName: "Aggarwal Sweets", location: "Karol Bagh, Delhi", agent: "Suresh Patel", status: "Visited", time: "03:15 PM", hasPhoto: true, photoIdx: 1 },
];

const ShopVisits = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visits] = useState(initialVisits);

  const filteredVisits = visits.filter(visit => {
    const matchesSearch = visit.shopName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          visit.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          visit.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || visit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: visits.length,
    visited: visits.filter(v => v.status === "Visited").length,
    notOpen: visits.filter(v => v.status === "Not Open").length,
    skipped: visits.filter(v => v.status === "Skipped").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Shop Visit Reports</h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium">Monitoring real-time performance and audit proofs.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 shadow-sm font-bold h-11 px-6 rounded-xl border-primary/20 text-primary hover:bg-primary/5">
             <Map size={18} /> View Route Map
           </Button>
           <Button className="gap-2 shadow-lg shadow-primary/20 font-bold h-11 px-8 rounded-xl bg-primary hover:bg-primary/90">
             Export Data
           </Button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        <Card className="border-border shadow-sm bg-primary/5 border-primary/10">
          <CardContent className="p-4 flex flex-col items-center text-center">
             <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Coverage</p>
             <p className="text-2xl font-bold text-foreground">{Math.round((stats.visited / stats.total) * 100)}%</p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm bg-success/5 border-success/10">
          <CardContent className="p-4 flex flex-col items-center text-center">
             <p className="text-[10px] font-bold text-success uppercase tracking-widest mb-1">Visited</p>
             <p className="text-2xl font-bold text-foreground">{stats.visited}</p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm bg-warning/5 border-warning/10">
          <CardContent className="p-4 flex flex-col items-center text-center">
             <p className="text-[10px] font-bold text-warning uppercase tracking-widest mb-1">Not Open</p>
             <p className="text-2xl font-bold text-foreground">{stats.notOpen}</p>
          </CardContent>
        </Card>
         <Card className="border-border shadow-sm bg-destructive/5 border-destructive/10">
          <CardContent className="p-4 flex flex-col items-center text-center">
             <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mb-1">Skipped</p>
             <p className="text-2xl font-bold text-foreground">{stats.skipped}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-card overflow-hidden rounded-2xl">
        <CardHeader className="pb-6 bg-muted/30 border-b border-border/50">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner"><Clock size={20} /></div>
               <div>
                 <CardTitle className="text-xl font-bold">Live Visit Logs</CardTitle>
                 <CardDescription className="text-xs font-medium">{format(new Date(), "EEEE, MMM dd, yyyy")}</CardDescription>
               </div>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px] h-10 shadow-sm bg-background font-medium">
                  <Filter size={14} className="mr-2 opacity-50" />
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Visits</SelectItem>
                  <SelectItem value="Visited">Success (Visited)</SelectItem>
                  <SelectItem value="Not Open">Not Open (Locked)</SelectItem>
                  <SelectItem value="Skipped">Skipped (Manual)</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full sm:w-[200px] h-10 justify-start text-left font-bold shadow-sm bg-background ${!date ? "text-muted-foreground" : ""}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-border shadow-2xl rounded-2xl overflow-hidden" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" />
                <Input 
                  placeholder="Filter by shop or agent..." 
                  className="pl-10 h-10 shadow-sm bg-background border-border" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {/* Desktop Table View */}
            <table className="w-full text-sm text-left border-collapse hidden sm:table">
              <thead className="bg-muted text-muted-foreground font-bold text-[10px] uppercase tracking-widest border-b border-border/50">
                <tr>
                  <th className="px-6 py-4">Shop & Location</th>
                  <th className="px-6 py-4">Field Agent</th>
                  <th className="px-6 py-4">Check-in Time</th>
                  <th className="px-6 py-4">Current Status</th>
                  <th className="px-6 py-4 text-center">Audit Proof</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredVisits.length > 0 ? (
                  filteredVisits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-muted/30 transition-all group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{visit.shopName}</div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-1 font-medium bg-muted/40 w-fit px-2 py-0.5 rounded border border-border/50">
                          <MapPin size={10} className="text-primary/70"/> {visit.location}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-[10px] font-bold uppercase ring-1 ring-border/50">{visit.agent.split(" ").map(n=>n[0]).join("")}</div>
                            <span className="font-semibold text-foreground/80">{visit.agent}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                           <Clock size={12} className="opacity-50" /> {visit.time}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <Badge variant="outline" className={`border-0 px-3 py-1 flex w-fit gap-1.5 items-center font-bold text-[10px] uppercase tracking-tighter shadow-sm ${
                          visit.status === 'Visited' ? 'bg-success/10 text-success ring-1 ring-success/20' :
                          visit.status === 'Not Open' ? 'bg-warning/10 text-warning ring-1 ring-warning/20' :
                          'bg-destructive/10 text-destructive ring-1 ring-destructive/20'
                        }`}>
                          {visit.status === 'Visited' && <CheckCircle2 size={12} />}
                          {visit.status === 'Not Open' && <AlertCircle size={12} />}
                          {visit.status === 'Skipped' && <X size={12} />}
                          {visit.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {visit.hasPhoto ? (
                          <Dialog>
                             <DialogTrigger asChild>
                               <div className="relative inline-block group/img cursor-pointer">
                                 <img 
                                   src={mockPhotos[visit.photoIdx || 0]} 
                                   alt="Proof" 
                                   className="w-12 h-12 object-cover rounded-xl border-2 border-background shadow-md ring-1 ring-border group-hover/img:ring-primary/50 transition-all"
                                 />
                                 <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 rounded-xl flex items-center justify-center transition-all">
                                   <Eye size={16} className="text-white drop-shadow-md" />
                                 </div>
                               </div>
                             </DialogTrigger>
                             <DialogContent className="max-w-xl p-2 rounded-2xl border-none shadow-2xl overflow-hidden bg-muted">
                               <DialogHeader className="bg-card p-4 rounded-t-2xl border-b">
                                  <DialogTitle className="flex justify-between items-center pr-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><ImageIcon size={20} /></div>
                                        <div>
                                          <p className="text-sm font-bold">{visit.shopName}</p>
                                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Visit Proof • {visit.time}</p>
                                        </div>
                                     </div>
                                     <Badge className="bg-success/10 text-success border-none text-[10px] font-bold uppercase">{visit.agent}</Badge>
                                  </DialogTitle>
                               </DialogHeader>
                               <div className="p-1">
                                 <img src={mockPhotos[visit.photoIdx || 0]} alt="Proof Full Size" className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-inner bg-card" />
                               </div>
                             </DialogContent>
                          </Dialog>
                        ) : (
                          <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest opacity-30">No Photo</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all">
                               <MapPin size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted transition-all">
                               <MoreVertical size={14} />
                            </Button>
                         </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center opacity-40">
                         <Filter size={40} className="text-muted-foreground mb-4" />
                         <h3 className="text-lg font-bold">No matches found</h3>
                         <p className="text-xs font-semibold uppercase tracking-widest mt-1">Try adjusting your filters or date selection</p>
                         <Button variant="link" onClick={() => {setSearchTerm(""); setStatusFilter("all"); setDate(new Date());}} className="mt-4 font-bold">Reset all filters</Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Mobile Card Layout */}
            <div className="grid grid-cols-1 gap-4 p-4 sm:hidden">
              {filteredVisits.length > 0 ? (
                filteredVisits.map((visit) => (
                  <Card key={visit.id} className="border-border shadow-sm overflow-hidden bg-card transition-all active:scale-[0.98]">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-foreground">{visit.shopName}</h4>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium bg-muted/50 px-2 py-0.5 rounded border border-border/50 max-w-[200px] truncate">
                            <MapPin size={10} className="text-primary/70 shrink-0"/> {visit.location}
                          </div>
                        </div>
                        <Badge variant="outline" className={`border-0 px-2 py-0.5 flex gap-1 items-center font-bold text-[9px] uppercase tracking-tighter shadow-sm shrink-0 ${
                          visit.status === 'Visited' ? 'bg-success/10 text-success ring-1 ring-success/20' :
                          visit.status === 'Not Open' ? 'bg-warning/10 text-warning ring-1 ring-warning/20' :
                          'bg-destructive/10 text-destructive ring-1 ring-destructive/20'
                        }`}>
                          {visit.status === 'Visited' && <CheckCircle2 size={10} />}
                          {visit.status === 'Not Open' && <AlertCircle size={10} />}
                          {visit.status === 'Skipped' && <X size={10} />}
                          {visit.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/50 pt-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-[10px] font-bold ring-1 ring-border/50">{visit.agent.split(" ").map(n=>n[0]).join("")}</div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-foreground/80">{visit.agent}</span>
                            <span className="text-[9px] text-muted-foreground flex items-center gap-1 font-bold"><Clock size={10} /> {visit.time}</span>
                          </div>
                        </div>
                        
                        {visit.hasPhoto ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 gap-2 text-[10px] font-bold uppercase rounded-lg border-primary/20 text-primary hover:bg-primary/5">
                                <ImageIcon size={14} /> View Proof
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95vw] sm:max-w-xl p-2 rounded-2xl border-none shadow-2xl overflow-hidden bg-muted">
                              <DialogHeader className="bg-card p-4 rounded-t-2xl border-b">
                                <DialogTitle className="flex flex-col gap-1 items-start">
                                  <p className="text-sm font-bold">{visit.shopName}</p>
                                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Check-in Proof • {visit.time}</p>
                                </DialogTitle>
                              </DialogHeader>
                              <div className="p-1">
                                <img src={mockPhotos[visit.photoIdx || 0]} alt="Proof" className="w-full h-auto max-h-[60vh] object-contain rounded-xl shadow-inner bg-card" />
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-40">No Audit Proof</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center text-center opacity-40">
                  <Filter size={32} className="text-muted-foreground mb-3" />
                  <p className="text-xs font-bold uppercase tracking-widest">No matching logs</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Real-time sync indicator */}
      <div className="flex items-center justify-center gap-3 py-4 text-xs font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">
         <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
         Live Sync Enabled • Last updated {format(new Date(), "HH:mm:ss")}
      </div>
    </div>
  );
};

export default ShopVisits;


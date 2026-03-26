import React, { useState } from "react";
import { AlertTriangle, MapPin, Users, Calendar, Download, Search, RefreshCw, MoreHorizontal, History, ShieldAlert, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const initialMissedShops = [
  { id: 1, shopName: "Verma Communications", location: "Green Park, Delhi", agent: "Ravi Kumar", reason: "Skipped", date: "Today", priority: "High" },
  { id: 2, shopName: "Sharma Mobile Point", location: "Lajpat Nagar, Delhi", agent: "Amit Verma", reason: "Not Open", date: "Today", priority: "Medium" },
  { id: 3, shopName: "K Khanna Store", location: "GK II, Delhi", agent: "Priya Sharma", reason: "Not Open", date: "Yesterday", priority: "Low" },
  { id: 4, shopName: "Global Tech", location: "Okhla Ph III, Delhi", agent: "Suresh Patel", reason: "Skipped", date: "Yesterday", priority: "High" },
  { id: 5, shopName: "Metro Electronics", location: "Saket, Delhi", agent: "Neha Singh", reason: "Not Open", date: "Today", priority: "Medium" },
];

const MissedShops = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [missedShops] = useState(initialMissedShops);

  const filteredShops = missedShops.filter(shop => 
    shop.shopName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    shop.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReassign = (id: number) => {
    const shop = missedShops.find(s => s.id === id);
    toast.success("Re-assignment Initiated", {
      description: `Shop "${shop?.shopName}" has been queued for re-visit tomorrow.`
    });
  };

  const stats = {
    today: missedShops.filter(s => s.date === "Today").length,
    notOpen: missedShops.filter(s => s.reason === "Not Open").length,
    skipped: missedShops.filter(s => s.reason === "Skipped").length,
    highPriority: missedShops.filter(s => s.priority === "High").length
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Missed Visit Analytics</h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium">Tracking skipped routes and closed premises for re-scheduling.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 h-11 px-6 rounded-xl font-bold border-border/50 text-foreground shadow-sm">
             <History size={18} /> Visit History
           </Button>
           <Button className="gap-2 h-11 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
             <Download size={18} /> Export CSV
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-border shadow-sm bg-destructive/5 border-destructive/10 group overflow-hidden">
          <CardContent className="p-5 flex flex-col justify-between">
             <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-destructive/10 rounded-lg text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground transition-all duration-300">
                 <ShieldAlert size={20} />
               </div>
               <Badge className="bg-destructive/10 text-destructive border-none text-[10px] font-bold uppercase tracking-tighter">Critical</Badge>
             </div>
             <div>
                <p className="text-2xl font-bold text-foreground">{stats.today}</p>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Missed Today</p>
             </div>
          </CardContent>
        </Card>
        
        <Card className="border-border shadow-sm bg-warning/5 border-warning/10 group overflow-hidden">
          <CardContent className="p-5 flex flex-col justify-between">
             <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-warning/10 rounded-lg text-warning group-hover:bg-warning group-hover:text-warning-foreground transition-all duration-300">
                 <AlertTriangle size={20} />
               </div>
               <Badge className="bg-warning/10 text-warning border-none text-[10px] font-bold uppercase tracking-tighter">Follow-up</Badge>
             </div>
             <div>
                <p className="text-2xl font-bold text-foreground">{stats.notOpen}</p>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Premises Closed</p>
             </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm bg-primary/5 border-primary/10 group overflow-hidden">
          <CardContent className="p-5 flex flex-col justify-between">
             <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                 <RefreshCw size={20} />
               </div>
               <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-tighter">Priority</Badge>
             </div>
             <div>
                <p className="text-2xl font-bold text-foreground">{stats.highPriority}</p>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">High Priority</p>
             </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm bg-muted/30 border-border group overflow-hidden">
          <CardContent className="p-5 flex flex-col justify-between h-full">
             <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Coverage Rate</p>
             <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-foreground">94.2%</p>
                <div className="flex items-center gap-1 text-success text-[10px] font-bold pb-1">
                   <ArrowUpRight size={12} /> 2.1%
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-card overflow-hidden rounded-2xl">
        <CardHeader className="pb-6 border-b border-border/50 bg-muted/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shadow-inner"><AlertTriangle size={20} /></div>
               <div>
                 <CardTitle className="text-xl font-bold">Audit Exception Logs</CardTitle>
                 <CardDescription className="text-xs font-semibold">Review and action anomalies in field coverage.</CardDescription>
               </div>
            </div>
            <div className="relative w-full sm:w-80 group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search by shop, agent or location..." 
                className="pl-10 h-11 rounded-xl shadow-sm bg-background border-border focus:ring-primary/20 transition-all font-medium" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {/* Desktop Table View */}
            <table className="w-full text-sm text-left border-collapse hidden sm:table">
              <thead className="bg-muted text-muted-foreground font-bold text-[10px] uppercase tracking-[0.1em] border-b border-border/50">
                <tr>
                  <th className="px-6 py-5">Shop Information</th>
                  <th className="px-6 py-5">Field Professional</th>
                  <th className="px-6 py-5 text-center">Exception Reason</th>
                  <th className="px-6 py-5">Timeline</th>
                  <th className="px-6 py-5">Severity</th>
                  <th className="px-6 py-5 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredShops.length > 0 ? (
                  filteredShops.map((shop) => (
                    <tr key={shop.id} className="hover:bg-muted/30 transition-all group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">{shop.shopName}</div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-1 font-semibold uppercase tracking-tighter opacity-70">
                          <MapPin size={12} className="text-primary/70" /> {shop.location}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-[10px] font-bold shadow-sm ring-1 ring-border/50 uppercase">{shop.agent.split(" ").map(n=>n[0]).join("")}</div>
                           <span className="font-bold text-foreground/80">{shop.agent}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <Badge variant="outline" className={`border-0 px-3 py-1 font-bold text-[10px] uppercase tracking-widest shadow-sm ring-1 ${
                          shop.reason === 'Skipped' ? 'bg-destructive/10 text-destructive ring-destructive/20' : 'bg-warning/10 text-warning ring-warning/20'
                        }`}>
                          {shop.reason}
                        </Badge>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                           <Calendar size={14} className="opacity-50" /> {shop.date}
                         </div>
                      </td>
                      <td className="px-6 py-5">
                         <div className={`w-fit px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter ${
                           shop.priority === 'High' ? 'bg-destructive text-destructive-foreground' :
                           shop.priority === 'Medium' ? 'bg-warning text-warning-foreground' :
                           'bg-success text-success-foreground'
                         }`}>
                           {shop.priority}
                         </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            onClick={() => handleReassign(shop.id)}
                            size="sm" 
                            className="h-9 px-4 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-bold gap-2 transition-all shadow-sm border-none"
                          >
                            <RefreshCw size={14} /> Re-schedule
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted">
                                <MoreHorizontal size={18} />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2 rounded-xl border border-border/50 shadow-2xl" align="end">
                               <div className="space-y-1">
                                  <Button variant="ghost" className="w-full justify-start text-xs font-bold rounded-lg h-9 gap-2">View Agent Comments</Button>
                                  <Button variant="ghost" className="w-full justify-start text-xs font-bold rounded-lg h-9 gap-2">Check-in Attempt GPS</Button>
                                  <Button variant="ghost" className="w-full justify-start text-xs font-bold rounded-lg h-9 gap-2 text-destructive hover:bg-destructive/10">Mark as Permanent Closed</Button>
                               </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                       <div className="flex flex-col items-center justify-center opacity-30">
                          <AlertTriangle size={48} className="text-muted-foreground mb-4" />
                          <h3 className="text-lg font-bold">No records found</h3>
                          <p className="text-xs font-bold uppercase tracking-widest">Adjust filters or search criteria</p>
                          <Button variant="link" onClick={() => setSearchTerm("")} className="mt-4 font-bold">Clear Search</Button>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 p-4 sm:hidden">
              {filteredShops.length > 0 ? (
                filteredShops.map((shop) => (
                  <Card key={shop.id} className="border-border shadow-card overflow-hidden bg-card transition-all active:scale-[0.98]">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-foreground">{shop.shopName}</h4>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold uppercase tracking-tighter opacity-70">
                            <MapPin size={12} className="text-primary/70" /> {shop.location}
                          </div>
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-tighter shadow-sm ${
                          shop.priority === 'High' ? 'bg-destructive text-destructive-foreground' :
                          shop.priority === 'Medium' ? 'bg-warning text-warning-foreground' :
                          'bg-success text-success-foreground'
                        }`}>
                          {shop.priority} Priority
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-2 border-y border-border/50">
                         <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-[9px] font-bold shadow-sm uppercase">{shop.agent.split(" ").map(n=>n[0]).join("")}</div>
                            <span className="text-[11px] font-bold text-foreground/80">{shop.agent}</span>
                         </div>
                         <Badge variant="outline" className={`border-0 px-2 py-0.5 font-bold text-[9px] uppercase tracking-widest shadow-sm ring-1 ${
                           shop.reason === 'Skipped' ? 'bg-destructive/10 text-destructive ring-destructive/20' : 'bg-warning/10 text-warning ring-warning/20'
                         }`}>
                           {shop.reason}
                         </Badge>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="opacity-50" /> {shop.date}
                        </div>
                        <Button 
                          onClick={() => handleReassign(shop.id)}
                          size="sm" 
                          className="h-8 px-4 rounded-lg bg-primary text-primary-foreground font-bold gap-2 text-[10px] shadow-lg shadow-primary/20"
                        >
                          <RefreshCw size={12} /> Re-schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="py-12 flex flex-col items-center text-center opacity-30">
                  <AlertTriangle size={32} className="text-muted-foreground mb-3" />
                  <p className="text-xs font-bold uppercase tracking-widest">No exceptions logged</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissedShops;

import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Phone, Search, Filter, Plus, Minus, Maximize2, Crosshair, Users, Zap, Clock, Info, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import mapImage from "@/assets/map-placeholder.jpg";

const activeEmployees = [
  { id: 1, name: "Ravi Kumar", status: "Moving", location: "Connaught Place", speed: "15 km/h", lastUpdate: "1 min ago", avatar: "RK", color: "bg-blue-500", pos: { top: "35%", left: "45%" } },
  { id: 2, name: "Priya Sharma", status: "Idle", location: "Sector 18, Noida", speed: "0 km/h", lastUpdate: "5 mins ago", avatar: "PS", color: "bg-orange-500", pos: { top: "65%", left: "75%" } },
  { id: 3, name: "Amit Verma", status: "At Shop", location: "MG Road Shop #4", speed: "0 km/h", lastUpdate: "12 mins ago", avatar: "AV", color: "bg-green-500", pos: { top: "45%", left: "25%" } },
  { id: 4, name: "Suresh Patel", status: "Moving", location: "Rajouri Garden", speed: "22 km/h", lastUpdate: "Just now", avatar: "SP", color: "bg-blue-500", pos: { top: "25%", left: "35%" } },
  { id: 5, name: "Neha Singh", status: "Moving", location: "Hauz Khas", speed: "18 km/h", lastUpdate: "3 mins ago", avatar: "NS", color: "bg-blue-500", pos: { top: "55%", left: "55%" } },
];

const LiveTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredEmployees = activeEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAgentClick = (id: number) => {
    setSelectedAgent(id);
    const agent = activeEmployees.find(a => a.id === id);
    toast.info(`Focusing on ${agent?.name}`, {
      description: `Current location: ${agent?.location}`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Operational Live Feed</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" /> 
            Monitoring 18 active field professionals in real-time.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <Button variant="outline" className="flex-1 sm:flex-none gap-2 h-11 px-6 rounded-xl font-bold border-border shadow-sm">
             <Clock size={18} /> Timeline view
           </Button>
           <Button className="flex-1 sm:flex-none gap-2 h-11 px-6 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20">
             <Zap size={18} /> Optimize Routes
           </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Sidebar - Active List */}
        <Card className="w-full lg:w-80 flex flex-col shadow-2xl border-border shrink-0 order-2 lg:order-1 overflow-hidden rounded-2xl">
          <CardHeader className="p-5 border-b border-border/50 bg-muted/20">
            <div className="flex items-center justify-between mb-4">
               <CardTitle className="text-lg font-bold tracking-tight">Active Fleet</CardTitle>
               <Maximize2 size={16} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </div>
            <div className="relative group">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Find professional..." 
                className="pl-10 h-10 text-xs rounded-xl border-border bg-background focus:ring-primary/20 font-bold" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1 bg-card">
            <div className="divide-y divide-border/30">
              {filteredEmployees.map((emp) => (
                <div 
                  key={emp.id} 
                  onClick={() => handleAgentClick(emp.id)}
                  className={`p-4 hover:bg-muted/50 transition-all cursor-pointer group relative ${selectedAgent === emp.id ? 'bg-primary/5' : ''}`}
                >
                  {selectedAgent === emp.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-2xl ${emp.color} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                      {emp.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{emp.name}</h4>
                        <Badge variant="outline" className={`text-[9px] font-bold px-2 py-0 border-none uppercase tracking-tighter ${
                          emp.status === 'Moving' ? 'bg-blue-100 text-blue-700' :
                          emp.status === 'At Shop' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {emp.status}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 mb-1.5 truncate font-bold uppercase tracking-tighter opacity-70">
                        <MapPin size={10} className="text-primary" /> {emp.location}
                      </p>
                      <div className="flex items-center justify-between text-[9px] text-muted-foreground font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Navigation size={10} className="text-primary" /> {emp.speed}</span>
                        <span className="opacity-50">{emp.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t border-border/50 bg-muted/10 text-center">
             <Button variant="ghost" size="sm" className="text-[10px] font-bold tracking-widest uppercase hover:bg-primary/5 text-primary">View All Reports</Button>
          </div>
        </Card>

        {/* Main Map Area */}
        <Card className="flex-1 shadow-2xl border-border overflow-hidden relative order-1 lg:order-2 flex flex-col min-h-[400px] rounded-2xl group/map">
          <div className="absolute inset-0 z-0 bg-muted/20">
            <img 
              src={mapImage} 
              alt="Live tracking map" 
              className="w-full h-full object-cover opacity-80"
            />
            
            {/* Mock Markers */}
            {activeEmployees.map((emp) => (
               <div 
                 key={`marker-${emp.id}`}
                 className={`absolute cursor-pointer transition-all duration-700 ease-in-out z-10 ${selectedAgent === emp.id ? 'scale-125 z-20' : 'hover:scale-110'}`}
                 style={{ top: emp.pos.top, left: emp.pos.left }}
                 onClick={() => handleAgentClick(emp.id)}
               >
                 <div className="relative">
                   {/* Pulse Effect for activity */}
                   {emp.status === 'Moving' && (
                     <div className={`absolute -inset-4 rounded-full ${emp.color} opacity-20 animate-ping`} />
                   )}
                   <div className={`w-8 h-8 rounded-full ${emp.color} border-4 border-white shadow-xl flex items-center justify-center text-white text-[8px] font-bold`}>
                      {emp.avatar}
                   </div>
                   {selectedAgent === emp.id && (
                     <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-background border border-border shadow-2xl rounded-lg px-3 py-2 whitespace-nowrap z-30 animate-in fade-in zoom-in slide-in-from-top-2 duration-300">
                        <p className="text-[10px] font-bold text-foreground">{emp.name}</p>
                        <p className="text-[9px] font-bold text-muted-foreground opacity-70">{emp.location}</p>
                        <div className="flex gap-2 mt-2">
                           <Button size="icon" className="w-6 h-6 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white border-none shadow-none"><Phone size={10} /></Button>
                           <Button size="icon" className="w-6 h-6 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white border-none shadow-none"><ExternalLink size={10} /></Button>
                        </div>
                     </div>
                   )}
                 </div>
               </div>
            ))}
          </div>

          {/* Overlay controls */}
          <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
            <div className="flex flex-col bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden shadow-black/5">
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-none border-b border-border/50 hover:bg-primary/5 hover:text-primary transition-all">
                <Plus size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-none hover:bg-primary/5 hover:text-primary transition-all">
                <Minus size={20} />
              </Button>
            </div>
            <Button variant="secondary" size="icon" className="h-11 w-11 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl hover:bg-primary hover:text-white transition-all group-active:scale-95">
              <Crosshair size={20} />
            </Button>
          </div>

          <div className="absolute bottom-6 left-6 z-20">
             <Card className="bg-background/80 backdrop-blur-xl border-border/50 shadow-2xl p-4 rounded-2xl border">
               <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fleet Status</span>
               </div>
               <div className="flex gap-8 text-[10px] font-bold uppercase tracking-tighter">
                 <div className="flex items-center gap-2.5 group cursor-default">
                   <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] group-hover:animate-ping"></div> 
                   <span className="text-foreground/80">Moving <span className="text-primary ml-1">(12)</span></span>
                 </div>
                 <div className="flex items-center gap-2.5 group cursor-default">
                   <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] group-hover:animate-ping"></div> 
                   <span className="text-foreground/80">At Shop <span className="text-success ml-1">(4)</span></span>
                 </div>
                 <div className="flex items-center gap-2.5 group cursor-default">
                   <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)] group-hover:animate-ping"></div> 
                   <span className="text-foreground/80">Idle <span className="text-warning ml-1">(2)</span></span>
                 </div>
               </div>
             </Card>
          </div>
          
          {/* Legend / Status Pill */}
          <div className="absolute top-6 left-6 z-20 flex gap-2">
             <Badge className="bg-background/80 backdrop-blur-xl text-foreground border border-border/50 px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl font-bold h-10">
               <Users size={16} className="text-primary" /> Multi-view active
             </Badge>
             <Badge className="bg-primary text-primary-foreground border-none px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl shadow-primary/30 font-bold h-10 animate-in slide-in-from-left-4">
               <Info size={16} /> 4 Heatzones Detected
             </Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LiveTracking;

import React, { useState } from "react";
import { MapPin, Navigation, Phone, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import mapImage from "@/assets/map-placeholder.jpg";

const activeEmployees = [
  { id: 1, name: "Ravi Kumar", status: "Moving", location: "Connaught Place", speed: "15 km/h", lastUpdate: "1 min ago", avatar: "RK" },
  { id: 2, name: "Priya Sharma", status: "Idle", location: "Sector 18, Noida", speed: "0 km/h", lastUpdate: "5 mins ago", avatar: "PS" },
  { id: 3, name: "Amit Verma", status: "At Shop", location: "MG Road Shop #4", speed: "0 km/h", lastUpdate: "12 mins ago", avatar: "AV" },
  { id: 4, name: "Suresh Patel", status: "Moving", location: "Rajouri Garden", speed: "22 km/h", lastUpdate: "Just now", avatar: "SP" },
];

const LiveTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = activeEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Live Tracking</h1>
          <p className="text-muted-foreground mt-1">Monitor active employee movements in real-time across all routes.</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="text-success border-success/30 bg-success/10 py-1.5 px-3">
             <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" /> 18 Active Agents
           </Badge>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Sidebar - Active List */}
        <Card className="w-full lg:w-80 flex flex-col shadow-card border-border shrink-0 order-2 lg:order-1">
          <CardHeader className="p-4 pb-2 border-b border-border/50">
            <CardTitle className="text-lg">Agent Status</CardTitle>
            <div className="flex gap-2 mt-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search agent..." 
                  className="pl-8 h-8 text-xs" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
                <Filter size={14} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="divide-y divide-border/50">
              {filteredEmployees.map((emp) => (
                <div key={emp.id} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                      {emp.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-sm truncate">{emp.name}</h4>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 border-0 ${
                          emp.status === 'Moving' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          emp.status === 'At Shop' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {emp.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1 truncate">
                        <MapPin size={10} /> {emp.location}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                        <span className="flex items-center gap-1"><Navigation size={10} className="text-primary/70" /> {emp.speed}</span>
                        <span>{emp.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Map Area */}
        <Card className="flex-1 shadow-card border-border overflow-hidden relative order-1 lg:order-2 flex flex-col min-h-[400px]">
          <img 
            src={mapImage} 
            alt="Live tracking map" 
            className="w-full h-full object-cover absolute inset-0 z-0"
          />
          {/* Overlay controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Button variant="secondary" size="icon" className="shadow-md bg-background/90 backdrop-blur">
              <Plus size={18} />
            </Button>
            <Button variant="secondary" size="icon" className="shadow-md bg-background/90 backdrop-blur">
              <Minus size={18} />
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 z-10">
             <Card className="bg-background/90 backdrop-blur-md border-border/50 shadow-lg px-4 py-3">
               <div className="flex gap-6 text-xs font-medium">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div> Moving (12)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div> At Shop (4)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div> Idle (2)</div>
               </div>
             </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Assuming you don't have Minus icon imported above, adding a quick mockup for the Minus icon since we missed it in the import.
const Minus = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const Plus = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default LiveTracking;

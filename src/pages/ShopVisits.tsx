import React, { useState } from "react";
import { Search, Calendar as CalendarIcon, Filter, Image as ImageIcon, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

const dummyVisits = [
  { id: 1, shopName: "Gupta Electronics", location: "South Ex", agent: "Ravi Kumar", status: "Visited", time: "10:30 AM", hasPhoto: true },
  { id: 2, shopName: "Sharma Mobile Point", location: "Lajpat Nagar", agent: "Amit Verma", status: "Not Open", time: "11:15 AM", hasPhoto: true },
  { id: 3, shopName: "Verma Communications", location: "Green Park", agent: "Ravi Kumar", status: "Skipped", time: "12:00 PM", hasPhoto: false },
  { id: 4, shopName: "Tech Hub", location: "Hauz Khas", agent: "Priya Sharma", status: "Visited", time: "01:45 PM", hasPhoto: true },
  { id: 5, shopName: "Mittal Accessories", location: "Nehru Place", agent: "Amit Verma", status: "Visited", time: "02:30 PM", hasPhoto: true },
];

const ShopVisits = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredVisits = dummyVisits.filter(visit => {
    const matchesSearch = visit.shopName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          visit.agent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || visit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Shop Visit Reports</h1>
          <p className="text-muted-foreground mt-1">Review shop visit statuses and photo proofs.</p>
        </div>
      </div>

      <Card className="border-border shadow-card">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <CardTitle className="text-lg shrink-0">Visit Logs</CardTitle>
            
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search shop or agent..." 
                  className="pl-9 h-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px] h-9">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Visited">Visited</SelectItem>
                  <SelectItem value="Not Open">Not Open</SelectItem>
                  <SelectItem value="Skipped">Skipped</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full sm:w-[180px] h-9 justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 hidden sm:block h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-border shadow-lg">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border/50">
                <tr>
                  <th className="px-6 py-4">Shop Details</th>
                  <th className="px-6 py-4">Field Agent</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredVisits.length > 0 ? (
                  filteredVisits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground">{visit.shopName}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin size={10}/> {visit.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground/80">{visit.agent}</td>
                      <td className="px-6 py-4 text-muted-foreground">{visit.time}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={`border-0 px-2 py-1 flex w-fit gap-1.5 items-center ${
                          visit.status === 'Visited' ? 'bg-success/10 text-success' :
                          visit.status === 'Not Open' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {visit.status === 'Visited' && <div className="w-1.5 h-1.5 rounded-full bg-success"></div>}
                          {visit.status === 'Not Open' && <div className="w-1.5 h-1.5 rounded-full bg-warning"></div>}
                          {visit.status === 'Skipped' && <div className="w-1.5 h-1.5 rounded-full bg-destructive"></div>}
                          {visit.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {visit.hasPhoto ? (
                          <Popover>
                             <PopoverTrigger asChild>
                               <Button variant="ghost" size="sm" className="h-8 gap-2 text-primary hover:bg-primary/10 hover:text-primary">
                                 <ImageIcon size={14} /> View
                               </Button>
                             </PopoverTrigger>
                             <PopoverContent className="w-64 p-2 shadow-lg border-border" side="left">
                               <div className="flex justify-between items-center mb-2 px-1">
                                 <span className="text-sm font-medium">Photo Proof</span>
                                 <span className="text-xs text-muted-foreground">{visit.time}</span>
                               </div>
                               <div className="aspect-video bg-muted rounded-md border border-border flex items-center justify-center text-muted-foreground text-xs">
                                 Image Placeholder
                               </div>
                             </PopoverContent>
                          </Popover>
                        ) : (
                          <span className="text-muted-foreground text-xs italic pl-2">No photo</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                      No visits found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopVisits;

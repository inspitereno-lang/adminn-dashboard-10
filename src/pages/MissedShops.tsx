import React from "react";
import { AlertTriangle, MapPin, Users, Calendar, Download, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const dummyMissedShops = [
  { id: 1, shopName: "Verma Communications", location: "Green Park", agent: "Ravi Kumar", reason: "Skipped", date: "Today" },
  { id: 2, shopName: "Sharma Mobile Point", location: "Lajpat Nagar", agent: "Amit Verma", reason: "Not Open", date: "Today" },
  { id: 3, shopName: "K Khanna Store", location: "GK II", agent: "Priya Sharma", reason: "Not Open", date: "Yesterday" },
  { id: 4, shopName: "Global Tech", location: "Okhla Ph III", agent: "Suresh Patel", reason: "Skipped", date: "Yesterday" },
];

const MissedShops = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Missed Shop Report</h1>
          <p className="text-muted-foreground mt-1">Detailed list of shops not visited or found closed.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download size={14} /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border shadow-sm bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-destructive font-medium flex items-center gap-2">
              <AlertTriangle size={16} /> Total Missed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 152 total shops assigned</p>
          </CardContent>
        </Card>
        <Card className="border-border shadow-sm bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-warning font-medium flex items-center gap-2">
              <AlertTriangle size={16} /> Marked "Not Open"
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">Requires re-visit tomorrow</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-card">
        <CardHeader className="pb-4 border-b border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg">Missed Visit Details</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search shop or agent..." className="pl-9 h-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border/50">
                <tr>
                  <th className="px-6 py-4">Shop Name</th>
                  <th className="px-6 py-4">Field Agent</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {dummyMissedShops.map((shop) => (
                  <tr key={shop.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{shop.shopName}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin size={12} /> {shop.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground/80 font-medium">{shop.agent}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`border-0 ${
                        shop.reason === 'Skipped' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
                      }`}>
                        {shop.reason}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{shop.date}</td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="h-8 text-primary hover:bg-primary/10">Re-assign</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissedShops;

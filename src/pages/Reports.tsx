import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  IndianRupee, 
  Map, 
  Store, 
  CheckCircle2,
  Calendar
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const routeEfficiencyData = [
  { name: "South Delhi", efficiency: 94 },
  { name: "Gurgaon", efficiency: 82 },
  { name: "Noida", efficiency: 88 },
  { name: "Dwarka", efficiency: 91 },
  { name: "Rohini", efficiency: 76 },
];

const performanceData = [
  { agent: "Ravi Kumar", rating: 98, visits: 145 },
  { agent: "Priya Sharma", rating: 95, visits: 132 },
  { agent: "Amit Verma", rating: 92, visits: 128 },
  { agent: "Suresh Patel", rating: 89, visits: 110 },
];

const coverageData = [
  { name: "Visited", value: 85, color: "hsl(145,60%,42%)" },
  { name: "Skipped", value: 10, color: "hsl(0,70%,55%)" },
  { name: "Not Open", value: 5, color: "hsl(38,90%,55%)" },
];

const Reports = () => {
  const [period, setPeriod] = useState("week");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics & Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Route efficiency and field performance insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36">
              <Calendar size={14} className="mr-2 opacity-50" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Overall Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.4%</div>
            <div className="mt-2">
              <Progress value={85.4} className="h-1.5" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
              <TrendingUp size={10} className="text-success" /> +2.1% from last {period}
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Route Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.2%</div>
            <p className="text-[10px] text-muted-foreground mt-1">Avg time per shop: 12 mins</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <p className="text-[10px] text-muted-foreground mt-1">Based on 1.2k total visits</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Field Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹84.2k</div>
            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingDown size={10} className="text-destructive" /> -12% optimized routes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Efficiency Chart */}
        <Card className="lg:col-span-2 shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Map size={18} className="text-primary" /> Route-wise Efficiency
            </CardTitle>
            <CardDescription>Performance comparison across main regional routes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={routeEfficiencyData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(214,20%,95%)" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 13, fontWeight: 500 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ borderRadius: 12, border: '1px solid hsl(214,20%,90%)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                />
                <Bar 
                  dataKey="efficiency" 
                  fill="hsl(213,80%,50%)" 
                  radius={[0, 6, 6, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Coverage Percentage */}
        <Card className="shadow-card border-border flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Store size={18} className="text-primary" /> Coverage Details
            </CardTitle>
            <CardDescription>Breakdown of shop visit outcomes.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center pb-8">
            <div className="relative h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={coverageData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={60} 
                    outerRadius={80} 
                    dataKey="value" 
                    paddingAngle={5}
                    stroke="none"
                  >
                    {coverageData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold">85%</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Visited</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {coverageData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-foreground/80">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Performance Table */}
      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 size={18} className="text-primary" /> Employee Performance Benchmarks
          </CardTitle>
          <CardDescription>Ranking based on visit reliability and data accuracy.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/40 font-medium text-muted-foreground border-y border-border/50">
                <tr>
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4 text-center">Total Visits</th>
                  <th className="px-6 py-4 text-center">Efficiency Score</th>
                  <th className="px-6 py-4 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {performanceData.map((p, i) => (
                   <tr key={i} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-[10px]">
                            {p.agent.split(" ").map(n=>n[0]).join("")}
                          </div>
                          <span className="font-semibold">{p.agent}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">{p.visits}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5 items-center">
                          <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${p.rating}%` }} />
                          </div>
                          <span className="text-[10px] font-bold">{p.rating}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-success font-bold text-xs">
                        <TrendingUp size={12} className="inline mr-1" /> +2%
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

export default Reports;

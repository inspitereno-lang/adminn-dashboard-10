import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  IndianRupee, 
  Map, 
  Store, 
  CheckCircle2,
  Calendar,
  Download,
  Share2,
  Filter
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
  Cell,
  Legend
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const routeEfficiencyData = [
  { name: "South Delhi", efficiency: 94, shops: 120 },
  { name: "Gurgaon", efficiency: 82, shops: 85 },
  { name: "Noida", efficiency: 88, shops: 92 },
  { name: "Dwarka", efficiency: 91, shops: 110 },
  { name: "Rohini", efficiency: 76, shops: 65 },
];

const performanceData = [
  { agent: "Ravi Kumar", rating: 98, visits: 145, trend: "+4%" },
  { agent: "Priya Sharma", rating: 95, visits: 132, trend: "+2%" },
  { agent: "Amit Verma", rating: 92, visits: 128, trend: "+1%" },
  { agent: "Suresh Patel", rating: 89, visits: 110, trend: "-1%" },
];

const coverageData = [
  { name: "Visited", value: 85, color: "hsl(145,60%,42%)" },
  { name: "Skipped", value: 10, color: "hsl(0,70%,55%)" },
  { name: "Not Open", value: 5, color: "hsl(38,90%,55%)" },
];

const Reports = () => {
  const [period, setPeriod] = useState("week");
  const [isExporting, setIsExporting] = useState(false);
  const [metrics, setMetrics] = useState({
    coverage: 85.4,
    efficiency: 91.2,
    performance: 4.8,
    expenses: 84.2
  });

  useEffect(() => {
    // Simulate data fetching/updating when period changes
    const multiplier = period === 'month' ? 4 : period === 'quarter' ? 12 : 1;
    setMetrics({
      coverage: 85 + (Math.random() * 2),
      efficiency: 90 + (Math.random() * 3),
      performance: 4.5 + (Math.random() * 0.4),
      expenses: 84.2 * multiplier
    });
  }, [period]);

  const handleExport = () => {
    setIsExporting(true);
    toast.promise(new Promise(res => setTimeout(res, 2500)), {
      loading: `Generating PDF report for ${period}...`,
      success: () => {
        setIsExporting(false);
        return "Report downloaded successfully!";
      },
      error: "Export failed. Please try again.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground uppercase">Operational Intel</h1>
          <p className="text-sm text-muted-foreground mt-1 font-bold flex items-center gap-2">
            <TrendingUp size={14} className="text-success" />
            Insights generated from {period === 'week' ? '7 days' : period === 'month' ? '30 days' : '90 days'} of field data.
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36 h-11 border-border shadow-sm rounded-xl font-bold bg-background">
              <Calendar size={16} className="mr-2 text-primary" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">Quarterly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="h-11 px-4 rounded-xl border-border shadow-sm font-bold gap-2 bg-background hover:bg-muted" onClick={() => toast.info("Filter applied", { description: "Report view has been updated." })}>
             <Filter size={16} /> Filters
          </Button>
          <Button className="h-11 px-6 rounded-xl shadow-lg shadow-primary/20 font-bold gap-2" onClick={handleExport} disabled={isExporting}>
             <Download size={18} /> {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="shadow-2xl border-border hover:border-primary/50 transition-all rounded-2xl group overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
            <TrendingUp size={40} className="text-primary -rotate-12" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Target Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.coverage.toFixed(1)}%</div>
            <div className="mt-4">
              <Progress value={metrics.coverage} className="h-2 bg-primary/10" />
            </div>
            <p className="text-[9px] font-bold text-success mt-3 flex items-center gap-1 uppercase tracking-tighter">
              Ahead by 2.1% <span className="text-muted-foreground font-medium opacity-50">vs last {period}</span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-2xl border-border hover:border-success/50 transition-all rounded-2xl group overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Fleet Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.efficiency.toFixed(1)}%</div>
            <p className="text-[9px] font-bold text-muted-foreground mt-2 uppercase tracking-tighter flex items-center gap-2">
              <Badge variant="outline" className="text-[8px] h-4 bg-success/10 text-success border-none">Optimal</Badge>
              12 mins / shop avg.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-2xl border-border hover:border-warning/50 transition-all rounded-2xl group overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">CSAT Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.performance.toFixed(1)} / 5.0</div>
            <div className="flex gap-0.5 mt-2">
               {[1,2,3,4,5].map(i => <div key={i} className={`h-1 w-4 rounded-full ${i <= 4 ? 'bg-warning' : 'bg-muted'}`} />)}
            </div>
            <p className="text-[9px] font-bold text-muted-foreground mt-2 uppercase tracking-tighter">Based on 1.2k responses</p>
          </CardContent>
        </Card>

        <Card className="shadow-2xl border-border hover:border-primary/50 transition-all rounded-2xl group overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">OPEX Burn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{metrics.expenses >= 1000 ? (metrics.expenses/1000).toFixed(1) + 'k' : metrics.expenses.toFixed(0)}</div>
            <p className="text-[9px] font-bold text-destructive mt-2 flex items-center gap-1 uppercase tracking-tighter">
              <TrendingDown size={10} /> -12% Savings <span className="text-muted-foreground font-medium opacity-50">via optimizations</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Efficiency Chart */}
        <Card className="lg:col-span-2 shadow-2xl border-border rounded-2xl overflow-hidden">
          <CardHeader className="p-6 border-b border-border/50 bg-muted/20">
            <CardTitle className="text-lg font-bold tracking-tight flex items-center justify-between">
              <div className="flex items-center gap-2 uppercase">
                <Map size={20} className="text-primary" /> Route Performance Index
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary">Download Data</Button>
            </CardTitle>
            <CardDescription className="font-medium">Comparing efficiency vs shop volume across regions.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={routeEfficiencyData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="5 5" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 11, fontWeight: 800 }} 
                  axisLine={false} 
                  tickLine={false} 
                  width={90}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--primary)/2%)' }} 
                  contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                />
                <Bar 
                  dataKey="efficiency" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 10, 10, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Coverage Percentage */}
        <Card className="shadow-2xl border-border flex flex-col rounded-2xl overflow-hidden">
          <CardHeader className="p-6 border-b border-border/50 bg-muted/20">
            <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2 uppercase">
              <Store size={20} className="text-primary" /> Funnel Output
            </CardTitle>
            <CardDescription className="font-medium">Visit conversion breakdown.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center p-6">
            <div className="relative h-56 mb-8 group">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={coverageData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={70} 
                    outerRadius={95} 
                    dataKey="value" 
                    paddingAngle={8}
                    stroke="none"
                  >
                    {coverageData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} className="drop-shadow-lg" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold leading-none">{metrics.coverage.toFixed(0)}%</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Converted</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {coverageData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/20 transition-all font-bold">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="uppercase text-foreground/70">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Performance Table */}
      <Card className="shadow-2xl border-border rounded-2xl overflow-hidden mb-6">
        <CardHeader className="p-6 border-b border-border/50 bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold tracking-tight flex items-center gap-2 uppercase">
                <CheckCircle2 size={20} className="text-primary" /> Star Performers
              </CardTitle>
              <CardDescription className="font-medium">Top field agents ranked by efficiency and reliability.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2 rounded-xl font-bold border-border" onClick={() => toast.success("Organization analytics synced")}>
               <Share2 size={14} /> Full Organization View
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-card">
          <div className="overflow-x-auto">
            {/* Desktop Table View */}
            <table className="w-full text-sm text-left hidden sm:table">
              <thead className="bg-muted font-bold text-[10px] text-muted-foreground uppercase tracking-widest border-b border-border">
                <tr>
                  <th className="px-8 py-5">Professional</th>
                  <th className="px-8 py-5 text-center">Visit Count</th>
                  <th className="px-8 py-5 text-center">Efficiency Score</th>
                  <th className="px-8 py-5 text-right">Momentum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {performanceData.map((p, i) => (
                   <tr key={i} className="hover:bg-primary/5 transition-all cursor-pointer">
                      <td className="px-4 sm:px-8 py-4 sm:py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shadow-inner">
                            {p.agent.split(" ").map(n=>n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-bold text-foreground uppercase tracking-tight">{p.agent}</p>
                            <p className="text-[10px] text-muted-foreground font-bold">{p.agent.includes('Kumar') ? 'Tier 1 Agent' : 'Supervisor'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-8 py-4 sm:py-5 text-center font-bold text-base text-foreground/80">{p.visits}</td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-2 items-center">
                          <div className="w-32 h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" style={{ width: `${p.rating}%` }} />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{p.rating}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <Badge variant="outline" className={`font-bold text-[10px] border-none ${p.trend.startsWith('+') ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                          {p.trend.startsWith('+') ? <TrendingUp size={12} className="mr-1 inline" /> : <TrendingDown size={12} className="mr-1 inline" />}
                          {p.trend}
                        </Badge>
                      </td>
                   </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-3 p-4 sm:hidden">
              {performanceData.map((p, i) => (
                <Card key={i} className="border-border shadow-sm overflow-hidden bg-card/50">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shadow-inner">
                          {p.agent.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground uppercase truncate w-32">{p.agent}</p>
                          <p className="text-[10px] text-muted-foreground font-bold">{p.agent.includes('Kumar') ? 'Field Agent' : 'Supervisor'}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`font-bold text-[9px] border-none ${p.trend.startsWith('+') ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                        {p.trend.startsWith('+') ? <TrendingUp size={10} className="mr-1 inline" /> : <TrendingDown size={10} className="mr-1 inline" />}
                        {p.trend}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-border/50">
                      <div className="space-y-1 text-center border-r border-border/50">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Target Visits</p>
                        <p className="text-xl font-bold text-foreground">{p.visits}</p>
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Efficiency</p>
                        <p className="text-xl font-bold text-primary">{p.rating}%</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                        <span>Route Saturation</span>
                        <span className="text-primary">{p.rating}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.4)]" style={{ width: `${p.rating}%` }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
        <div className="p-6 bg-muted/10 border-t border-border/50 flex justify-center">
           <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/5">View Complete Rankings</Button>
        </div>
      </Card>
    </div>
  );
};

export default Reports;

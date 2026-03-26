import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Users, IndianRupee } from "lucide-react";

const attendanceData = [
  { day: "Mon", present: 40, absent: 8 },
  { day: "Tue", present: 42, absent: 6 },
  { day: "Wed", present: 38, absent: 10 },
  { day: "Thu", present: 44, absent: 4 },
  { day: "Fri", present: 36, absent: 12 },
  { day: "Sat", present: 20, absent: 28 },
];

const expenseData = [
  { week: "Week 1", amount: 24000 },
  { week: "Week 2", amount: 31000 },
  { week: "Week 3", amount: 18000 },
  { week: "Week 4", amount: 28000 },
];

const categoryData = [
  { name: "Travel", value: 35, color: "hsl(213,80%,50%)" },
  { name: "Meals", value: 20, color: "hsl(145,60%,42%)" },
  { name: "Equipment", value: 25, color: "hsl(38,90%,55%)" },
  { name: "Supplies", value: 12, color: "hsl(280,60%,50%)" },
  { name: "Other", value: 8, color: "hsl(215,10%,50%)" },
];

const Reports = () => {
  const [period, setPeriod] = useState("week");
  const [empFilter, setEmpFilter] = useState("all");

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Reports</h2>
          <p className="text-sm text-muted-foreground">Attendance & expense analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={empFilter} onValueChange={setEmpFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              <SelectItem value="ravi">Ravi Kumar</SelectItem>
              <SelectItem value="priya">Priya Sharma</SelectItem>
              <SelectItem value="amit">Amit Verma</SelectItem>
            </SelectContent>
          </Select>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-card rounded-lg border border-border shadow-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Avg Attendance</span>
          </div>
          <p className="text-xl font-bold text-foreground">92%</p>
          <div className="flex items-center gap-1 text-xs text-success mt-1">
            <TrendingUp size={12} /> +3% from last week
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border shadow-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <IndianRupee size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Total Expenses</span>
          </div>
          <p className="text-xl font-bold text-foreground">₹1.01L</p>
          <div className="flex items-center gap-1 text-xs text-destructive mt-1">
            <TrendingDown size={12} /> -8% from last week
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border shadow-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">Late Check-ins</span>
          </div>
          <p className="text-xl font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground mt-1">Avg 2/day</p>
        </div>
        <div className="bg-card rounded-lg border border-border shadow-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted-foreground">Avg Hours/Day</span>
          </div>
          <p className="text-xl font-bold text-foreground">8.5h</p>
          <div className="flex items-center gap-1 text-xs text-success mt-1">
            <TrendingUp size={12} /> On target
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-card rounded-lg border border-border shadow-card p-5">
          <h3 className="text-sm font-medium text-foreground mb-1">Attendance Overview</h3>
          <p className="text-xs text-muted-foreground mb-4">Present vs absent by day</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(215,10%,50%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,10%,50%)" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid hsl(214,20%,90%)" }} />
              <Bar dataKey="present" fill="hsl(213,80%,50%)" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="hsl(0,70%,55%)" radius={[4, 4, 0, 0]} name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border shadow-card p-5">
          <h3 className="text-sm font-medium text-foreground mb-1">Expense Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Weekly spending pattern</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="hsl(215,10%,50%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,10%,50%)" tickFormatter={v => `₹${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid hsl(214,20%,90%)" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Amount"]} />
              <Line type="monotone" dataKey="amount" stroke="hsl(213,80%,50%)" strokeWidth={2.5} dot={{ r: 5, fill: "hsl(213,80%,50%)", stroke: "hsl(0,0%,100%)", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense by Category */}
      <div className="bg-card rounded-lg border border-border shadow-card p-5">
        <h3 className="text-sm font-medium text-foreground mb-1">Expenses by Category</h3>
        <p className="text-xs text-muted-foreground mb-4">Breakdown of spending</p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={2} stroke="hsl(0,0%,100%)">
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2.5 flex-1">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-foreground">{cat.name}</span>
                </div>
                <span className="text-muted-foreground font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

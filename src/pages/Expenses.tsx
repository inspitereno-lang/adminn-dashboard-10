import { useState } from "react";
import { Check, X, Receipt, Eye, Filter, AlertCircle, TrendingUp, Clock, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import receipt1 from "@/assets/receipt-1.jpg";
import receipt2 from "@/assets/receipt-2.jpg";
import receipt3 from "@/assets/receipt-3.jpg";
import { toast } from "sonner";

const receipts = [receipt1, receipt2, receipt3];

const initialExpenses = [
  { id: 1, name: "Ravi Kumar", role: "Field Agent", amount: 2500, desc: "Fuel reimbursement for South Delhi route", category: "Travel", date: "Mar 25, 2026", status: "Pending", receipt: 0 },
  { id: 2, name: "Priya Sharma", role: "Supervisor", amount: 1200, desc: "Client lunch meeting - Project Alpha", category: "Meals", date: "Mar 25, 2026", status: "Pending", receipt: 1 },
  { id: 3, name: "Amit Verma", role: "Field Agent", amount: 3800, desc: "Equipment repair — heavy duty drill", category: "Equipment", date: "Mar 24, 2026", status: "Pending", receipt: 2 },
  { id: 4, name: "Suresh Patel", role: "Field Agent", amount: 950, desc: "Auto travel to distant client site", category: "Travel", date: "Mar 24, 2026", status: "Approved", receipt: 0 },
  { id: 5, name: "Neha Singh", role: "Driver", amount: 4000, desc: "Vehicle maintenance (front tyre change)", category: "Maintenance", date: "Mar 23, 2026", status: "Rejected", receipt: 1 },
  { id: 6, name: "Vikram Tiwari", role: "Field Agent", amount: 1800, desc: "Office supplies for field registration kit", category: "Supplies", date: "Mar 23, 2026", status: "Approved", receipt: 2 },
];

const Expenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAction = (id: number, newStatus: 'Approved' | 'Rejected') => {
    const expense = expenses.find(e => e.id === id);
    setExpenses(expenses.map(e => e.id === id ? { ...e, status: newStatus } : e));
    
    if (newStatus === 'Approved') {
      toast.success("Expense Approved", {
        description: `₹${expense?.amount.toLocaleString()} approved for ${expense?.name}.`,
        icon: <Check className="text-success" size={16} />
      });
    } else {
      toast.error("Expense Rejected", {
        description: `Claim for ₹${expense?.amount.toLocaleString()} has been declined.`,
        icon: <X className="text-destructive" size={16} />
      });
    }
  };

  const filtered = statusFilter === "all" ? expenses : expenses.filter(e => e.status.toLowerCase() === statusFilter);
  
  const stats = {
    pending: expenses.filter(e => e.status === "Pending").length,
    approved: expenses.filter(e => e.status === "Approved").length,
    rejected: expenses.filter(e => e.status === "Rejected").length,
    pendingTotal: expenses.filter(e => e.status === "Pending").reduce((s, e) => s + e.amount, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Expense Claims</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Review and process employee reimbursement requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-warning/5 border-warning/20 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
             <div className="space-y-1">
               <p className="text-xs font-bold text-warning/80 uppercase tracking-wider">Pending</p>
               <p className="text-2xl font-bold text-warning">{stats.pending}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning"><Clock size={20} /></div>
          </CardContent>
        </Card>
        <Card className="bg-success/5 border-success/20 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
             <div className="space-y-1">
               <p className="text-xs font-bold text-success/80 uppercase tracking-wider">Approved</p>
               <p className="text-2xl font-bold text-success">{stats.approved}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success"><CheckCircle2Icon size={20} /></div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/5 border-destructive/20 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
             <div className="space-y-1">
               <p className="text-xs font-bold text-destructive/80 uppercase tracking-wider">Rejected</p>
               <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive"><XCircleIcon size={20} /></div>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
             <div className="space-y-1">
               <p className="text-xs font-bold text-primary/80 uppercase tracking-wider">Total Pending</p>
               <p className="text-2xl font-bold text-primary">₹{stats.pendingTotal.toLocaleString()}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><TrendingUp size={20} /></div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 h-10 shadow-sm bg-background">
            <Filter size={16} className="mr-2 text-muted-foreground" />
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Submissions</SelectItem>
            <SelectItem value="pending">Pending Review</SelectItem>
            <SelectItem value="approved">Approved Claims</SelectItem>
            <SelectItem value="rejected">Rejected Claims</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/50">
          <History size={14} /> Showing last 30 days of records
        </div>
      </div>

      {/* Expense Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map(exp => (
          <div key={exp.id} className="bg-card rounded-2xl border border-border shadow-card overflow-hidden hover:shadow-card-hover transition-all group flex flex-col">
            {/* Receipt Image */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative h-44 cursor-pointer overflow-hidden">
                  <img
                    src={receipts[exp.receipt]}
                    alt={`Receipt from ${exp.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all flex items-center justify-center backdrop-blur-0 group-hover:backdrop-blur-[2px]">
                    <div className="bg-card text-foreground p-2 px-4 rounded-xl shadow-xl flex items-center gap-2 font-bold text-sm scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all">
                      <Eye size={16} /> View Receipt
                    </div>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground hover:bg-card border-none shadow-lg text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {exp.category}
                  </Badge>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-2 rounded-2xl overflow-hidden border-none shadow-2xl">
                <DialogHeader className="p-4 border-b">
                   <DialogTitle className="flex items-center justify-between pr-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Receipt size={20} /></div>
                        <div>
                          <p className="text-base">{exp.desc}</p>
                          <p className="text-xs text-muted-foreground font-normal">Submitted by {exp.name} on {exp.date}</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold">₹{exp.amount.toLocaleString()}</p>
                   </DialogTitle>
                </DialogHeader>
                <div className="bg-muted p-1">
                  <img src={receipts[exp.receipt]} alt="Receipt full view" className="w-full rounded-xl shadow-inner max-h-[70vh] object-contain" />
                </div>
              </DialogContent>
            </Dialog>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shadow-sm">
                     {exp.name.split(" ").map(n=>n[0]).join("")}
                   </div>
                   <div>
                     <p className="text-sm font-bold text-foreground leading-none">{exp.name}</p>
                     <p className="text-[11px] text-muted-foreground font-medium mt-1 uppercase tracking-tighter">{exp.role}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-lg font-bold text-foreground leading-none">₹{exp.amount.toLocaleString()}</p>
                   <p className="text-[10px] text-muted-foreground font-medium mt-1">{exp.date}</p>
                </div>
              </div>
              
              <p className="text-sm text-foreground/80 font-medium line-clamp-2 min-h-[2.5rem] mb-4 bg-muted/20 p-2 rounded-lg border border-border/50">
                "{exp.desc}"
              </p>

              <div className="mt-auto">
                {exp.status === "Pending" ? (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Button 
                      onClick={() => handleAction(exp.id, 'Approved')}
                      size="sm" 
                      className="h-10 gap-2 bg-success hover:bg-success/90 text-success-foreground font-bold rounded-xl shadow-lg shadow-success/10 transition-all hover:translate-y-[-1px] active:translate-y-0"
                    >
                      <Check size={16} strokeWidth={3} /> Approve
                    </Button>
                    <Button 
                      onClick={() => handleAction(exp.id, 'Rejected')}
                      size="sm" 
                      variant="outline" 
                      className="h-10 gap-2 text-destructive border-destructive/20 hover:bg-destructive/5 font-bold rounded-xl transition-all"
                    >
                      <X size={16} strokeWidth={3} /> Reject
                    </Button>
                  </div>
                ) : (
                  <div className={`mt-2 p-3 rounded-xl border flex items-center justify-between ${
                    exp.status === "Approved" ? "bg-success/5 border-success/20 text-success" : "bg-destructive/5 border-destructive/20 text-destructive"
                  }`}>
                    <div className="flex items-center gap-2">
                      {exp.status === "Approved" ? <CheckCircle2Icon size={16} /> : <AlertCircle size={16} />}
                      <span className="text-xs font-bold uppercase tracking-widest">{exp.status}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-tight hover:bg-transparent px-0 opacity-60 hover:opacity-100">
                      View Audit Log
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <Card className="py-24 border-dashed border-2 flex flex-col items-center justify-center bg-muted/10">
          <Receipt size={48} className="text-muted-foreground opacity-20 mb-4" />
          <h3 className="font-bold text-lg">No records found</h3>
          <p className="text-muted-foreground text-sm">No expense claims match your current filter settings.</p>
          <Button variant="link" onClick={() => setStatusFilter("all")} className="mt-2 font-bold">Show all submissions</Button>
        </Card>
      )}
    </div>
  );
};

export default Expenses;

// Helper Icons
const CheckCircle2Icon = ({ size }: { size: number }) => <Check className="text-success" size={size} />;
const XCircleIcon = ({ size }: { size: number }) => <X className="text-destructive" size={size} />;


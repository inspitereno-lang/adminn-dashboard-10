import { useState } from "react";
import { Check, X, Receipt, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import receipt1 from "@/assets/receipt-1.jpg";
import receipt2 from "@/assets/receipt-2.jpg";
import receipt3 from "@/assets/receipt-3.jpg";

const receipts = [receipt1, receipt2, receipt3];

const expenses = [
  { id: 1, name: "Ravi Kumar", role: "Field Agent", amount: "₹2,500", desc: "Fuel reimbursement", category: "Travel", date: "Mar 25, 2026", status: "Pending", receipt: 0 },
  { id: 2, name: "Priya Sharma", role: "Supervisor", amount: "₹1,200", desc: "Client lunch meeting", category: "Meals", date: "Mar 25, 2026", status: "Pending", receipt: 1 },
  { id: 3, name: "Amit Verma", role: "Field Agent", amount: "₹3,800", desc: "Equipment repair — drill machine", category: "Equipment", date: "Mar 24, 2026", status: "Pending", receipt: 2 },
  { id: 4, name: "Suresh Patel", role: "Field Agent", amount: "₹950", desc: "Auto travel to client site", category: "Travel", date: "Mar 24, 2026", status: "Approved", receipt: 0 },
  { id: 5, name: "Neha Singh", role: "Driver", amount: "₹4,000", desc: "Vehicle maintenance (tyre change)", category: "Maintenance", date: "Mar 23, 2026", status: "Rejected", receipt: 1 },
  { id: 6, name: "Vikram Tiwari", role: "Field Agent", amount: "₹1,800", desc: "Office supplies for field kit", category: "Supplies", date: "Mar 23, 2026", status: "Approved", receipt: 2 },
];

const Expenses = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = statusFilter === "all" ? expenses : expenses.filter(e => e.status.toLowerCase() === statusFilter);
  const pendingTotal = expenses.filter(e => e.status === "Pending").reduce((s, e) => s + parseInt(e.amount.replace(/[₹,]/g, "")), 0);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Expenses</h2>
          <p className="text-sm text-muted-foreground">Review and approve submissions</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-warning/10 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-warning">{expenses.filter(e => e.status === "Pending").length}</p>
          <p className="text-[10px] font-medium text-warning">Pending</p>
        </div>
        <div className="bg-success/10 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-success">{expenses.filter(e => e.status === "Approved").length}</p>
          <p className="text-[10px] font-medium text-success">Approved</p>
        </div>
        <div className="bg-destructive/10 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-destructive">{expenses.filter(e => e.status === "Rejected").length}</p>
          <p className="text-[10px] font-medium text-destructive">Rejected</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-card p-4">
        <p className="text-xs text-muted-foreground">Total Pending Amount</p>
        <p className="text-2xl font-bold text-foreground">₹{pendingTotal.toLocaleString()}</p>
      </div>

      {/* Filter */}
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40">
          <Filter size={14} className="mr-2" />
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {/* Expense Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map(exp => (
          <div key={exp.id} className="bg-card rounded-lg border border-border shadow-card overflow-hidden hover:shadow-card-hover transition-shadow">
            {/* Receipt Image */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative h-32 cursor-pointer group">
                  <img
                    src={receipts[exp.receipt]}
                    alt={`Receipt from ${exp.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                    <Eye size={20} className="text-card opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-foreground">
                    {exp.category}
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg p-2">
                <img src={receipts[exp.receipt]} alt="Receipt full view" className="w-full rounded-lg" />
              </DialogContent>
            </Dialog>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{exp.name}</p>
                  <p className="text-xs text-muted-foreground">{exp.role}</p>
                </div>
                <p className="text-base font-bold text-foreground">{exp.amount}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{exp.desc}</p>
              <p className="text-[11px] text-muted-foreground">{exp.date}</p>

              {exp.status === "Pending" ? (
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="flex-1 gap-1.5 bg-success hover:bg-success/90 text-success-foreground">
                    <Check size={14} /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
                    <X size={14} /> Reject
                  </Button>
                </div>
              ) : (
                <div className="mt-3 pt-3 border-t border-border">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    exp.status === "Approved" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}>
                    {exp.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;

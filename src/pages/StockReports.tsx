import React, { useState } from "react";
import { Package, Store, TrendingUp, TrendingDown, Calendar, Download, Search, Info, AlertTriangle, ArrowRight, BarChart3, Layers, Filter, User, Clock, CheckCircle2, MapPin, MoreHorizontal, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const dummyProductData = [
  { id: 1, name: "Premium Widget A", category: "Electronics", stockIn: 1200, stockSold: 450, currentStock: 750, trend: "+12%", threshold: 200 },
  { id: 2, name: "Standard Gizmo", category: "Hardware", stockIn: 5000, stockSold: 3200, currentStock: 1800, trend: "-5%", threshold: 500 },
  { id: 3, name: "Eco-Friendly Case", category: "Accessories", stockIn: 800, stockSold: 650, currentStock: 150, trend: "+24%", threshold: 200 },
  { id: 4, name: "Power Adapter", category: "Electronics", stockIn: 2000, stockSold: 1100, currentStock: 900, trend: "+2%", threshold: 300 },
  { id: 5, name: "Wireless Mouse", category: "Peripherals", stockIn: 1500, stockSold: 1420, currentStock: 80, trend: "+8%", threshold: 100 },
];

const dummyShopData = [
  { id: 1, shopName: "Gupta Electronics", location: "South Ex, Delhi", totalStockAdded: 450, lastEntry: "Yesterday", agent: "Ravi Kumar" },
  { id: 2, shopName: "Sharma Mobile Point", location: "Lajpat Nagar, Delhi", totalStockAdded: 120, lastEntry: "Today", agent: "Amit Verma" },
  { id: 3, shopName: "Tech Hub", location: "Hauz Khas, Delhi", totalStockAdded: 890, lastEntry: "2 days ago", agent: "Priya Sharma" },
  { id: 4, shopName: "Verma Communications", location: "Green Park, Delhi", totalStockAdded: 340, lastEntry: "Just now", agent: "Ravi Kumar" },
];

const StockReports = () => {
  const [timeRange, setTimeRange] = useState("daily");
  const [productSearch, setProductSearch] = useState("");
  const [shopSearch, setShopSearch] = useState("");
  const [products] = useState(dummyProductData);
  const [shops] = useState(dummyShopData);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredShops = shops.filter(s => 
    s.shopName.toLowerCase().includes(shopSearch.toLowerCase()) || 
    s.location.toLowerCase().includes(shopSearch.toLowerCase()) ||
    s.agent.toLowerCase().includes(shopSearch.toLowerCase())
  );

  const handleExport = () => {
    toast.success("Export Started", {
      description: `Downloading ${timeRange} stock report CSV...`
    });
  };

  const lowStockCount = products.filter(p => p.currentStock < p.threshold).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Stock Intelligence</h1>
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-medium">Real-time inventory tracking across field locations.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[150px] font-bold h-11 rounded-xl shadow-sm border-border/50">
              <Calendar size={16} className="mr-2 text-primary" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Today (Live)</SelectItem>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} variant="outline" className="gap-2 h-11 px-5 rounded-xl font-bold border-primary/20 text-primary hover:bg-primary/5 shadow-sm transition-all hover:scale-105">
            <Download size={16} /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card className="shadow-sm border-border bg-card overflow-hidden group">
          <CardContent className="p-5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner"><Layers size={24} /></div>
             <div>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Total SKUs</p>
               <div className="text-2xl font-bold">{products.length}</div>
             </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card overflow-hidden group">
          <CardContent className="p-5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-success/10 text-success flex items-center justify-center group-hover:bg-success group-hover:text-success-foreground transition-all duration-300 shadow-inner"><TrendingUp size={24} /></div>
             <div>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Field Stock</p>
               <div className="text-2xl font-bold">{products.reduce((acc, p) => acc + p.currentStock, 0).toLocaleString()}</div>
             </div>
          </CardContent>
        </Card>
        <Card className={`shadow-sm border-border overflow-hidden group ${lowStockCount > 0 ? 'bg-destructive/5 border-destructive/20' : 'bg-card'}`}>
          <CardContent className="p-5 flex items-center gap-4">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-inner ${lowStockCount > 0 ? 'bg-destructive/20 text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground' : 'bg-muted text-muted-foreground'}`}>
               <AlertTriangle size={24} />
             </div>
             <div>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Low Stock</p>
               <div className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-destructive' : ''}`}>{lowStockCount} Items</div>
             </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border bg-card overflow-hidden group">
          <CardContent className="p-5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-warning/10 text-warning flex items-center justify-center group-hover:bg-warning group-hover:text-warning-foreground transition-all duration-300 shadow-inner"><BarChart3 size={24} /></div>
             <div>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Avg Movement</p>
               <div className="text-2xl font-bold">84%</div>
             </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="product" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <TabsList className="bg-muted p-1 h-12 w-full sm:w-auto rounded-xl">
            <TabsTrigger value="product" className="gap-2 h-10 px-6 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"><Package size={16} /> Product View</TabsTrigger>
            <TabsTrigger value="shop" className="gap-2 h-10 px-6 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"><Store size={16} /> Shop Entries</TabsTrigger>
          </TabsList>
          
          <div className="relative w-full sm:w-72 group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50 group-hover:text-primary transition-colors" />
            <Input 
              placeholder={productSearch ? "Filtering..." : "Quick search inventory..."} 
              className="pl-10 h-11 rounded-xl shadow-sm bg-background border-border/50 focus:ring-primary/20"
              value={productSearch}
              onChange={(e) => {
                setProductSearch(e.target.value);
                setShopSearch(e.target.value);
              }}
            />
          </div>
        </div>
        
        <TabsContent value="product" className="mt-0 outline-none">
          <Card className="shadow-card border-border border rounded-2xl overflow-hidden">
            <div className="bg-muted/30 p-4 border-b border-border/50 flex justify-between items-center">
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Active Catalog Tracking</span>
               <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold">{filteredProducts.length} Results</Badge>
            </div>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse hidden sm:table">
                  <thead className="bg-muted/20 text-muted-foreground font-bold text-[10px] uppercase tracking-widest border-b border-border/50">
                    <tr>
                      <th className="px-6 py-4">SKU Name</th>
                      <th className="px-6 py-4 text-center">Batch In</th>
                      <th className="px-6 py-4 text-center">Dispatched</th>
                      <th className="px-6 py-4 text-center">In Hand</th>
                      <th className="px-6 py-4">Status & Trend</th>
                      <th className="px-6 py-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {filteredProducts.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/20 group transition-all">
                        <td className="px-6 py-4">
                          <div className="font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</div>
                          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">{item.category}</div>
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-muted-foreground">{item.stockIn.toLocaleString()}</td>
                        <td className="px-6 py-4 text-center font-medium text-muted-foreground">{item.stockSold.toLocaleString()}</td>
                        <td className="px-6 py-4 text-center">
                           <div className={`font-bold text-sm px-3 py-1 rounded-lg inline-block ${item.currentStock < item.threshold ? 'bg-destructive/10 text-destructive ring-1 ring-destructive/20' : 'bg-muted ring-1 ring-border/50 text-foreground'}`}>
                             {item.currentStock.toLocaleString()}
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className={`p-1.5 rounded-lg ${item.trend.startsWith('+') ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                               {item.trend.startsWith('+') ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
                             </div>
                             <span className={`text-xs font-bold ${item.trend.startsWith('+') ? 'text-success' : 'text-destructive'}`}>{item.trend}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
                                 <ArrowRight size={16} />
                               </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md rounded-2xl border-none shadow-2xl overflow-hidden p-0">
                               <div className="bg-primary p-6 text-primary-foreground">
                                  <div className="flex items-center gap-3 mb-2">
                                     <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20"><Package size={20} /></div>
                                     <h2 className="text-xl font-bold">{item.name}</h2>
                                  </div>
                                  <p className="text-sm opacity-80 font-medium">Detailed inventory analysis for {item.category}</p>
                               </div>
                               <div className="p-6 space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                     <div className="p-4 bg-muted rounded-xl border border-border/50">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Safety Lock</p>
                                        <div className="text-lg font-bold">{item.threshold} units</div>
                                     </div>
                                     <div className="p-4 bg-muted rounded-xl border border-border/50">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Fulfillment</p>
                                        <div className="text-lg font-bold">{Math.round((item.stockSold / item.stockIn) * 100)}%</div>
                                     </div>
                                  </div>
                                  <div className="space-y-2">
                                     <div className="flex justify-between items-end">
                                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Current Utilization</p>
                                        <p className="text-xs font-bold text-primary">{Math.round((item.currentStock / item.stockIn) * 100)}% remaining</p>
                                     </div>
                                     <Progress value={(item.currentStock / item.stockIn) * 100} className="h-2 rounded-full bg-muted" />
                                  </div>
                                  <div className="pt-4 flex gap-2">
                                     <Button className="flex-1 rounded-xl h-11 font-bold shadow-lg shadow-primary/20">Refill Stock</Button>
                                     <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold">Adjust Threshold</Button>
                                  </div>
                               </div>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Card List */}
                <div className="grid grid-cols-1 gap-4 p-4 sm:hidden">
                  {filteredProducts.map((item) => (
                    <Card key={item.id} className="border-border shadow-sm overflow-hidden bg-card transition-all active:scale-[0.98]">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded border border-border/50 w-fit">{item.category}</p>
                          </div>
                          <Badge variant="outline" className={`border-0 px-2 py-0.5 text-[8px] font-bold uppercase tracking-tighter shadow-sm ${
                            item.currentStock <= item.threshold ? 'bg-destructive/10 text-destructive ring-1 ring-destructive/20' : 'bg-success/10 text-success ring-1 ring-success/20'
                          }`}>
                            {item.currentStock <= item.threshold ? <AlertTriangle size={10} className="mr-1 inline" /> : <CheckCircle2 size={10} className="mr-1 inline" />}
                            {item.currentStock <= item.threshold ? 'Low Stock' : 'Optimized'}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50">
                          <div className="text-center">
                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-1">In Store</p>
                            <p className="text-sm font-bold text-foreground">{item.stockIn}</p>
                          </div>
                          <div className="text-center border-x border-border/50">
                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Dispatched</p>
                            <p className="text-sm font-bold text-foreground">{item.stockSold}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-1">In Hand</p>
                            <p className={`text-sm font-bold ${item.currentStock <= item.threshold ? 'text-destructive' : 'text-primary'}`}>{item.currentStock}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                           <div className={`flex items-center gap-1.5 text-[10px] font-bold ${item.trend.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                              {item.trend.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                              {item.trend.startsWith('+') ? `${item.trend} Momentum` : `${item.trend} Decline`}
                           </div>
                           <Dialog>
                              <DialogTrigger asChild>
                                 <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-bold uppercase bg-muted hover:bg-muted/70 gap-2">
                                    Analysis <ChevronRight size={14} />
                                 </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[95vw] p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
                                 <div className="bg-primary p-5 text-primary-foreground">
                                    <h2 className="text-lg font-bold">{item.name}</h2>
                                    <p className="text-xs opacity-70">Catalog ID: SK-2026-{item.id}</p>
                                 </div>
                                 <div className="p-5 space-y-4">
                                    <div className="space-y-2">
                                       <div className="flex justify-between text-[10px] font-bold uppercase">
                                          <span>Current Capacity</span>
                                          <span>{Math.round((item.currentStock / item.stockIn) * 100)}%</span>
                                       </div>
                                       <Progress value={(item.currentStock / item.stockIn) * 100} className="h-1.5" />
                                    </div>
                                    <Button className="w-full h-11 rounded-xl font-bold shadow-lg shadow-primary/20">Refill Request</Button>
                                 </div>
                              </DialogContent>
                           </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="p-20 flex flex-col items-center justify-center opacity-40">
                     <Package size={48} className="mb-4" />
                     <p className="font-bold">No products found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shop" className="mt-0 outline-none">
          <Card className="shadow-card border-border border rounded-2xl overflow-hidden">
             <div className="bg-muted/30 p-4 border-b border-border/50 flex justify-between items-center">
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Field Entry Authentication Log</span>
               <Badge variant="outline" className="border-border text-[10px] font-bold text-muted-foreground">{filteredShops.length} Active Records</Badge>
            </div>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse hidden sm:table">
                  <thead className="bg-muted/20 text-muted-foreground font-bold text-[10px] uppercase tracking-widest border-b border-border/50">
                    <tr>
                      <th className="px-6 py-4">Retail Outlet</th>
                      <th className="px-6 py-4">Assigned Agent</th>
                      <th className="px-6 py-4 text-center">Stock Volume</th>
                      <th className="px-6 py-4">Submission Time</th>
                      <th className="px-6 py-4 text-right">Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {filteredShops.map((shop) => (
                      <tr key={shop.id} className="hover:bg-muted/20 group transition-all">
                        <td className="px-6 py-4">
                          <div className="font-bold text-foreground group-hover:text-primary transition-colors">{shop.shopName}</div>
                          <div className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5 uppercase tracking-tighter"><Store size={10} className="opacity-50" /> {shop.location}</div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold uppercase ring-1 ring-primary/20 shadow-sm">{shop.agent.split(" ").map(n=>n[0]).join("")}</div>
                              <span className="font-bold text-foreground/80 text-xs">{shop.agent}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                           <Badge className="bg-muted text-foreground hover:bg-muted border-none font-bold text-[10px] py-1 px-3 shadow-inner ring-1 ring-border/50">
                             {shop.totalStockAdded.toLocaleString()} UNITS
                           </Badge>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                              <Calendar size={12} className="opacity-50" /> {shop.lastEntry}
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-tighter hover:bg-primary/10 hover:text-primary transition-all">
                             View Form
                           </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Card List */}
                <div className="grid grid-cols-1 gap-3 p-4 sm:hidden">
                  {filteredShops.map((shop) => (
                    <Card key={shop.id} className="border-border shadow-sm bg-card/50 overflow-hidden active:scale-[0.98] transition-all">
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center text-[10px] font-bold shadow-inner shrink-0 uppercase">
                            {shop.agent.split(" ").map(n=>n[0]).join("")}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-[13px] text-foreground truncate">{shop.shopName}</h4>
                            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 truncate">
                              <User size={10} /> {shop.agent} • <Clock size={10} /> {shop.lastEntry}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-primary">{shop.totalStockAdded}</p>
                          <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Units</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockReports;

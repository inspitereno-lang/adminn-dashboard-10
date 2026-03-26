import React, { useState } from "react";
import { Package, Store, TrendingUp, TrendingDown, Calendar, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const dummyProductData = [
  { id: 1, name: "Premium Widget A", stockIn: 1200, stockSold: 450, currentStock: 750, trend: "+12%" },
  { id: 2, name: "Standard Gizmo", stockIn: 5000, stockSold: 3200, currentStock: 1800, trend: "-5%" },
  { id: 3, name: "Eco-Friendly Case", stockIn: 800, stockSold: 650, currentStock: 150, trend: "+24%" },
  { id: 4, name: "Power Adapter", stockIn: 2000, stockSold: 1100, currentStock: 900, trend: "+2%" },
];

const dummyShopData = [
  { id: 1, shopName: "Gupta Electronics", location: "South Ex", totalStockAdded: 450, lastEntry: "Yesterday" },
  { id: 2, shopName: "Sharma Mobile Point", location: "Lajpat Nagar", totalStockAdded: 120, lastEntry: "Today" },
  { id: 3, shopName: "Tech Hub", location: "Hauz Khas", totalStockAdded: 890, lastEntry: "2 days ago" },
];

const StockReports = () => {
  const [timeRange, setTimeRange] = useState("daily");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Stock Reports</h1>
          <p className="text-muted-foreground mt-1">Analyze product-wise stock data and shop entries.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar size={14} className="mr-2 text-muted-foreground" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily Report</SelectItem>
              <SelectItem value="weekly">Weekly Report</SelectItem>
              <SelectItem value="monthly">Monthly Report</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download size={14} /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
               <TrendingUp size={12} className="text-success" /> +3 new this week
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Total Items in Field</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,500</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
               <TrendingUp size={12} className="text-success" /> +1,200 since last week
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">8</div>
            <p className="text-xs text-muted-foreground mt-1">Items below threshold</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="product" className="space-y-4">
        <TabsList className="bg-muted w-full sm:w-auto flex">
          <TabsTrigger value="product" className="flex-1 sm:flex-none gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Package size={14} /> Product-wise</TabsTrigger>
          <TabsTrigger value="shop" className="flex-1 sm:flex-none gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"><Store size={14} /> Shop-wise</TabsTrigger>
        </TabsList>
        
        <TabsContent value="product" className="space-y-4">
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle>Product Stock Overview</CardTitle>
              <CardDescription>Current inventory levels for all active products.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-medium border-y border-border/50">
                    <tr>
                      <th className="px-6 py-3">Product Name</th>
                      <th className="px-6 py-3 text-right">Stock In</th>
                      <th className="px-6 py-3 text-right">Stock Sold</th>
                      <th className="px-6 py-3 text-right">Current Stock</th>
                      <th className="px-6 py-3 text-right">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {dummyProductData.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/30">
                        <td className="px-6 py-3 font-medium text-foreground">{item.name}</td>
                        <td className="px-6 py-3 text-right">{item.stockIn.toLocaleString()}</td>
                        <td className="px-6 py-3 text-right">{item.stockSold.toLocaleString()}</td>
                        <td className="px-6 py-3 text-right font-bold">{item.currentStock.toLocaleString()}</td>
                        <td className={`px-6 py-3 text-right text-xs font-semibold ${item.trend.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                          <div className="flex justify-end items-center gap-1">
                            {item.trend.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {item.trend}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shop" className="space-y-4">
          <Card className="shadow-card border-border">
             <CardHeader>
              <CardTitle>Shop Stock Entries</CardTitle>
              <CardDescription>Recent stock additions recorded by field agents at shops.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-medium border-y border-border/50">
                    <tr>
                      <th className="px-6 py-3">Shop Name</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Total Items Added</th>
                      <th className="px-6 py-3">Last Entry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {dummyShopData.map((shop) => (
                      <tr key={shop.id} className="hover:bg-muted/30">
                        <td className="px-6 py-3 font-medium text-foreground">{shop.shopName}</td>
                        <td className="px-6 py-3 text-muted-foreground">{shop.location}</td>
                        <td className="px-6 py-3 font-bold">{shop.totalStockAdded.toLocaleString()} units</td>
                        <td className="px-6 py-3 text-muted-foreground">{shop.lastEntry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockReports;

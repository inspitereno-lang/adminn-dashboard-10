import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/Employees";
import RouteManagement from "@/pages/RouteManagement";
import LiveTracking from "@/pages/LiveTracking";
import ShopVisits from "@/pages/ShopVisits";
import StockReports from "@/pages/StockReports";
import MissedShops from "@/pages/MissedShops";
import Expenses from "@/pages/Expenses";
import Reports from "@/pages/Reports";
import Attendance from "@/pages/Attendance";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/routes" element={<RouteManagement />} />
              <Route path="/tracking" element={<LiveTracking />} />
              <Route path="/visits" element={<ShopVisits />} />
              <Route path="/stock" element={<StockReports />} />
              <Route path="/missed" element={<MissedShops />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

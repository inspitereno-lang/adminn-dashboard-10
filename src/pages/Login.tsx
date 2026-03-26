import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { User, Lock, ArrowRight, ShieldCheck } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock login
    setTimeout(() => {
      if (username && password) {
        login(username);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error("Please enter credentials");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-4 font-sans antialiased overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      
      <div className="relative w-full max-w-md group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-lg transition duration-1000 group-hover:duration-200 group-hover:opacity-75"></div>
        
        <Card className="relative w-full border-none shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-8 pt-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 transition-transform hover:scale-105">
              <ShieldCheck className="h-9 w-9 text-white" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 capitalize">
                Field Connect
              </CardTitle>
              <CardDescription className="text-base text-slate-500 font-medium">
                Admin Secure Portal
              </CardDescription>
            </div>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-5 px-8">
              <div className="space-y-2.5">
                <Label htmlFor="username" className="text-sm font-semibold text-slate-700 ml-1">Username</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-primary" />
                  <Input
                    id="username"
                    placeholder="admin"
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary focus-visible:border-primary transition-all rounded-xl"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary focus-visible:border-primary transition-all rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-8 pb-10 pt-4">
              <Button 
                className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 flex items-center justify-center gap-2 group transition-all" 
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          &copy; 2024 Field Connect. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;

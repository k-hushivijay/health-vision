import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import { DoctorDashboard } from "@/components/dashboard/DoctorDashboard";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/patients" element={<DoctorDashboard />} />
              <Route path="/appointments" element={<Index />} />
              <Route path="/records" element={<Index />} />
              <Route path="/prescriptions" element={<Index />} />
              <Route path="/my-records" element={<Index />} />
              <Route path="/documents" element={<Index />} />
              <Route path="/risk-assessment" element={<Index />} />
              <Route path="/users" element={<Index />} />
              <Route path="/logs" element={<Index />} />
              <Route path="/analytics" element={<Index />} />
              <Route path="/settings" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { TicketsProvider } from "@/context/TicketsContext";
import AppShell from "@/components/AppShell";
import Onboarding from "@/pages/Onboarding";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Tickets from "@/pages/Tickets";
import TicketDetail from "@/pages/TicketDetail";
import Schedules from "@/pages/Schedules";
import Notifications from "@/pages/Notifications";
import Help from "@/pages/Help";
import About from "@/pages/About";
import Directory from "@/pages/Directory";
import NotFound from "@/pages/NotFound";
import SiteGate from "@/components/SiteGate";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/onboarding" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <TicketsProvider>
              <SiteGate>
                <Routes>
                  {/* Public marketing + info */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/directory" element={<Directory />} />
                  <Route path="/onboarding" element={<Onboarding />} />

                  {/* Authenticated app */}
                  <Route element={<RequireAuth><AppShell /></RequireAuth>}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/tickets/:id" element={<TicketDetail />} />
                    <Route path="/schedules" element={<Schedules />} />
                    <Route path="/notifications" element={<Notifications />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SiteGate>
            </TicketsProvider>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

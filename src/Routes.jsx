import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import PublicBookingInterface from './pages/public-booking-interface';
import AdminLogin from './pages/admin-login';
import CalendarManagement from './pages/calendar-management';
import ReservasManagement from './pages/reservas-management';
import ServicesManagement from './pages/services-management';
import ServiceConfiguration from './pages/service-configuration';
import ClientManagement from './pages/client-management';
import ClientPortalDashboard from './pages/client-portal-dashboard';
import ClientAppointmentHistory from './pages/client-appointment-history';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/public-booking-interface" element={<PublicBookingInterface />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/calendar-management" element={<CalendarManagement />} />
        <Route path="/reservas-management" element={<ReservasManagement />} />
        <Route path="/services-management" element={<ServicesManagement />} />
        <Route path="/service-configuration" element={<ServiceConfiguration />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="/client-portal-dashboard" element={<ClientPortalDashboard />} />
        <Route path="/client-appointment-history" element={<ClientAppointmentHistory />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
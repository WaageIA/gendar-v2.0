import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigationHeader from '../../components/ui/AdminNavigationHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import StatsCard from './components/StatsCard';
import RevenueChart from './components/RevenueChart';
import TodaySchedule from './components/TodaySchedule';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }
  }, [navigate]);

  // Dashboard statistics data
  const dashboardStats = [
    {
      title: "Agendamentos Hoje",
      value: "12",
      change: "+3 desde ontem",
      changeType: "positive",
      icon: "Calendar",
      color: "primary"
    },
    {
      title: "Receita do Mês",
      value: "R$ 18.450,00",
      change: "+12% vs mês anterior",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Clientes Ativos",
      value: "247",
      change: "+8 novos esta semana",
      changeType: "positive",
      icon: "Users",
      color: "info"
    },
    {
      title: "Taxa de Ocupação",
      value: "85%",
      change: "+5% vs semana anterior",
      changeType: "positive",
      icon: "TrendingUp",
      color: "warning"
    }
  ];

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <AdminNavigationHeader 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      {/* Sidebar */}
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Dashboard Administrativo
            </h1>
            <p className="text-muted-foreground">
              Visão geral do seu negócio - {new Date()?.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {dashboardStats?.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                change={stat?.change}
                changeType={stat?.changeType}
                icon={stat?.icon}
                color={stat?.color}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>

            {/* Quick Actions */}
            <div className="xl:col-span-1">
              <QuickActions />
            </div>
          </div>

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <div className="xl:col-span-1">
              <TodaySchedule />
            </div>

            {/* Recent Activity */}
            <div className="xl:col-span-1">
              <RecentActivity />
            </div>

            {/* Notification Center */}
            <div className="xl:col-span-1">
              <NotificationCenter />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
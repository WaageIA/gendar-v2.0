import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigationHeader from '../../components/ui/AdminNavigationHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import AccessMetrics from './components/AccessMetrics';
import InterfaceSettings from './components/InterfaceSettings';
import VisualCustomization from './components/VisualCustomization';
import TestimonialsManagement from './components/TestimonialsManagement';
import ServicesToggle from './components/ServicesToggle';
import PreviewButton from './components/PreviewButton';

const PublicInterfaceManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');

  // Check authentication on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }
  }, [navigate]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const tabs = [
    { id: 'metrics', label: 'Métricas de Acesso', icon: 'BarChart3' },
    { id: 'settings', label: 'Configurações', icon: 'Settings' },
    { id: 'customization', label: 'Customização Visual', icon: 'Palette' },
    { id: 'testimonials', label: 'Depoimentos', icon: 'MessageSquare' },
    { id: 'services', label: 'Serviços Online', icon: 'Briefcase' }
  ];

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
      <main className={`pt-16 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Interface Pública
              </h1>
              <p className="text-muted-foreground">
                Configure e monitore sua interface de agendamento online
              </p>
            </div>
            <PreviewButton />
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'metrics' && <AccessMetrics />}
            {activeTab === 'settings' && <InterfaceSettings />}
            {activeTab === 'customization' && <VisualCustomization />}
            {activeTab === 'testimonials' && <TestimonialsManagement />}
            {activeTab === 'services' && <ServicesToggle />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicInterfaceManagement;
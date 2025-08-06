import React, { useState, useEffect } from 'react';
import AdminNavigationHeader from '../../components/ui/AdminNavigationHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import ConfigurationDashboard from './components/ConfigurationDashboard';
import CategoryManagement from './components/CategoryManagement';
import ProfessionalManagement from './components/ProfessionalManagement';
import CommissionSettings from './components/CommissionSettings';
import ResourceManagement from './components/ResourceManagement';
import GeneralSettings from './components/GeneralSettings';

const ServiceConfiguration = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Global configuration data
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Cabelo',
      description: 'Serviços relacionados ao cuidado capilar',
      icon: 'Scissors',
      color: 'purple',
      status: 'active',
      servicesCount: 3,
      averagePrice: 105.00,
      totalRevenue: 14145.00,
      createdAt: '2024-01-15',
      updatedAt: '2025-01-06'
    },
    {
      id: '2',
      name: 'Unhas',
      description: 'Cuidados com unhas das mãos e pés',
      icon: 'Hand',
      color: 'pink',
      status: 'active',
      servicesCount: 2,
      averagePrice: 37.50,
      totalRevenue: 7810.00,
      createdAt: '2024-01-20',
      updatedAt: '2025-01-04'
    },
    {
      id: '3',
      name: 'Estética',
      description: 'Tratamentos estéticos e faciais',
      icon: 'Sparkles',
      color: 'blue',
      status: 'active',
      servicesCount: 2,
      averagePrice: 52.50,
      totalRevenue: 7810.00,
      createdAt: '2024-02-10',
      updatedAt: '2025-01-03'
    },
    {
      id: '4',
      name: 'Bem-estar',
      description: 'Massagens e terapias relaxantes',
      icon: 'Heart',
      color: 'green',
      status: 'active',
      servicesCount: 1,
      averagePrice: 70.00,
      totalRevenue: 3150.00,
      createdAt: '2024-03-05',
      updatedAt: '2025-01-01'
    }
  ]);

  const [professionals, setProfessionals] = useState([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria.silva@servicehub.com',
      phone: '(11) 99999-1111',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      specialties: ['Cabelo'],
      status: 'active',
      commissionRate: 15.00,
      workSchedule: {
        monday: { start: '08:00', end: '18:00', active: true },
        tuesday: { start: '08:00', end: '18:00', active: true },
        wednesday: { start: '08:00', end: '18:00', active: true },
        thursday: { start: '08:00', end: '18:00', active: true },
        friday: { start: '08:00', end: '18:00', active: true },
        saturday: { start: '08:00', end: '16:00', active: true },
        sunday: { start: '00:00', end: '00:00', active: false }
      },
      totalServices: 245,
      totalRevenue: 17685.00,
      averageRating: 4.8,
      joinDate: '2024-01-15',
      lastActive: '2025-01-06'
    },
    {
      id: '2',
      name: 'Ana Costa',
      email: 'ana.costa@servicehub.com',
      phone: '(11) 99999-2222',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      specialties: ['Cabelo', 'Estética'],
      status: 'active',
      commissionRate: 18.00,
      workSchedule: {
        monday: { start: '09:00', end: '17:00', active: true },
        tuesday: { start: '09:00', end: '17:00', active: true },
        wednesday: { start: '09:00', end: '17:00', active: true },
        thursday: { start: '09:00', end: '17:00', active: true },
        friday: { start: '09:00', end: '17:00', active: true },
        saturday: { start: '09:00', end: '15:00', active: true },
        sunday: { start: '00:00', end: '00:00', active: false }
      },
      totalServices: 189,
      totalRevenue: 12450.00,
      averageRating: 4.7,
      joinDate: '2024-02-01',
      lastActive: '2025-01-05'
    },
    {
      id: '3',
      name: 'Patricia Lima',
      email: 'patricia.lima@servicehub.com',
      phone: '(11) 99999-3333',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      specialties: ['Unhas', 'Estética'],
      status: 'active',
      commissionRate: 20.00,
      workSchedule: {
        monday: { start: '08:30', end: '17:30', active: true },
        tuesday: { start: '08:30', end: '17:30', active: true },
        wednesday: { start: '08:30', end: '17:30', active: true },
        thursday: { start: '08:30', end: '17:30', active: true },
        friday: { start: '08:30', end: '17:30', active: true },
        saturday: { start: '08:30', end: '14:00', active: true },
        sunday: { start: '00:00', end: '00:00', active: false }
      },
      totalServices: 201,
      totalRevenue: 9840.00,
      averageRating: 4.9,
      joinDate: '2024-01-25',
      lastActive: '2025-01-04'
    },
    {
      id: '4',
      name: 'Juliana Santos',
      email: 'juliana.santos@servicehub.com',
      phone: '(11) 99999-4444',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      specialties: ['Unhas', 'Estética'],
      status: 'active',
      commissionRate: 16.00,
      workSchedule: {
        monday: { start: '10:00', end: '19:00', active: true },
        tuesday: { start: '10:00', end: '19:00', active: true },
        wednesday: { start: '10:00', end: '19:00', active: true },
        thursday: { start: '10:00', end: '19:00', active: true },
        friday: { start: '10:00', end: '19:00', active: true },
        saturday: { start: '09:00', end: '17:00', active: true },
        sunday: { start: '00:00', end: '00:00', active: false }
      },
      totalServices: 156,
      totalRevenue: 6240.00,
      averageRating: 4.6,
      joinDate: '2024-03-10',
      lastActive: '2025-01-03'
    },
    {
      id: '5',
      name: 'Carla Oliveira',
      email: 'carla.oliveira@servicehub.com',
      phone: '(11) 99999-5555',
      photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150',
      specialties: ['Cabelo'],
      status: 'active',
      commissionRate: 22.00,
      workSchedule: {
        monday: { start: '08:00', end: '16:00', active: true },
        tuesday: { start: '08:00', end: '16:00', active: true },
        wednesday: { start: '08:00', end: '16:00', active: true },
        thursday: { start: '08:00', end: '16:00', active: true },
        friday: { start: '08:00', end: '16:00', active: true },
        saturday: { start: '00:00', end: '00:00', active: false },
        sunday: { start: '00:00', end: '00:00', active: false }
      },
      totalServices: 134,
      totalRevenue: 8940.00,
      averageRating: 4.8,
      joinDate: '2024-04-15',
      lastActive: '2025-01-02'
    },
    {
      id: '6',
      name: 'Fernanda Rocha',
      email: 'fernanda.rocha@servicehub.com',
      phone: '(11) 99999-6666',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      specialties: ['Bem-estar'],
      status: 'active',
      commissionRate: 25.00,
      workSchedule: {
        monday: { start: '09:00', end: '18:00', active: true },
        tuesday: { start: '09:00', end: '18:00', active: true },
        wednesday: { start: '09:00', end: '18:00', active: true },
        thursday: { start: '09:00', end: '18:00', active: true },
        friday: { start: '09:00', end: '18:00', active: true },
        saturday: { start: '09:00', end: '15:00', active: true },
        sunday: { start: '10:00', end: '16:00', active: true }
      },
      totalServices: 45,
      totalRevenue: 3150.00,
      averageRating: 4.9,
      joinDate: '2024-05-20',
      lastActive: '2025-01-01'
    }
  ]);

  const [resources, setResources] = useState([
    {
      id: '1',
      name: 'Cadeira de Corte Profissional',
      category: 'Equipamento',
      type: 'Cabelo',
      status: 'available',
      quantity: 3,
      cost: 1200.00,
      maintenanceDate: '2025-03-15',
      location: 'Sala 1',
      notes: 'Cadeiras hidráulicas com regulagem de altura'
    },
    {
      id: '2',
      name: 'Kit Manicure Completo',
      category: 'Ferramenta',
      type: 'Unhas',
      status: 'available',
      quantity: 5,
      cost: 150.00,
      maintenanceDate: '2025-02-01',
      location: 'Estação de Unhas',
      notes: 'Kits esterilizados e completos'
    },
    {
      id: '3',
      name: 'Vapor Facial',
      category: 'Equipamento',
      type: 'Estética',
      status: 'maintenance',
      quantity: 1,
      cost: 800.00,
      maintenanceDate: '2025-01-15',
      location: 'Sala de Estética',
      notes: 'Em manutenção preventiva'
    },
    {
      id: '4',
      name: 'Maca de Massagem',
      category: 'Equipamento',
      type: 'Bem-estar',
      status: 'available',
      quantity: 2,
      cost: 600.00,
      maintenanceDate: '2025-04-01',
      location: 'Sala de Massagem',
      notes: 'Macas ajustáveis com aquecimento'
    }
  ]);

  const [commissionRules, setCommissionRules] = useState({
    defaultRate: 18.00,
    categoryRates: {
      'Cabelo': 15.00,
      'Unhas': 18.00,
      'Estética': 20.00,
      'Bem-estar': 25.00
    },
    bonusRules: {
      monthlyTarget: 50,
      bonusPercentage: 5.00,
      ratingBonus: 2.00,
      minimumRating: 4.5
    }
  });

  const [generalSettings, setGeneralSettings] = useState({
    businessHours: {
      monday: { start: '08:00', end: '19:00', active: true },
      tuesday: { start: '08:00', end: '19:00', active: true },
      wednesday: { start: '08:00', end: '19:00', active: true },
      thursday: { start: '08:00', end: '19:00', active: true },
      friday: { start: '08:00', end: '19:00', active: true },
      saturday: { start: '08:00', end: '17:00', active: true },
      sunday: { start: '10:00', end: '16:00', active: true }
    },
    defaultServiceInterval: 15,
    advanceBookingDays: 30,
    cancellationPolicy: 24,
    autoConfirmBookings: false,
    sendReminders: true,
    reminderHours: 24
  });

  // Calculate summary metrics
  const summaryMetrics = {
    totalCategories: categories.filter(c => c.status === 'active').length,
    totalProfessionals: professionals.filter(p => p.status === 'active').length,
    averageCommission: professionals.reduce((sum, p) => sum + p.commissionRate, 0) / professionals.length,
    totalResources: resources.filter(r => r.status === 'available').length,
    totalRevenue: professionals.reduce((sum, p) => sum + p.totalRevenue, 0),
    averageRating: professionals.reduce((sum, p) => sum + p.averageRating, 0) / professionals.length
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
    { id: 'categories', label: 'Categorias', icon: 'Grid3X3' },
    { id: 'professionals', label: 'Profissionais', icon: 'Users' },
    { id: 'commissions', label: 'Comissões', icon: 'DollarSign' },
    { id: 'resources', label: 'Recursos', icon: 'Package' },
    { id: 'settings', label: 'Configurações', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AdminNavigationHeader
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Configurações de Serviços
            </h1>
            <p className="text-muted-foreground">
              Configure categorias, profissionais, comissões e recursos do sistema
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'dashboard' && (
                <ConfigurationDashboard
                  summaryMetrics={summaryMetrics}
                  categories={categories}
                  professionals={professionals}
                  resources={resources}
                />
              )}

              {activeTab === 'categories' && (
                <CategoryManagement
                  categories={categories}
                  setCategories={setCategories}
                />
              )}

              {activeTab === 'professionals' && (
                <ProfessionalManagement
                  professionals={professionals}
                  setProfessionals={setProfessionals}
                  categories={categories}
                />
              )}

              {activeTab === 'commissions' && (
                <CommissionSettings
                  commissionRules={commissionRules}
                  setCommissionRules={setCommissionRules}
                  professionals={professionals}
                  categories={categories}
                />
              )}

              {activeTab === 'resources' && (
                <ResourceManagement
                  resources={resources}
                  setResources={setResources}
                  categories={categories}
                />
              )}

              {activeTab === 'settings' && (
                <GeneralSettings
                  generalSettings={generalSettings}
                  setGeneralSettings={setGeneralSettings}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceConfiguration;
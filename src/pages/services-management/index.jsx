import React, { useState, useEffect } from 'react';
import AdminNavigationHeader from '../../components/ui/AdminNavigationHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import ServicesHeader from './components/ServicesHeader';
import ServicesGrid from './components/ServicesGrid';
import ServiceModal from './components/ServiceModal';
import ServiceDashboard from './components/ServiceDashboard';

const ServicesManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: 'all',
    status: 'all',
    popularity: 'all'
  });

  // Modal states
  const [serviceModal, setServiceModal] = useState({
    isOpen: false,
    service: null,
    mode: 'view'
  });

  const [dashboardModal, setDashboardModal] = useState({
    isOpen: false,
    service: null
  });

  // Mock services data - Unificado e expandido
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Corte de Cabelo Feminino',
      description: 'Corte personalizado com consultoria de estilo e finalização profissional',
      category: 'Cabelo',
      price: 45.00,
      duration: 60,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      features: ['Lavagem', 'Corte', 'Finalização', 'Consultoria'],
      resources: ['Cadeira de corte', 'Secador', 'Produtos profissionais'],
      professionals: ['Maria Silva', 'Ana Costa'],
      popularity: 95,
      totalBookings: 156,
      revenue: 7020.00,
      averageRating: 4.8,
      createdAt: '2024-01-15',
      updatedAt: '2025-01-06',
      isPromoted: true,
      commission: 15.00,
      costPrice: 12.00,
      margin: 73.33
    },
    {
      id: '2',
      name: 'Coloração Completa',
      description: 'Coloração profissional com produtos de alta qualidade e tratamento pós-cor',
      category: 'Cabelo',
      price: 120.00,
      duration: 120,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      features: ['Consultoria', 'Coloração', 'Tratamento', 'Finalização'],
      resources: ['Produtos de coloração', 'Timer', 'Climatizador'],
      professionals: ['Maria Silva', 'Carla Oliveira'],
      popularity: 88,
      totalBookings: 89,
      revenue: 10680.00,
      averageRating: 4.9,
      createdAt: '2024-02-01',
      updatedAt: '2025-01-05',
      isPromoted: false,
      commission: 20.00,
      costPrice: 35.00,
      margin: 70.83
    },
    {
      id: '3',
      name: 'Manicure Completa',
      description: 'Cuidado completo das unhas com cutilagem, hidratação e esmaltação',
      category: 'Unhas',
      price: 35.00,
      duration: 60,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
      features: ['Cutilagem', 'Hidratação', 'Esmaltação', 'Decoração'],
      resources: ['Kit de manicure', 'Esmaltes', 'Produtos de hidratação'],
      professionals: ['Patricia Lima', 'Juliana Santos'],
      popularity: 92,
      totalBookings: 134,
      revenue: 4690.00,
      averageRating: 4.7,
      createdAt: '2024-01-20',
      updatedAt: '2025-01-04',
      isPromoted: true,
      commission: 12.00,
      costPrice: 8.00,
      margin: 77.14
    },
    {
      id: '4',
      name: 'Design de Sobrancelha',
      description: 'Modelagem e design personalizado de sobrancelhas com técnicas modernas',
      category: 'Estética',
      price: 25.00,
      duration: 45,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400',
      features: ['Análise facial', 'Modelagem', 'Depilação', 'Finalização'],
      resources: ['Pinças profissionais', 'Cera', 'Produtos calmantes'],
      professionals: ['Ana Costa', 'Juliana Santos'],
      popularity: 85,
      totalBookings: 98,
      revenue: 2450.00,
      averageRating: 4.6,
      createdAt: '2024-03-10',
      updatedAt: '2025-01-03',
      isPromoted: false,
      commission: 10.00,
      costPrice: 5.00,
      margin: 80.00
    },
    {
      id: '5',
      name: 'Limpeza de Pele',
      description: 'Tratamento facial completo com limpeza profunda e hidratação',
      category: 'Estética',
      price: 80.00,
      duration: 90,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
      features: ['Análise de pele', 'Limpeza profunda', 'Extração', 'Hidratação'],
      resources: ['Vapor facial', 'Produtos específicos', 'Máscara facial'],
      professionals: ['Patricia Lima'],
      popularity: 78,
      totalBookings: 67,
      revenue: 5360.00,
      averageRating: 4.8,
      createdAt: '2024-04-05',
      updatedAt: '2025-01-02',
      isPromoted: false,
      commission: 18.00,
      costPrice: 22.00,
      margin: 72.50
    },
    {
      id: '6',
      name: 'Massagem Relaxante',
      description: 'Massagem terapêutica para alívio do estresse e tensões musculares',
      category: 'Bem-estar',
      price: 70.00,
      duration: 60,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      features: ['Avaliação postural', 'Massagem terapêutica', 'Óleos essenciais', 'Relaxamento'],
      resources: ['Maca de massagem', 'Óleos terapêuticos', 'Música relaxante'],
      professionals: ['Fernanda Rocha'],
      popularity: 82,
      totalBookings: 45,
      revenue: 3150.00,
      averageRating: 4.9,
      createdAt: '2024-05-15',
      updatedAt: '2025-01-01',
      isPromoted: true,
      commission: 25.00,
      costPrice: 15.00,
      margin: 78.57
    },
    {
      id: '7',
      name: 'Pedicure Spa',
      description: 'Tratamento completo dos pés com hidratação e relaxamento',
      category: 'Unhas',
      price: 40.00,
      duration: 50,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400',
      features: ['Escalda-pés', 'Cutilagem', 'Hidratação', 'Esmaltação'],
      resources: ['Bacia de hidromassagem', 'Kit pedicure', 'Produtos hidratantes'],
      professionals: ['Patricia Lima', 'Juliana Santos'],
      popularity: 87,
      totalBookings: 78,
      revenue: 3120.00,
      averageRating: 4.7,
      createdAt: '2024-02-20',
      updatedAt: '2024-12-30',
      isPromoted: false,
      commission: 12.00,
      costPrice: 10.00,
      margin: 75.00
    },
    {
      id: '8',
      name: 'Escova Progressiva',
      description: 'Tratamento alisante com produtos de alta qualidade e durabilidade',
      category: 'Cabelo',
      price: 150.00,
      duration: 180,
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400',
      features: ['Lavagem especial', 'Aplicação', 'Secagem', 'Finalização'],
      resources: ['Produtos alisantes', 'Secador profissional', 'Chapinha'],
      professionals: ['Maria Silva'],
      popularity: 65,
      totalBookings: 23,
      revenue: 3450.00,
      averageRating: 4.5,
      createdAt: '2024-06-01',
      updatedAt: '2024-12-15',
      isPromoted: false,
      commission: 30.00,
      costPrice: 45.00,
      margin: 70.00
    }
  ]);

  // Calculate summary metrics
  const summaryMetrics = {
    totalServices: services.length,
    activeServices: services.filter(s => s.status === 'active').length,
    totalRevenue: services.reduce((sum, s) => sum + s.revenue, 0),
    averagePrice: services.reduce((sum, s) => sum + s.price, 0) / services.length,
    totalBookings: services.reduce((sum, s) => sum + s.totalBookings, 0),
    averageRating: services.reduce((sum, s) => sum + s.averageRating, 0) / services.length,
    topCategory: 'Cabelo', // Most popular category
    promotedServices: services.filter(s => s.isPromoted).length
  };

  // Filter services based on current filters
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         service.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         service.category.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = filters.category === 'all' || service.category === filters.category;
    
    const matchesStatus = filters.status === 'all' || service.status === filters.status;
    
    let matchesPrice = true;
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'low':
          matchesPrice = service.price <= 50;
          break;
        case 'medium':
          matchesPrice = service.price > 50 && service.price <= 100;
          break;
        case 'high':
          matchesPrice = service.price > 100;
          break;
      }
    }
    
    let matchesPopularity = true;
    if (filters.popularity !== 'all') {
      switch (filters.popularity) {
        case 'high':
          matchesPopularity = service.popularity >= 90;
          break;
        case 'medium':
          matchesPopularity = service.popularity >= 70 && service.popularity < 90;
          break;
        case 'low':
          matchesPopularity = service.popularity < 70;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPrice && matchesPopularity;
  });

  // Handlers
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleServiceClick = (service) => {
    setServiceModal({
      isOpen: true,
      service,
      mode: 'view'
    });
  };

  const handleNewService = () => {
    setServiceModal({
      isOpen: true,
      service: {
        name: '',
        description: '',
        category: 'Cabelo',
        price: 0,
        duration: 60,
        status: 'active',
        features: [],
        resources: [],
        professionals: []
      },
      mode: 'create'
    });
  };

  const handleEditService = (service) => {
    setServiceModal({
      isOpen: true,
      service,
      mode: 'edit'
    });
  };

  const handleViewDashboard = (service) => {
    setDashboardModal({
      isOpen: true,
      service
    });
  };

  const handleSaveService = (serviceData) => {
    if (serviceModal.mode === 'create') {
      const newService = {
        ...serviceData,
        id: Date.now().toString(),
        totalBookings: 0,
        revenue: 0,
        averageRating: 0,
        popularity: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setServices(prev => [newService, ...prev]);
    } else {
      setServices(prev => 
        prev.map(s => s.id === serviceData.id ? { ...serviceData, updatedAt: new Date().toISOString().split('T')[0] } : s)
      );
    }
    setServiceModal({ isOpen: false, service: null, mode: 'view' });
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      setServices(prev => prev.filter(s => s.id !== serviceId));
      setServiceModal({ isOpen: false, service: null, mode: 'view' });
    }
  };

  const handleStatusChange = (serviceId, newStatus) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : s)
    );
  };

  const handlePromoteService = (serviceId) => {
    setServices(prev => 
      prev.map(s => s.id === serviceId ? { ...s, isPromoted: !s.isPromoted, updatedAt: new Date().toISOString().split('T')[0] } : s)
    );
  };

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
              Gerenciamento de Serviços
            </h1>
            <p className="text-muted-foreground">
              Gerencie seu catálogo de serviços, preços e disponibilidade
            </p>
          </div>

          {/* Services Header with Metrics and Filters */}
          <ServicesHeader
            filters={filters}
            onFilterChange={handleFilterChange}
            onNewService={handleNewService}
            summaryMetrics={summaryMetrics}
            totalServices={filteredServices.length}
          />

          {/* Services Grid */}
          <ServicesGrid
            services={filteredServices}
            onServiceClick={handleServiceClick}
            onEditService={handleEditService}
            onViewDashboard={handleViewDashboard}
            onStatusChange={handleStatusChange}
            onPromoteService={handlePromoteService}
          />
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        service={serviceModal.service}
        isOpen={serviceModal.isOpen}
        mode={serviceModal.mode}
        onClose={() => setServiceModal({ isOpen: false, service: null, mode: 'view' })}
        onSave={handleSaveService}
        onDelete={handleDeleteService}
      />

      {/* Service Dashboard Modal */}
      <ServiceDashboard
        service={dashboardModal.service}
        isOpen={dashboardModal.isOpen}
        onClose={() => setDashboardModal({ isOpen: false, service: null })}
      />
    </div>
  );
};

export default ServicesManagement;
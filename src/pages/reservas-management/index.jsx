import React, { useState, useEffect } from 'react';
import AdminNavigationHeader from '../../components/ui/AdminNavigationHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import ReservasHeader from './components/ReservasHeader';
import ReservasTable from './components/ReservasTable';
import ReservaModal from './components/ReservaModal';
import StatusBadge from './components/StatusBadge';

const ReservasManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'today',
    service: 'all'
  });

  // Modal states
  const [reservaModal, setReservaModal] = useState({
    isOpen: false,
    reserva: null,
    mode: 'view'
  });

  // Mock reservas data
  const [reservas, setReservas] = useState([
    {
      id: '1',
      clientName: 'Maria Silva',
      clientPhone: '(11) 99999-1234',
      clientEmail: 'maria.silva@email.com',
      service: 'Corte de Cabelo',
      date: '2025-01-08',
      time: '09:00',
      duration: 60,
      price: 45.00,
      status: 'confirmed',
      paymentStatus: 'pending',
      notes: 'Cliente prefere corte mais curto',
      createdAt: '2025-01-07T10:30:00'
    },
    {
      id: '2',
      clientName: 'Ana Costa',
      clientPhone: '(11) 99999-5678',
      clientEmail: 'ana.costa@email.com',
      service: 'Coloração',
      date: '2025-01-08',
      time: '14:00',
      duration: 120,
      price: 120.00,
      status: 'pending',
      paymentStatus: 'pending',
      notes: 'Primeira vez fazendo coloração',
      createdAt: '2025-01-07T15:20:00'
    },
    {
      id: '3',
      clientName: 'Carla Oliveira',
      clientPhone: '(11) 99999-9012',
      clientEmail: 'carla.oliveira@email.com',
      service: 'Manicure',
      date: '2025-01-09',
      time: '10:30',
      duration: 60,
      price: 35.00,
      status: 'confirmed',
      paymentStatus: 'paid',
      notes: '',
      createdAt: '2025-01-06T14:15:00'
    },
    {
      id: '4',
      clientName: 'Juliana Santos',
      clientPhone: '(11) 99999-3456',
      clientEmail: 'juliana.santos@email.com',
      service: 'Design de Sobrancelha',
      date: '2025-01-09',
      time: '15:00',
      duration: 45,
      price: 25.00,
      status: 'cancelled',
      paymentStatus: 'refunded',
      notes: 'Cliente cancelou por motivos pessoais',
      createdAt: '2025-01-05T09:45:00'
    },
    {
      id: '5',
      clientName: 'Patricia Lima',
      clientPhone: '(11) 99999-7890',
      clientEmail: 'patricia.lima@email.com',
      service: 'Limpeza de Pele',
      date: '2025-01-10',
      time: '11:00',
      duration: 90,
      price: 80.00,
      status: 'completed',
      paymentStatus: 'paid',
      notes: 'Pele sensível - tratamento realizado com sucesso',
      createdAt: '2025-01-04T16:30:00'
    }
  ]);

  // Filter reservas based on current filters
  const filteredReservas = reservas.filter(reserva => {
    const matchesSearch = reserva.clientName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         reserva.clientEmail.toLowerCase().includes(filters.search.toLowerCase()) ||
                         reserva.service.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || reserva.status === filters.status;
    
    const matchesService = filters.service === 'all' || reserva.service === filters.service;
    
    const today = new Date().toISOString().split('T')[0];
    const reservaDate = reserva.date;
    
    let matchesDate = true;
    if (filters.dateRange === 'today') {
      matchesDate = reservaDate === today;
    } else if (filters.dateRange === 'week') {
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      matchesDate = new Date(reservaDate) <= weekFromNow;
    } else if (filters.dateRange === 'month') {
      const monthFromNow = new Date();
      monthFromNow.setMonth(monthFromNow.getMonth() + 1);
      matchesDate = new Date(reservaDate) <= monthFromNow;
    }
    
    return matchesSearch && matchesStatus && matchesService && matchesDate;
  });

  // Handlers
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleReservaClick = (reserva) => {
    setReservaModal({
      isOpen: true,
      reserva,
      mode: 'view'
    });
  };

  const handleNewReserva = () => {
    setReservaModal({
      isOpen: true,
      reserva: {
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        status: 'pending',
        paymentStatus: 'pending'
      },
      mode: 'create'
    });
  };

  const handleEditReserva = (reserva) => {
    setReservaModal({
      isOpen: true,
      reserva,
      mode: 'edit'
    });
  };

  const handleSaveReserva = (reservaData) => {
    if (reservaModal.mode === 'create') {
      const newReserva = {
        ...reservaData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setReservas(prev => [newReserva, ...prev]);
    } else {
      setReservas(prev => 
        prev.map(r => r.id === reservaData.id ? reservaData : r)
      );
    }
    setReservaModal({ isOpen: false, reserva: null, mode: 'view' });
  };

  const handleDeleteReserva = (reservaId) => {
    if (window.confirm('Tem certeza que deseja excluir esta reserva?')) {
      setReservas(prev => prev.filter(r => r.id !== reservaId));
      setReservaModal({ isOpen: false, reserva: null, mode: 'view' });
    }
  };

  const handleStatusChange = (reservaId, newStatus) => {
    setReservas(prev => 
      prev.map(r => r.id === reservaId ? { ...r, status: newStatus } : r)
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
              Gerenciamento de Reservas
            </h1>
            <p className="text-muted-foreground">
              Gerencie todas as reservas e agendamentos do seu negócio
            </p>
          </div>

          {/* Filters and Actions */}
          <ReservasHeader
            filters={filters}
            onFilterChange={handleFilterChange}
            onNewReserva={handleNewReserva}
            totalReservas={filteredReservas.length}
          />

          {/* Reservas Table */}
          <ReservasTable
            reservas={filteredReservas}
            onReservaClick={handleReservaClick}
            onEditReserva={handleEditReserva}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      {/* Modal */}
      <ReservaModal
        reserva={reservaModal.reserva}
        isOpen={reservaModal.isOpen}
        mode={reservaModal.mode}
        onClose={() => setReservaModal({ isOpen: false, reserva: null, mode: 'view' })}
        onSave={handleSaveReserva}
        onDelete={handleDeleteReserva}
      />
    </div>
  );
};

export default ReservasManagement;
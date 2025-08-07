import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigationHeader from '../../components/ui/AdminNavigationHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import AppointmentsList from './components/AppointmentsList';
import AppointmentFilters from './components/AppointmentFilters';
import AppointmentStats from './components/AppointmentStats';
import AppointmentModal from './components/AppointmentModal';

const AppointmentsManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Filters state
  const [filters, setFilters] = useState({
    status: 'all',
    service: 'all',
    dateRange: 'today',
    professional: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Check authentication
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }
    loadAppointments();
  }, [navigate]);

  // Filter appointments
  useEffect(() => {
    let filtered = appointments.filter(appointment => {
      const matchesSearch = !searchQuery || 
        appointment.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.clientPhone?.includes(searchQuery) ||
        appointment.service?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filters.status === 'all' || appointment.status === filters.status;
      const matchesService = filters.service === 'all' || appointment.service === filters.service;
      
      // Date range filter
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const weekFromNow = new Date(today);
      weekFromNow.setDate(weekFromNow.getDate() + 7);

      let matchesDate = true;
      switch (filters.dateRange) {
        case 'today':
          matchesDate = appointmentDate.toDateString() === today.toDateString();
          break;
        case 'tomorrow':
          matchesDate = appointmentDate.toDateString() === tomorrow.toDateString();
          break;
        case 'week':
          matchesDate = appointmentDate >= today && appointmentDate <= weekFromNow;
          break;
        case 'all':
        default:
          matchesDate = true;
      }

      return matchesSearch && matchesStatus && matchesService && matchesDate;
    });

    setFilteredAppointments(filtered || []);
  }, [appointments, searchQuery, filters]);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      // Mock data integrado com o sistema
      const mockAppointments = [
        {
          id: '1',
          clientName: 'Maria Silva',
          clientPhone: '(11) 99999-1234',
          clientEmail: 'maria.silva@email.com',
          service: 'Corte de Cabelo',
          date: '2025-01-08',
          startTime: '09:00',
          endTime: '10:00',
          duration: 60,
          price: 45.00,
          status: 'confirmed',
          professional: 'Ana Souza',
          notes: 'Cliente prefere corte mais curto',
          createdAt: '2025-01-07T10:30:00',
          updatedAt: '2025-01-07T10:30:00'
        },
        {
          id: '2',
          clientName: 'Ana Costa',
          clientPhone: '(11) 99999-5678',
          clientEmail: 'ana.costa@email.com',
          service: 'Coloração',
          date: '2025-01-08',
          startTime: '14:00',
          endTime: '16:00',
          duration: 120,
          price: 120.00,
          status: 'pending',
          professional: 'Carla Lima',
          notes: 'Primeira vez fazendo coloração',
          createdAt: '2025-01-06T15:20:00',
          updatedAt: '2025-01-06T15:20:00'
        },
        {
          id: '3',
          clientName: 'Carla Oliveira',
          clientPhone: '(11) 99999-9012',
          clientEmail: 'carla.oliveira@email.com',
          service: 'Manicure',
          date: '2025-01-09',
          startTime: '10:30',
          endTime: '11:30',
          duration: 60,
          price: 35.00,
          status: 'confirmed',
          professional: 'Beatriz Santos',
          notes: '',
          createdAt: '2025-01-05T09:15:00',
          updatedAt: '2025-01-05T09:15:00'
        },
        {
          id: '4',
          clientName: 'Juliana Santos',
          clientPhone: '(11) 99999-3456',
          clientEmail: 'juliana.santos@email.com',
          service: 'Design de Sobrancelha',
          date: '2025-01-09',
          startTime: '15:00',
          endTime: '15:45',
          duration: 45,
          price: 25.00,
          status: 'confirmed',
          professional: 'Ana Souza',
          notes: 'Cliente tem alergia a alguns produtos',
          createdAt: '2025-01-04T14:45:00',
          updatedAt: '2025-01-04T14:45:00'
        },
        {
          id: '5',
          clientName: 'Patricia Lima',
          clientPhone: '(11) 99999-7890',
          clientEmail: 'patricia.lima@email.com',
          service: 'Limpeza de Pele',
          date: '2025-01-10',
          startTime: '11:00',
          endTime: '12:30',
          duration: 90,
          price: 80.00,
          status: 'pending',
          professional: 'Daniela Costa',
          notes: 'Pele sensível',
          createdAt: '2025-01-03T16:30:00',
          updatedAt: '2025-01-03T16:30:00'
        },
        {
          id: '6',
          clientName: 'Fernanda Rocha',
          clientPhone: '(11) 99999-2468',
          clientEmail: 'fernanda.rocha@email.com',
          service: 'Massagem Relaxante',
          date: '2025-01-11',
          startTime: '16:00',
          endTime: '17:00',
          duration: 60,
          price: 70.00,
          status: 'confirmed',
          professional: 'Mariana Alves',
          notes: 'Dores nas costas',
          createdAt: '2025-01-02T11:20:00',
          updatedAt: '2025-01-02T11:20:00'
        },
        {
          id: '7',
          clientName: 'Roberto Silva',
          clientPhone: '(11) 99999-1357',
          clientEmail: 'roberto.silva@email.com',
          service: 'Corte de Cabelo',
          date: '2025-01-08',
          startTime: '11:00',
          endTime: '11:45',
          duration: 45,
          price: 40.00,
          status: 'cancelled',
          professional: 'João Barbosa',
          notes: 'Cliente cancelou por motivos pessoais',
          createdAt: '2025-01-07T08:15:00',
          updatedAt: '2025-01-07T13:45:00'
        }
      ];
      
      setAppointments(mockAppointments);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleNewAppointment = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleSaveAppointment = async (appointmentData) => {
    try {
      if (selectedAppointment) {
        // Update existing appointment
        const updatedAppointments = appointments.map(apt => 
          apt.id === selectedAppointment.id 
            ? { ...apt, ...appointmentData, updatedAt: new Date().toISOString() }
            : apt
        );
        setAppointments(updatedAppointments);
      } else {
        // Add new appointment
        const newAppointment = {
          ...appointmentData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setAppointments([...appointments, newAppointment]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      try {
        const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
        setAppointments(updatedAppointments);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
      }
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const updatedAppointments = appointments.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: newStatus, updatedAt: new Date().toISOString() }
          : apt
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log('Ação em lote:', action, selectedIds);
    
    switch (action) {
      case 'confirm':
        selectedIds.forEach(id => handleStatusChange(id, 'confirmed'));
        break;
      case 'cancel':
        if (window.confirm(`Tem certeza que deseja cancelar ${selectedIds.length} agendamento(s)?`)) {
          selectedIds.forEach(id => handleStatusChange(id, 'cancelled'));
        }
        break;
      case 'reschedule':
        alert('Funcionalidade de reagendamento em lote será implementada');
        break;
      case 'export':
        handleExportAppointments(selectedIds);
        break;
      default:
        console.log('Ação não implementada:', action);
    }
  };

  const handleExportAppointments = (selectedIds) => {
    const appointmentsToExport = appointments.filter(apt => selectedIds.includes(apt.id));
    const headers = ['Cliente', 'Telefone', 'Serviço', 'Data', 'Horário', 'Status', 'Profissional', 'Valor'];
    const csvContent = [
      headers.join(','),
      ...appointmentsToExport.map(apt => [
        apt.clientName,
        apt.clientPhone,
        apt.service,
        apt.date,
        `${apt.startTime} - ${apt.endTime}`,
        apt.status,
        apt.professional,
        `R$ ${apt.price.toFixed(2)}`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `agendamentos-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
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
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Gestão de Agendamentos
            </h1>
            <p className="text-muted-foreground">
              Gerencie todos os agendamentos e compromissos
            </p>
          </div>

          {/* Stats */}
          <AppointmentStats appointments={filteredAppointments} />

          {/* Filters */}
          <AppointmentFilters 
            filters={filters}
            searchQuery={searchQuery}
            onFiltersChange={setFilters}
            onSearchChange={setSearchQuery}
            onNewAppointment={handleNewAppointment}
          />

          {/* Appointments List */}
          <AppointmentsList
            appointments={filteredAppointments}
            loading={loading}
            onEdit={handleEditAppointment}
            onView={handleViewAppointment}
            onStatusChange={handleStatusChange}
            onBulkAction={handleBulkAction}
          />

          {/* Appointment Modal */}
          <AppointmentModal
            isOpen={isModalOpen}
            appointment={selectedAppointment}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveAppointment}
            onDelete={handleDeleteAppointment}
          />
        </div>
      </main>
    </div>
  );
};

export default AppointmentsManagement;
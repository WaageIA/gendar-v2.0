import React, { useState, useEffect } from 'react';
import AdminNavigationHeader from '../../components/ui/AdminNavigationHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import AppointmentSidebar from './components/AppointmentSidebar';
import AppointmentModal from './components/AppointmentModal';
import AvailabilityModal from './components/AvailabilityModal';

const CalendarManagement = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modal states
  const [appointmentModal, setAppointmentModal] = useState({
    isOpen: false,
    appointment: null,
    mode: 'view'
  });
  const [availabilityModal, setAvailabilityModal] = useState(false);

  // Mock appointments data
  const [appointments, setAppointments] = useState([
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
      notes: 'Cliente prefere corte mais curto'
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
      notes: 'Primeira vez fazendo coloração'
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
      notes: ''
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
      notes: 'Cliente tem alergia a alguns produtos'
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
      notes: 'Pele sensível'
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
      notes: 'Dores nas costas'
    }
  ]);

  // Navigation handlers
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate?.setMonth(newDate?.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate?.setDate(newDate?.getDate() - 7);
    } else if (viewMode === 'day') {
      newDate?.setDate(newDate?.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate?.setMonth(newDate?.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate?.setDate(newDate?.getDate() + 7);
    } else if (viewMode === 'day') {
      newDate?.setDate(newDate?.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Appointment handlers
  const handleAppointmentClick = (appointment) => {
    setAppointmentModal({
      isOpen: true,
      appointment,
      mode: 'view'
    });
  };

  const handleTimeSlotClick = (date, time = null) => {
    setSelectedDate(date);
    setAppointmentModal({
      isOpen: true,
      appointment: {
        date: date?.toISOString()?.split('T')?.[0],
        startTime: time || '09:00',
        endTime: time ?
          new Date(`2000-01-01T${time}`)?.getTime() + 60 * 60 * 1000 > new Date(`2000-01-01T${time}`)?.getTime() ?
            new Date(new Date(`2000-01-01T${time}`).getTime() + 60 * 60 * 1000)?.toTimeString()?.slice(0, 5) : '10:00' : '10:00'
      },
      mode: 'create'
    });
  };

  const handleAddAppointment = () => {
    setAppointmentModal({
      isOpen: true,
      appointment: {
        date: selectedDate?.toISOString()?.split('T')?.[0],
        startTime: '09:00',
        endTime: '10:00'
      },
      mode: 'create'
    });
  };

  const handleSaveAppointment = (appointmentData) => {
    if (appointmentModal?.mode === 'create') {
      setAppointments(prev => [...prev, appointmentData]);
    } else {
      setAppointments(prev =>
        prev?.map(apt => apt?.id === appointmentData?.id ? appointmentData : apt)
      );
    }
    setAppointmentModal({ isOpen: false, appointment: null, mode: 'view' });
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAppointments(prev => prev?.filter(apt => apt?.id !== appointmentId));
      setAppointmentModal({ isOpen: false, appointment: null, mode: 'view' });
    }
  };

  const handleBlockTime = () => {
    setAppointmentModal({
      isOpen: true,
      appointment: {
        date: selectedDate?.toISOString()?.split('T')?.[0],
        startTime: '12:00',
        endTime: '13:00',
        clientName: 'BLOQUEADO',
        service: 'Horário Bloqueado',
        status: 'blocked',
        price: 0
      },
      mode: 'create'
    });
  };

  const handleSetAvailability = () => {
    setAvailabilityModal(true);
  };

  const handleSaveAvailability = (availabilityData) => {
    console.log('Saving availability:', availabilityData);
    // Here you would typically save to your backend
  };

  // Update selected date when current date changes
  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

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
      <div className={`pt-16 transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}>
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Calendar Section */}
          <div className="flex-1 flex flex-col">
            {/* Calendar Header */}
            <CalendarHeader
              currentDate={currentDate}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onToday={handleToday}
            />

            {/* Calendar Grid */}
            <div className="flex-1 p-4">
              <CalendarGrid
                viewMode={viewMode}
                currentDate={currentDate}
                appointments={appointments}
                onAppointmentClick={handleAppointmentClick}
                onTimeSlotClick={handleTimeSlotClick}
              />
            </div>
          </div>

          {/* Appointment Sidebar */}
          <AppointmentSidebar
            selectedDate={selectedDate}
            appointments={appointments}
            onAppointmentClick={handleAppointmentClick}
            onAddAppointment={handleAddAppointment}
            onBlockTime={handleBlockTime}
            onSetAvailability={handleSetAvailability}
          />
        </div>
      </div>
      {/* Modals */}
      <AppointmentModal
        appointment={appointmentModal?.appointment}
        isOpen={appointmentModal?.isOpen}
        mode={appointmentModal?.mode}
        onClose={() => setAppointmentModal({ isOpen: false, appointment: null, mode: 'view' })}
        onSave={handleSaveAppointment}
        onDelete={handleDeleteAppointment}
      />
      <AvailabilityModal
        isOpen={availabilityModal}
        onClose={() => setAvailabilityModal(false)}
        onSave={handleSaveAvailability}
      />
    </div>
  );
};

export default CalendarManagement;
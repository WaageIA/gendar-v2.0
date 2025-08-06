import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isWithinInterval, subWeeks, subMonths } from 'date-fns';

import PublicBookingHeader from '../../components/ui/PublicBookingHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import AppointmentCard from './components/AppointmentCard';
import FilterPanel from './components/FilterPanel';
import PhotoGallery from './components/PhotoGallery';
import ExportModal from './components/ExportModal';
import RatingModal from './components/RatingModal';

const ClientAppointmentHistory = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: 'all',
    serviceType: 'all',
    provider: 'all',
    status: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock data - Replace with actual API call
  const mockAppointments = [
    {
      id: 1,
      serviceName: 'Corte de Cabelo Masculino',
      providerName: 'João Silva',
      date: new Date('2024-01-15'),
      time: '14:00',
      status: 'completed',
      duration: 60,
      price: 50.00,
      notes: 'Cliente solicitou corte degradê',
      rating: 5,
      review: 'Excelente serviço, muito profissional!',
      photos: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
      serviceType: 'cabelo',
      canRebook: true
    },
    {
      id: 2,
      serviceName: 'Manicure',
      providerName: 'Maria Santos',
      date: new Date('2024-01-08'),
      time: '10:30',
      status: 'completed',
      duration: 45,
      price: 30.00,
      notes: 'Esmaltação francesa',
      rating: 4,
      review: 'Muito bom, recomendo!',
      photos: ['/api/placeholder/300/200'],
      serviceType: 'unhas',
      canRebook: true
    },
    {
      id: 3,
      serviceName: 'Massagem Relaxante',
      providerName: 'Ana Costa',
      date: new Date('2023-12-20'),
      time: '16:00',
      status: 'completed',
      duration: 90,
      price: 120.00,
      notes: 'Massagem com óleo de lavanda',
      rating: null,
      review: null,
      photos: [],
      serviceType: 'massagem',
      canRebook: true
    },
    {
      id: 4,
      serviceName: 'Limpeza de Pele',
      providerName: 'Carlos Oliveira',
      date: new Date('2024-01-22'),
      time: '09:00',
      status: 'scheduled',
      duration: 120,
      price: 80.00,
      notes: 'Primeira sessão',
      photos: [],
      serviceType: 'estetica',
      canRebook: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAppointments(mockAppointments);
      setFilteredAppointments(mockAppointments);
      setLoading(false);
    }, 1000);

    // Mock user data
    setCurrentUser({
      name: 'Cliente Exemplo',
      email: 'cliente@exemplo.com',
      phone: '+55 11 99999-9999'
    });

    return () => clearTimeout(timer);
  }, []);

  // Filter appointments based on search and filters
  useEffect(() => {
    let filtered = appointments?.filter(appointment => {
      // Search filter
      const matchesSearch = !searchTerm || 
        appointment?.serviceName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        appointment?.providerName?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      // Date range filter
      let matchesDateRange = true;
      if (selectedFilters?.dateRange !== 'all') {
        const now = new Date();
        const appointmentDate = appointment?.date;
        
        switch (selectedFilters?.dateRange) {
          case 'week':
            matchesDateRange = isWithinInterval(appointmentDate, {
              start: subWeeks(now, 1),
              end: now
            });
            break;
          case 'month':
            matchesDateRange = isWithinInterval(appointmentDate, {
              start: subMonths(now, 1),
              end: now
            });
            break;
          case '3months':
            matchesDateRange = isWithinInterval(appointmentDate, {
              start: subMonths(now, 3),
              end: now
            });
            break;
          default:
            matchesDateRange = true;
        }
      }

      // Service type filter
      const matchesServiceType = selectedFilters?.serviceType === 'all' || 
        appointment?.serviceType === selectedFilters?.serviceType;

      // Provider filter
      const matchesProvider = selectedFilters?.provider === 'all' || 
        appointment?.providerName === selectedFilters?.provider;

      // Status filter
      const matchesStatus = selectedFilters?.status === 'all' || 
        appointment?.status === selectedFilters?.status;

      return matchesSearch && matchesDateRange && matchesServiceType && 
             matchesProvider && matchesStatus;
    });

    // Sort by date (newest first)
    filtered = filtered?.sort((a, b) => new Date(b?.date) - new Date(a?.date));
    
    setFilteredAppointments(filtered);
  }, [appointments, searchTerm, selectedFilters]);

  const handleRebook = (appointment) => {
    // Navigate to booking with pre-filled service
    navigate('/public-booking-interface', { 
      state: { 
        preselectedService: appointment?.serviceName,
        preselectedProvider: appointment?.providerName 
      }
    });
  };

  const handleRateAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRatingModal(true);
  };

  const handleViewPhotos = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPhotoGallery(true);
  };

  const handleSubmitRating = (appointmentId, rating, review) => {
    setAppointments(prev => prev?.map(apt => 
      apt?.id === appointmentId 
        ? { ...apt, rating, review }
        : apt
    ));
    setShowRatingModal(false);
    setSelectedAppointment(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: 'Concluído', color: 'success' },
      scheduled: { label: 'Agendado', color: 'primary' },
      cancelled: { label: 'Cancelado', color: 'error' },
      noshow: { label: 'Não Compareceu', color: 'warning' }
    };

    const config = statusConfig?.[status] || { label: status, color: 'default' };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
        ${config?.color === 'success' ? 'bg-green-100 text-green-800' : ''}
        ${config?.color === 'primary' ? 'bg-blue-100 text-blue-800' : ''}
        ${config?.color === 'error' ? 'bg-red-100 text-red-800' : ''}
        ${config?.color === 'warning' ? 'bg-yellow-100 text-yellow-800' : ''}
        ${config?.color === 'default' ? 'bg-gray-100 text-gray-800' : ''}
      `}>
        {config?.label}
      </span>
    );
  };

  const loyaltyProgress = {
    current: 8,
    target: 10,
    reward: 'Desconto de 20% no próximo serviço'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <PublicBookingHeader businessName="ServiceHub Pro" />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando histórico...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicBookingHeader businessName="ServiceHub Pro" />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Meu Histórico de Serviços
              </h1>
              <p className="text-muted-foreground mt-1">
                Acompanhe todos os seus agendamentos e avalie os serviços
              </p>
            </div>
            <Button
              onClick={() => setShowExportModal(true)}
              variant="outline"
              iconName="Download"
              className="w-full sm:w-auto"
            >
              Exportar Histórico
            </Button>
          </div>
        </div>

        {/* Loyalty Progress */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-foreground">Programa de Fidelidade</h3>
            <span className="text-sm text-muted-foreground">
              {loyaltyProgress?.current}/{loyaltyProgress?.target}
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(loyaltyProgress?.current / loyaltyProgress?.target) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {loyaltyProgress?.target - loyaltyProgress?.current} serviços para ganhar: {loyaltyProgress?.reward}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          {/* Search */}
          <div className="mb-4">
            <Input
              placeholder="Buscar por serviço ou profissional..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              iconName="Filter"
              iconPosition="left"
              className="text-sm"
            >
              Filtros Avançados
              <Icon 
                name={showFilters ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="ml-2" 
              />
            </Button>
            {Object?.values(selectedFilters)?.some(v => v !== 'all') && (
              <Button
                variant="ghost"
                onClick={() => setSelectedFilters({
                  dateRange: 'all',
                  serviceType: 'all',
                  provider: 'all',
                  status: 'all'
                })}
                className="text-xs text-muted-foreground"
              >
                Limpar Filtros
              </Button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <FilterPanel
              filters={selectedFilters}
              onFiltersChange={setSelectedFilters}
              appointments={appointments}
            />
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredAppointments?.length} {filteredAppointments?.length === 1 ? 'agendamento encontrado' : 'agendamentos encontrados'}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Ordenar por:</span>
            <Select
              options={[
                { value: 'date-desc', label: 'Mais Recente' },
                { value: 'date-asc', label: 'Mais Antigo' },
                { value: 'service', label: 'Tipo de Serviço' },
                { value: 'provider', label: 'Profissional' }
              ]}
              value="date-desc"
              className="w-32"
            />
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments?.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Nenhum agendamento encontrado
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || Object?.values(selectedFilters)?.some(v => v !== 'all')
                  ? 'Tente ajustar os filtros para ver mais resultados.' :'Você ainda não tem agendamentos. Que tal marcar o primeiro?'
                }
              </p>
              <Button
                onClick={() => navigate('/public-booking-interface')}
                iconName="Plus"
              >
                Agendar Novo Serviço
              </Button>
            </div>
          ) : (
            filteredAppointments?.map((appointment) => (
              <AppointmentCard
                key={appointment?.id}
                appointment={appointment}
                onRebook={handleRebook}
                onRate={handleRateAppointment}
                onViewPhotos={handleViewPhotos}
                getStatusBadge={getStatusBadge}
              />
            ))
          )}
        </div>
      </main>

      {/* Modals */}
      {showExportModal && (
        <ExportModal
          appointments={filteredAppointments}
          onClose={() => setShowExportModal(false)}
          currentUser={currentUser}
        />
      )}

      {showRatingModal && selectedAppointment && (
        <RatingModal
          appointment={selectedAppointment}
          onClose={() => {
            setShowRatingModal(false);
            setSelectedAppointment(null);
          }}
          onSubmit={handleSubmitRating}
        />
      )}

      {showPhotoGallery && selectedAppointment && (
        <PhotoGallery
          appointment={selectedAppointment}
          onClose={() => {
            setShowPhotoGallery(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
};

export default ClientAppointmentHistory;
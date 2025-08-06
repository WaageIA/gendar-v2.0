import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientHeader from './components/ClientHeader';
import WelcomeSection from './components/WelcomeSection';
import QuickActionCards from './components/QuickActionCards';
import RecentAppointments from './components/RecentAppointments';
import UpcomingBookings from './components/UpcomingBookings';
import AccountSummary from './components/AccountSummary';
import NotificationCenter from './components/NotificationCenter';
import LoyaltyProgram from './components/LoyaltyProgram';

const ClientPortalDashboard = () => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const clientToken = localStorage.getItem('clientToken');
    if (!clientToken) {
      navigate('/client-login');
      return;
    }
    loadClientData();
  }, [navigate]);

  const loadClientData = async () => {
    try {
      // Mock client data - replace with actual API call
      const mockClientData = {
        id: 1,
        name: 'Maria Silva',
        email: 'maria@email.com',
        phone: '(11) 99999-9999',
        profileImage: null,
        loyaltyPoints: 250,
        memberSince: '2024-08-15',
        totalVisits: 15,
        preferredServices: ['corte', 'coloração'],
        upcomingAppointments: [
          {
            id: 1,
            service: 'Corte + Escova',
            professional: 'Ana Costa',
            date: '2025-01-08',
            time: '14:00',
            duration: 90,
            price: 120.00,
            status: 'confirmado'
          },
          {
            id: 2,
            service: 'Coloração Completa',
            professional: 'Carla Santos',
            date: '2025-01-15',
            time: '09:00',
            duration: 180,
            price: 350.00,
            status: 'agendado'
          }
        ],
        recentAppointments: [
          {
            id: 3,
            service: 'Corte Feminino',
            professional: 'Ana Costa',
            date: '2025-01-05',
            time: '15:30',
            price: 80.00,
            rating: 5,
            status: 'concluído'
          },
          {
            id: 4,
            service: 'Manicure + Pedicure',
            professional: 'Julia Lima',
            date: '2024-12-28',
            time: '10:00',
            price: 60.00,
            rating: 4,
            status: 'concluído'
          },
          {
            id: 5,
            service: 'Tratamento Capilar',
            professional: 'Carla Santos',
            date: '2024-12-15',
            time: '14:00',
            price: 150.00,
            rating: 5,
            status: 'concluído'
          }
        ],
        notifications: [
          {
            id: 1,
            type: 'appointment_reminder',
            title: 'Lembrete de Agendamento',
            message: 'Seu agendamento é amanhã às 14:00 com Ana Costa',
            date: '2025-01-07',
            read: false
          },
          {
            id: 2,
            type: 'promotion',
            title: 'Promoção Especial',
            message: '20% de desconto em tratamentos capilares até 15/01',
            date: '2025-01-06',
            read: false
          },
          {
            id: 3,
            type: 'loyalty_reward',
            title: 'Parabéns!',
            message: 'Você ganhou 25 pontos no programa de fidelidade',
            date: '2025-01-05',
            read: true
          }
        ],
        availableRewards: [
          {
            id: 1,
            title: 'Desconto de 10%',
            description: 'Em qualquer serviço',
            pointsCost: 100,
            available: true
          },
          {
            id: 2,
            title: 'Serviço Grátis',
            description: 'Manicure ou pedicure',
            pointsCost: 300,
            available: false
          }
        ]
      };

      setClientData(mockClientData);
    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = () => {
    navigate('/public-booking-interface');
  };

  const handleViewHistory = () => {
    // Navigate to appointments history page
    console.log('Navegar para histórico');
  };

  const handleUpdateProfile = () => {
    // Navigate to profile edit page
    console.log('Navegar para edição de perfil');
  };

  const handleAppointmentAction = (appointmentId, action) => {
    console.log('Ação no agendamento:', appointmentId, action);
    // Implement appointment actions (cancel, reschedule, etc.)
  };

  const handleRewardRedeem = (rewardId) => {
    console.log('Resgatar recompensa:', rewardId);
    // Implement reward redemption
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mx-auto mb-4 w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Carregando seu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Client Header */}
      <ClientHeader client={clientData} />

      {/* Main Content */}
      <main className="pb-6">
        {/* Welcome Section */}
        <WelcomeSection 
          client={clientData}
          upcomingAppointment={clientData?.upcomingAppointments?.[0]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Action Cards */}
          <div className="mb-8">
            <QuickActionCards 
              onBookAppointment={handleBookAppointment}
              onViewHistory={handleViewHistory}
              onUpdateProfile={handleUpdateProfile}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Upcoming Bookings */}
            <div className="lg:col-span-2">
              <UpcomingBookings 
                appointments={clientData?.upcomingAppointments}
                onAppointmentAction={handleAppointmentAction}
              />
            </div>

            {/* Account Summary */}
            <div>
              <AccountSummary 
                client={clientData}
                totalVisits={clientData?.totalVisits}
                memberSince={clientData?.memberSince}
              />
            </div>
          </div>

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Appointments */}
            <div>
              <RecentAppointments 
                appointments={clientData?.recentAppointments}
                onViewAll={handleViewHistory}
              />
            </div>

            {/* Loyalty Program */}
            <div>
              <LoyaltyProgram 
                points={clientData?.loyaltyPoints}
                rewards={clientData?.availableRewards}
                onRewardRedeem={handleRewardRedeem}
              />
            </div>

            {/* Notification Center */}
            <div>
              <NotificationCenter 
                notifications={clientData?.notifications}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPortalDashboard;
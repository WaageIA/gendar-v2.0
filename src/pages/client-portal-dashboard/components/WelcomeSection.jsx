import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ client, upcomingAppointment }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getNextAppointmentCountdown = () => {
    if (!upcomingAppointment) return null;
    
    const appointmentDate = new Date(`${upcomingAppointment?.date}T${upcomingAppointment?.time}`);
    const now = new Date();
    const diffTime = appointmentDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';
    if (diffDays > 1) return `Em ${diffDays} dias`;
    return 'Passou';
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Welcome Message */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {getGreeting()}, {client?.name?.split(' ')?.[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Seja bem-vinda ao seu portal pessoal. Aqui você pode acompanhar seus agendamentos e muito mais.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span>Hoje é {formatDate(new Date()?.toISOString())}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-amber-500" />
                <span>{client?.loyaltyPoints} pontos de fidelidade</span>
              </div>
            </div>
          </div>

          {/* Upcoming Appointment Highlight */}
          {upcomingAppointment && (
            <div className="bg-card border border-border rounded-lg p-6 min-w-[320px]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Próximo Agendamento
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getNextAppointmentCountdown()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-600 capitalize">
                    {upcomingAppointment?.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Scissors" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{upcomingAppointment?.service}</p>
                    <p className="text-sm text-muted-foreground">com {upcomingAppointment?.professional}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(upcomingAppointment?.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{formatTime(upcomingAppointment?.time)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="DollarSign" size={14} className="text-green-600" />
                    <span className="font-medium text-foreground">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })?.format(upcomingAppointment?.price)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => console.log('Reagendar')}
                    >
                      Reagendar
                    </Button>
                    <Button
                      size="xs"
                      onClick={() => console.log('Ver detalhes')}
                    >
                      Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No appointments message */}
          {!upcomingAppointment && (
            <div className="bg-card border border-border rounded-lg p-6 min-w-[320px] text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Calendar" size={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Nenhum agendamento próximo
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Que tal agendar um novo serviço?
              </p>
              <Button 
                size="sm"
                onClick={() => console.log('Agendar novo serviço')}
                iconName="Plus"
              >
                Agendar Agora
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
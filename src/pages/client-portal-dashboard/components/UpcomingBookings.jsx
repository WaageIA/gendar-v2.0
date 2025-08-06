import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UpcomingBookings = ({ appointments = [], onAppointmentAction }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmado: { 
        color: 'bg-green-100 text-green-800', 
        label: 'Confirmado',
        icon: 'CheckCircle'
      },
      agendado: { 
        color: 'bg-blue-100 text-blue-800', 
        label: 'Agendado',
        icon: 'Clock'
      },
      pendente: { 
        color: 'bg-yellow-100 text-yellow-800', 
        label: 'Pendente',
        icon: 'AlertCircle'
      }
    };

    const config = statusConfig?.[status] || statusConfig?.agendado;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </span>
    );
  };

  const getCountdownTimer = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diffTime = appointmentDateTime - now;
    
    if (diffTime <= 0) return 'Passou';
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Próximos Agendamentos
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {appointments?.length} agendamento{appointments?.length !== 1 ? 's' : ''} próximo{appointments?.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            onClick={() => console.log('Novo agendamento')}
          >
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="divide-y divide-border">
        {appointments?.length > 0 ? (
          appointments?.map((appointment) => (
            <div key={appointment?.id} className="p-6 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Scissors" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{appointment?.service}</h3>
                    <p className="text-sm text-muted-foreground">com {appointment?.professional}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{formatDate(appointment?.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{formatTime(appointment?.time)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Timer" size={14} />
                        <span>{appointment?.duration}min</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(appointment?.status)}
                  <p className="text-sm font-medium text-foreground mt-2">
                    {formatCurrency(appointment?.price)}
                  </p>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm text-primary font-medium">
                    Em {getCountdownTimer(appointment?.date, appointment?.time)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAppointmentAction?.(appointment?.id, 'reschedule')}
                    iconName="Calendar"
                  >
                    Reagendar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAppointmentAction?.(appointment?.id, 'cancel')}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    iconName="X"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onAppointmentAction?.(appointment?.id, 'details')}
                    iconName="Eye"
                  >
                    Detalhes
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum agendamento próximo
            </h3>
            <p className="text-muted-foreground mb-6">
              Você não tem agendamentos futuros. Que tal agendar um novo serviço?
            </p>
            <Button 
              onClick={() => console.log('Agendar novo serviço')}
              iconName="Plus"
            >
              Agendar Serviço
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      {appointments?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Precisa alterar algum agendamento?
            </p>
            <Button
              variant="link"
              size="sm"
              onClick={() => console.log('Ver todos os agendamentos')}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Ver Todos
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingBookings;
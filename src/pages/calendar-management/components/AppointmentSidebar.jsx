import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentSidebar = ({ 
  selectedDate, 
  appointments, 
  onAppointmentClick, 
  onAddAppointment,
  onBlockTime,
  onSetAvailability 
}) => {
  const formatDate = (date) => {
    return date?.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01T${timeStr}`)?.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'cancelled': return 'text-error';
      default: return 'text-primary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'cancelled': return 'XCircle';
      default: return 'Calendar';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelado';
      default: return 'Agendado';
    }
  };

  const todayAppointments = appointments?.filter(apt => 
    new Date(apt.date)?.toDateString() === selectedDate?.toDateString()
  )?.sort((a, b) => a?.startTime?.localeCompare(b?.startTime));

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {formatDate(selectedDate)}
        </h3>
        <div className="text-sm text-muted-foreground">
          {todayAppointments?.length} agendamento{todayAppointments?.length !== 1 ? 's' : ''}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-b border-border space-y-2">
        <Button
          variant="default"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          onClick={onAddAppointment}
        >
          Novo Agendamento
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Ban"
            iconPosition="left"
            iconSize={14}
            onClick={onBlockTime}
          >
            Bloquear
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            iconSize={14}
            onClick={onSetAvailability}
          >
            Disponibilidade
          </Button>
        </div>
      </div>
      {/* Appointments List */}
      <div className="flex-1 overflow-y-auto">
        {todayAppointments?.length === 0 ? (
          <div className="p-4 text-center">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-2">Nenhum agendamento</p>
            <p className="text-sm text-muted-foreground">
              Clique em "Novo Agendamento" para adicionar
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {todayAppointments?.map((appointment) => (
              <div
                key={appointment?.id}
                className="bg-background border border-border rounded-lg p-3 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => onAppointmentClick(appointment)}
              >
                {/* Time and Status */}
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-foreground">
                    {formatTime(appointment?.startTime)} - {formatTime(appointment?.endTime)}
                  </div>
                  <div className={`flex items-center space-x-1 text-xs ${getStatusColor(appointment?.status)}`}>
                    <Icon name={getStatusIcon(appointment?.status)} size={12} />
                    <span>{getStatusLabel(appointment?.status)}</span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="mb-2">
                  <div className="font-medium text-foreground">{appointment?.clientName}</div>
                  <div className="text-sm text-muted-foreground">{appointment?.service}</div>
                </div>

                {/* Contact Info */}
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Phone" size={12} />
                    <span>{appointment?.clientPhone}</span>
                  </div>
                  {appointment?.notes && (
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageSquare" size={12} />
                      <span>Obs.</span>
                    </div>
                  )}
                </div>

                {/* Duration and Price */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    {appointment?.duration} min
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    R$ {appointment?.price?.toFixed(2)?.replace('.', ',')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Summary */}
      <div className="p-4 border-t border-border bg-muted/50">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total do dia:</span>
            <span className="font-medium text-foreground">
              R$ {todayAppointments?.reduce((sum, apt) => sum + apt?.price, 0)?.toFixed(2)?.replace('.', ',')}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Confirmados:</span>
            <span className="text-success font-medium">
              {todayAppointments?.filter(apt => apt?.status === 'confirmed')?.length}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pendentes:</span>
            <span className="text-warning font-medium">
              {todayAppointments?.filter(apt => apt?.status === 'pending')?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSidebar;
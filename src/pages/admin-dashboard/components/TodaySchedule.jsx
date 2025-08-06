import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodaySchedule = () => {
  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      client: "Maria Silva",
      service: "Corte + Escova",
      duration: "1h 30min",
      status: "confirmed",
      phone: "+55 11 99999-1234"
    },
    {
      id: 2,
      time: "11:00",
      client: "João Santos",
      service: "Barba + Cabelo",
      duration: "45min",
      status: "pending",
      phone: "+55 11 99999-5678"
    },
    {
      id: 3,
      time: "14:30",
      client: "Ana Costa",
      service: "Manicure",
      duration: "1h",
      status: "confirmed",
      phone: "+55 11 99999-9012"
    },
    {
      id: 4,
      time: "16:00",
      client: "Carlos Lima",
      service: "Corte Masculino",
      duration: "30min",
      status: "confirmed",
      phone: "+55 11 99999-3456"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-amber-100 text-amber-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return colors?.[status] || colors?.pending;
  };

  const getStatusText = (status) => {
    const texts = {
      confirmed: "Confirmado",
      pending: "Pendente",
      cancelled: "Cancelado"
    };
    return texts?.[status] || "Pendente";
  };

  const handleCallClient = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleViewCalendar = () => {
    window.location.href = '/calendar-management';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Agenda de Hoje</h3>
          <p className="text-sm text-muted-foreground">06 de Janeiro, 2025</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewCalendar}
          iconName="Calendar"
          iconPosition="left"
          iconSize={16}
        >
          Ver Calendário
        </Button>
      </div>
      <div className="space-y-4">
        {todayAppointments?.map((appointment) => (
          <div key={appointment?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{appointment?.time}</p>
                <p className="text-xs text-muted-foreground">{appointment?.duration}</p>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{appointment?.client}</p>
                <p className="text-sm text-muted-foreground">{appointment?.service}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment?.status)}`}>
                {getStatusText(appointment?.status)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCallClient(appointment?.phone)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Phone" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {todayAppointments?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum agendamento para hoje</p>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
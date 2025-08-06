import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const handleNewAppointment = () => {
    window.location.href = '/calendar-management?action=new';
  };

  const handleNewClient = () => {
    console.log('Adicionar novo cliente');
    // Implement new client modal or navigation
  };

  const handleViewCalendar = () => {
    window.location.href = '/calendar-management';
  };

  const handleViewReports = () => {
    console.log('Ver relatórios');
    // Implement reports navigation
  };

  const handleManageServices = () => {
    console.log('Gerenciar serviços');
    // Implement services management
  };

  const handleViewBookings = () => {
    window.location.href = '/public-booking-interface';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Ações Rápidas</h3>
        <p className="text-sm text-muted-foreground">Acesso direto às principais funcionalidades</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          variant="default"
          onClick={handleNewAppointment}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Novo Agendamento
        </Button>

        <Button
          variant="outline"
          onClick={handleNewClient}
          iconName="UserPlus"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Adicionar Cliente
        </Button>

        <Button
          variant="outline"
          onClick={handleViewCalendar}
          iconName="Calendar"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Ver Calendário
        </Button>

        <Button
          variant="outline"
          onClick={handleViewReports}
          iconName="BarChart3"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Relatórios
        </Button>

        <Button
          variant="outline"
          onClick={handleManageServices}
          iconName="Settings"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Gerenciar Serviços
        </Button>

        <Button
          variant="outline"
          onClick={handleViewBookings}
          iconName="ExternalLink"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          Interface Pública
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
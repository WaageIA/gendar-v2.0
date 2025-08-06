import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ClientDashboard = ({ client, isOpen, onClose, onScheduleAppointment, onSendMessage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !client) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getFrequencyBadge = (frequency) => {
    const config = {
      alta: { color: 'bg-green-100 text-green-800', label: 'Alta Frequência' },
      media: { color: 'bg-yellow-100 text-yellow-800', label: 'Média Frequência' },
      baixa: { color: 'bg-red-100 text-red-800', label: 'Baixa Frequência' }
    };
    
    const freq = config[frequency] || config.baixa;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${freq.color}`}>
        {freq.label}
      </span>
    );
  };

  const getCommunicationIcon = (preference) => {
    switch (preference) {
      case 'whatsapp': return 'MessageCircle';
      case 'email': return 'Mail';
      case 'sms': return 'MessageSquare';
      default: return 'Phone';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: 'User' },
    { id: 'history', label: 'Histórico', icon: 'Clock' },
    { id: 'preferences', label: 'Preferências', icon: 'Settings' },
    { id: 'analytics', label: 'Análises', icon: 'BarChart3' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{client.name}</h2>
              <p className="text-sm text-muted-foreground">
                Cliente desde {formatDate(client.registrationDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onScheduleAppointment?.(client)}
              iconName="Calendar"
              iconPosition="left"
            >
              Agendar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSendMessage?.(client)}
              iconName={getCommunicationIcon(client.communicationPreference)}
              iconPosition="left"
            >
              Contatar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Gasto</p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatCurrency(client.totalSpent)}
                      </p>
                    </div>
                    <Icon name="DollarSign" size={24} className="text-success" />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Serviços</p>
                      <p className="text-2xl font-bold text-foreground">
                        {client.totalServices}
                      </p>
                    </div>
                    <Icon name="Briefcase" size={24} className="text-info" />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Médio</p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatCurrency(client.averageTicket)}
                      </p>
                    </div>
                    <Icon name="TrendingUp" size={24} className="text-warning" />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pontos Fidelidade</p>
                      <p className="text-2xl font-bold text-foreground">
                        {client.loyaltyPoints}
                      </p>
                    </div>
                    <Icon name="Star" size={24} className="text-primary" />
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3">Informações de Contato</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <span className="text-foreground">{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={16} className="text-muted-foreground" />
                      <span className="text-foreground">{client.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="text-foreground">{client.address}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3">Status</h3>
                  <div className="space-y-2">
                    {getFrequencyBadge(client.frequency)}
                    <div className="text-sm text-muted-foreground">
                      Último contato: {formatDate(client.lastContact)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Histórico de Agendamentos</h3>
              <div className="space-y-3">
                {client.appointmentHistory?.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        appointment.status === 'completed' ? 'bg-success' : 'bg-warning'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">{appointment.service}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(appointment.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        {formatCurrency(appointment.value)}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {appointment.status === 'completed' ? 'Concluído' : 'Pendente'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Serviços Preferidos</h3>
                <div className="flex flex-wrap gap-2">
                  {client.preferredServices?.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Preferências de Comunicação</h3>
                <div className="flex items-center space-x-2">
                  <Icon name={getCommunicationIcon(client.communicationPreference)} size={20} />
                  <span className="text-foreground capitalize">
                    {client.communicationPreference}
                  </span>
                </div>
              </div>

              {client.notes && (
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">Observações</h3>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-foreground">{client.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3">Evolução de Gastos</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Este mês</span>
                      <span className="text-foreground font-medium">
                        {formatCurrency(client.totalSpent * 0.15)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mês anterior</span>
                      <span className="text-foreground font-medium">
                        {formatCurrency(client.totalSpent * 0.12)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Média mensal</span>
                      <span className="text-foreground font-medium">
                        {formatCurrency(client.totalSpent / 6)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3">Frequência de Visitas</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Visitas/mês</span>
                      <span className="text-foreground font-medium">
                        {Math.round(client.totalServices / 6)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Intervalo médio</span>
                      <span className="text-foreground font-medium">
                        {Math.round(180 / client.totalServices)} dias
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">Próximas Ações Recomendadas</h3>
                <div className="space-y-2">
                  {!client.nextAppointment && (
                    <div className="flex items-center space-x-2 text-warning">
                      <Icon name="AlertTriangle" size={16} />
                      <span className="text-sm">Cliente sem agendamento futuro</span>
                    </div>
                  )}
                  {client.frequency === 'baixa' && (
                    <div className="flex items-center space-x-2 text-info">
                      <Icon name="Info" size={16} />
                      <span className="text-sm">Considere campanha de reativação</span>
                    </div>
                  )}
                  {client.loyaltyPoints > 100 && (
                    <div className="flex items-center space-x-2 text-success">
                      <Icon name="Gift" size={16} />
                      <span className="text-sm">Cliente elegível para recompensa</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "booking",
      title: "Novo agendamento",
      description: "Maria Silva agendou Corte + Escova para 08/01",
      timestamp: "Há 15 minutos",
      icon: "Calendar",
      color: "text-green-600"
    },
    {
      id: 2,
      type: "client",
      title: "Novo cliente",
      description: "João Santos se cadastrou na plataforma",
      timestamp: "Há 1 hora",
      icon: "UserPlus",
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "payment",
      title: "Pagamento recebido",
      description: "Ana Costa - R$ 85,00 (Manicure)",
      timestamp: "Há 2 horas",
      icon: "CreditCard",
      color: "text-green-600"
    },
    {
      id: 4,
      type: "cancellation",
      title: "Agendamento cancelado",
      description: "Pedro Oliveira cancelou consulta de 07/01",
      timestamp: "Há 3 horas",
      icon: "X",
      color: "text-red-600"
    },
    {
      id: 5,
      type: "reminder",
      title: "Lembrete enviado",
      description: "Confirmação enviada para Carlos Lima",
      timestamp: "Há 4 horas",
      icon: "Bell",
      color: "text-amber-600"
    }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      booking: "Calendar",
      client: "UserPlus",
      payment: "CreditCard",
      cancellation: "X",
      reminder: "Bell"
    };
    return icons?.[type] || "Activity";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Atividade Recente</h3>
          <p className="text-sm text-muted-foreground">Últimas atualizações do sistema</p>
        </div>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity?.color}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity?.title}</p>
              <p className="text-sm text-muted-foreground">{activity?.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity?.timestamp}</p>
            </div>
            {index < activities?.length - 1 && (
              <div className="absolute left-7 mt-8 w-px h-4 bg-border" style={{ marginLeft: '1rem' }} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
          Ver todas as atividades
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
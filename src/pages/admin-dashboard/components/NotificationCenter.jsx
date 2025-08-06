import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      title: "Confirmação Pendente",
      message: "3 agendamentos aguardando confirmação do cliente",
      timestamp: "Há 30 minutos",
      unread: true,
      action: "Revisar"
    },
    {
      id: 2,
      type: "info",
      title: "Lembrete Automático",
      message: "Lembretes enviados para agendamentos de amanhã (5 clientes)",
      timestamp: "Há 1 hora",
      unread: true,
      action: null
    },
    {
      id: 3,
      type: "success",
      title: "Meta Atingida",
      message: "Receita mensal ultrapassou R$ 15.000,00",
      timestamp: "Há 2 horas",
      unread: false,
      action: "Ver Relatório"
    },
    {
      id: 4,
      type: "error",
      title: "Conflito de Horário",
      message: "Possível sobreposição detectada para 08/01 às 14:00",
      timestamp: "Há 3 horas",
      unread: true,
      action: "Resolver"
    }
  ]);

  const getNotificationIcon = (type) => {
    const icons = {
      warning: "AlertTriangle",
      info: "Info",
      success: "CheckCircle",
      error: "XCircle"
    };
    return icons?.[type] || "Bell";
  };

  const getNotificationColor = (type) => {
    const colors = {
      warning: "text-amber-600",
      info: "text-blue-600",
      success: "text-green-600",
      error: "text-red-600"
    };
    return colors?.[type] || "text-muted-foreground";
  };

  const handleNotificationAction = (notification) => {
    console.log('Ação da notificação:', notification?.action);
    // Implement notification action handlers
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Notificações</h3>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="Settings" size={16} />
        </Button>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {notifications?.map((notification) => (
          <div 
            key={notification?.id} 
            className={`p-4 rounded-lg border transition-smooth ${
              notification?.unread 
                ? 'bg-primary/5 border-primary/20' :'bg-muted/30 border-border'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={getNotificationIcon(notification?.type)} 
                size={20} 
                className={getNotificationColor(notification?.type)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {notification?.title}
                  </p>
                  {notification?.unread && (
                    <button
                      onClick={() => markAsRead(notification?.id)}
                      className="text-xs text-primary hover:text-primary/80"
                    >
                      Marcar como lida
                    </button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification?.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    {notification?.timestamp}
                  </p>
                  {notification?.action && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleNotificationAction(notification)}
                      className="text-xs"
                    >
                      {notification?.action}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {notifications?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma notificação</p>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
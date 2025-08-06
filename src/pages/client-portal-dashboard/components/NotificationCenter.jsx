import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationCenter = ({ notifications = [] }) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayNotifications = showAll ? notifications : notifications?.slice(0, 3);
  const unreadCount = notifications?.filter(n => !n?.read)?.length || 0;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment_reminder':
        return { icon: 'Calendar', color: 'text-blue-600', bg: 'bg-blue-50' };
      case 'promotion':
        return { icon: 'Tag', color: 'text-green-600', bg: 'bg-green-50' };
      case 'loyalty_reward':
        return { icon: 'Gift', color: 'text-purple-600', bg: 'bg-purple-50' };
      case 'appointment_confirmed':
        return { icon: 'CheckCircle', color: 'text-green-600', bg: 'bg-green-50' };
      case 'appointment_cancelled':
        return { icon: 'XCircle', color: 'text-red-600', bg: 'bg-red-50' };
      default:
        return { icon: 'Bell', color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const formatNotificationDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays <= 7) return `${diffDays} dias atrás`;
    
    return date?.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Marcar como lida:', notificationId);
    // In a real app, this would update the notification status
  };

  const handleMarkAllAsRead = () => {
    console.log('Marcar todas como lidas');
    // In a real app, this would update all notifications
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Bell" size={20} className="text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Notificações
              </h2>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} não lida${unreadCount > 1 ? 's' : ''}` : 'Todas as notificações lidas'}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-primary hover:text-primary/80"
            >
              Marcar todas
            </Button>
          )}
        </div>
      </div>
      {/* Notifications List */}
      <div className="divide-y divide-border">
        {displayNotifications?.length > 0 ? (
          displayNotifications?.map((notification) => {
            const iconConfig = getNotificationIcon(notification?.type);
            
            return (
              <div 
                key={notification?.id} 
                className={`p-4 hover:bg-muted/30 transition-colors cursor-pointer ${
                  !notification?.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => !notification?.read && handleMarkAsRead(notification?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconConfig?.bg}`}>
                    <Icon name={iconConfig?.icon} size={16} className={iconConfig?.color} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-sm font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification?.title}
                        </h3>
                        <p className={`text-xs mt-1 ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification?.message}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                        <span className="text-xs text-muted-foreground">
                          {formatNotificationDate(notification?.date)}
                        </span>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    {/* Action buttons for specific notification types */}
                    {notification?.type === 'appointment_reminder' && (
                      <div className="flex items-center space-x-2 mt-3">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={(e) => {
                            e?.stopPropagation();
                            console.log('Ver detalhes do agendamento');
                          }}
                          iconName="Eye"
                        >
                          Ver Detalhes
                        </Button>
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={(e) => {
                            e?.stopPropagation();
                            console.log('Confirmar presença');
                          }}
                          iconName="CheckCircle"
                        >
                          Confirmar
                        </Button>
                      </div>
                    )}
                    
                    {notification?.type === 'promotion' && (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={(e) => {
                          e?.stopPropagation();
                          console.log('Ver promoção');
                        }}
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="mt-3"
                      >
                        Ver Oferta
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="BellOff" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              Nenhuma notificação
            </h3>
            <p className="text-xs text-muted-foreground">
              Você não tem notificações no momento
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      {notifications?.length > 3 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full justify-center"
            iconName={showAll ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {showAll ? 'Mostrar Menos' : `Ver Todas (${notifications?.length})`}
          </Button>
        </div>
      )}
      {/* Notification Settings */}
      <div className="p-4 border-t border-border bg-muted/30">
        <Button
          variant="link"
          size="sm"
          onClick={() => console.log('Configurar notificações')}
          iconName="Settings"
          iconPosition="left"
          className="w-full justify-center"
        >
          Configurar Notificações
        </Button>
      </div>
    </div>
  );
};

export default NotificationCenter;
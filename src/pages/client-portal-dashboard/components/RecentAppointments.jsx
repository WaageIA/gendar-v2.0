import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecentAppointments = ({ appointments = [], onViewAll }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const renderRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < rating ? 'Star' : 'StarOff'}
        size={12}
        className={i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
      />
    ));
  };

  const getServiceIcon = (service) => {
    if (service?.toLowerCase()?.includes('corte')) return 'Scissors';
    if (service?.toLowerCase()?.includes('coloração')) return 'Palette';
    if (service?.toLowerCase()?.includes('manicure') || service?.toLowerCase()?.includes('pedicure')) return 'Hand';
    if (service?.toLowerCase()?.includes('tratamento')) return 'Sparkles';
    return 'Star';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Atendimentos Recentes
            </h2>
            <p className="text-sm text-muted-foreground">
              Seus últimos {appointments?.length} serviços
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Ver Todos
          </Button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="divide-y divide-border">
        {appointments?.length > 0 ? (
          appointments?.slice(0, 5)?.map((appointment) => (
            <div key={appointment?.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getServiceIcon(appointment?.service)} 
                    size={18} 
                    className="text-primary" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {appointment?.service}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        com {appointment?.professional}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(appointment?.date)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {appointment?.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-sm font-medium text-foreground">
                        {formatCurrency(appointment?.price)}
                      </p>
                      <div className="flex items-center space-x-1 mt-1 justify-end">
                        {renderRatingStars(appointment?.rating)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex items-center space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => console.log('Reagendar serviço:', appointment?.service)}
                      iconName="Repeat"
                      iconPosition="left"
                    >
                      Reagendar
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => console.log('Avaliar novamente:', appointment?.id)}
                      iconName="MessageSquare"
                      iconPosition="left"
                    >
                      Avaliar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="History" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-2">
              Nenhum atendimento ainda
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Seus atendimentos aparecerão aqui após serem concluídos
            </p>
            <Button 
              size="sm"
              onClick={() => console.log('Agendar primeiro serviço')}
              iconName="Calendar"
            >
              Agendar Primeiro Serviço
            </Button>
          </div>
        )}
      </div>

      {/* Footer with Summary */}
      {appointments?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">
                Avaliação média:
              </span>
              <div className="flex items-center space-x-1">
                {renderRatingStars(Math.round(
                  appointments?.reduce((acc, app) => acc + app?.rating, 0) / appointments?.length
                ))}
                <span className="text-foreground font-medium ml-1">
                  {(appointments?.reduce((acc, app) => acc + app?.rating, 0) / appointments?.length)?.toFixed(1)}
                </span>
              </div>
            </div>
            <Button
              variant="link"
              size="sm"
              onClick={() => console.log('Deixar feedback')}
              iconName="ThumbsUp"
              iconPosition="left"
            >
              Deixar Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentAppointments;
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AppointmentCard = ({ 
  appointment, 
  onRebook, 
  onRate, 
  onViewPhotos, 
  getStatusBadge 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const formatDateTime = (date, time) => {
    const fullDate = new Date(date);
    return {
      date: format(fullDate, "dd 'de' MMMM, yyyy", { locale: ptBR }),
      weekday: format(fullDate, 'EEEE', { locale: ptBR }),
      time: time
    };
  };

  const { date, weekday, time } = formatDateTime(appointment?.date, appointment?.time);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Card Header */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Service Info */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Scissors" size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {appointment?.serviceName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  com {appointment?.providerName}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span className="capitalize">{weekday}, {date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex-shrink-0 flex flex-col items-end gap-2">
            {getStatusBadge(appointment?.status)}
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </div>
        </div>

        {/* Price and Quick Info */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              <span>{appointment?.duration}min</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="DollarSign" size={14} />
              <span>{formatCurrency(appointment?.price)}</span>
            </div>
          </div>
          
          {appointment?.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < appointment?.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-4 space-y-4">
            {/* Notes */}
            {appointment?.notes && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Observações do Serviço
                </h4>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                  {appointment?.notes}
                </p>
              </div>
            )}

            {/* Review */}
            {appointment?.review && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  Sua Avaliação
                  <div className="flex items-center gap-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={i < appointment?.rating ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </h4>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                  {appointment?.review}
                </p>
              </div>
            )}

            {/* Photos */}
            {appointment?.photos?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">
                  Fotos do Serviço ({appointment?.photos?.length})
                </h4>
                <div className="flex gap-2 overflow-x-auto">
                  {appointment?.photos?.slice(0, 3)?.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => onViewPhotos(appointment)}
                      className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      <img 
                        src={photo} 
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/64/64';
                        }}
                      />
                    </button>
                  ))}
                  {appointment?.photos?.length > 3 && (
                    <button
                      onClick={() => onViewPhotos(appointment)}
                      className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground hover:bg-muted/80 transition-colors"
                    >
                      +{appointment?.photos?.length - 3}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {appointment?.canRebook && (
                <Button
                  onClick={() => onRebook(appointment)}
                  variant="default"
                  iconName="Calendar"
                  className="flex-1"
                >
                  Agendar Novamente
                </Button>
              )}
              
              {appointment?.status === 'completed' && !appointment?.rating && (
                <Button
                  onClick={() => onRate(appointment)}
                  variant="outline"
                  iconName="Star"
                  className="flex-1"
                >
                  Avaliar Serviço
                </Button>
              )}
              
              {appointment?.photos?.length > 0 && (
                <Button
                  onClick={() => onViewPhotos(appointment)}
                  variant="ghost"
                  iconName="Image"
                  className="sm:w-auto"
                >
                  Ver Fotos
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
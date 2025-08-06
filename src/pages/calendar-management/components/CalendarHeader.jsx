import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewModeChange, 
  onPrevious, 
  onNext, 
  onToday 
}) => {
  const formatHeaderDate = (date, mode) => {
    const options = { 
      year: 'numeric', 
      month: 'long',
      day: mode === 'day' ? 'numeric' : undefined
    };
    
    if (mode === 'week') {
      const startOfWeek = new Date(date);
      const dayOfWeek = startOfWeek?.getDay();
      startOfWeek?.setDate(startOfWeek?.getDate() - dayOfWeek);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek?.setDate(endOfWeek?.getDate() + 6);
      
      return `${startOfWeek?.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${endOfWeek?.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
    
    return date?.toLocaleDateString('pt-BR', options);
  };

  const viewModes = [
    { key: 'month', label: 'Mês', icon: 'Calendar' },
    { key: 'week', label: 'Semana', icon: 'CalendarDays' },
    { key: 'day', label: 'Dia', icon: 'Clock' }
  ];

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Date Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onPrevious}
            >
              <Icon name="ChevronLeft" size={18} />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={onNext}
            >
              <Icon name="ChevronRight" size={18} />
            </Button>
            
            <Button
              variant="ghost"
              onClick={onToday}
              className="ml-2"
            >
              Hoje
            </Button>
          </div>
          
          <div className="border-l border-border pl-4">
            <h2 className="text-xl font-semibold text-foreground">
              {formatHeaderDate(currentDate, viewMode)}
            </h2>
          </div>
        </div>

        {/* Right Section - View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            {viewModes?.map((mode) => (
              <Button
                key={mode?.key}
                variant={viewMode === mode?.key ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange(mode?.key)}
                iconName={mode?.icon}
                iconPosition="left"
                iconSize={16}
                className="px-3"
              >
                <span className="hidden sm:inline">{mode?.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
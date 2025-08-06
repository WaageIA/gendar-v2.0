import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = ({ selectedDate, onDateSelect, selectedTime, onTimeSelect, serviceDuration = 60 }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);

  // Mock available time slots
  const mockTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Mock unavailable dates (weekends and some random dates)
  const unavailableDates = [
    '2025-01-04', '2025-01-05', '2025-01-11', '2025-01-12',
    '2025-01-18', '2025-01-19', '2025-01-25', '2025-01-26'
  ];

  useEffect(() => {
    // Simulate fetching available slots for selected date
    if (selectedDate) {
      const dateStr = selectedDate?.toISOString()?.split('T')?.[0];
      const isWeekend = selectedDate?.getDay() === 0 || selectedDate?.getDay() === 6;
      const isUnavailable = unavailableDates?.includes(dateStr);
      
      if (isWeekend || isUnavailable) {
        setAvailableSlots([]);
      } else {
        // Remove some random slots to simulate bookings
        const bookedSlots = ['10:30', '15:00', '16:30'];
        const available = mockTimeSlots?.filter(slot => !bookedSlots?.includes(slot));
        setAvailableSlots(available);
      }
    }
  }, [selectedDate]);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    
    if (date < today) return false;
    
    const dateStr = date?.toISOString()?.split('T')?.[0];
    const isWeekend = date?.getDay() === 0 || date?.getDay() === 6;
    
    return !isWeekend && !unavailableDates?.includes(dateStr);
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth?.setMonth(prev?.getMonth() + direction);
      return newMonth;
    });
  };

  const formatTime = (time) => {
    return time;
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays?.map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {days?.map((date, index) => (
          <button
            key={index}
            onClick={() => date && isDateAvailable(date) && onDateSelect(date)}
            disabled={!date || !isDateAvailable(date)}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200
              ${!date ? 'invisible' : ''}
              ${!isDateAvailable(date) 
                ? 'text-muted-foreground cursor-not-allowed opacity-50' 
                : 'hover:bg-muted cursor-pointer'
              }
              ${isDateSelected(date) 
                ? 'bg-primary text-primary-foreground font-semibold' 
                : 'text-foreground'
              }
            `}
          >
            {date?.getDate()}
          </button>
        ))}
      </div>
      {/* Time Slots */}
      {selectedDate && (
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Horários Disponíveis - {selectedDate?.toLocaleDateString('pt-BR')}
          </h4>
          
          {availableSlots?.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableSlots?.map(time => (
                <button
                  key={time}
                  onClick={() => onTimeSelect(time)}
                  className={`
                    px-3 py-2 text-sm rounded-lg border transition-all duration-200
                    ${selectedTime === time
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted'
                    }
                  `}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="CalendarX" size={48} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground text-sm">
                Nenhum horário disponível para esta data
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Tente selecionar outra data
              </p>
            </div>
          )}
        </div>
      )}
      {/* Legend */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Selecionado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted border border-border rounded-full"></div>
            <span>Disponível</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted-foreground/30 rounded-full"></div>
            <span>Indisponível</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
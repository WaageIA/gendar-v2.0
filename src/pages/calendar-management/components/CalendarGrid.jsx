import React from 'react';
import Icon from '../../../components/AppIcon';

const CalendarGrid = ({ 
  viewMode, 
  currentDate, 
  appointments, 
  onAppointmentClick, 
  onTimeSlotClick,
  onAppointmentDrop 
}) => {
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

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek?.getDay();
    startOfWeek?.setDate(startOfWeek?.getDate() - dayOfWeek);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      days?.push(day);
    }
    
    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = date?.toDateString();
    return appointments?.filter(apt => new Date(apt.date)?.toDateString() === dateStr);
  };

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01T${timeStr}`)?.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 border-success text-success';
      case 'pending': return 'bg-warning/10 border-warning text-warning';
      case 'cancelled': return 'bg-error/10 border-error text-error';
      default: return 'bg-primary/10 border-primary text-primary';
    }
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Week day headers */}
        <div className="grid grid-cols-7 bg-muted">
          {weekDays?.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days?.map((day, index) => {
            const dayAppointments = day ? getAppointmentsForDate(day) : [];
            const isToday = day && day?.toDateString() === new Date()?.toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-32 p-2 border-r border-b border-border last:border-r-0 cursor-pointer hover:bg-muted/50 transition-colors ${
                  !day ? 'bg-muted/20' : ''
                } ${isToday ? 'bg-primary/5' : ''}`}
                onClick={() => day && onTimeSlotClick(day)}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : 'text-foreground'}`}>
                      {day?.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayAppointments?.slice(0, 3)?.map((appointment) => (
                        <div
                          key={appointment?.id}
                          className={`text-xs p-1 rounded border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(appointment?.status)}`}
                          onClick={(e) => {
                            e?.stopPropagation();
                            onAppointmentClick(appointment);
                          }}
                        >
                          <div className="font-medium truncate">{appointment?.clientName}</div>
                          <div className="truncate">{formatTime(appointment?.startTime)}</div>
                        </div>
                      ))}
                      {dayAppointments?.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayAppointments?.length - 3} mais
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Week day headers */}
        <div className="grid grid-cols-8 bg-muted">
          <div className="p-3 border-r border-border"></div>
          {weekDays?.map((day) => {
            const isToday = day?.toDateString() === new Date()?.toDateString();
            return (
              <div key={day?.toISOString()} className={`p-3 text-center border-r border-border last:border-r-0 ${isToday ? 'bg-primary/10' : ''}`}>
                <div className="text-sm font-medium text-foreground">
                  {day?.toLocaleDateString('pt-BR', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-semibold ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                  {day?.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        {/* Time slots */}
        <div className="max-h-96 overflow-y-auto">
          {hours?.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-border last:border-b-0">
              <div className="p-3 text-sm text-muted-foreground border-r border-border bg-muted/50">
                {hour}:00
              </div>
              {weekDays?.map((day) => {
                const dayAppointments = getAppointmentsForDate(day)?.filter(apt => {
                  const aptHour = parseInt(apt?.startTime?.split(':')?.[0]);
                  return aptHour === hour;
                });
                
                return (
                  <div
                    key={`${day?.toISOString()}-${hour}`}
                    className="p-2 border-r border-border last:border-r-0 cursor-pointer hover:bg-muted/50 transition-colors min-h-16"
                    onClick={() => onTimeSlotClick(day, `${hour}:00`)}
                  >
                    {dayAppointments?.map((appointment) => (
                      <div
                        key={appointment?.id}
                        className={`text-xs p-2 rounded border cursor-pointer hover:opacity-80 transition-opacity mb-1 ${getStatusColor(appointment?.status)}`}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onAppointmentClick(appointment);
                        }}
                      >
                        <div className="font-medium truncate">{appointment?.clientName}</div>
                        <div className="truncate">{appointment?.service}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
    const dayAppointments = getAppointmentsForDate(currentDate);

    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Day header */}
        <div className="p-4 bg-muted border-b border-border">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {currentDate?.toLocaleDateString('pt-BR', { weekday: 'long' })}
            </div>
            <div className="text-2xl font-bold text-primary">
              {currentDate?.getDate()}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentDate?.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
        {/* Time slots */}
        <div className="max-h-96 overflow-y-auto">
          {hours?.map((hour) => {
            const hourAppointments = dayAppointments?.filter(apt => {
              const aptHour = parseInt(apt?.startTime?.split(':')?.[0]);
              return aptHour === hour;
            });
            
            return (
              <div key={hour} className="flex border-b border-border last:border-b-0">
                <div className="w-20 p-3 text-sm text-muted-foreground border-r border-border bg-muted/50 flex-shrink-0">
                  {hour}:00
                </div>
                <div
                  className="flex-1 p-3 cursor-pointer hover:bg-muted/50 transition-colors min-h-16"
                  onClick={() => onTimeSlotClick(currentDate, `${hour}:00`)}
                >
                  {hourAppointments?.map((appointment) => (
                    <div
                      key={appointment?.id}
                      className={`p-3 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity mb-2 ${getStatusColor(appointment?.status)}`}
                      onClick={(e) => {
                        e?.stopPropagation();
                        onAppointmentClick(appointment);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{appointment?.clientName}</div>
                          <div className="text-sm opacity-80">{appointment?.service}</div>
                          <div className="text-xs opacity-60">
                            {formatTime(appointment?.startTime)} - {formatTime(appointment?.endTime)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Phone" size={16} />
                          <Icon name="MessageSquare" size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1">
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
    </div>
  );
};

export default CalendarGrid;
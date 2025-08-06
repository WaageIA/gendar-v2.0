import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AvailabilityModal = ({ isOpen, onClose, onSave }) => {
  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
    tuesday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
    wednesday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
    thursday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
    friday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
    saturday: { enabled: true, start: '09:00', end: '15:00', breaks: [] },
    sunday: { enabled: false, start: '09:00', end: '18:00', breaks: [] }
  });

  const [specialDates, setSpecialDates] = useState([
    { date: '2025-01-01', type: 'holiday', name: 'Ano Novo' },
    { date: '2025-04-21', type: 'holiday', name: 'Tiradentes' },
    { date: '2025-12-25', type: 'holiday', name: 'Natal' }
  ]);

  const weekDays = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ];

  const handleDayToggle = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        enabled: !prev?.[day]?.enabled
      }
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        [field]: value
      }
    }));
  };

  const handleBreakChange = (day, breakIndex, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        breaks: prev?.[day]?.breaks?.map((breakItem, index) =>
          index === breakIndex ? { ...breakItem, [field]: value } : breakItem
        )
      }
    }));
  };

  const addBreak = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        breaks: [...prev?.[day]?.breaks, { start: '12:00', end: '13:00' }]
      }
    }));
  };

  const removeBreak = (day, breakIndex) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        breaks: prev?.[day]?.breaks?.filter((_, index) => index !== breakIndex)
      }
    }));
  };

  const handleSave = () => {
    onSave({ availability, specialDates });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Configurar Disponibilidade</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Defina seus horários de funcionamento e intervalos
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Weekly Schedule */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Horário Semanal</h3>
            <div className="space-y-4">
              {weekDays?.map((day) => (
                <div key={day?.key} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={availability?.[day?.key]?.enabled}
                        onChange={() => handleDayToggle(day?.key)}
                      />
                      <span className="font-medium text-foreground">{day?.label}</span>
                    </div>
                    {availability?.[day?.key]?.enabled && (
                      <div className="text-sm text-muted-foreground">
                        {availability?.[day?.key]?.start} - {availability?.[day?.key]?.end}
                      </div>
                    )}
                  </div>

                  {availability?.[day?.key]?.enabled && (
                    <div className="space-y-4">
                      {/* Working Hours */}
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Início"
                          type="time"
                          value={availability?.[day?.key]?.start}
                          onChange={(e) => handleTimeChange(day?.key, 'start', e?.target?.value)}
                        />
                        <Input
                          label="Fim"
                          type="time"
                          value={availability?.[day?.key]?.end}
                          onChange={(e) => handleTimeChange(day?.key, 'end', e?.target?.value)}
                        />
                      </div>

                      {/* Breaks */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-foreground">Intervalos</span>
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Plus"
                            iconPosition="left"
                            iconSize={14}
                            onClick={() => addBreak(day?.key)}
                          >
                            Adicionar
                          </Button>
                        </div>
                        
                        {availability?.[day?.key]?.breaks?.map((breakItem, breakIndex) => (
                          <div key={breakIndex} className="flex items-center space-x-2 mb-2">
                            <Input
                              type="time"
                              value={breakItem?.start}
                              onChange={(e) => handleBreakChange(day?.key, breakIndex, 'start', e?.target?.value)}
                              className="flex-1"
                            />
                            <span className="text-muted-foreground">até</span>
                            <Input
                              type="time"
                              value={breakItem?.end}
                              onChange={(e) => handleBreakChange(day?.key, breakIndex, 'end', e?.target?.value)}
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeBreak(day?.key, breakIndex)}
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Special Dates */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Datas Especiais</h3>
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="space-y-3">
                {specialDates?.map((specialDate, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">{specialDate?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(specialDate.date)?.toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        specialDate?.type === 'holiday' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                      }`}>
                        {specialDate?.type === 'holiday' ? 'Feriado' : 'Especial'}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSpecialDates(prev => prev?.filter((_, i) => i !== index));
                        }}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                variant="outline"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                className="mt-4"
                onClick={() => {
                  const newDate = prompt('Data (YYYY-MM-DD):');
                  const newName = prompt('Nome:');
                  if (newDate && newName) {
                    setSpecialDates(prev => [...prev, { date: newDate, type: 'holiday', name: newName }]);
                  }
                }}
              >
                Adicionar Data Especial
              </Button>
            </div>
          </div>

          {/* Quick Settings */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Configurações Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                iconName="Copy"
                iconPosition="left"
                iconSize={16}
                onClick={() => {
                  const mondaySchedule = availability?.monday;
                  const newAvailability = { ...availability };
                  ['tuesday', 'wednesday', 'thursday', 'friday']?.forEach(day => {
                    newAvailability[day] = { ...mondaySchedule };
                  });
                  setAvailability(newAvailability);
                }}
              >
                Copiar Segunda para Dias Úteis
              </Button>
              
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
                onClick={() => {
                  setAvailability({
                    monday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
                    tuesday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
                    wednesday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
                    thursday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
                    friday: { enabled: true, start: '09:00', end: '18:00', breaks: [{ start: '12:00', end: '13:00' }] },
                    saturday: { enabled: true, start: '09:00', end: '15:00', breaks: [] },
                    sunday: { enabled: false, start: '09:00', end: '18:00', breaks: [] }
                  });
                }}
              >
                Restaurar Padrão
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityModal;
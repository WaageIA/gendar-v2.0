import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GeneralSettings = ({ generalSettings, setGeneralSettings }) => {
  const handleSettingChange = (section, field, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleScheduleChange = (day, field, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }));
  };

  const dayNames = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Configurações Gerais
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure as regras gerais de funcionamento do sistema
        </p>
      </div>

      {/* Business Hours */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Horário de Funcionamento</h3>
        <div className="space-y-4">
          {Object.entries(dayNames).map(([day, dayLabel]) => (
            <div key={day} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
              <div className="w-32">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generalSettings.businessHours[day]?.active || false}
                    onChange={(e) => handleScheduleChange(day, 'active', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-foreground">{dayLabel}</span>
                </label>
              </div>
              
              {generalSettings.businessHours[day]?.active && (
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={generalSettings.businessHours[day]?.start || '08:00'}
                    onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                    className="px-2 py-1 border border-border rounded text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span className="text-muted-foreground">às</span>
                  <input
                    type="time"
                    value={generalSettings.businessHours[day]?.end || '18:00'}
                    onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                    className="px-2 py-1 border border-border rounded text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Settings */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Configurações de Agendamento</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Intervalo Padrão entre Serviços (minutos)
            </label>
            <input
              type="number"
              value={generalSettings.defaultServiceInterval}
              onChange={(e) => handleSettingChange('', 'defaultServiceInterval', parseInt(e.target.value) || 0)}
              min="0"
              max="60"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tempo de limpeza/preparação entre serviços
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Antecedência Máxima para Agendamento (dias)
            </label>
            <input
              type="number"
              value={generalSettings.advanceBookingDays}
              onChange={(e) => handleSettingChange('', 'advanceBookingDays', parseInt(e.target.value) || 0)}
              min="1"
              max="365"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Quantos dias no futuro os clientes podem agendar
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Política de Cancelamento (horas)
            </label>
            <input
              type="number"
              value={generalSettings.cancellationPolicy}
              onChange={(e) => handleSettingChange('', 'cancellationPolicy', parseInt(e.target.value) || 0)}
              min="1"
              max="72"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Antecedência mínima para cancelamento sem taxa
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Lembrete de Agendamento (horas antes)
            </label>
            <input
              type="number"
              value={generalSettings.reminderHours}
              onChange={(e) => handleSettingChange('', 'reminderHours', parseInt(e.target.value) || 0)}
              min="1"
              max="72"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Quando enviar lembrete automático
            </p>
          </div>
        </div>
      </div>

      {/* Automation Settings */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Automações</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <div className="font-medium text-foreground">Confirmação Automática</div>
              <div className="text-sm text-muted-foreground">
                Confirmar agendamentos automaticamente sem aprovação manual
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={generalSettings.autoConfirmBookings}
                onChange={(e) => handleSettingChange('', 'autoConfirmBookings', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <div className="font-medium text-foreground">Enviar Lembretes</div>
              <div className="text-sm text-muted-foreground">
                Enviar lembretes automáticos por email/SMS antes dos agendamentos
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={generalSettings.sendReminders}
                onChange={(e) => handleSettingChange('', 'sendReminders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Informações do Sistema</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Horário de Funcionamento</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {Object.entries(generalSettings.businessHours)
                .filter(([_, schedule]) => schedule.active)
                .length} dias por semana
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-info" />
              <span className="text-sm font-medium text-foreground">Intervalo de Serviços</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {generalSettings.defaultServiceInterval} minutos
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Bell" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Lembretes</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {generalSettings.sendReminders ? 'Ativados' : 'Desativados'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Ações Rápidas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="justify-start"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Exportar Configurações
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            iconName="Upload"
            iconPosition="left"
            iconSize={16}
          >
            Importar Configurações
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Restaurar Padrões
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
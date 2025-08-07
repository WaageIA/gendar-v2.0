import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InterfaceSettings = () => {
  const [settings, setSettings] = useState({
    businessHours: {
      monday: { enabled: true, start: '09:00', end: '18:00' },
      tuesday: { enabled: true, start: '09:00', end: '18:00' },
      wednesday: { enabled: true, start: '09:00', end: '18:00' },
      thursday: { enabled: true, start: '09:00', end: '18:00' },
      friday: { enabled: true, start: '09:00', end: '18:00' },
      saturday: { enabled: true, start: '09:00', end: '16:00' },
      sunday: { enabled: false, start: '09:00', end: '16:00' }
    },
    contactInfo: {
      phone: '(11) 99999-9999',
      email: 'contato@seuservico.com',
      address: 'Rua das Flores, 123 - Centro',
      whatsapp: '(11) 99999-9999'
    },
    policies: {
      cancellation: 'Cancelamentos devem ser feitos com pelo menos 24 horas de antecedência.',
      noShow: 'Em caso de não comparecimento, será cobrada taxa de 50% do valor do serviço.',
      rescheduling: 'Reagendamentos podem ser feitos até 12 horas antes do horário marcado.'
    },
    messages: {
      welcome: 'Bem-vindo ao nosso sistema de agendamento online!',
      bookingSuccess: 'Seu agendamento foi confirmado com sucesso!',
      bookingPending: 'Seu agendamento está sendo processado. Entraremos em contato em breve.'
    }
  });

  const [activeSection, setActiveSection] = useState('hours');

  const dayNames = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  const handleBusinessHourChange = (day, field, value) => {
    setSettings(prev => ({
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

  const handleContactInfoChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const handlePolicyChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      policies: {
        ...prev.policies,
        [field]: value
      }
    }));
  };

  const handleMessageChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      messages: {
        ...prev.messages,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Aqui salvaria as configurações
    console.log('Salvando configurações:', settings);
    // Mostrar toast de sucesso
  };

  const sections = [
    { id: 'hours', label: 'Horários de Funcionamento', icon: 'Clock' },
    { id: 'contact', label: 'Informações de Contato', icon: 'Phone' },
    { id: 'policies', label: 'Políticas', icon: 'FileText' },
    { id: 'messages', label: 'Mensagens', icon: 'MessageSquare' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Configurações da Interface
        </h2>
        <Button onClick={handleSave}>
          <Icon name="Save" size={16} className="mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={section.icon} size={16} />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Section Content */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg p-6">
            {/* Business Hours */}
            {activeSection === 'hours' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Horários de Funcionamento
                </h3>
                {Object.entries(settings.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={hours.enabled}
                        onChange={(e) => handleBusinessHourChange(day, 'enabled', e.target.checked)}
                        className="rounded border-border"
                      />
                      <span className="font-medium text-foreground min-w-[120px]">
                        {dayNames[day]}
                      </span>
                    </div>
                    {hours.enabled && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={hours.start}
                          onChange={(e) => handleBusinessHourChange(day, 'start', e.target.value)}
                          className="px-3 py-2 border border-border rounded-md"
                        />
                        <span className="text-muted-foreground">até</span>
                        <input
                          type="time"
                          value={hours.end}
                          onChange={(e) => handleBusinessHourChange(day, 'end', e.target.value)}
                          className="px-3 py-2 border border-border rounded-md"
                        />
                      </div>
                    )}
                    {!hours.enabled && (
                      <span className="text-muted-foreground">Fechado</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Contact Information */}
            {activeSection === 'contact' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Informações de Contato
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={settings.contactInfo.phone}
                      onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={settings.contactInfo.whatsapp}
                      onChange={(e) => handleContactInfoChange('whatsapp', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={settings.contactInfo.email}
                      onChange={(e) => handleContactInfoChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={settings.contactInfo.address}
                      onChange={(e) => handleContactInfoChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Policies */}
            {activeSection === 'policies' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Políticas
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Política de Cancelamento
                    </label>
                    <textarea
                      value={settings.policies.cancellation}
                      onChange={(e) => handlePolicyChange('cancellation', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Política de Não Comparecimento
                    </label>
                    <textarea
                      value={settings.policies.noShow}
                      onChange={(e) => handlePolicyChange('noShow', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Política de Reagendamento
                    </label>
                    <textarea
                      value={settings.policies.rescheduling}
                      onChange={(e) => handlePolicyChange('rescheduling', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            {activeSection === 'messages' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Mensagens Personalizadas
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensagem de Boas-vindas
                    </label>
                    <input
                      type="text"
                      value={settings.messages.welcome}
                      onChange={(e) => handleMessageChange('welcome', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensagem de Agendamento Confirmado
                    </label>
                    <input
                      type="text"
                      value={settings.messages.bookingSuccess}
                      onChange={(e) => handleMessageChange('bookingSuccess', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensagem de Agendamento Pendente
                    </label>
                    <input
                      type="text"
                      value={settings.messages.bookingPending}
                      onChange={(e) => handleMessageChange('bookingPending', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceSettings;
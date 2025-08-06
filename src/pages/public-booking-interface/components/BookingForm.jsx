import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingForm = ({ selectedService, selectedDate, selectedTime, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    createAccount: false,
    agreeTerms: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'Nome é obrigatório';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Sobrenome é obrigatório';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/?.test(formData?.phone)) {
      newErrors.phone = 'Formato: (11) 99999-9999';
    }

    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'Você deve aceitar os termos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value?.replace(/\D/g, '');
    
    // Format as (XX) XXXXX-XXXX or (XX) XXXX-XXXX
    if (digits?.length <= 10) {
      return digits?.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')?.replace(/-$/, '');
    } else {
      return digits?.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')?.replace(/-$/, '');
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    handleInputChange('phone', formatted);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const bookingData = {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        client: formData,
        timestamp: new Date()?.toISOString()
      };
      
      onSubmit(bookingData);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Booking Summary */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold text-foreground mb-3">Resumo do Agendamento</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Serviço:</span>
            <span className="font-medium text-foreground">{selectedService?.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Data:</span>
            <span className="font-medium text-foreground">
              {selectedDate?.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Horário:</span>
            <span className="font-medium text-foreground">{selectedTime}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duração:</span>
            <span className="font-medium text-foreground">
              {formatDuration(selectedService?.duration)}
            </span>
          </div>
          
          <div className="flex justify-between pt-2 border-t border-border">
            <span className="text-muted-foreground">Valor:</span>
            <span className="font-semibold text-primary text-lg">
              {formatPrice(selectedService?.price)}
            </span>
          </div>
        </div>
      </div>
      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          
          <Input
            label="Sobrenome"
            type="text"
            placeholder="Seu sobrenome"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="Enviaremos a confirmação por email"
          required
        />

        <Input
          label="Telefone"
          type="tel"
          placeholder="(11) 99999-9999"
          value={formData?.phone}
          onChange={handlePhoneChange}
          error={errors?.phone}
          description="Para confirmações via WhatsApp"
          required
        />

        <Input
          label="Observações (Opcional)"
          type="text"
          placeholder="Alguma informação adicional..."
          value={formData?.notes}
          onChange={(e) => handleInputChange('notes', e?.target?.value)}
          description="Preferências especiais ou informações importantes"
        />

        {/* Account Creation Option */}
        <div className="border-t border-border pt-4">
          <Checkbox
            label="Criar conta para futuros agendamentos"
            description="Gerencie seus agendamentos e histórico facilmente"
            checked={formData?.createAccount}
            onChange={(e) => handleInputChange('createAccount', e?.target?.checked)}
          />
        </div>

        {/* Terms and Marketing */}
        <div className="space-y-3">
          <Checkbox
            label="Aceito os termos de uso e política de privacidade"
            checked={formData?.agreeTerms}
            onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
            error={errors?.agreeTerms}
            required
          />

          <Checkbox
            label="Aceito receber ofertas e novidades por email/WhatsApp"
            description="Você pode cancelar a qualquer momento"
            checked={formData?.marketingConsent}
            onChange={(e) => handleInputChange('marketingConsent', e?.target?.checked)}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="Calendar"
            iconPosition="left"
          >
            {isLoading ? 'Confirmando...' : 'Confirmar Agendamento'}
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="flex items-center justify-center space-x-6 pt-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>Dados Protegidos</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>Confirmação Instantânea</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Phone" size={14} />
            <span>Suporte 24h</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData, onNewBooking, onCreateAccount }) => {
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

  const generateBookingId = () => {
    return `SHP${Date.now()?.toString()?.slice(-6)}`;
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(bookingData.date);
    const [hours, minutes] = bookingData?.time?.split(':');
    startDate?.setHours(parseInt(hours), parseInt(minutes));
    
    const endDate = new Date(startDate);
    endDate?.setMinutes(endDate?.getMinutes() + bookingData?.service?.duration);

    const formatDate = (date) => {
      return date?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(bookingData?.service?.name)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(`Agendamento confirmado - ServiceHub Pro\n\nServiço: ${bookingData?.service?.name}\nValor: ${formatPrice(bookingData?.service?.price)}\nDuração: ${formatDuration(bookingData?.service?.duration)}`)}&location=${encodeURIComponent('ServiceHub Pro - Endereço do estabelecimento')}`;
    
    window.open(calendarUrl, '_blank');
  };

  const handleWhatsAppContact = () => {
    const message = `Olá! Acabei de fazer um agendamento pelo site:\n\n📅 Serviço: ${bookingData?.service?.name}\n📅 Data: ${bookingData?.date?.toLocaleDateString('pt-BR')}\n⏰ Horário: ${bookingData?.time}\n👤 Nome: ${bookingData?.client?.firstName} ${bookingData?.client?.lastName}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const bookingId = generateBookingId();

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-4">
          <Icon name="CheckCircle" size={32} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Agendamento Confirmado!
        </h1>
        <p className="text-muted-foreground">
          Seu agendamento foi realizado com sucesso. Você receberá uma confirmação por email e WhatsApp.
        </p>
      </div>
      {/* Booking Details Card */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Detalhes do Agendamento</h2>
          <span className="text-sm text-muted-foreground">#{bookingId}</span>
        </div>

        <div className="space-y-4">
          {/* Service Info */}
          <div className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Briefcase" size={20} color="white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{bookingData?.service?.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{bookingData?.service?.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{formatDuration(bookingData?.service?.duration)}</span>
                </span>
                <span className="flex items-center space-x-1 font-semibold text-primary">
                  <Icon name="DollarSign" size={14} />
                  <span>{formatPrice(bookingData?.service?.price)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
              <Icon name="Calendar" size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="font-semibold text-foreground">
                  {bookingData?.date?.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
              <Icon name="Clock" size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Horário</p>
                <p className="font-semibold text-foreground">{bookingData?.time}</p>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Informações do Cliente</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Nome:</span>
                <span className="ml-2 font-medium text-foreground">
                  {bookingData?.client?.firstName} {bookingData?.client?.lastName}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-2 font-medium text-foreground">{bookingData?.client?.email}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Telefone:</span>
                <span className="ml-2 font-medium text-foreground">{bookingData?.client?.phone}</span>
              </div>
              {bookingData?.client?.notes && (
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground">Observações:</span>
                  <span className="ml-2 font-medium text-foreground">{bookingData?.client?.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={handleAddToCalendar}
            iconName="Calendar"
            iconPosition="left"
            fullWidth
          >
            Adicionar ao Calendário
          </Button>

          <Button
            variant="outline"
            onClick={handleWhatsAppContact}
            iconName="MessageCircle"
            iconPosition="left"
            fullWidth
          >
            Contato WhatsApp
          </Button>
        </div>

        <Button
          variant="default"
          onClick={onNewBooking}
          iconName="Plus"
          iconPosition="left"
          fullWidth
        >
          Fazer Novo Agendamento
        </Button>
      </div>
      {/* Account Creation Prompt */}
      {!bookingData?.client?.createAccount && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={20} color="white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Crie sua conta para mais facilidade
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Com uma conta você pode gerenciar seus agendamentos, ver histórico de serviços e reagendar facilmente.
              </p>
              <Button
                variant="default"
                size="sm"
                onClick={onCreateAccount}
                iconName="UserPlus"
                iconPosition="left"
              >
                Criar Conta Grátis
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Business Contact Info */}
      <div className="bg-muted rounded-lg p-6 text-center">
        <h3 className="font-semibold text-foreground mb-3">Precisa de Ajuda?</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Entre em contato conosco:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} />
              <span>+55 11 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} />
              <span>contato@servicehubpro.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
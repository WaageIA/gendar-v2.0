import React, { useState } from 'react';
import PublicBookingHeader from '../../components/ui/PublicBookingHeader';
import ServiceCard from './components/ServiceCard';
import CalendarWidget from './components/CalendarWidget';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import TrustSignals from './components/TrustSignals';
import ProgressIndicator from './components/ProgressIndicator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PublicBookingInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock services data
  const services = [
    {
      id: 1,
      name: "Corte Feminino",
      description: "Corte personalizado com lavagem, corte e finalização. Inclui análise do formato do rosto e aconselhamento de estilo.",
      price: 85.00,
      duration: 90,
      category: "Cabelo",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
      features: ["Lavagem", "Corte", "Finalização", "Consultoria"]
    },
    {
      id: 2,
      name: "Corte Masculino",
      description: "Corte moderno com acabamento profissional. Inclui lavagem, corte, barba e finalização com produtos premium.",
      price: 65.00,
      duration: 60,
      category: "Cabelo",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400",
      features: ["Lavagem", "Corte", "Barba", "Finalização"]
    },
    {
      id: 3,
      name: "Escova Progressiva",
      description: "Tratamento alisante que reduz o volume e facilita o penteado. Resultado duradouro com produtos de alta qualidade.",
      price: 180.00,
      duration: 180,
      category: "Tratamento",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
      features: ["Lavagem", "Aplicação", "Secagem", "Finalização"]
    },
    {
      id: 4,
      name: "Coloração",
      description: "Coloração profissional com produtos de qualidade. Inclui análise da cor, aplicação e tratamento pós-coloração.",
      price: 120.00,
      duration: 150,
      category: "Cor",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
      features: ["Consultoria", "Coloração", "Tratamento", "Finalização"]
    },
    {
      id: 5,
      name: "Manicure Completa",
      description: "Cuidado completo das unhas das mãos com esmaltação. Inclui cutilagem, hidratação e esmaltação com cores variadas.",
      price: 35.00,
      duration: 45,
      category: "Unhas",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
      features: ["Cutilagem", "Hidratação", "Esmaltação", "Decoração"]
    },
    {
      id: 6,
      name: "Pedicure Completa",
      description: "Cuidado completo dos pés com esmaltação. Inclui lixamento, cutilagem, hidratação e esmaltação profissional.",
      price: 40.00,
      duration: 50,
      category: "Unhas",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400",
      features: ["Lixamento", "Cutilagem", "Hidratação", "Esmaltação"]
    }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (selectedDate && time) {
      setCurrentStep(3);
    }
  };

  const handleBookingSubmit = async (formData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBookingData(formData);
    setCurrentStep(4);
    setIsLoading(false);
  };

  const handleNewBooking = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingData(null);
  };

  const handleCreateAccount = () => {
    // Redirect to account creation or show modal
    console.log('Redirect to account creation');
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== null && selectedTime !== null;
      case 3:
        return false; // Form handles its own submission
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicBookingHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentStep < 4 && (
          <ProgressIndicator currentStep={currentStep} totalSteps={3} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Escolha seu Serviço
                  </h1>
                  <p className="text-muted-foreground">
                    Selecione o serviço desejado para continuar com o agendamento
                  </p>
                </div>

                <div className="space-y-4">
                  {services?.map(service => (
                    <ServiceCard
                      key={service?.id}
                      service={service}
                      onSelect={handleServiceSelect}
                      isSelected={selectedService?.id === service?.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBackStep}
                    >
                      <Icon name="ArrowLeft" size={20} />
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        Escolha Data e Horário
                      </h1>
                      <p className="text-muted-foreground">
                        Serviço selecionado: {selectedService?.name}
                      </p>
                    </div>
                  </div>
                </div>

                <CalendarWidget
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  selectedTime={selectedTime}
                  onTimeSelect={handleTimeSelect}
                  serviceDuration={selectedService?.duration}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBackStep}
                    >
                      <Icon name="ArrowLeft" size={20} />
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        Seus Dados
                      </h1>
                      <p className="text-muted-foreground">
                        Preencha suas informações para finalizar o agendamento
                      </p>
                    </div>
                  </div>
                </div>

                <BookingForm
                  selectedService={selectedService}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSubmit={handleBookingSubmit}
                  isLoading={isLoading}
                />
              </div>
            )}

            {currentStep === 4 && (
              <BookingConfirmation
                bookingData={bookingData}
                onNewBooking={handleNewBooking}
                onCreateAccount={handleCreateAccount}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Selected Service Summary */}
              {selectedService && currentStep > 1 && currentStep < 4 && (
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">Serviço Selecionado</h3>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">{selectedService?.name}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duração:</span>
                      <span className="text-foreground">
                        {selectedService?.duration < 60 
                          ? `${selectedService?.duration} min`
                          : `${Math.floor(selectedService?.duration / 60)}h ${selectedService?.duration % 60 > 0 ? `${selectedService?.duration % 60}min` : ''}`
                        }
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-semibold text-primary">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })?.format(selectedService?.price)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Date/Time Summary */}
              {selectedDate && selectedTime && currentStep > 2 && currentStep < 4 && (
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">Data e Horário</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="text-foreground">
                        {selectedDate?.toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="text-foreground">{selectedTime}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Trust Signals */}
              <TrustSignals />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicBookingInterface;
import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      rating: 5,
      comment: "Excelente atendimento! O agendamento online é muito prático e o serviço foi impecável.",
      service: "Corte e Escova",
      date: "Dezembro 2024"
    },
    {
      id: 2,
      name: "João Santos",
      rating: 5,
      comment: "Profissionais muito qualificados. Sempre saio satisfeito e o sistema de agendamento facilita muito.",
      service: "Barba e Cabelo",
      date: "Janeiro 2025"
    },
    {
      id: 3,
      name: "Ana Costa",
      rating: 5,
      comment: "Ambiente acolhedor e serviço de qualidade. Recomendo para todas as amigas!",
      service: "Manicure e Pedicure",
      date: "Janeiro 2025"
    }
  ];

  const certifications = [
    {
      icon: "Shield",
      title: "Dados Protegidos",
      description: "Suas informações são criptografadas e seguras"
    },
    {
      icon: "Award",
      title: "Certificado ANVISA",
      description: "Estabelecimento licenciado e regularizado"
    },
    {
      icon: "Users",
      title: "+1000 Clientes",
      description: "Atendidos com excelência desde 2020"
    },
    {
      icon: "Star",
      title: "Avaliação 4.9/5",
      description: "Baseado em mais de 500 avaliações"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? "text-amber-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Por que Confiar em Nós?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications?.map((cert, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={cert?.icon} size={16} color="white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{cert?.title}</h4>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          O que Nossos Clientes Dizem
        </h3>
        
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{testimonial?.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial?.service} • {testimonial?.date}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial?.rating)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">"{testimonial?.comment}"</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Baseado em avaliações reais de clientes verificados
          </p>
        </div>
      </div>
      {/* Security Features */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-6 text-xs text-primary">
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} />
            <span>SSL Seguro</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>LGPD Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} />
            <span>Verificado</span>
          </div>
        </div>
      </div>
      {/* Business Hours */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-3 text-center">Horário de Funcionamento</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Segunda - Sexta:</span>
            <span className="font-medium text-foreground">09:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sábado:</span>
            <span className="font-medium text-foreground">09:00 - 16:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Domingo:</span>
            <span className="font-medium text-error">Fechado</span>
          </div>
        </div>
      </div>
      {/* Contact Info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-3 text-center">Localização</h4>
        <div className="space-y-2 text-sm text-center">
          <p className="text-muted-foreground">
            Rua das Flores, 123 - Centro<br />
            São Paulo, SP - CEP 01234-567
          </p>
          <div className="flex items-center justify-center space-x-4 mt-3">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>Próximo ao Metro</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Car" size={14} />
              <span>Estacionamento</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
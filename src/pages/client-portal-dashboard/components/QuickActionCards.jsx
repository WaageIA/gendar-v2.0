import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActionCards = ({ onBookAppointment, onViewHistory, onUpdateProfile }) => {
  const quickActions = [
    {
      id: 'book',
      title: 'Agendar Serviço',
      description: 'Reserve seu próximo atendimento',
      icon: 'Calendar',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200',
      action: onBookAppointment
    },
    {
      id: 'history',
      title: 'Meu Histórico',
      description: 'Veja seus atendimentos anteriores',
      icon: 'History',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
      borderColor: 'border-green-200',
      action: onViewHistory
    },
    {
      id: 'profile',
      title: 'Atualizar Perfil',
      description: 'Mantenha seus dados atualizados',
      icon: 'User',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      borderColor: 'border-purple-200',
      action: onUpdateProfile
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Ações Rápidas
        </h2>
        <p className="text-muted-foreground">
          Acesse rapidamente as funcionalidades mais utilizadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className={`
              relative overflow-hidden border rounded-lg p-6 transition-all duration-200 cursor-pointer
              ${action?.bgColor} ${action?.borderColor}
              hover:shadow-md hover:scale-[1.02] group
            `}
            onClick={action?.action}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform">
              <Icon name={action?.icon} size={96} className={action?.iconColor} />
            </div>

            <div className="relative">
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${action?.iconColor} bg-white/80`}>
                <Icon name={action?.icon} size={24} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {action?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {action?.description}
              </p>

              {/* Action Button */}
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
              >
                Acessar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Quick Actions Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Icon name="Gift" size={16} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Promoções</p>
              <p className="text-xs text-muted-foreground">Ver ofertas</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={16} className="text-pink-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Favoritos</p>
              <p className="text-xs text-muted-foreground">Meus serviços</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={16} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Pagamentos</p>
              <p className="text-xs text-muted-foreground">Métodos</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="MessageCircle" size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Suporte</p>
              <p className="text-xs text-muted-foreground">Fale conosco</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCards;
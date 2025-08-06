import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountSummary = ({ client, totalVisits, memberSince }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long'
    });
  };

  const calculateTotalSpent = () => {
    // Mock calculation - in real app, this would come from the API
    return 2850.00;
  };

  const getClientLevel = (visits) => {
    if (visits >= 20) return { level: 'Platinum', color: 'text-purple-600', icon: 'Crown' };
    if (visits >= 10) return { level: 'Gold', color: 'text-yellow-600', icon: 'Star' };
    if (visits >= 5) return { level: 'Silver', color: 'text-gray-600', icon: 'Award' };
    return { level: 'Bronze', color: 'text-amber-600', icon: 'Medal' };
  };

  const clientLevel = getClientLevel(totalVisits);

  const summaryStats = [
    {
      label: 'Total de Visitas',
      value: totalVisits,
      icon: 'Calendar',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Valor Total Gasto',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })?.format(calculateTotalSpent()),
      icon: 'DollarSign',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Pontos de Fidelidade',
      value: client?.loyaltyPoints,
      icon: 'Gift',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${clientLevel?.color === 'text-purple-600' ? 'bg-purple-100' : clientLevel?.color === 'text-yellow-600' ? 'bg-yellow-100' : clientLevel?.color === 'text-gray-600' ? 'bg-gray-100' : 'bg-amber-100'}`}>
            <Icon name={clientLevel?.icon} size={20} className={clientLevel?.color} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Resumo da Conta</h2>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${clientLevel?.color}`}>
                Nível {clientLevel?.level}
              </span>
              <span className="text-xs text-muted-foreground">
                • Cliente desde {formatDate(memberSince)}
              </span>
            </div>
          </div>
        </div>

        {/* Client Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso para próximo nível</span>
            <span className="text-foreground font-medium">{totalVisits}/25 visitas</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((totalVisits / 25) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {25 - totalVisits > 0 ? `${25 - totalVisits} visitas para o nível Platinum` : 'Parabéns! Você alcançou o nível máximo!'}
          </p>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="p-6 space-y-4">
        {summaryStats?.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat?.bg}`}>
                <Icon name={stat?.icon} size={16} className={stat?.color} />
              </div>
              <span className="text-sm font-medium text-foreground">{stat?.label}</span>
            </div>
            <span className="text-lg font-semibold text-foreground">{stat?.value}</span>
          </div>
        ))}
      </div>
      {/* Preferred Services */}
      <div className="p-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Serviços Favoritos</h3>
        <div className="flex flex-wrap gap-2">
          {client?.preferredServices?.map((service, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      {/* Quick Info */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {new Date()?.getFullYear() - new Date(memberSince)?.getFullYear()}
            </p>
            <p className="text-xs text-muted-foreground">anos conosco</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {Math.round(totalVisits / Math.max(1, new Date()?.getFullYear() - new Date(memberSince)?.getFullYear()))}
            </p>
            <p className="text-xs text-muted-foreground">visitas/ano</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;
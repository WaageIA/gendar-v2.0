import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServiceDashboard = ({ service, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !service) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDuration = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    }
    return `${minutes}min`;
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 90) return 'text-success';
    if (popularity >= 70) return 'text-warning';
    return 'text-error';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Cabelo': return 'Scissors';
      case 'Unhas': return 'Hand';
      case 'Estética': return 'Sparkles';
      case 'Bem-estar': return 'Heart';
      default: return 'Briefcase';
    }
  };

  // Mock data for analytics
  const monthlyData = [
    { month: 'Jan', bookings: 12, revenue: 540 },
    { month: 'Fev', bookings: 18, revenue: 810 },
    { month: 'Mar', bookings: 15, revenue: 675 },
    { month: 'Abr', bookings: 22, revenue: 990 },
    { month: 'Mai', bookings: 28, revenue: 1260 },
    { month: 'Jun', bookings: 25, revenue: 1125 }
  ];

  const competitorAnalysis = [
    { name: 'Concorrente A', price: service.price * 1.1, rating: 4.2 },
    { name: 'Concorrente B', price: service.price * 0.9, rating: 4.5 },
    { name: 'Concorrente C', price: service.price * 1.2, rating: 4.0 }
  ];

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: 'BarChart3' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'customers', label: 'Clientes', icon: 'Users' },
    { id: 'competition', label: 'Concorrência', icon: 'Target' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name={getCategoryIcon(service.category)} size={24} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{service.name}</h2>
              <p className="text-sm text-muted-foreground">
                Analytics e Performance
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total de Reservas</p>
                      <p className="text-2xl font-bold text-foreground">
                        {service.totalBookings}
                      </p>
                    </div>
                    <Icon name="Calendar" size={24} className="text-primary" />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Receita Total</p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatCurrency(service.revenue)}
                      </p>
                    </div>
                    <Icon name="DollarSign" size={24} className="text-success" />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avaliação Média</p>
                      <p className="text-2xl font-bold text-foreground">
                        {service.averageRating.toFixed(1)}
                        <span className="text-sm text-muted-foreground ml-1">⭐</span>
                      </p>
                    </div>
                    <Icon name="Star" size={24} className="text-warning" />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Popularidade</p>
                      <p className={`text-2xl font-bold ${getPopularityColor(service.popularity)}`}>
                        {service.popularity}%
                      </p>
                    </div>
                    <Icon name="TrendingUp" size={24} className="text-info" />
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-4">Informações do Serviço</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoria:</span>
                      <span className="text-foreground font-medium">{service.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duração:</span>
                      <span className="text-foreground font-medium">{formatDuration(service.duration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Preço:</span>
                      <span className="text-foreground font-medium">{formatCurrency(service.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Margem:</span>
                      <span className="text-foreground font-medium">{service.margin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`font-medium ${service.status === 'active' ? 'text-success' : 'text-error'}`}>
                        {service.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-4">Equipe e Recursos</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-muted-foreground text-sm">Profissionais:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.professionals.map((prof, index) => (
                          <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                            {prof}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">Características:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.features.slice(0, 4).map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-info/10 text-info rounded text-xs">
                            {feature}
                          </span>
                        ))}
                        {service.features.length > 4 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                            +{service.features.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-4">Performance Mensal</h3>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-foreground">{data.month}</span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Reservas</div>
                          <div className="font-medium text-foreground">{data.bookings}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Receita</div>
                          <div className="font-medium text-foreground">{formatCurrency(data.revenue)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-4">Métricas de Crescimento</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Crescimento mensal:</span>
                      <span className="text-success font-medium">+12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa de retenção:</span>
                      <span className="text-foreground font-medium">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tempo médio entre reservas:</span>
                      <span className="text-foreground font-medium">21 dias</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-4">Análise de Rentabilidade</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lucro por serviço:</span>
                      <span className="text-success font-medium">
                        {formatCurrency(service.price - service.costPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Comissão média:</span>
                      <span className="text-foreground font-medium">
                        {formatCurrency((service.price * service.commission) / 100)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ROI estimado:</span>
                      <span className="text-success font-medium">245%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-4">Perfil dos Clientes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">68%</div>
                    <div className="text-sm text-muted-foreground">Clientes Recorrentes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">4.2</div>
                    <div className="text-sm text-muted-foreground">Visitas por Cliente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">32</div>
                    <div className="text-sm text-muted-foreground">Idade Média</div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-4">Feedback dos Clientes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">5 estrelas</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-sm text-foreground">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">4 estrelas</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-info h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm text-foreground">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">3 estrelas</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div className="bg-warning h-2 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                      <span className="text-sm text-foreground">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'competition' && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-4">Análise Competitiva</h3>
                <div className="space-y-3">
                  {competitorAnalysis.map((competitor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded">
                      <div>
                        <div className="font-medium text-foreground">{competitor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {competitor.rating.toFixed(1)} ⭐
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">
                          {formatCurrency(competitor.price)}
                        </div>
                        <div className={`text-sm ${
                          competitor.price > service.price ? 'text-success' : 'text-error'
                        }`}>
                          {competitor.price > service.price ? '+' : ''}
                          {formatCurrency(competitor.price - service.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-4">Posicionamento de Mercado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Posição de Preço</div>
                    <div className="text-lg font-semibold text-foreground">
                      Competitivo
                      <span className="text-sm text-success ml-2">(-8% vs média)</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Posição de Qualidade</div>
                    <div className="text-lg font-semibold text-foreground">
                      Superior
                      <span className="text-sm text-success ml-2">(+0.3 vs média)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-4">Recomendações</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-sm">Preço competitivo mantém boa demanda</span>
                  </div>
                  <div className="flex items-center space-x-2 text-info">
                    <Icon name="Info" size={16} />
                    <span className="text-sm">Considere aumentar preço em 5% devido à alta qualidade</span>
                  </div>
                  <div className="flex items-center space-x-2 text-warning">
                    <Icon name="AlertTriangle" size={16} />
                    <span className="text-sm">Monitore concorrente B - preços similares</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDashboard;
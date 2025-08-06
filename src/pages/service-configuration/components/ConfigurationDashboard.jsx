import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConfigurationDashboard = ({ summaryMetrics, categories, professionals, resources }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getCategoryColor = (color) => {
    const colors = {
      purple: 'text-purple-600 bg-purple-100',
      pink: 'text-pink-600 bg-pink-100',
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100'
    };
    return colors[color] || 'text-gray-600 bg-gray-100';
  };

  const getResourceStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'maintenance': return 'text-warning';
      case 'unavailable': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getResourceStatusLabel = (status) => {
    switch (status) {
      case 'available': return 'Disponível';
      case 'maintenance': return 'Manutenção';
      case 'unavailable': return 'Indisponível';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Categorias Ativas</p>
              <p className="text-2xl font-bold text-foreground">
                {summaryMetrics.totalCategories}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Grid3X3" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Profissionais</p>
              <p className="text-2xl font-bold text-foreground">
                {summaryMetrics.totalProfessionals}
              </p>
            </div>
            <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-info" />
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Comissão Média</p>
              <p className="text-2xl font-bold text-foreground">
                {summaryMetrics.averageCommission.toFixed(1)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Recursos Ativos</p>
              <p className="text-2xl font-bold text-foreground">
                {summaryMetrics.totalResources}
              </p>
            </div>
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            variant="outline"
            className="justify-start"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Nova Categoria
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            iconName="UserPlus"
            iconPosition="left"
            iconSize={16}
          >
            Novo Profissional
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            iconName="Settings"
            iconPosition="left"
            iconSize={16}
          >
            Configurar Comissões
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            iconName="Package"
            iconPosition="left"
            iconSize={16}
          >
            Adicionar Recurso
          </Button>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Categorias de Serviços</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(category.color)}`}>
                    <Icon name={category.icon} size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.servicesCount} serviços
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {formatCurrency(category.totalRevenue)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Média: {formatCurrency(category.averagePrice)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Professionals */}
        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Profissionais</h3>
          <div className="space-y-3">
            {professionals
              .sort((a, b) => b.totalRevenue - a.totalRevenue)
              .slice(0, 4)
              .map((professional) => (
                <div key={professional.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={professional.photo}
                      alt={professional.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-foreground">{professional.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {professional.specialties.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">
                      {formatCurrency(professional.totalRevenue)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {professional.averageRating.toFixed(1)} ⭐
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Resources Status */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Status dos Recursos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource) => (
            <div key={resource.id} className="p-4 bg-background rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground text-sm">{resource.name}</h4>
                <span className={`text-xs font-medium ${getResourceStatusColor(resource.status)}`}>
                  {getResourceStatusLabel(resource.status)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {resource.category} • {resource.type}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Qtd: {resource.quantity}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatCurrency(resource.cost)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Saúde do Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-2">98.5%</div>
            <div className="text-sm text-muted-foreground">Disponibilidade</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-info mb-2">{summaryMetrics.averageRating.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Avaliação Média</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-2">
              {formatCurrency(summaryMetrics.totalRevenue)}
            </div>
            <div className="text-sm text-muted-foreground">Receita Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationDashboard;
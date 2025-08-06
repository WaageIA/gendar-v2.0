import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CommissionSettings = ({ commissionRules, setCommissionRules, professionals, categories }) => {
  const [activeSection, setActiveSection] = useState('general');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleRuleChange = (section, field, value) => {
    setCommissionRules(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCategoryRateChange = (category, rate) => {
    setCommissionRules(prev => ({
      ...prev,
      categoryRates: {
        ...prev.categoryRates,
        [category]: parseFloat(rate) || 0
      }
    }));
  };

  const sections = [
    { id: 'general', label: 'Configurações Gerais', icon: 'Settings' },
    { id: 'categories', label: 'Por Categoria', icon: 'Grid3X3' },
    { id: 'bonus', label: 'Bônus e Incentivos', icon: 'Award' },
    { id: 'reports', label: 'Relatórios', icon: 'BarChart3' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Sistema de Comissões
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure as regras de comissão para profissionais e categorias
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeSection === section.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={section.icon} size={16} />
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeSection === 'general' && (
        <div className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Configurações Padrão</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Taxa Padrão de Comissão (%)
                </label>
                <input
                  type="number"
                  value={commissionRules.defaultRate}
                  onChange={(e) => handleRuleChange('', 'defaultRate', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Taxa aplicada quando não há configuração específica
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Simulação de Comissão
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Serviço R$ 100:</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency((100 * commissionRules.defaultRate) / 100)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Serviço R$ 200:</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency((200 * commissionRules.defaultRate) / 100)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Commission Overview */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Comissões por Profissional</h3>
            <div className="space-y-3">
              {professionals.map((professional) => (
                <div key={professional.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={professional.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                      alt={professional.name}
                      className="w-8 h-8 rounded-full object-cover"
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
                      {professional.commissionRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency((professional.totalRevenue * professional.commissionRate) / 100)} total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Settings */}
      {activeSection === 'categories' && (
        <div className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Comissões por Categoria</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Configure taxas específicas para cada categoria de serviço
            </p>
            
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-${category.color}-600 bg-${category.color}-100`}>
                      <Icon name={category.icon} size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{category.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {category.servicesCount} serviços • Média: {formatCurrency(category.averagePrice)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      value={commissionRules.categoryRates[category.name] || commissionRules.defaultRate}
                      onChange={(e) => handleCategoryRateChange(category.name, e.target.value)}
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-20 px-2 py-1 border border-border rounded text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Commission Comparison */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Comparação de Comissões</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => {
                const rate = commissionRules.categoryRates[category.name] || commissionRules.defaultRate;
                const avgCommission = (category.averagePrice * rate) / 100;
                
                return (
                  <div key={category.id} className="p-4 bg-background rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name={category.icon} size={16} />
                      <span className="font-medium text-foreground">{category.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Taxa: {rate}% • Comissão média: {formatCurrency(avgCommission)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bonus Settings */}
      {activeSection === 'bonus' && (
        <div className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Sistema de Bônus</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Meta Mensal de Serviços
                </label>
                <input
                  type="number"
                  value={commissionRules.bonusRules.monthlyTarget}
                  onChange={(e) => handleRuleChange('bonusRules', 'monthlyTarget', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Número de serviços para ativar bônus
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bônus por Meta (%)
                </label>
                <input
                  type="number"
                  value={commissionRules.bonusRules.bonusPercentage}
                  onChange={(e) => handleRuleChange('bonusRules', 'bonusPercentage', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="50"
                  step="0.1"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Percentual adicional na comissão
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Avaliação Mínima para Bônus
                </label>
                <input
                  type="number"
                  value={commissionRules.bonusRules.minimumRating}
                  onChange={(e) => handleRuleChange('bonusRules', 'minimumRating', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Avaliação mínima para receber bônus
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bônus por Avaliação (%)
                </label>
                <input
                  type="number"
                  value={commissionRules.bonusRules.ratingBonus}
                  onChange={(e) => handleRuleChange('bonusRules', 'ratingBonus', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="20"
                  step="0.1"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Bônus adicional por alta avaliação
                </p>
              </div>
            </div>
          </div>

          {/* Bonus Simulation */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Simulação de Bônus</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">
                  {commissionRules.defaultRate + commissionRules.bonusRules.bonusPercentage}%
                </div>
                <div className="text-sm text-muted-foreground">Com Meta</div>
              </div>
              <div className="p-4 bg-background rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">
                  {commissionRules.defaultRate + commissionRules.bonusRules.ratingBonus}%
                </div>
                <div className="text-sm text-muted-foreground">Com Avaliação</div>
              </div>
              <div className="p-4 bg-background rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">
                  {commissionRules.defaultRate + commissionRules.bonusRules.bonusPercentage + commissionRules.bonusRules.ratingBonus}%
                </div>
                <div className="text-sm text-muted-foreground">Máximo</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports */}
      {activeSection === 'reports' && (
        <div className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Relatório de Comissões</h3>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-background rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">
                  {formatCurrency(professionals.reduce((sum, p) => sum + (p.totalRevenue * p.commissionRate) / 100, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Comissões</div>
              </div>
              <div className="p-4 bg-background rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">
                  {(professionals.reduce((sum, p) => sum + p.commissionRate, 0) / professionals.length).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Taxa Média</div>
              </div>
              <div className="p-4 bg-background rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">
                  {professionals.filter(p => p.averageRating >= commissionRules.bonusRules.minimumRating).length}
                </div>
                <div className="text-sm text-muted-foreground">Elegíveis Bônus</div>
              </div>
              <div className="p-4 bg-background rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">
                  {professionals.filter(p => p.totalServices >= commissionRules.bonusRules.monthlyTarget).length}
                </div>
                <div className="text-sm text-muted-foreground">Bateram Meta</div>
              </div>
            </div>

            {/* Professional Performance */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Performance por Profissional</h4>
              {professionals
                .sort((a, b) => (b.totalRevenue * b.commissionRate) / 100 - (a.totalRevenue * a.commissionRate) / 100)
                .map((professional) => {
                  const commission = (professional.totalRevenue * professional.commissionRate) / 100;
                  const hasMetaBonus = professional.totalServices >= commissionRules.bonusRules.monthlyTarget;
                  const hasRatingBonus = professional.averageRating >= commissionRules.bonusRules.minimumRating;
                  
                  return (
                    <div key={professional.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img
                          src={professional.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                          alt={professional.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-foreground">{professional.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {professional.totalServices} serviços • {professional.averageRating.toFixed(1)} ⭐
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">
                          {formatCurrency(commission)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {professional.commissionRate}%
                          {hasMetaBonus && <span className="text-success ml-1">+Meta</span>}
                          {hasRatingBonus && <span className="text-warning ml-1">+Rating</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Exportar Relatório
            </Button>
            <Button
              variant="outline"
              iconName="Mail"
              iconPosition="left"
              iconSize={16}
            >
              Enviar por Email
            </Button>
            <Button
              variant="outline"
              iconName="Printer"
              iconPosition="left"
              iconSize={16}
            >
              Imprimir
            </Button>
          </div>
        </div>
      )}

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

export default CommissionSettings;
import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServicesHeader = ({ filters, onFilterChange, onNewService, summaryMetrics, totalServices }) => {
  const categoryOptions = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'Cabelo', label: 'Cabelo' },
    { value: 'Unhas', label: 'Unhas' },
    { value: 'Estética', label: 'Estética' },
    { value: 'Bem-estar', label: 'Bem-estar' }
  ];

  const priceRangeOptions = [
    { value: 'all', label: 'Todas as Faixas' },
    { value: 'low', label: 'Até R$ 50' },
    { value: 'medium', label: 'R$ 50 - R$ 100' },
    { value: 'high', label: 'Acima de R$ 100' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' }
  ];

  const popularityOptions = [
    { value: 'all', label: 'Todas as Popularidades' },
    { value: 'high', label: 'Alta (90%+)' },
    { value: 'medium', label: 'Média (70-89%)' },
    { value: 'low', label: 'Baixa (<70%)' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6 mb-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Serviços</p>
              <p className="text-2xl font-bold text-foreground">
                {summaryMetrics.activeServices}/{summaryMetrics.totalServices}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(summaryMetrics.totalRevenue)}
              </p>
            </div>
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Preço Médio</p>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(summaryMetrics.averagePrice)}
              </p>
            </div>
            <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-info" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avaliação Média</p>
              <p className="text-2xl font-bold text-foreground">
                {summaryMetrics.averageRating.toFixed(1)}
                <span className="text-sm text-muted-foreground ml-1">⭐</span>
              </p>
            </div>
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={20} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        {/* Top Row - Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Catálogo de Serviços ({totalServices})
            </h2>
            <p className="text-sm text-muted-foreground">
              Gerencie seus serviços e configure preços
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              className="hidden sm:flex"
            >
              Exportar
            </Button>
            <Button
              variant="outline"
              iconName="BarChart3"
              iconPosition="left"
              iconSize={16}
              className="hidden sm:flex"
            >
              Relatórios
            </Button>
            <Button
              onClick={onNewService}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Novo Serviço
            </Button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar serviços, categoria ou descrição..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Price Range Filter */}
          <select
            value={filters.priceRange}
            onChange={(e) => onFilterChange({ priceRange: e.target.value })}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {priceRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters */}
        {(filters.search || filters.category !== 'all' || filters.priceRange !== 'all' || filters.status !== 'all' || filters.popularity !== 'all') && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Filtros ativos:</span>
            
            {filters.search && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <span>Busca: "{filters.search}"</span>
                <button
                  onClick={() => onFilterChange({ search: '' })}
                  className="hover:bg-primary/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {filters.category !== 'all' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <span>Categoria: {categoryOptions.find(c => c.value === filters.category)?.label}</span>
                <button
                  onClick={() => onFilterChange({ category: 'all' })}
                  className="hover:bg-primary/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {filters.priceRange !== 'all' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <span>Preço: {priceRangeOptions.find(p => p.value === filters.priceRange)?.label}</span>
                <button
                  onClick={() => onFilterChange({ priceRange: 'all' })}
                  className="hover:bg-primary/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {filters.status !== 'all' && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                <span>Status: {statusOptions.find(s => s.value === filters.status)?.label}</span>
                <button
                  onClick={() => onFilterChange({ status: 'all' })}
                  className="hover:bg-primary/20 rounded p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            <button
              onClick={() => onFilterChange({ 
                search: '', 
                category: 'all', 
                priceRange: 'all', 
                status: 'all',
                popularity: 'all'
              })}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Limpar todos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesHeader;
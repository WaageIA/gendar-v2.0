import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReservasHeader = ({ filters, onFilterChange, onNewReserva, totalReservas }) => {
  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'pending', label: 'Pendente' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Hoje' },
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mês' },
    { value: 'all', label: 'Todos os Períodos' }
  ];

  const serviceOptions = [
    { value: 'all', label: 'Todos os Serviços' },
    { value: 'Corte de Cabelo', label: 'Corte de Cabelo' },
    { value: 'Coloração', label: 'Coloração' },
    { value: 'Manicure', label: 'Manicure' },
    { value: 'Design de Sobrancelha', label: 'Design de Sobrancelha' },
    { value: 'Limpeza de Pele', label: 'Limpeza de Pele' },
    { value: 'Massagem Relaxante', label: 'Massagem Relaxante' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Top Row - Title and New Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Reservas ({totalReservas})
          </h2>
          <p className="text-sm text-muted-foreground">
            Filtre e gerencie suas reservas
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
            onClick={onNewReserva}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Nova Reserva
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Buscar cliente, email ou serviço..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

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

        {/* Date Range Filter */}
        <select
          value={filters.dateRange}
          onChange={(e) => onFilterChange({ dateRange: e.target.value })}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {dateRangeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Service Filter */}
        <select
          value={filters.service}
          onChange={(e) => onFilterChange({ service: e.target.value })}
          className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {serviceOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters */}
      {(filters.search || filters.status !== 'all' || filters.dateRange !== 'today' || filters.service !== 'all') && (
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
          
          {filters.dateRange !== 'today' && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <span>Período: {dateRangeOptions.find(d => d.value === filters.dateRange)?.label}</span>
              <button
                onClick={() => onFilterChange({ dateRange: 'today' })}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters.service !== 'all' && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <span>Serviço: {filters.service}</span>
              <button
                onClick={() => onFilterChange({ service: 'all' })}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          <button
            onClick={() => onFilterChange({ 
              search: '', 
              status: 'all', 
              dateRange: 'today', 
              service: 'all' 
            })}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Limpar todos
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservasHeader;
import React from 'react';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ filters, onFiltersChange, appointments }) => {
  // Get unique values for filter options
  const getUniqueValues = (key) => {
    const uniqueValues = [...new Set(appointments?.map(apt => 
      key === 'providerName' ? apt?.providerName : apt?.[key]
    ))]?.filter(Boolean);
    
    return uniqueValues?.map(value => ({ 
      value, 
      label: value?.charAt(0)?.toUpperCase() + value?.slice(1) 
    }));
  };

  const serviceTypes = [
    { value: 'cabelo', label: 'Cabelo' },
    { value: 'unhas', label: 'Unhas' },
    { value: 'massagem', label: 'Massagem' },
    { value: 'estetica', label: 'Estética' },
    { value: 'barba', label: 'Barba' },
    { value: 'sobrancelha', label: 'Sobrancelha' }
  ];

  const dateRanges = [
    { value: 'all', label: 'Todos os Períodos' },
    { value: 'week', label: 'Última Semana' },
    { value: 'month', label: 'Último Mês' },
    { value: '3months', label: 'Últimos 3 Meses' },
    { value: '6months', label: 'Últimos 6 Meses' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'completed', label: 'Concluído' },
    { value: 'scheduled', label: 'Agendado' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'noshow', label: 'Não Compareceu' }
  ];

  const providers = [
    { value: 'all', label: 'Todos os Profissionais' },
    ...getUniqueValues('providerName')
  ];

  const handleFilterChange = (filterKey, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
      {/* Date Range */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">
          Período
        </label>
        <Select
          options={dateRanges}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          placeholder="Selecione o período"
        />
      </div>

      {/* Service Type */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">
          Tipo de Serviço
        </label>
        <Select
          options={[
            { value: 'all', label: 'Todos os Serviços' },
            ...serviceTypes
          ]}
          value={filters?.serviceType}
          onChange={(value) => handleFilterChange('serviceType', value)}
          placeholder="Selecione o serviço"
        />
      </div>

      {/* Provider */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">
          Profissional
        </label>
        <Select
          options={providers}
          value={filters?.provider}
          onChange={(value) => handleFilterChange('provider', value)}
          placeholder="Selecione o profissional"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">
          Status
        </label>
        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Selecione o status"
        />
      </div>
    </div>
  );
};

export default FilterPanel;
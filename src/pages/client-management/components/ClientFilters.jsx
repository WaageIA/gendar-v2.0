import React from 'react';
import Select from '../../../components/ui/Select';

const ClientFilters = ({ filters, onChange }) => {
  const handleFilterChange = (key, value) => {
    onChange?.({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="min-w-[140px]">
        <Select
          value={filters?.status || 'all'}
          onChange={(value) => handleFilterChange('status', value)}
          options={[
            { value: 'all', label: 'Todos Status' },
            { value: 'ativo', label: 'Ativo' },
            { value: 'inativo', label: 'Inativo' },
            { value: 'pendente', label: 'Pendente' }
          ]}
        />
      </div>

      <div className="min-w-[160px]">
        <Select
          value={filters?.serviceCategory || 'all'}
          onChange={(value) => handleFilterChange('serviceCategory', value)}
          options={[
            { value: 'all', label: 'Todos Serviços' },
            { value: 'corte', label: 'Corte' },
            { value: 'coloração', label: 'Coloração' },
            { value: 'tratamento', label: 'Tratamento' },
            { value: 'manicure', label: 'Manicure' },
            { value: 'pedicure', label: 'Pedicure' },
            { value: 'design de sobrancelha', label: 'Design Sobrancelha' }
          ]}
        />
      </div>

      <div className="min-w-[150px]">
        <Select
          value={filters?.appointmentFrequency || 'all'}
          onChange={(value) => handleFilterChange('appointmentFrequency', value)}
          options={[
            { value: 'all', label: 'Frequência' },
            { value: 'high', label: 'Alta (>10)' },
            { value: 'medium', label: 'Média (5-10)' },
            { value: 'low', label: 'Baixa (<5)' },
            { value: 'new', label: 'Novos Clientes' }
          ]}
        />
      </div>
    </div>
  );
};

export default ClientFilters;
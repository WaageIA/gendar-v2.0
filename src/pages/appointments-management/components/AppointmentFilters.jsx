import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AppointmentFilters = ({
    filters,
    searchQuery,
    onFiltersChange,
    onSearchChange,
    onNewAppointment
}) => {
    const handleFilterChange = (key, value) => {
        onFiltersChange(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const statusOptions = [
        { value: 'all', label: 'Todos os Status' },
        { value: 'confirmed', label: 'Confirmados' },
        { value: 'pending', label: 'Pendentes' },
        { value: 'cancelled', label: 'Cancelados' },
        { value: 'completed', label: 'Concluídos' }
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

    const dateRangeOptions = [
        { value: 'today', label: 'Hoje' },
        { value: 'tomorrow', label: 'Amanhã' },
        { value: 'week', label: 'Próximos 7 dias' },
        { value: 'all', label: 'Todos os períodos' }
    ];

    const professionalOptions = [
        { value: 'all', label: 'Todos os Profissionais' },
        { value: 'Ana Souza', label: 'Ana Souza' },
        { value: 'Carla Lima', label: 'Carla Lima' },
        { value: 'Beatriz Santos', label: 'Beatriz Santos' },
        { value: 'Daniela Costa', label: 'Daniela Costa' },
        { value: 'Mariana Alves', label: 'Mariana Alves' },
        { value: 'João Barbosa', label: 'João Barbosa' }
    ];

    return (
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <Icon
                            name="Search"
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                            type="text"
                            placeholder="Buscar por cliente, telefone ou serviço..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3">
                        {/* Status Filter */}
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Service Filter */}
                        <select
                            value={filters.service}
                            onChange={(e) => handleFilterChange('service', e.target.value)}
                            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            {serviceOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Date Range Filter */}
                        <select
                            value={filters.dateRange}
                            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            {dateRangeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Professional Filter */}
                        <select
                            value={filters.professional}
                            onChange={(e) => handleFilterChange('professional', e.target.value)}
                            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            {professionalOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => {
                            onFiltersChange({
                                status: 'all',
                                service: 'all',
                                dateRange: 'today',
                                professional: 'all'
                            });
                            onSearchChange('');
                        }}
                        iconName="RotateCcw"
                        iconPosition="left"
                        iconSize={16}
                    >
                        Limpar Filtros
                    </Button>

                    <Button
                        onClick={onNewAppointment}
                        iconName="Plus"
                        iconPosition="left"
                        iconSize={16}
                    >
                        Novo Agendamento
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentFilters;
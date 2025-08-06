import React from 'react';
import ServiceCard from './ServiceCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServicesGrid = ({ 
  services, 
  onServiceClick, 
  onEditService, 
  onViewDashboard,
  onStatusChange, 
  onPromoteService 
}) => {
  if (services.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Icon name="Briefcase" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Nenhum serviço encontrado
        </h3>
        <p className="text-muted-foreground mb-6">
          Não há serviços que correspondam aos filtros selecionados.
        </p>
        <Button variant="outline">
          Limpar Filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onServiceClick={onServiceClick}
          onEditService={onEditService}
          onViewDashboard={onViewDashboard}
          onStatusChange={onStatusChange}
          onPromoteService={onPromoteService}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
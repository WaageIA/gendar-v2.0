import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServiceCard = ({ 
  service, 
  onServiceClick, 
  onEditService, 
  onViewDashboard,
  onStatusChange, 
  onPromoteService 
}) => {
  const [showActions, setShowActions] = useState(false);

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

  const getStatusBadge = (status) => {
    const config = {
      active: { color: 'bg-success/10 text-success border-success/20', label: 'Ativo' },
      inactive: { color: 'bg-error/10 text-error border-error/20', label: 'Inativo' }
    };
    
    const statusConfig = config[status] || config.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
        {statusConfig.label}
      </span>
    );
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Cabelo': return 'text-purple-600 bg-purple-100';
      case 'Unhas': return 'text-pink-600 bg-pink-100';
      case 'Estética': return 'text-blue-600 bg-blue-100';
      case 'Bem-estar': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 90) return 'text-success';
    if (popularity >= 70) return 'text-warning';
    return 'text-error';
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Overlay with Actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onServiceClick(service)}
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
            >
              Ver
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEditService(service)}
              iconName="Edit"
              iconPosition="left"
              iconSize={14}
            >
              Editar
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onViewDashboard(service)}
              iconName="BarChart3"
              iconPosition="left"
              iconSize={14}
            >
              Analytics
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {getStatusBadge(service.status)}
        </div>

        {/* Promoted Badge */}
        {service.isPromoted && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-warning text-warning-foreground rounded-full text-xs font-medium">
              ⭐ Destaque
            </span>
          </div>
        )}
      </div>

      {/* Service Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <button
              onClick={() => onServiceClick(service)}
              className="text-left hover:text-primary transition-colors"
            >
              <h3 className="font-semibold text-foreground text-lg leading-tight mb-1">
                {service.name}
              </h3>
            </button>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {service.description}
            </p>
          </div>
        </div>

        {/* Category and Duration */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getCategoryColor(service.category)}`}>
              <Icon name={getCategoryIcon(service.category)} size={12} />
            </div>
            <span className="text-sm text-muted-foreground">{service.category}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span className="text-sm">{formatDuration(service.duration)}</span>
          </div>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(service.price)}
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning" />
            <span className="text-sm font-medium text-foreground">
              {service.averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({service.totalBookings})
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              {service.totalBookings}
            </div>
            <div className="text-xs text-muted-foreground">Reservas</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              {formatCurrency(service.revenue)}
            </div>
            <div className="text-xs text-muted-foreground">Receita</div>
          </div>
          <div className="text-center">
            <div className={`text-sm font-medium ${getPopularityColor(service.popularity)}`}>
              {service.popularity}%
            </div>
            <div className="text-xs text-muted-foreground">Popular.</div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
              >
                {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                +{service.features.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Professionals */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {service.professionals.length} profissional{service.professionals.length !== 1 ? 'is' : ''}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusChange(service.id, service.status === 'active' ? 'inactive' : 'active')}
            className="flex-1"
            iconName={service.status === 'active' ? 'PauseCircle' : 'PlayCircle'}
            iconPosition="left"
            iconSize={14}
          >
            {service.status === 'active' ? 'Desativar' : 'Ativar'}
          </Button>
          <Button
            variant={service.isPromoted ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPromoteService(service.id)}
            iconName="Star"
            iconSize={14}
            title={service.isPromoted ? 'Remover destaque' : 'Promover serviço'}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
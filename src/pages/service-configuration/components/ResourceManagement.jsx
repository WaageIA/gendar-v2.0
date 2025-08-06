import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import ResourceModal from './ResourceModal';

const ResourceManagement = ({ resources, setResources, categories }) => {
  const [resourceModal, setResourceModal] = useState({
    isOpen: false,
    resource: null,
    mode: 'view'
  });

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    type: 'all'
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status) => {
    const config = {
      available: { color: 'bg-success/10 text-success border-success/20', label: 'Disponível' },
      maintenance: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Manutenção' },
      unavailable: { color: 'bg-error/10 text-error border-error/20', label: 'Indisponível' }
    };
    
    const statusConfig = config[status] || config.available;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
        {statusConfig.label}
      </span>
    );
  };

  const getCategoryIcon = (type) => {
    switch (type) {
      case 'Cabelo': return 'Scissors';
      case 'Unhas': return 'Hand';
      case 'Estética': return 'Sparkles';
      case 'Bem-estar': return 'Heart';
      default: return 'Package';
    }
  };

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         resource.location.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = filters.category === 'all' || resource.category === filters.category;
    const matchesStatus = filters.status === 'all' || resource.status === filters.status;
    const matchesType = filters.type === 'all' || resource.type === filters.type;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesType;
  });

  const handleNewResource = () => {
    setResourceModal({
      isOpen: true,
      resource: {
        name: '',
        category: 'Equipamento',
        type: 'Cabelo',
        status: 'available',
        quantity: 1,
        cost: 0,
        maintenanceDate: '',
        location: '',
        notes: ''
      },
      mode: 'create'
    });
  };

  const handleEditResource = (resource) => {
    setResourceModal({
      isOpen: true,
      resource,
      mode: 'edit'
    });
  };

  const handleViewResource = (resource) => {
    setResourceModal({
      isOpen: true,
      resource,
      mode: 'view'
    });
  };

  const handleSaveResource = (resourceData) => {
    if (resourceModal.mode === 'create') {
      const newResource = {
        ...resourceData,
        id: Date.now().toString()
      };
      setResources(prev => [...prev, newResource]);
    } else {
      setResources(prev => 
        prev.map(r => r.id === resourceData.id ? resourceData : r)
      );
    }
    setResourceModal({ isOpen: false, resource: null, mode: 'view' });
  };

  const handleDeleteResource = (resourceId) => {
    if (window.confirm('Tem certeza que deseja excluir este recurso? Esta ação não pode ser desfeita.')) {
      setResources(prev => prev.filter(r => r.id !== resourceId));
      setResourceModal({ isOpen: false, resource: null, mode: 'view' });
    }
  };

  const handleStatusChange = (resourceId, newStatus) => {
    setResources(prev => 
      prev.map(r => r.id === resourceId ? { ...r, status: newStatus } : r)
    );
  };

  const categoryOptions = ['Equipamento', 'Ferramenta', 'Produto', 'Mobiliário'];
  const statusOptions = ['available', 'maintenance', 'unavailable'];

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Recursos e Equipamentos ({filteredResources.length})
            </h2>
            <p className="text-sm text-muted-foreground">
              Gerencie equipamentos, ferramentas e recursos necessários
            </p>
          </div>
          <Button
            onClick={handleNewResource}
            iconName="Package"
            iconPosition="left"
            iconSize={16}
          >
            Novo Recurso
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todas as Categorias</option>
            {categoryOptions.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos os Tipos</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos os Status</option>
            <option value="available">Disponível</option>
            <option value="maintenance">Manutenção</option>
            <option value="unavailable">Indisponível</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Recursos</p>
              <p className="text-2xl font-bold text-foreground">
                {resources.length}
              </p>
            </div>
            <Icon name="Package" size={24} className="text-primary" />
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Disponíveis</p>
              <p className="text-2xl font-bold text-success">
                {resources.filter(r => r.status === 'available').length}
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Em Manutenção</p>
              <p className="text-2xl font-bold text-warning">
                {resources.filter(r => r.status === 'maintenance').length}
              </p>
            </div>
            <Icon name="AlertTriangle" size={24} className="text-warning" />
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(resources.reduce((sum, r) => sum + (r.cost * r.quantity), 0))}
              </p>
            </div>
            <Icon name="DollarSign" size={24} className="text-info" />
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={getCategoryIcon(resource.type)} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{resource.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.category} • {resource.type}
                  </p>
                </div>
              </div>
              {getStatusBadge(resource.status)}
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Quantidade:</span>
                <span className="font-medium text-foreground">{resource.quantity}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Custo unitário:</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(resource.cost)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Valor total:</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(resource.cost * resource.quantity)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Localização:</span>
                <span className="font-medium text-foreground">{resource.location}</span>
              </div>
            </div>

            {/* Maintenance Date */}
            {resource.maintenanceDate && (
              <div className="mb-4 p-2 bg-muted/50 rounded text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Próxima manutenção: {new Date(resource.maintenanceDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewResource(resource)}
                className="flex-1"
                iconName="Eye"
                iconPosition="left"
                iconSize={14}
              >
                Ver
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditResource(resource)}
                className="flex-1"
                iconName="Edit"
                iconPosition="left"
                iconSize={14}
              >
                Editar
              </Button>
              <Button
                variant={resource.status === 'available' ? 'outline' : 'default'}
                size="sm"
                onClick={() => handleStatusChange(resource.id, resource.status === 'available' ? 'maintenance' : 'available')}
                iconName={resource.status === 'available' ? 'AlertTriangle' : 'CheckCircle'}
                iconSize={14}
                title={resource.status === 'available' ? 'Marcar para manutenção' : 'Marcar como disponível'}
              />
            </div>

            {/* Notes */}
            {resource.notes && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">{resource.notes}</p>
              </div>
            )}
          </div>
        ))}

        {/* Add New Resource Card */}
        <div
          onClick={handleNewResource}
          className="bg-background border-2 border-dashed border-border rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center min-h-[280px]"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <Icon name="Plus" size={24} className="text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Novo Recurso</h3>
          <p className="text-sm text-muted-foreground text-center">
            Clique para adicionar um novo recurso ou equipamento
          </p>
        </div>
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && resources.length > 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhum recurso encontrado
          </h3>
          <p className="text-muted-foreground mb-6">
            Tente ajustar os filtros de busca
          </p>
          <Button 
            variant="outline"
            onClick={() => setFilters({ search: '', category: 'all', status: 'all', type: 'all' })}
          >
            Limpar Filtros
          </Button>
        </div>
      )}

      {filteredResources.length === 0 && resources.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhum recurso cadastrado
          </h3>
          <p className="text-muted-foreground mb-6">
            Comece adicionando os primeiros recursos e equipamentos
          </p>
          <Button onClick={handleNewResource} iconName="Package">
            Adicionar Primeiro Recurso
          </Button>
        </div>
      )}

      {/* Resource Modal */}
      <ResourceModal
        resource={resourceModal.resource}
        isOpen={resourceModal.isOpen}
        mode={resourceModal.mode}
        categories={categories}
        onClose={() => setResourceModal({ isOpen: false, resource: null, mode: 'view' })}
        onSave={handleSaveResource}
        onDelete={handleDeleteResource}
      />
    </div>
  );
};

export default ResourceManagement;
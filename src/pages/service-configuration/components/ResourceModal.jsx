import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResourceModal = ({ resource, isOpen, mode, categories, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Equipamento',
    type: 'Cabelo',
    status: 'available',
    quantity: 1,
    cost: 0,
    maintenanceDate: '',
    location: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (resource) {
      setFormData(resource);
    } else {
      setFormData({
        name: '',
        category: 'Equipamento',
        type: 'Cabelo',
        status: 'available',
        quantity: 1,
        cost: 0,
        maintenanceDate: '',
        location: '',
        notes: ''
      });
    }
    setErrors({});
  }, [resource, isOpen]);

  const categoryOptions = [
    { value: 'Equipamento', label: 'Equipamento', icon: 'Monitor' },
    { value: 'Ferramenta', label: 'Ferramenta', icon: 'Wrench' },
    { value: 'Produto', label: 'Produto', icon: 'ShoppingBag' },
    { value: 'Mobiliário', label: 'Mobiliário', icon: 'Armchair' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Disponível' },
    { value: 'maintenance', label: 'Em Manutenção' },
    { value: 'unavailable', label: 'Indisponível' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do recurso é obrigatório';
    }

    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (!formData.type) {
      newErrors.type = 'Tipo é obrigatório';
    }

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantidade deve ser maior que zero';
    }

    if (formData.cost < 0) {
      newErrors.cost = 'Custo não pode ser negativo';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Localização é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateMode && 'Novo Recurso'}
                {isEditMode && 'Editar Recurso'}
                {isViewMode && 'Detalhes do Recurso'}
              </h2>
              {resource?.id && (
                <p className="text-sm text-muted-foreground">
                  ID: {resource.id}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome do Recurso *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="Ex: Cadeira de Corte Profissional"
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-error text-sm mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Serviço *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="text-error text-sm mt-1">{errors.type}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantidade *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  disabled={isViewMode}
                  min="1"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
                {errors.quantity && (
                  <p className="text-error text-sm mt-1">{errors.quantity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Custo Unitário (R$)
                </label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
                  disabled={isViewMode}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
                {errors.cost && (
                  <p className="text-error text-sm mt-1">{errors.cost}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Valor Total
                </label>
                <div className="px-3 py-2 border border-border rounded-md bg-muted text-foreground">
                  {formatCurrency(formData.cost * formData.quantity)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Localização *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="Ex: Sala 1, Estação de Unhas"
                />
                {errors.location && (
                  <p className="text-error text-sm mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Próxima Manutenção
                </label>
                <input
                  type="date"
                  value={formData.maintenanceDate}
                  onChange={(e) => handleInputChange('maintenanceDate', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Observações
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                disabled={isViewMode}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                placeholder="Informações adicionais sobre o recurso..."
              />
            </div>

            {/* Summary (View Mode) */}
            {isViewMode && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">Resumo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Valor unitário:</span>
                    <div className="font-medium text-foreground">
                      {formatCurrency(formData.cost)}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Valor total:</span>
                    <div className="font-medium text-foreground">
                      {formatCurrency(formData.cost * formData.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div>
            {isViewMode && onDelete && (
              <Button
                variant="destructive"
                onClick={() => onDelete(resource.id)}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Excluir
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              {isViewMode ? 'Fechar' : 'Cancelar'}
            </Button>
            
            {!isViewMode && (
              <Button
                type="submit"
                onClick={handleSubmit}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                {isCreateMode ? 'Criar Recurso' : 'Salvar Alterações'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CategoryModal = ({ category, isOpen, mode, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Briefcase',
    color: 'blue',
    status: 'active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        name: '',
        description: '',
        icon: 'Briefcase',
        color: 'blue',
        status: 'active'
      });
    }
    setErrors({});
  }, [category, isOpen]);

  const iconOptions = [
    { value: 'Scissors', label: 'Tesoura', category: 'Cabelo' },
    { value: 'Hand', label: 'Mão', category: 'Unhas' },
    { value: 'Sparkles', label: 'Brilho', category: 'Estética' },
    { value: 'Heart', label: 'Coração', category: 'Bem-estar' },
    { value: 'Briefcase', label: 'Maleta', category: 'Geral' },
    { value: 'Star', label: 'Estrela', category: 'Premium' },
    { value: 'Zap', label: 'Raio', category: 'Rápido' },
    { value: 'Shield', label: 'Escudo', category: 'Proteção' },
    { value: 'Flower', label: 'Flor', category: 'Natural' },
    { value: 'Gem', label: 'Gema', category: 'Luxo' }
  ];

  const colorOptions = [
    { value: 'purple', label: 'Roxo', class: 'bg-purple-500' },
    { value: 'pink', label: 'Rosa', class: 'bg-pink-500' },
    { value: 'blue', label: 'Azul', class: 'bg-blue-500' },
    { value: 'green', label: 'Verde', class: 'bg-green-500' },
    { value: 'orange', label: 'Laranja', class: 'bg-orange-500' },
    { value: 'red', label: 'Vermelho', class: 'bg-red-500' },
    { value: 'yellow', label: 'Amarelo', class: 'bg-yellow-500' },
    { value: 'indigo', label: 'Índigo', class: 'bg-indigo-500' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome da categoria é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.icon) {
      newErrors.icon = 'Ícone é obrigatório';
    }

    if (!formData.color) {
      newErrors.color = 'Cor é obrigatória';
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

  const getCategoryColor = (color) => {
    const colors = {
      purple: 'text-purple-600 bg-purple-100 border-purple-200',
      pink: 'text-pink-600 bg-pink-100 border-pink-200',
      blue: 'text-blue-600 bg-blue-100 border-blue-200',
      green: 'text-green-600 bg-green-100 border-green-200',
      orange: 'text-orange-600 bg-orange-100 border-orange-200',
      red: 'text-red-600 bg-red-100 border-red-200',
      yellow: 'text-yellow-600 bg-yellow-100 border-yellow-200',
      indigo: 'text-indigo-600 bg-indigo-100 border-indigo-200'
    };
    return colors[color] || 'text-gray-600 bg-gray-100 border-gray-200';
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
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getCategoryColor(formData.color)}`}>
              <Icon name={formData.icon} size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateMode && 'Nova Categoria'}
                {isEditMode && 'Editar Categoria'}
                {isViewMode && 'Detalhes da Categoria'}
              </h2>
              {category?.id && (
                <p className="text-sm text-muted-foreground">
                  ID: {category.id}
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
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="Ex: Cabelo, Unhas, Estética..."
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descrição *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                disabled={isViewMode}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                placeholder="Descreva o tipo de serviços desta categoria..."
              />
              {errors.description && (
                <p className="text-error text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Visual Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Ícone *
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => !isViewMode && handleInputChange('icon', option.value)}
                      disabled={isViewMode}
                      className={`p-3 border rounded-lg flex items-center justify-center transition-colors ${
                        formData.icon === option.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      } ${isViewMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      title={option.label}
                    >
                      <Icon name={option.value} size={20} />
                    </button>
                  ))}
                </div>
                {errors.icon && (
                  <p className="text-error text-sm mt-1">{errors.icon}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Cor *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => !isViewMode && handleInputChange('color', option.value)}
                      disabled={isViewMode}
                      className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                        formData.color === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      } ${isViewMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      title={option.label}
                    >
                      <div className={`w-6 h-6 rounded-full ${option.class} mb-1`}></div>
                      <span className="text-xs text-foreground">{option.label}</span>
                    </button>
                  ))}
                </div>
                {errors.color && (
                  <p className="text-error text-sm mt-1">{errors.color}</p>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Preview</h3>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getCategoryColor(formData.color)}`}>
                  <Icon name={formData.icon} size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {formData.name || 'Nome da Categoria'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.description || 'Descrição da categoria'}
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics (View Mode Only) */}
            {isViewMode && category && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Estatísticas</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      {category.servicesCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Serviços</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      R$ {category.totalRevenue.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">Receita</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      R$ {category.averagePrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">Preço Médio</div>
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
                onClick={() => onDelete(category.id)}
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
                {isCreateMode ? 'Criar Categoria' : 'Salvar Alterações'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
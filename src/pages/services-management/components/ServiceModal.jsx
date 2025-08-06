import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServiceModal = ({ service, isOpen, mode, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Cabelo',
    price: 0,
    duration: 60,
    status: 'active',
    image: '',
    features: [],
    resources: [],
    professionals: [],
    commission: 15,
    costPrice: 0
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (service) {
      setFormData({
        ...service,
        features: service.features || [],
        resources: service.resources || [],
        professionals: service.professionals || []
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Cabelo',
        price: 0,
        duration: 60,
        status: 'active',
        image: '',
        features: [],
        resources: [],
        professionals: [],
        commission: 15,
        costPrice: 0
      });
    }
    setErrors({});
    setActiveTab('basic');
  }, [service, isOpen]);

  const categoryOptions = [
    { value: 'Cabelo', label: 'Cabelo', icon: 'Scissors' },
    { value: 'Unhas', label: 'Unhas', icon: 'Hand' },
    { value: 'Estética', label: 'Estética', icon: 'Sparkles' },
    { value: 'Bem-estar', label: 'Bem-estar', icon: 'Heart' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' }
  ];

  const availableProfessionals = [
    'Maria Silva',
    'Ana Costa',
    'Carla Oliveira',
    'Patricia Lima',
    'Juliana Santos',
    'Fernanda Rocha'
  ];

  const commonFeatures = [
    'Lavagem', 'Corte', 'Finalização', 'Consultoria',
    'Coloração', 'Tratamento', 'Secagem', 'Hidratação',
    'Cutilagem', 'Esmaltação', 'Decoração', 'Limpeza',
    'Massagem', 'Relaxamento', 'Análise', 'Modelagem'
  ];

  const commonResources = [
    'Cadeira de corte', 'Secador', 'Produtos profissionais',
    'Kit de manicure', 'Esmaltes', 'Produtos de hidratação',
    'Pinças profissionais', 'Cera', 'Produtos calmantes',
    'Maca de massagem', 'Óleos terapêuticos', 'Vapor facial'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayToggle = (field, item) => {
    const currentArray = formData[field] || [];
    if (currentArray.includes(item)) {
      setFormData(prev => ({
        ...prev,
        [field]: currentArray.filter(i => i !== item)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...currentArray, item]
      }));
    }
  };

  const handleAddCustomItem = (field, item) => {
    if (item.trim() && !formData[field].includes(item.trim())) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], item.trim()]
      }));
    }
  };

  const handleRemoveItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(i => i !== item)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do serviço é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duração deve ser maior que zero';
    }

    if (formData.costPrice < 0) {
      newErrors.costPrice = 'Custo não pode ser negativo';
    }

    if (formData.commission < 0 || formData.commission > 100) {
      newErrors.commission = 'Comissão deve estar entre 0% e 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Calculate margin
    const margin = formData.price > 0 ? ((formData.price - formData.costPrice) / formData.price) * 100 : 0;
    
    onSave({
      ...formData,
      margin: margin.toFixed(2)
    });
  };

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';

  const tabs = [
    { id: 'basic', label: 'Informações Básicas', icon: 'Info' },
    { id: 'details', label: 'Detalhes', icon: 'Settings' },
    { id: 'team', label: 'Equipe & Recursos', icon: 'Users' },
    { id: 'pricing', label: 'Preços & Comissões', icon: 'DollarSign' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {isCreateMode && 'Novo Serviço'}
              {isEditMode && 'Editar Serviço'}
              {isViewMode && 'Detalhes do Serviço'}
            </h2>
            {service?.id && (
              <p className="text-sm text-muted-foreground">
                ID: {service.id}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome do Serviço *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    placeholder="Ex: Corte de Cabelo Feminino"
                  />
                  {errors.name && (
                    <p className="text-error text-sm mt-1">{errors.name}</p>
                  )}
                </div>

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
                  placeholder="Descreva o serviço oferecido..."
                />
                {errors.description && (
                  <p className="text-error text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    disabled={isViewMode}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                  {errors.price && (
                    <p className="text-error text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Duração (min) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                    disabled={isViewMode}
                    min="1"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                  {errors.duration && (
                    <p className="text-error text-sm mt-1">{errors.duration}</p>
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
                  URL da Imagem
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md border border-border"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Características do Serviço
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                  {commonFeatures.map((feature) => (
                    <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleArrayToggle('features', feature)}
                        disabled={isViewMode}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-foreground">{feature}</span>
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center space-x-1"
                    >
                      <span>{feature}</span>
                      {!isViewMode && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('features', feature)}
                          className="hover:bg-primary/20 rounded p-0.5"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Profissionais Habilitados
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  {availableProfessionals.map((professional) => (
                    <label key={professional} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.professionals.includes(professional)}
                        onChange={() => handleArrayToggle('professionals', professional)}
                        disabled={isViewMode}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-foreground">{professional}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Recursos Necessários
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  {commonResources.map((resource) => (
                    <label key={resource} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.resources.includes(resource)}
                        onChange={() => handleArrayToggle('resources', resource)}
                        disabled={isViewMode}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-foreground">{resource}</span>
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.resources.map((resource) => (
                    <span
                      key={resource}
                      className="px-3 py-1 bg-info/10 text-info rounded-full text-sm flex items-center space-x-1"
                    >
                      <span>{resource}</span>
                      {!isViewMode && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('resources', resource)}
                          className="hover:bg-info/20 rounded p-0.5"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preço de Venda (R$)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    disabled={isViewMode}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Custo (R$)
                  </label>
                  <input
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) => handleInputChange('costPrice', parseFloat(e.target.value) || 0)}
                    disabled={isViewMode}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                  {errors.costPrice && (
                    <p className="text-error text-sm mt-1">{errors.costPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Comissão (%)
                  </label>
                  <input
                    type="number"
                    value={formData.commission}
                    onChange={(e) => handleInputChange('commission', parseFloat(e.target.value) || 0)}
                    disabled={isViewMode}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                  {errors.commission && (
                    <p className="text-error text-sm mt-1">{errors.commission}</p>
                  )}
                </div>
              </div>

              {/* Calculations */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">Cálculos Automáticos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Margem de Lucro</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formData.price > 0 ? (((formData.price - formData.costPrice) / formData.price) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lucro por Serviço</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatCurrency(formData.price - formData.costPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Comissão por Serviço</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatCurrency((formData.price * formData.commission) / 100)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div>
            {isViewMode && onDelete && (
              <Button
                variant="destructive"
                onClick={() => onDelete(service.id)}
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
                {isCreateMode ? 'Criar Serviço' : 'Salvar Alterações'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
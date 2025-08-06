import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfessionalModal = ({ professional, isOpen, mode, categories, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    specialties: [],
    status: 'active',
    commissionRate: 18.00,
    workSchedule: {
      monday: { start: '08:00', end: '18:00', active: true },
      tuesday: { start: '08:00', end: '18:00', active: true },
      wednesday: { start: '08:00', end: '18:00', active: true },
      thursday: { start: '08:00', end: '18:00', active: true },
      friday: { start: '08:00', end: '18:00', active: true },
      saturday: { start: '08:00', end: '16:00', active: true },
      sunday: { start: '00:00', end: '00:00', active: false }
    }
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (professional) {
      setFormData(professional);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        photo: '',
        specialties: [],
        status: 'active',
        commissionRate: 18.00,
        workSchedule: {
          monday: { start: '08:00', end: '18:00', active: true },
          tuesday: { start: '08:00', end: '18:00', active: true },
          wednesday: { start: '08:00', end: '18:00', active: true },
          thursday: { start: '08:00', end: '18:00', active: true },
          friday: { start: '08:00', end: '18:00', active: true },
          saturday: { start: '08:00', end: '16:00', active: true },
          sunday: { start: '00:00', end: '00:00', active: false }
        }
      });
    }
    setErrors({});
    setActiveTab('basic');
  }, [professional, isOpen]);

  const statusOptions = [
    { value: 'active', label: 'Ativo' },
    { value: 'inactive', label: 'Inativo' },
    { value: 'vacation', label: 'Férias' }
  ];

  const dayNames = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSpecialtyToggle = (specialty) => {
    const currentSpecialties = formData.specialties || [];
    if (currentSpecialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: currentSpecialties.filter(s => s !== specialty)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        specialties: [...currentSpecialties, specialty]
      }));
    }
  };

  const handleScheduleChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      workSchedule: {
        ...prev.workSchedule,
        [day]: {
          ...prev.workSchedule[day],
          [field]: value
        }
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (formData.specialties.length === 0) {
      newErrors.specialties = 'Selecione pelo menos uma especialidade';
    }

    if (formData.commissionRate < 0 || formData.commissionRate > 100) {
      newErrors.commissionRate = 'Comissão deve estar entre 0% e 100%';
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

  const tabs = [
    { id: 'basic', label: 'Informações Básicas', icon: 'User' },
    { id: 'specialties', label: 'Especialidades', icon: 'Star' },
    { id: 'schedule', label: 'Horários', icon: 'Clock' },
    { id: 'commission', label: 'Comissão', icon: 'DollarSign' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <img
              src={formData.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
              alt={formData.name || 'Profissional'}
              className="w-10 h-10 rounded-full object-cover border-2 border-border"
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {isCreateMode && 'Novo Profissional'}
                {isEditMode && 'Editar Profissional'}
                {isViewMode && 'Detalhes do Profissional'}
              </h2>
              {professional?.id && (
                <p className="text-sm text-muted-foreground">
                  ID: {professional.id}
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
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    placeholder="Digite o nome completo"
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
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    placeholder="email@exemplo.com"
                  />
                  {errors.email && (
                    <p className="text-error text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    placeholder="(11) 99999-9999"
                  />
                  {errors.phone && (
                    <p className="text-error text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  URL da Foto
                </label>
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => handleInputChange('photo', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="https://exemplo.com/foto.jpg"
                />
                {formData.photo && (
                  <div className="mt-2">
                    <img
                      src={formData.photo}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-full border border-border"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'specialties' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Especialidades *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center space-x-3 cursor-pointer p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.specialties.includes(category.name)}
                        onChange={() => handleSpecialtyToggle(category.name)}
                        disabled={isViewMode}
                        className="rounded border-gray-300"
                      />
                      <div className="flex items-center space-x-2">
                        <Icon name={category.icon} size={16} />
                        <span className="text-sm text-foreground">{category.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.specialties && (
                  <p className="text-error text-sm mt-1">{errors.specialties}</p>
                )}
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Especialidades Selecionadas</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                  {formData.specialties.length === 0 && (
                    <span className="text-sm text-muted-foreground">
                      Nenhuma especialidade selecionada
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Horários de Trabalho</h3>
                <div className="space-y-4">
                  {Object.entries(dayNames).map(([day, dayLabel]) => (
                    <div key={day} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                      <div className="w-32">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.workSchedule[day]?.active || false}
                            onChange={(e) => handleScheduleChange(day, 'active', e.target.checked)}
                            disabled={isViewMode}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm font-medium text-foreground">{dayLabel}</span>
                        </label>
                      </div>
                      
                      {formData.workSchedule[day]?.active && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={formData.workSchedule[day]?.start || '08:00'}
                            onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                            disabled={isViewMode}
                            className="px-2 py-1 border border-border rounded text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                          />
                          <span className="text-muted-foreground">às</span>
                          <input
                            type="time"
                            value={formData.workSchedule[day]?.end || '18:00'}
                            onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                            disabled={isViewMode}
                            className="px-2 py-1 border border-border rounded text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commission' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Taxa de Comissão (%) *
                </label>
                <input
                  type="number"
                  value={formData.commissionRate}
                  onChange={(e) => handleInputChange('commissionRate', parseFloat(e.target.value) || 0)}
                  disabled={isViewMode}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
                {errors.commissionRate && (
                  <p className="text-error text-sm mt-1">{errors.commissionRate}</p>
                )}
              </div>

              {/* Commission Calculator */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">Simulador de Comissão</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      {formatCurrency((100 * formData.commissionRate) / 100)}
                    </div>
                    <div className="text-xs text-muted-foreground">Serviço R$ 100</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      {formatCurrency((200 * formData.commissionRate) / 100)}
                    </div>
                    <div className="text-xs text-muted-foreground">Serviço R$ 200</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">
                      {formatCurrency((500 * formData.commissionRate) / 100)}
                    </div>
                    <div className="text-xs text-muted-foreground">Serviço R$ 500</div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics (View Mode Only) */}
              {isViewMode && professional && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-medium text-foreground mb-3">Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {professional.totalServices}
                      </div>
                      <div className="text-xs text-muted-foreground">Total de Serviços</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {formatCurrency(professional.totalRevenue)}
                      </div>
                      <div className="text-xs text-muted-foreground">Receita Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {formatCurrency((professional.totalRevenue * professional.commissionRate) / 100)}
                      </div>
                      <div className="text-xs text-muted-foreground">Comissão Total</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div>
            {isViewMode && onDelete && (
              <Button
                variant="destructive"
                onClick={() => onDelete(professional.id)}
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
                {isCreateMode ? 'Criar Profissional' : 'Salvar Alterações'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModal;
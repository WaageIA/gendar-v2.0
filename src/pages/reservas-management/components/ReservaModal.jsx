import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import StatusBadge from './StatusBadge';

const ReservaModal = ({ reserva, isOpen, mode, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    service: '',
    date: '',
    time: '',
    duration: 60,
    price: 0,
    status: 'pending',
    paymentStatus: 'pending',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (reserva) {
      setFormData({
        ...reserva,
        duration: reserva.duration || 60,
        price: reserva.price || 0
      });
    } else {
      setFormData({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        service: '',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        duration: 60,
        price: 0,
        status: 'pending',
        paymentStatus: 'pending',
        notes: ''
      });
    }
    setErrors({});
  }, [reserva, isOpen]);

  const serviceOptions = [
    { value: 'Corte de Cabelo', label: 'Corte de Cabelo', duration: 60, price: 45 },
    { value: 'Coloração', label: 'Coloração', duration: 120, price: 120 },
    { value: 'Manicure', label: 'Manicure', duration: 60, price: 35 },
    { value: 'Design de Sobrancelha', label: 'Design de Sobrancelha', duration: 45, price: 25 },
    { value: 'Limpeza de Pele', label: 'Limpeza de Pele', duration: 90, price: 80 },
    { value: 'Massagem Relaxante', label: 'Massagem Relaxante', duration: 60, price: 70 }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const paymentStatusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'paid', label: 'Pago' },
    { value: 'refunded', label: 'Reembolsado' },
    { value: 'failed', label: 'Falhou' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleServiceChange = (serviceName) => {
    const service = serviceOptions.find(s => s.value === serviceName);
    if (service) {
      setFormData(prev => ({
        ...prev,
        service: serviceName,
        duration: service.duration,
        price: service.price
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Nome do cliente é obrigatório';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Telefone é obrigatório';
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Email inválido';
    }

    if (!formData.service) {
      newErrors.service = 'Serviço é obrigatório';
    }

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }

    if (!formData.time) {
      newErrors.time = 'Horário é obrigatório';
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duração deve ser maior que 0';
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Preço deve ser maior ou igual a 0';
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
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
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {isCreateMode && 'Nova Reserva'}
              {isEditMode && 'Editar Reserva'}
              {isViewMode && 'Detalhes da Reserva'}
            </h2>
            {reserva?.id && (
              <p className="text-sm text-muted-foreground">
                ID: {reserva.id}
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                Informações do Cliente
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome do Cliente *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="Digite o nome do cliente"
                />
                {errors.clientName && (
                  <p className="text-error text-sm mt-1">{errors.clientName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="(11) 99999-9999"
                />
                {errors.clientPhone && (
                  <p className="text-error text-sm mt-1">{errors.clientPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  placeholder="cliente@email.com"
                />
                {errors.clientEmail && (
                  <p className="text-error text-sm mt-1">{errors.clientEmail}</p>
                )}
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                Informações do Serviço
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Serviço *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Selecione um serviço</option>
                  {serviceOptions.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label} - {formatPrice(service.price)}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-error text-sm mt-1">{errors.service}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Data *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                  {errors.date && (
                    <p className="text-error text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Horário *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                  {errors.time && (
                    <p className="text-error text-sm mt-1">{errors.time}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Duração (min) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
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
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    disabled={isViewMode}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                  />
                  {errors.price && (
                    <p className="text-error text-sm mt-1">{errors.price}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status and Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status da Reserva
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status do Pagamento
              </label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              >
                {paymentStatusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Observações
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              disabled={isViewMode}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              placeholder="Observações adicionais sobre a reserva..."
            />
          </div>

          {/* Current Status Display (View Mode) */}
          {isViewMode && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-3">Status Atual</h4>
              <StatusBadge 
                status={formData.status} 
                paymentStatus={formData.paymentStatus}
                size="default"
              />
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div>
            {isViewMode && onDelete && (
              <Button
                variant="destructive"
                onClick={() => onDelete(reserva.id)}
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
                {isCreateMode ? 'Criar Reserva' : 'Salvar Alterações'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservaModal;
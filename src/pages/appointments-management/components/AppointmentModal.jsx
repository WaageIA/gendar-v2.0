import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AppointmentModal = ({ 
  isOpen, 
  appointment, 
  onClose, 
  onSave, 
  onDelete 
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    service: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: 60,
    price: 0,
    status: 'pending',
    professional: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isEditMode = !!appointment;
  const isViewMode = isEditMode && appointment.status === 'completed';

  useEffect(() => {
    if (appointment) {
      setFormData({
        clientName: appointment.clientName || '',
        clientPhone: appointment.clientPhone || '',
        clientEmail: appointment.clientEmail || '',
        service: appointment.service || '',
        date: appointment.date || '',
        startTime: appointment.startTime || '',
        endTime: appointment.endTime || '',
        duration: appointment.duration || 60,
        price: appointment.price || 0,
        status: appointment.status || 'pending',
        professional: appointment.professional || '',
        notes: appointment.notes || ''
      });
    } else {
      setFormData({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        service: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:00',
        duration: 60,
        price: 0,
        status: 'pending',
        professional: '',
        notes: ''
      });
    }
    setErrors({});
  }, [appointment, isOpen]);

  const serviceOptions = [
    { value: 'Corte de Cabelo', label: 'Corte de Cabelo', duration: 60, price: 45 },
    { value: 'Coloração', label: 'Coloração', duration: 120, price: 120 },
    { value: 'Manicure', label: 'Manicure', duration: 60, price: 35 },
    { value: 'Design de Sobrancelha', label: 'Design de Sobrancelha', duration: 45, price: 25 },
    { value: 'Limpeza de Pele', label: 'Limpeza de Pele', duration: 90, price: 80 },
    { value: 'Massagem Relaxante', label: 'Massagem Relaxante', duration: 60, price: 70 }
  ];

  const professionalOptions = [
    'Ana Souza',
    'Carla Lima',
    'Beatriz Santos',
    'Daniela Costa',
    'Mariana Alves',
    'João Barbosa'
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'completed', label: 'Concluído' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleServiceChange = (serviceName) => {
    const service = serviceOptions.find(s => s.value === serviceName);
    if (service) {
      const startTime = formData.startTime || '09:00';
      const startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
      const endMinutes = startMinutes + service.duration;
      const endHours = Math.floor(endMinutes / 60);
      const endMins = endMinutes % 60;
      const endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

      setFormData(prev => ({
        ...prev,
        service: serviceName,
        duration: service.duration,
        price: service.price,
        endTime: endTime
      }));
    }
  };

  const handleTimeChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (field === 'startTime' && prev.duration) {
        const startMinutes = parseInt(value.split(':')[0]) * 60 + parseInt(value.split(':')[1]);
        const endMinutes = startMinutes + prev.duration;
        const endHours = Math.floor(endMinutes / 60);
        const endMins = endMinutes % 60;
        newData.endTime = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
      }
      
      return newData;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Nome do cliente é obrigatório';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Telefone é obrigatório';
    }

    if (!formData.service) {
      newErrors.service = 'Serviço é obrigatório';
    }

    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Horário de início é obrigatório';
    }

    if (!formData.professional) {
      newErrors.professional = 'Profissional é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      setLoading(true);
      try {
        await onDelete(appointment.id);
      } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {isEditMode ? 'Editar Agendamento' : 'Novo Agendamento'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome do Cliente *
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                disabled={isViewMode}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.clientName ? 'border-red-500' : 'border-border'
                }`}
                placeholder="Digite o nome do cliente"
              />
              {errors.clientName && (
                <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
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
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.clientPhone ? 'border-red-500' : 'border-border'
                }`}
                placeholder="(11) 99999-9999"
              />
              {errors.clientPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => handleInputChange('clientEmail', e.target.value)}
              disabled={isViewMode}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="cliente@email.com"
            />
          </div>

          {/* Service Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Serviço *
              </label>
              <select
                value={formData.service}
                onChange={(e) => handleServiceChange(e.target.value)}
                disabled={isViewMode}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.service ? 'border-red-500' : 'border-border'
                }`}
              >
                <option value="">Selecione um serviço</option>
                {serviceOptions.map(service => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-500 text-sm mt-1">{errors.service}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Profissional *
              </label>
              <select
                value={formData.professional}
                onChange={(e) => handleInputChange('professional', e.target.value)}
                disabled={isViewMode}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.professional ? 'border-red-500' : 'border-border'
                }`}
              >
                <option value="">Selecione um profissional</option>
                {professionalOptions.map(professional => (
                  <option key={professional} value={professional}>
                    {professional}
                  </option>
                ))}
              </select>
              {errors.professional && (
                <p className="text-red-500 text-sm mt-1">{errors.professional}</p>
              )}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Data *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                disabled={isViewMode}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.date ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Horário Início *
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => handleTimeChange('startTime', e.target.value)}
                disabled={isViewMode}
                className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.startTime ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Horário Fim
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Duration, Price and Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Duração (min)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="15"
                step="15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Preço (R$)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Observações
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              disabled={isViewMode}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Observações adicionais sobre o agendamento..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              {isEditMode && !isViewMode && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={loading}
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={16}
                >
                  Excluir
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                {isViewMode ? 'Fechar' : 'Cancelar'}
              </Button>
              
              {!isViewMode && (
                <Button
                  type="submit"
                  disabled={loading}
                  iconName={loading ? "Loader2" : "Save"}
                  iconPosition="left"
                  iconSize={16}
                  className={loading ? "animate-spin" : ""}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
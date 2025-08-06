import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AppointmentModal = ({ 
  appointment, 
  isOpen, 
  onClose, 
  onSave, 
  onDelete,
  mode = 'view' // 'view', 'edit', 'create'
}) => {
  const [formData, setFormData] = useState({
    clientName: appointment?.clientName || '',
    clientPhone: appointment?.clientPhone || '',
    clientEmail: appointment?.clientEmail || '',
    service: appointment?.service || '',
    date: appointment?.date || new Date()?.toISOString()?.split('T')?.[0],
    startTime: appointment?.startTime || '09:00',
    endTime: appointment?.endTime || '10:00',
    duration: appointment?.duration || 60,
    price: appointment?.price || 0,
    status: appointment?.status || 'pending',
    notes: appointment?.notes || ''
  });

  const [isEditing, setIsEditing] = useState(mode === 'create' || mode === 'edit');

  const services = [
    { value: 'corte-cabelo', label: 'Corte de Cabelo' },
    { value: 'coloracao', label: 'Coloração' },
    { value: 'manicure', label: 'Manicure' },
    { value: 'pedicure', label: 'Pedicure' },
    { value: 'sobrancelha', label: 'Design de Sobrancelha' },
    { value: 'massagem', label: 'Massagem Relaxante' },
    { value: 'limpeza-pele', label: 'Limpeza de Pele' },
    { value: 'depilacao', label: 'Depilação' }
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
  };

  const handleSave = () => {
    onSave({
      ...appointment,
      ...formData,
      id: appointment?.id || Date.now()?.toString()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (mode === 'create') {
      onClose();
    } else {
      setFormData({
        clientName: appointment?.clientName || '',
        clientPhone: appointment?.clientPhone || '',
        clientEmail: appointment?.clientEmail || '',
        service: appointment?.service || '',
        date: appointment?.date || new Date()?.toISOString()?.split('T')?.[0],
        startTime: appointment?.startTime || '09:00',
        endTime: appointment?.endTime || '10:00',
        duration: appointment?.duration || 60,
        price: appointment?.price || 0,
        status: appointment?.status || 'pending',
        notes: appointment?.notes || ''
      });
      setIsEditing(false);
    }
  };

  const formatTime = (timeStr) => {
    return new Date(`2000-01-01T${timeStr}`)?.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'cancelled': return 'text-error bg-error/10';
      case 'completed': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-300 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'create' ? 'Novo Agendamento' : isEditing ?'Editar Agendamento' : 'Detalhes do Agendamento'}
            </h2>
            {appointment && !isEditing && (
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(appointment?.status)}`}>
                <Icon name={appointment?.status === 'confirmed' ? 'CheckCircle' : 
                           appointment?.status === 'pending' ? 'Clock' :
                           appointment?.status === 'cancelled' ? 'XCircle' : 'Calendar'} size={12} />
                <span>{statusOptions?.find(s => s?.value === appointment?.status)?.label}</span>
              </div>
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
        <div className="p-6 space-y-6">
          {/* Client Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Informações do Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome do Cliente"
                type="text"
                value={formData?.clientName}
                onChange={(e) => handleInputChange('clientName', e?.target?.value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="Telefone"
                type="tel"
                value={formData?.clientPhone}
                onChange={(e) => handleInputChange('clientPhone', e?.target?.value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="E-mail"
                type="email"
                value={formData?.clientEmail}
                onChange={(e) => handleInputChange('clientEmail', e?.target?.value)}
                disabled={!isEditing}
                className="md:col-span-2"
              />
            </div>
          </div>

          {/* Service Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Informações do Serviço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Serviço"
                options={services}
                value={formData?.service}
                onChange={(value) => handleInputChange('service', value)}
                disabled={!isEditing}
                required
                className="md:col-span-2"
              />
              <Input
                label="Duração (minutos)"
                type="number"
                value={formData?.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e?.target?.value))}
                disabled={!isEditing}
                min="15"
                max="480"
              />
              <Input
                label="Preço (R$)"
                type="number"
                value={formData?.price}
                onChange={(e) => handleInputChange('price', parseFloat(e?.target?.value))}
                disabled={!isEditing}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Schedule Information */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Agendamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Data"
                type="date"
                value={formData?.date}
                onChange={(e) => handleInputChange('date', e?.target?.value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="Horário de Início"
                type="time"
                value={formData?.startTime}
                onChange={(e) => handleInputChange('startTime', e?.target?.value)}
                disabled={!isEditing}
                required
              />
              <Input
                label="Horário de Término"
                type="time"
                value={formData?.endTime}
                onChange={(e) => handleInputChange('endTime', e?.target?.value)}
                disabled={!isEditing}
                required
              />
            </div>
          </div>

          {/* Status */}
          {(isEditing || appointment) && (
            <div>
              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
                disabled={!isEditing}
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <Input
              label="Observações"
              type="text"
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              disabled={!isEditing}
              description="Informações adicionais sobre o agendamento"
            />
          </div>

          {/* Summary (View Mode) */}
          {!isEditing && appointment && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Resumo</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Data:</span>
                  <div className="font-medium text-foreground">
                    {new Date(appointment.date)?.toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Horário:</span>
                  <div className="font-medium text-foreground">
                    {formatTime(appointment?.startTime)} - {formatTime(appointment?.endTime)}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Duração:</span>
                  <div className="font-medium text-foreground">{appointment?.duration} min</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Valor:</span>
                  <div className="font-medium text-foreground">
                    R$ {appointment?.price?.toFixed(2)?.replace('.', ',')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div>
            {!isEditing && appointment && onDelete && (
              <Button
                variant="destructive"
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
                onClick={() => onDelete(appointment?.id)}
              >
                Excluir
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  onClick={handleSave}
                  iconName="Save"
                  iconPosition="left"
                  iconSize={16}
                >
                  Salvar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Fechar
                </Button>
                {appointment && (
                  <Button
                    variant="default"
                    onClick={() => setIsEditing(true)}
                    iconName="Edit"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Editar
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
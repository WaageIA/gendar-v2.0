import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ClientModal = ({ isOpen, onClose, client, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'ativo',
    preferredServices: [],
    notes: '',
    address: '',
    birthDate: '',
    gender: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (client) {
      setFormData({
        name: client?.name || '',
        email: client?.email || '',
        phone: client?.phone || '',
        status: client?.status || 'ativo',
        preferredServices: client?.preferredServices || [],
        notes: client?.notes || '',
        address: client?.address || '',
        birthDate: client?.birthDate || '',
        gender: client?.gender || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'ativo',
        preferredServices: [],
        notes: '',
        address: '',
        birthDate: '',
        gender: ''
      });
    }
    setErrors({});
  }, [client, isOpen]);

  const serviceOptions = [
    'corte',
    'coloração',
    'mechas',
    'tratamento',
    'manicure',
    'pedicure',
    'design de sobrancelha',
    'limpeza de pele',
    'massagem'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave?.(formData);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceToggle = (service) => {
    const currentServices = formData?.preferredServices || [];
    if (currentServices?.includes(service)) {
      setFormData({
        ...formData,
        preferredServices: currentServices?.filter(s => s !== service)
      });
    } else {
      setFormData({
        ...formData,
        preferredServices: [...currentServices, service]
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-500 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {client ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground mb-4">
                Informações Pessoais
              </h3>
              
              <div>
                <Input
                  label="Nome Completo"
                  value={formData?.name}
                  onChange={(e) => setFormData({...formData, name: e?.target?.value})}
                  error={errors?.name}
                  required
                />
              </div>

              <div>
                <Input
                  label="Email"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => setFormData({...formData, email: e?.target?.value})}
                  error={errors?.email}
                  required
                />
              </div>

              <div>
                <Input
                  label="Telefone"
                  value={formData?.phone}
                  onChange={(e) => setFormData({...formData, phone: e?.target?.value})}
                  error={errors?.phone}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div>
                <Input
                  label="Data de Nascimento"
                  type="date"
                  value={formData?.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e?.target?.value})}
                />
              </div>

              <div>
                <Select
                  label="Gênero"
                  value={formData?.gender}
                  onChange={(value) => setFormData({...formData, gender: value})}
                  options={[
                    { value: '', label: 'Selecionar...' },
                    { value: 'feminino', label: 'Feminino' },
                    { value: 'masculino', label: 'Masculino' },
                    { value: 'outro', label: 'Outro' },
                    { value: 'nao_informar', label: 'Prefiro não informar' }
                  ]}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground mb-4">
                Informações Adicionais
              </h3>

              <div>
                <Input
                  label="Endereço"
                  value={formData?.address}
                  onChange={(e) => setFormData({...formData, address: e?.target?.value})}
                  placeholder="Endereço completo"
                />
              </div>

              <div>
                <Select
                  label="Status"
                  value={formData?.status}
                  onChange={(value) => setFormData({...formData, status: value})}
                  options={[
                    { value: 'ativo', label: 'Ativo' },
                    { value: 'inativo', label: 'Inativo' },
                    { value: 'pendente', label: 'Pendente' }
                  ]}
                />
              </div>

              {/* Preferred Services */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Serviços Preferidos
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-border rounded-lg p-3">
                  {serviceOptions?.map((service) => (
                    <label key={service} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData?.preferredServices?.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-foreground capitalize">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Observações
                </label>
                <textarea
                  value={formData?.notes}
                  onChange={(e) => setFormData({...formData, notes: e?.target?.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Observações sobre o cliente..."
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={loading}
              iconName="Save"
            >
              {client ? 'Atualizar Cliente' : 'Salvar Cliente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;
import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServicesToggle = () => {
  // Mock services data - em produção viria da seção de serviços
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Corte de Cabelo Feminino',
      description: 'Corte personalizado com consultoria de estilo e finalização profissional',
      category: 'Cabelo',
      price: 45.00,
      duration: 60,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      isOnlineBookingEnabled: true,
      onlineOrder: 1
    },
    {
      id: '2',
      name: 'Coloração Completa',
      description: 'Coloração profissional com produtos de alta qualidade e tratamento pós-cor',
      category: 'Cabelo',
      price: 120.00,
      duration: 120,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400',
      isOnlineBookingEnabled: true,
      onlineOrder: 4
    },
    {
      id: '3',
      name: 'Manicure Completa',
      description: 'Cuidado completo das unhas com cutilagem, hidratação e esmaltação',
      category: 'Unhas',
      price: 35.00,
      duration: 60,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
      isOnlineBookingEnabled: true,
      onlineOrder: 5
    },
    {
      id: '4',
      name: 'Design de Sobrancelha',
      description: 'Modelagem e design personalizado de sobrancelhas com técnicas modernas',
      category: 'Estética',
      price: 25.00,
      duration: 45,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400',
      isOnlineBookingEnabled: false,
      onlineOrder: null
    },
    {
      id: '5',
      name: 'Limpeza de Pele',
      description: 'Tratamento facial completo com limpeza profunda e hidratação',
      category: 'Estética',
      price: 80.00,
      duration: 90,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
      isOnlineBookingEnabled: false,
      onlineOrder: null
    },
    {
      id: '6',
      name: 'Massagem Relaxante',
      description: 'Massagem terapêutica para alívio do estresse e tensões musculares',
      category: 'Bem-estar',
      price: 70.00,
      duration: 60,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      isOnlineBookingEnabled: false,
      onlineOrder: null
    },
    {
      id: '7',
      name: 'Pedicure Spa',
      description: 'Tratamento completo dos pés com hidratação e relaxamento',
      category: 'Unhas',
      price: 40.00,
      duration: 50,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400',
      isOnlineBookingEnabled: true,
      onlineOrder: 6
    },
    {
      id: '8',
      name: 'Escova Progressiva',
      description: 'Tratamento alisante com produtos de alta qualidade e durabilidade',
      category: 'Cabelo',
      price: 150.00,
      duration: 180,
      status: 'inactive',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400',
      isOnlineBookingEnabled: false,
      onlineOrder: null
    }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);

  const handleToggleOnlineBooking = (serviceId) => {
    setServices(prev => prev.map(service => {
      if (service.id === serviceId) {
        const isEnabled = !service.isOnlineBookingEnabled;
        return {
          ...service,
          isOnlineBookingEnabled: isEnabled,
          onlineOrder: isEnabled ? getNextOrder() : null
        };
      }
      return service;
    }));
  };

  const getNextOrder = () => {
    const enabledServices = services.filter(s => s.isOnlineBookingEnabled);
    return enabledServices.length > 0 ? Math.max(...enabledServices.map(s => s.onlineOrder)) + 1 : 1;
  };

  const handleDragStart = (e, service) => {
    setDraggedItem(service);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetService) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetService.id || !draggedItem.isOnlineBookingEnabled || !targetService.isOnlineBookingEnabled) {
      return;
    }

    const draggedOrder = draggedItem.onlineOrder;
    const targetOrder = targetService.onlineOrder;

    setServices(prev => prev.map(service => {
      if (service.id === draggedItem.id) {
        return { ...service, onlineOrder: targetOrder };
      }
      if (service.id === targetService.id) {
        return { ...service, onlineOrder: draggedOrder };
      }
      return service;
    }));

    setDraggedItem(null);
  };

  const handleSave = () => {
    // Aqui salvaria as configurações
    console.log('Salvando configurações de serviços online:', services);
    // Mostrar toast de sucesso
  };

  const activeServices = services.filter(s => s.status === 'active');
  const enabledServices = activeServices.filter(s => s.isOnlineBookingEnabled).sort((a, b) => a.onlineOrder - b.onlineOrder);
  const disabledServices = activeServices.filter(s => !s.isOnlineBookingEnabled);
  const inactiveServices = services.filter(s => s.status === 'inactive');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Configuração de Serviços Online
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {enabledServices.length} de {activeServices.length} serviços disponíveis para agendamento online
          </p>
        </div>
        <Button onClick={handleSave}>
          <Icon name="Save" size={16} className="mr-2" />
          Salvar Configurações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Serviços Habilitados */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Disponíveis Online
            </h3>
            <span className="text-sm text-muted-foreground">
              {enabledServices.length} serviços
            </span>
          </div>
          
          <div className="space-y-3">
            {enabledServices.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Calendar" size={48} className="mx-auto mb-3 opacity-50" />
                <p>Nenhum serviço habilitado para agendamento online</p>
                <p className="text-sm">Ative serviços na lista ao lado</p>
              </div>
            ) : (
              enabledServices.map((service, index) => (
                <div
                  key={service.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, service)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, service)}
                  className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg cursor-move hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-medium">
                    {service.onlineOrder}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{service.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{service.category}</span>
                      <span>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(service.price)}
                      </span>
                      <span>{service.duration}min</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleOnlineBooking(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {enabledServices.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Dica:</p>
                  <p>Arraste os serviços para reordenar como aparecem na interface pública</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Serviços Desabilitados */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Serviços Disponíveis
            </h3>
            <span className="text-sm text-muted-foreground">
              {disabledServices.length} inativos
            </span>
          </div>
          
          <div className="space-y-3">
            {disabledServices.map((service) => (
              <div
                key={service.id}
                className="flex items-center space-x-3 p-3 bg-muted/50 border border-border rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{service.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{service.category}</span>
                    <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(service.price)}
                    </span>
                    <span>{service.duration}min</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleOnlineBooking(service.id)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            ))}

            {inactiveServices.length > 0 && (
              <>
                <div className="border-t border-border pt-4 mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    Serviços Inativos ({inactiveServices.length})
                  </h4>
                </div>
                {inactiveServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg opacity-60"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{service.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{service.category}</span>
                        <span>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(service.price)}
                        </span>
                        <span>{service.duration}min</span>
                        <span className="text-red-600 font-medium">Inativo</span>
                      </div>
                    </div>
                    <Icon name="Lock" size={16} className="text-red-600" />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Resumo da Configuração
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{enabledServices.length}</div>
            <div className="text-sm text-green-800">Online</div>
          </div>
          <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{disabledServices.length}</div>
            <div className="text-sm text-gray-800">Disponíveis</div>
          </div>
          <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{inactiveServices.length}</div>
            <div className="text-sm text-red-800">Inativos</div>
          </div>
          <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{services.length}</div>
            <div className="text-sm text-blue-800">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesToggle;
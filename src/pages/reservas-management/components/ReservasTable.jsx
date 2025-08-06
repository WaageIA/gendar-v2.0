import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import StatusBadge from './StatusBadge';

const ReservasTable = ({ reservas, onReservaClick, onEditReserva, onStatusChange }) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedReservas = [...reservas].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle date and time sorting
    if (sortField === 'date') {
      aValue = new Date(`${a.date} ${a.time}`);
      bValue = new Date(`${b.date} ${b.time}`);
    }

    // Handle price sorting
    if (sortField === 'price') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    // Handle string sorting
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatTime = (time) => {
    return time;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleStatusChange = (reservaId, currentStatus, event) => {
    event.stopPropagation();
    
    const statusOptions = [
      { value: 'pending', label: 'Pendente' },
      { value: 'confirmed', label: 'Confirmado' },
      { value: 'completed', label: 'Concluído' },
      { value: 'cancelled', label: 'Cancelado' }
    ];

    const nextStatusIndex = statusOptions.findIndex(s => s.value === currentStatus) + 1;
    const nextStatus = statusOptions[nextStatusIndex % statusOptions.length];
    
    onStatusChange(reservaId, nextStatus.value);
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          <Icon 
            name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  if (reservas.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Nenhuma reserva encontrada
        </h3>
        <p className="text-muted-foreground mb-6">
          Não há reservas que correspondam aos filtros selecionados.
        </p>
        <Button variant="outline">
          Limpar Filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <SortableHeader field="clientName">Cliente</SortableHeader>
              <SortableHeader field="service">Serviço</SortableHeader>
              <SortableHeader field="date">Data/Hora</SortableHeader>
              <SortableHeader field="price">Valor</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedReservas.map((reserva) => (
              <tr 
                key={reserva.id}
                className="hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onReservaClick(reserva)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {reserva.clientName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {reserva.clientEmail}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {reserva.clientPhone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{reserva.service}</div>
                  <div className="text-sm text-muted-foreground">
                    {reserva.duration} min
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">
                    {formatDate(reserva.date)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(reserva.time)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {formatPrice(reserva.price)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge 
                    status={reserva.status} 
                    paymentStatus={reserva.paymentStatus}
                    size="sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditReserva(reserva);
                      }}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleStatusChange(reserva.id, reserva.status, e)}
                    >
                      <Icon name="RotateCcw" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedReservas.map((reserva) => (
          <div 
            key={reserva.id}
            className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => onReservaClick(reserva)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  {reserva.clientName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {reserva.service}
                </p>
              </div>
              <StatusBadge 
                status={reserva.status} 
                paymentStatus={reserva.paymentStatus}
                size="sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Data:</span>
                <div className="text-foreground">
                  {formatDate(reserva.date)} às {formatTime(reserva.time)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Valor:</span>
                <div className="text-foreground font-medium">
                  {formatPrice(reserva.price)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="text-sm text-muted-foreground">
                {reserva.clientPhone}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditReserva(reserva);
                  }}
                  iconName="Edit"
                  iconPosition="left"
                  iconSize={14}
                >
                  Editar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservasTable;
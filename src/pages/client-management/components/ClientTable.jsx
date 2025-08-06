import React, { useState, useMemo } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ClientTable = ({ 
  clients = [], 
  loading = false, 
  onEdit, 
  onDelete, 
  onBulkAction, 
  onAddClient 
}) => {
  const [selectedClients, setSelectedClients] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedClients(clients?.map(client => client?.id) || []);
    } else {
      setSelectedClients([]);
    }
  };

  const handleSelectClient = (clientId, checked) => {
    if (checked) {
      setSelectedClients([...selectedClients, clientId]);
    } else {
      setSelectedClients(selectedClients?.filter(id => id !== clientId));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedClients = React.useMemo(() => {
    return [...(clients || [])]?.sort((a, b) => {
      let aVal = a?.[sortField];
      let bVal = b?.[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal?.toLowerCase();
        bVal = bVal?.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [clients, sortField, sortDirection]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      ativo: { color: 'bg-green-100 text-green-800', label: 'Ativo' },
      inativo: { color: 'bg-red-100 text-red-800', label: 'Inativo' },
      pendente: { color: 'bg-yellow-100 text-yellow-800', label: 'Pendente' }
    };

    const config = statusConfig?.[status] || statusConfig?.ativo;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin mx-auto mb-4">
          <Icon name="Loader2" size={32} />
        </div>
        <p className="text-muted-foreground">Carregando clientes...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Table Header Actions */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            Clientes ({clients?.length || 0})
          </h2>
          {selectedClients?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedClients?.length} selecionados
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction?.('email', selectedClients)}
                iconName="Mail"
              >
                Enviar Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction?.('export', selectedClients)}
                iconName="Download"
              >
                Exportar
              </Button>
            </div>
          )}
        </div>
        <Button 
          onClick={onAddClient}
          iconName="UserPlus"
          iconPosition="left"
        >
          Novo Cliente
        </Button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedClients?.length === clients?.length && clients?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-gray-300"
                />
              </th>
              <th 
                className="p-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Nome
                  <Icon 
                    name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14}
                  />
                </div>
              </th>
              <th className="p-3 text-left font-medium text-muted-foreground">Contato</th>
              <th 
                className="p-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('lastAppointment')}
              >
                <div className="flex items-center gap-2">
                  Último Agendamento
                  <Icon 
                    name={sortField === 'lastAppointment' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14}
                  />
                </div>
              </th>
              <th 
                className="p-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('totalServices')}
              >
                <div className="flex items-center gap-2">
                  Total Serviços
                  <Icon 
                    name={sortField === 'totalServices' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14}
                  />
                </div>
              </th>
              <th 
                className="p-3 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('totalSpent')}
              >
                <div className="flex items-center gap-2">
                  Valor Total
                  <Icon 
                    name={sortField === 'totalSpent' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14}
                  />
                </div>
              </th>
              <th className="p-3 text-left font-medium text-muted-foreground">Próximo Agend.</th>
              <th className="p-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="p-3 text-center font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedClients?.map((client) => (
              <tr key={client?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedClients?.includes(client?.id)}
                    onChange={(e) => handleSelectClient(client?.id, e?.target?.checked)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="p-3">
                  <div>
                    <button
                      onClick={() => onBulkAction?.('viewDashboard', [client?.id])}
                      className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer text-left"
                    >
                      {client?.name}
                    </button>
                    <p className="text-sm text-muted-foreground">
                      Cliente desde {formatDate(client?.registrationDate)}
                    </p>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm">
                    <p className="text-foreground">{client?.email}</p>
                    <p className="text-muted-foreground">{client?.phone}</p>
                  </div>
                </td>
                <td className="p-3 text-sm text-foreground">
                  {client?.lastAppointment ? formatDate(client?.lastAppointment) : 'Nunca'}
                </td>
                <td className="p-3 text-sm text-foreground">
                  {client?.totalServices}
                </td>
                <td className="p-3 text-sm text-foreground">
                  {formatCurrency(client?.totalSpent)}
                </td>
                <td className="p-3 text-sm">
                  {client?.nextAppointment ? (
                    <div>
                      <p className="text-foreground">{formatDate(client?.nextAppointment)}</p>
                      <p className="text-xs text-muted-foreground">Agendado</p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Sem agendamento</span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    {getStatusBadge(client?.status)}
                    {client?.loyaltyPoints && (
                      <span className="text-xs text-primary">
                        ⭐ {client.loyaltyPoints} pts
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit?.(client)}
                      className="h-8 w-8"
                      title="Editar cliente"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onBulkAction?.('schedule', [client?.id])}
                      className="h-8 w-8 text-primary"
                      title="Agendar serviço"
                    >
                      <Icon name="Calendar" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`https://wa.me/${client?.phone?.replace(/\D/g, '')}`)}
                      className="h-8 w-8 text-green-600"
                      title="WhatsApp"
                    >
                      <Icon name="MessageCircle" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`tel:${client?.phone}`)}
                      className="h-8 w-8"
                      title="Ligar"
                    >
                      <Icon name="Phone" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`mailto:${client?.email}`)}
                      className="h-8 w-8"
                      title="Enviar email"
                    >
                      <Icon name="Mail" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete?.(client?.id)}
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      title="Excluir cliente"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedClients?.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum cliente encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Comece adicionando seus primeiros clientes
            </p>
            <Button onClick={onAddClient} iconName="UserPlus">
              Adicionar Primeiro Cliente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientTable;
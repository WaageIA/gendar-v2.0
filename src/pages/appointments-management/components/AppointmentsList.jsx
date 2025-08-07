import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
// Utility function for date formatting
const formatDateString = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return dateString;
  }
};

const AppointmentsList = ({ 
  appointments = [], 
  loading, 
  onEdit, 
  onView, 
  onStatusChange, 
  onBulkAction 
}) => {
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAppointments(appointments.map(apt => apt.id));
    } else {
      setSelectedAppointments([]);
    }
  };

  const handleSelectAppointment = (appointmentId, checked) => {
    if (checked) {
      setSelectedAppointments(prev => [...prev, appointmentId]);
    } else {
      setSelectedAppointments(prev => prev.filter(id => id !== appointmentId));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { 
        label: 'Confirmado', 
        className: 'bg-green-100 text-green-800 border-green-200' 
      },
      pending: { 
        label: 'Pendente', 
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200' 
      },
      cancelled: { 
        label: 'Cancelado', 
        className: 'bg-red-100 text-red-800 border-red-200' 
      },
      completed: { 
        label: 'Concluído', 
        className: 'bg-blue-100 text-blue-800 border-blue-200' 
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return formatDateString(dateString);
  };

  const formatTime = (timeString) => {
    return timeString || '--:--';
  };

  const handleBulkActionClick = (action) => {
    onBulkAction(action, selectedAppointments);
    setSelectedAppointments([]);
    setShowBulkActions(false);
  };

  React.useEffect(() => {
    setShowBulkActions(selectedAppointments.length > 0);
  }, [selectedAppointments]);

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-center justify-center">
          <Icon name="Loader2" size={24} className="animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Carregando agendamentos...</span>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="text-center">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhum agendamento encontrado
          </h3>
          <p className="text-muted-foreground">
            Não há agendamentos que correspondam aos filtros selecionados.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <div className="bg-primary/10 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedAppointments.length} agendamento(s) selecionado(s)
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkActionClick('confirm')}
                iconName="CheckCircle"
                iconPosition="left"
                iconSize={14}
              >
                Confirmar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkActionClick('cancel')}
                iconName="XCircle"
                iconPosition="left"
                iconSize={14}
              >
                Cancelar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkActionClick('export')}
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                Exportar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAppointments([])}
                iconName="X"
                iconSize={14}
              >
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedAppointments.length === appointments.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Cliente
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Serviço
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Data
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Horário
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Profissional
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Valor
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr 
                key={appointment.id} 
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedAppointments.includes(appointment.id)}
                    onChange={(e) => handleSelectAppointment(appointment.id, e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">
                      {appointment.clientName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.clientPhone}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">
                    {appointment.service}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.duration} min
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">
                    {formatDate(appointment.date)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">
                    {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-foreground">
                    {appointment.professional}
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(appointment.status)}
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">
                    R$ {appointment.price.toFixed(2)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(appointment)}
                      iconName="Eye"
                      iconSize={14}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(appointment)}
                      iconName="Edit"
                      iconSize={14}
                    />
                    {appointment.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onStatusChange(appointment.id, 'confirmed')}
                        iconName="CheckCircle"
                        iconSize={14}
                        className="text-green-600 hover:text-green-700"
                      />
                    )}
                    {appointment.status === 'confirmed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onStatusChange(appointment.id, 'cancelled')}
                        iconName="XCircle"
                        iconSize={14}
                        className="text-red-600 hover:text-red-700"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-muted/30 border-t border-border p-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Mostrando {appointments.length} agendamento(s)
          </span>
          <span>
            Total selecionado: {selectedAppointments.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
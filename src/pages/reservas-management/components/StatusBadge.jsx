import React from 'react';
import { cn } from '../../../utils/cn';

const StatusBadge = ({ status, paymentStatus, size = 'default' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pendente',
          className: 'bg-warning/10 text-warning border-warning/20'
        };
      case 'confirmed':
        return {
          label: 'Confirmado',
          className: 'bg-info/10 text-info border-info/20'
        };
      case 'completed':
        return {
          label: 'Concluído',
          className: 'bg-success/10 text-success border-success/20'
        };
      case 'cancelled':
        return {
          label: 'Cancelado',
          className: 'bg-error/10 text-error border-error/20'
        };
      default:
        return {
          label: 'Desconhecido',
          className: 'bg-muted/10 text-muted-foreground border-muted/20'
        };
    }
  };

  const getPaymentStatusConfig = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return {
          label: 'Pago',
          className: 'bg-success/10 text-success border-success/20'
        };
      case 'pending':
        return {
          label: 'Pendente',
          className: 'bg-warning/10 text-warning border-warning/20'
        };
      case 'refunded':
        return {
          label: 'Reembolsado',
          className: 'bg-info/10 text-info border-info/20'
        };
      case 'failed':
        return {
          label: 'Falhou',
          className: 'bg-error/10 text-error border-error/20'
        };
      default:
        return {
          label: 'N/A',
          className: 'bg-muted/10 text-muted-foreground border-muted/20'
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const paymentConfig = getPaymentStatusConfig(paymentStatus);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <div className="flex flex-col space-y-1">
      {/* Status Badge */}
      <span className={cn(
        'inline-flex items-center rounded-full border font-medium',
        statusConfig.className,
        sizeClasses[size]
      )}>
        {statusConfig.label}
      </span>
      
      {/* Payment Status Badge */}
      {paymentStatus && (
        <span className={cn(
          'inline-flex items-center rounded-full border font-medium',
          paymentConfig.className,
          sizeClasses[size]
        )}>
          💳 {paymentConfig.label}
        </span>
      )}
    </div>
  );
};

export default StatusBadge;
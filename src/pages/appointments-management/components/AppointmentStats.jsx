import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentStats = ({ appointments = [] }) => {
  const stats = React.useMemo(() => {
    const total = appointments.length;
    const confirmed = appointments.filter(apt => apt.status === 'confirmed').length;
    const pending = appointments.filter(apt => apt.status === 'pending').length;
    const cancelled = appointments.filter(apt => apt.status === 'cancelled').length;
    const completed = appointments.filter(apt => apt.status === 'completed').length;
    
    const totalRevenue = appointments
      .filter(apt => apt.status === 'confirmed' || apt.status === 'completed')
      .reduce((sum, apt) => sum + apt.price, 0);

    return {
      total,
      confirmed,
      pending,
      cancelled,
      completed,
      totalRevenue
    };
  }, [appointments]);

  const statCards = [
    {
      title: 'Total',
      value: stats.total,
      icon: 'Calendar',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Confirmados',
      value: stats.confirmed,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Pendentes',
      value: stats.pending,
      icon: 'Clock',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Cancelados',
      value: stats.cancelled,
      icon: 'XCircle',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'Receita',
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      icon: 'DollarSign',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statCards.map((stat) => (
        <div
          key={stat.title}
          className={`bg-card border ${stat.borderColor} rounded-lg p-4 hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
            <div className={`${stat.bgColor} ${stat.color} p-3 rounded-full`}>
              <Icon name={stat.icon} size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentStats;
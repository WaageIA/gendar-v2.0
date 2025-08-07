import React, { useState } from 'react';
import MetricsCard from './MetricsCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccessMetrics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Mock data - em produção viria de uma API
  const metricsData = {
    '7d': {
      pageViews: { value: '1,247', change: '+12% vs semana anterior', changeType: 'positive' },
      conversionRate: { value: '18.5%', change: '+2.3% vs semana anterior', changeType: 'positive' },
      totalBookings: { value: '231', change: '+8 vs semana anterior', changeType: 'positive' }
    },
    '30d': {
      pageViews: { value: '5,892', change: '+18% vs mês anterior', changeType: 'positive' },
      conversionRate: { value: '16.2%', change: '+1.1% vs mês anterior', changeType: 'positive' },
      totalBookings: { value: '954', change: '+42 vs mês anterior', changeType: 'positive' }
    },
    '90d': {
      pageViews: { value: '18,456', change: '+25% vs trimestre anterior', changeType: 'positive' },
      conversionRate: { value: '15.8%', change: '+0.8% vs trimestre anterior', changeType: 'positive' },
      totalBookings: { value: '2,916', change: '+156 vs trimestre anterior', changeType: 'positive' }
    }
  };

  const topServices = [
    { name: 'Corte Feminino', views: 342, bookings: 89, rate: '26.0%' },
    { name: 'Corte Masculino', views: 298, bookings: 76, rate: '25.5%' },
    { name: 'Manicure Completa', views: 256, bookings: 52, rate: '20.3%' },
    { name: 'Coloração', views: 189, bookings: 31, rate: '16.4%' },
    { name: 'Escova Progressiva', views: 162, bookings: 18, rate: '11.1%' }
  ];

  const periods = [
    { value: '7d', label: 'Últimos 7 dias' },
    { value: '30d', label: 'Últimos 30 dias' },
    { value: '90d', label: 'Últimos 90 dias' }
  ];

  const currentData = metricsData[selectedPeriod];

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Métricas de Acesso
        </h2>
        <div className="flex space-x-2">
          {periods.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricsCard
          title="Visualizações da Página"
          value={currentData.pageViews.value}
          change={currentData.pageViews.change}
          changeType={currentData.pageViews.changeType}
          icon="Eye"
          color="primary"
          description="Total de acessos à página de agendamento"
        />
        
        <MetricsCard
          title="Taxa de Conversão"
          value={currentData.conversionRate.value}
          change={currentData.conversionRate.change}
          changeType={currentData.conversionRate.changeType}
          icon="TrendingUp"
          color="success"
          description="Visitantes que realizaram agendamento"
        />
        
        <MetricsCard
          title="Total de Agendamentos"
          value={currentData.totalBookings.value}
          change={currentData.totalBookings.change}
          changeType={currentData.totalBookings.changeType}
          icon="Calendar"
          color="info"
          description="Agendamentos realizados online"
        />
      </div>

      {/* Top Services Table */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            Serviços Mais Visualizados/Agendados
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ranking dos serviços por performance no período selecionado
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Serviço
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Visualizações
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Agendamentos
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Taxa de Conversão
                </th>
              </tr>
            </thead>
            <tbody>
              {topServices.map((service, index) => (
                <tr key={index} className="border-b border-border last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">
                        {service.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-foreground">
                    {service.views}
                  </td>
                  <td className="py-4 px-6 text-foreground">
                    {service.bookings}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {service.rate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccessMetrics;
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const [timeRange, setTimeRange] = useState('7days');

  const revenueData = {
    '7days': [
      { name: 'Seg', value: 2400, date: '30/12' },
      { name: 'Ter', value: 1398, date: '31/12' },
      { name: 'Qua', value: 9800, date: '01/01' },
      { name: 'Qui', value: 3908, date: '02/01' },
      { name: 'Sex', value: 4800, date: '03/01' },
      { name: 'Sáb', value: 3800, date: '04/01' },
      { name: 'Dom', value: 4300, date: '05/01' }
    ],
    '30days': [
      { name: 'Sem 1', value: 12400, date: 'Dez' },
      { name: 'Sem 2', value: 15398, date: 'Dez' },
      { name: 'Sem 3', value: 18800, date: 'Dez' },
      { name: 'Sem 4', value: 22908, date: 'Jan' }
    ],
    '90days': [
      { name: 'Out', value: 45400, date: '2024' },
      { name: 'Nov', value: 52398, date: '2024' },
      { name: 'Dez', value: 68800, date: '2024' }
    ]
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            Receita: {formatCurrency(payload?.[0]?.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Receita</h3>
          <p className="text-sm text-muted-foreground">Evolução das vendas</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === '7days' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTimeRange('7days')}
          >
            7 dias
          </Button>
          <Button
            variant={timeRange === '30days' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTimeRange('30days')}
          >
            30 dias
          </Button>
          <Button
            variant={timeRange === '90days' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTimeRange('90days')}
          >
            90 dias
          </Button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData?.[timeRange]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `R$ ${(value / 1000)?.toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#1E40AF" 
              strokeWidth={2}
              dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
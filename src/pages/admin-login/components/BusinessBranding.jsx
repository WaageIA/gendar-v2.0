import React from 'react';
import Icon from '../../../components/AppIcon';

const BusinessBranding = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="text-center space-y-6">
      {/* Logo and Brand */}
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-elevated">
          <Icon name="Briefcase" size={40} color="white" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">ServiceHub Pro</h1>
          <p className="text-lg text-muted-foreground mb-1">Plataforma de Gestão de Serviços</p>
          <p className="text-sm text-muted-foreground">Transforme seu negócio digitalmente</p>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Gerencie seu negócio com facilidade
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-muted-foreground">Agendamentos Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-muted-foreground">Gestão de Clientes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-muted-foreground">Relatórios Financeiros</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={16} className="text-primary" />
            <span className="text-muted-foreground">Acesso Mobile</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-primary">10K+</p>
          <p className="text-xs text-muted-foreground">Empresas</p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-secondary">500K+</p>
          <p className="text-xs text-muted-foreground">Agendamentos</p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-accent">99.9%</p>
          <p className="text-xs text-muted-foreground">Uptime</p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {currentYear} ServiceHub Pro. Todos os direitos reservados.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Desenvolvido no Brasil para empresas brasileiras
        </p>
      </div>
    </div>
  );
};

export default BusinessBranding;
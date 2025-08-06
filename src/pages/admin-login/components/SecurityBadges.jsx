import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Conexão Segura',
      description: 'SSL 256-bit'
    },
    {
      icon: 'Lock',
      title: 'Dados Protegidos',
      description: 'LGPD Compliant'
    },
    {
      icon: 'CheckCircle',
      title: 'Certificado',
      description: 'ISO 27001'
    }
  ];

  const trustIndicators = [
    'Mais de 10.000 empresas confiam',
    'Disponibilidade 99.9%',
    'Suporte 24/7 em português'
  ];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">{feature?.title}</h3>
            <p className="text-xs text-muted-foreground">{feature?.description}</p>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Award" size={16} className="mr-2 text-primary" />
          Por que escolher ServiceHub Pro?
        </h3>
        <ul className="space-y-2">
          {trustIndicators?.map((indicator, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <Icon name="Check" size={14} className="mr-2 text-green-500" />
              {indicator}
            </li>
          ))}
        </ul>
      </div>
      {/* Brazilian Certifications */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Certificações Brasileiras</p>
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} className="text-green-500" />
            <span className="text-xs text-muted-foreground">Brasil</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Building" size={14} className="text-blue-500" />
            <span className="text-xs text-muted-foreground">CNPJ</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={14} className="text-purple-500" />
            <span className="text-xs text-muted-foreground">LGPD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;
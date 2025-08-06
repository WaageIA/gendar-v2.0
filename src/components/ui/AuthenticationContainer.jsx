import React from 'react';
import Icon from '../AppIcon';

const AuthenticationContainer = ({ children, title = "Acesso Administrativo", subtitle = "Entre com suas credenciais para gerenciar seu negócio" }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Business Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <Icon name="Briefcase" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">ServiceHub Pro</h1>
          <p className="text-sm text-muted-foreground">Plataforma de Gestão de Serviços</p>
        </div>

        {/* Authentication Card */}
        <div className="bg-card border border-border rounded-lg shadow-soft p-6">
          {/* Card Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {/* Card Content */}
          <div className="space-y-4">
            {children}
          </div>

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Shield" size={14} />
              <span>Conexão segura e criptografada</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            © 2025 ServiceHub Pro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationContainer;
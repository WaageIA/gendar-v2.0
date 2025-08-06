import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AuthenticationContainer from '../../components/ui/AuthenticationContainer';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import BusinessBranding from './components/BusinessBranding';

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Login Administrativo - ServiceHub Pro</title>
        <meta name="description" content="Acesse sua conta administrativa do ServiceHub Pro para gerenciar seu negócio de serviços." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-12">
            
            {/* Left Side - Business Branding (Hidden on mobile) */}
            <div className="hidden lg:block lg:w-1/2 max-w-lg">
              <BusinessBranding />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 max-w-md">
              <AuthenticationContainer
                title="Acesso Administrativo"
                subtitle="Entre com suas credenciais para gerenciar seu negócio"
              >
                <LoginForm />
              </AuthenticationContainer>

              {/* Security Badges - Below form on mobile */}
              <div className="mt-8">
                <SecurityBadges />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Branding Footer */}
        <div className="lg:hidden bg-card border-t border-border p-6">
          <div className="max-w-md mx-auto">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SH</span>
                </div>
                <span className="text-lg font-semibold text-foreground">ServiceHub Pro</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-lg font-bold text-primary">10K+</p>
                  <p className="text-xs text-muted-foreground">Empresas Ativas</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-secondary">99.9%</p>
                  <p className="text-xs text-muted-foreground">Disponibilidade</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} ServiceHub Pro. Feito no Brasil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
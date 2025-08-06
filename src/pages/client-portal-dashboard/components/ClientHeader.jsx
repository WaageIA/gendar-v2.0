import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ClientHeader = ({ client }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('clientToken');
    window.location.href = '/public-booking-interface';
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/client-portal-dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ServiceHub Pro</h1>
                <p className="text-xs text-muted-foreground">Meu Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/client-portal-dashboard" 
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Dashboard
            </Link>
            <button 
              onClick={() => console.log('Navegar para agendamentos')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Meus Agendamentos
            </button>
            <button 
              onClick={() => console.log('Navegar para histórico')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Histórico
            </button>
            <button 
              onClick={() => console.log('Navegar para promoções')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Promoções
            </button>
          </nav>

          {/* User Profile Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log('Abrir notificações')}
              className="relative"
            >
              <Icon name="Bell" size={18} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">{client?.name}</p>
                  <p className="text-xs text-muted-foreground">Cliente</p>
                </div>
                <Icon 
                  name="ChevronDown" 
                  size={14} 
                  className={`text-muted-foreground transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-20">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{client?.name}</p>
                      <p className="text-xs text-muted-foreground">{client?.email}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => {
                          console.log('Navegar para perfil');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                      >
                        <Icon name="User" size={16} />
                        <span>Meu Perfil</span>
                      </button>
                      <button
                        onClick={() => {
                          console.log('Navegar para configurações');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Configurações</span>
                      </button>
                      <button
                        onClick={() => {
                          console.log('Navegar para ajuda');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                      >
                        <Icon name="HelpCircle" size={16} />
                        <span>Ajuda</span>
                      </button>
                    </div>
                    <div className="p-1 border-t border-border">
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sair</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => console.log('Toggle mobile menu')}
            >
              <Icon name="Menu" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
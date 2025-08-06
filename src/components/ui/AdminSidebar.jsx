import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false, isOpen = false, onClose }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    calendar: true,
    reports: false,
  });

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      type: 'link'
    },
    {
      id: 'calendar',
      label: 'Calendário',
      icon: 'Calendar',
      type: 'section',
      children: [
        { label: 'Visualização', path: '/calendar-management', icon: 'CalendarDays' },
        { label: 'Agendamentos', path: '/calendar-management?view=appointments', icon: 'Clock' },
        { label: 'Disponibilidade', path: '/calendar-management?view=availability', icon: 'CalendarCheck' },
      ]
    },
    {
      id: 'bookings',
      label: 'Reservas',
      path: '/reservas-management',
      icon: 'BookOpen',
      type: 'link'
    },
    {
      id: 'clients',
      label: 'Clientes',
      path: '/client-management',
      icon: 'Users',
      type: 'link'
    },
    {
      id: 'services',
      label: 'Serviços',
      path: '/services-management',
      icon: 'Briefcase',
      type: 'link'
    },
    {
      id: 'reports',
      label: 'Relatórios',
      icon: 'BarChart3',
      type: 'section',
      children: [
        { label: 'Vendas', path: '/admin-dashboard?tab=sales', icon: 'TrendingUp' },
        { label: 'Clientes', path: '/admin-dashboard?tab=client-reports', icon: 'UserCheck' },
        { label: 'Serviços', path: '/admin-dashboard?tab=service-reports', icon: 'Activity' },
      ]
    },
  ];

  const quickActions = [
    { label: 'Novo Agendamento', icon: 'Plus', action: 'new-appointment' },
    { label: 'Adicionar Cliente', icon: 'UserPlus', action: 'new-client' },
    { label: 'Configurar Serviço', icon: 'Settings', action: 'new-service' },
  ];

  const isActivePath = (path) => {
    if (!path) return false;
    const currentPath = location.pathname + location.search;
    return currentPath === path || location.pathname === path;
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
    
    switch (action) {
      case 'new-service':
        // Redirecionar para configurações de serviços
        window.location.href = '/service-configuration';
        break;
      case 'new-appointment':
        // Redirecionar para calendário
        window.location.href = '/calendar-management';
        break;
      case 'new-client':
        // Redirecionar para gestão de clientes
        window.location.href = '/client-management';
        break;
      default:
        console.log('Ação não implementada:', action);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-foreground">Menu</h2>
        )}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {sidebarItems?.map((item) => {
          if (item?.type === 'link') {
            return (
              <Link
                key={item?.id}
                to={item?.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                } ${isCollapsed ? 'justify-center' : ''}`}
                onClick={onClose}
              >
                <Icon name={item?.icon} size={18} />
                {!isCollapsed && <span>{item?.label}</span>}
              </Link>
            );
          }

          if (item?.type === 'section') {
            const isExpanded = expandedSections?.[item?.id];
            return (
              <div key={item?.id}>
                <button
                  onClick={() => !isCollapsed && toggleSection(item?.id)}
                  className={`flex items-center w-full space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth ${
                    isCollapsed ? 'justify-center' : 'justify-between'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item?.icon} size={18} />
                    {!isCollapsed && <span>{item?.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <Icon 
                      name="ChevronDown" 
                      size={16} 
                      className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>
                {/* Section Children */}
                {!isCollapsed && isExpanded && item?.children && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item?.children?.map((child) => (
                      <Link
                        key={child?.path}
                        to={child?.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-smooth ${
                          isActivePath(child?.path)
                            ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        onClick={onClose}
                      >
                        <Icon name={child?.icon} size={16} />
                        <span>{child?.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}
      </nav>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Ações Rápidas
          </h3>
          <div className="space-y-2">
            {quickActions?.map((action) => (
              <Button
                key={action?.action}
                variant="ghost"
                onClick={() => handleQuickAction(action?.action)}
                className="w-full justify-start text-sm"
                iconName={action?.icon}
                iconPosition="left"
                iconSize={16}
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed Quick Actions */}
      {isCollapsed && (
        <div className="p-4 border-t border-border space-y-2">
          {quickActions?.map((action) => (
            <Button
              key={action?.action}
              variant="ghost"
              size="icon"
              onClick={() => handleQuickAction(action?.action)}
              className="w-full"
            >
              <Icon name={action?.icon} size={18} />
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  // Desktop sidebar
  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
    return (
      <aside className={`fixed left-0 top-16 bottom-0 z-100 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {sidebarContent}
      </aside>
    );
  }

  // Mobile sidebar
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-300 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 z-300 transform transition-transform duration-300 lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default AdminSidebar;
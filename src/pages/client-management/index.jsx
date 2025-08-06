import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigationHeader from '../../components/ui/AdminNavigationHeader';
import AdminSidebar from '../../components/ui/AdminSidebar';
import ClientTable from './components/ClientTable';
import ClientModal from './components/ClientModal';
import ClientDashboard from './components/ClientDashboard';
import ClientFilters from './components/ClientFilters';
import SearchBar from './components/SearchBar';
import ExportActions from './components/ExportActions';

const ClientManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [dashboardClient, setDashboardClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    serviceCategory: 'all',
    appointmentFrequency: 'all'
  });
  const [loading, setLoading] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }
    loadClients();
  }, [navigate]);

  // Filter clients based on search and filters
  useEffect(() => {
    let filtered = clients?.filter(client => {
      const matchesSearch = !searchQuery || 
        client?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        client?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        client?.phone?.includes(searchQuery);

      const matchesStatus = filters?.status === 'all' || client?.status === filters?.status;
      const matchesCategory = filters?.serviceCategory === 'all' || 
        client?.preferredServices?.includes(filters?.serviceCategory);
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    setFilteredClients(filtered || []);
  }, [clients, searchQuery, filters]);

  const loadClients = async () => {
    setLoading(true);
    try {
      // Mock data integrado com sistema de reservas
      const mockClients = [
        {
          id: 1,
          name: 'Maria Silva',
          email: 'maria.silva@email.com',
          phone: '(11) 99999-1234',
          lastAppointment: '2025-01-05',
          nextAppointment: '2025-01-15',
          totalServices: 15,
          status: 'ativo',
          preferredServices: ['Corte de Cabelo', 'Coloração'],
          registrationDate: '2024-08-15',
          totalSpent: 1250.00,
          notes: 'Cliente fiel, sempre pontual',
          address: 'Rua das Flores, 123 - São Paulo, SP',
          birthDate: '1985-03-15',
          gender: 'feminino',
          loyaltyPoints: 125,
          averageTicket: 83.33,
          frequency: 'alta', // alta, media, baixa
          lastContact: '2025-01-05',
          communicationPreference: 'whatsapp',
          appointmentHistory: [
            { date: '2025-01-05', service: 'Corte de Cabelo', value: 45.00, status: 'completed' },
            { date: '2024-12-20', service: 'Coloração', value: 120.00, status: 'completed' },
            { date: '2024-12-05', service: 'Corte de Cabelo', value: 45.00, status: 'completed' }
          ]
        },
        {
          id: 2,
          name: 'João Santos',
          email: 'joao.santos@email.com',
          phone: '(11) 88888-8888',
          lastAppointment: '2025-01-03',
          nextAppointment: null,
          totalServices: 8,
          status: 'ativo',
          preferredServices: ['Corte de Cabelo'],
          registrationDate: '2024-10-20',
          totalSpent: 640.00,
          notes: 'Prefere horários pela manhã',
          address: 'Av. Paulista, 456 - São Paulo, SP',
          birthDate: '1990-07-22',
          gender: 'masculino',
          loyaltyPoints: 64,
          averageTicket: 80.00,
          frequency: 'media',
          lastContact: '2025-01-03',
          communicationPreference: 'email',
          appointmentHistory: [
            { date: '2025-01-03', service: 'Corte de Cabelo', value: 45.00, status: 'completed' },
            { date: '2024-12-15', service: 'Corte de Cabelo', value: 45.00, status: 'completed' }
          ]
        },
        {
          id: 3,
          name: 'Ana Costa',
          email: 'ana.costa@email.com',
          phone: '(11) 77777-7777',
          lastAppointment: '2024-12-28',
          nextAppointment: '2025-01-20',
          totalServices: 3,
          status: 'inativo',
          preferredServices: ['Manicure'],
          registrationDate: '2024-11-10',
          totalSpent: 180.00,
          notes: 'Cliente eventual',
          address: 'Rua Augusta, 789 - São Paulo, SP',
          birthDate: '1992-11-08',
          gender: 'feminino',
          loyaltyPoints: 18,
          averageTicket: 60.00,
          frequency: 'baixa',
          lastContact: '2024-12-28',
          communicationPreference: 'sms',
          appointmentHistory: [
            { date: '2024-12-28', service: 'Manicure', value: 35.00, status: 'completed' },
            { date: '2024-12-10', service: 'Manicure', value: 35.00, status: 'completed' }
          ]
        },
        {
          id: 4,
          name: 'Carla Oliveira',
          email: 'carla.oliveira@email.com',
          phone: '(11) 99999-9012',
          lastAppointment: '2025-01-06',
          nextAppointment: '2025-01-25',
          totalServices: 12,
          status: 'ativo',
          preferredServices: ['Manicure', 'Design de Sobrancelha'],
          registrationDate: '2024-09-05',
          totalSpent: 720.00,
          notes: 'Gosta de experimentar novos esmaltes',
          address: 'Rua Oscar Freire, 321 - São Paulo, SP',
          birthDate: '1988-05-12',
          gender: 'feminino',
          loyaltyPoints: 72,
          averageTicket: 60.00,
          frequency: 'alta',
          lastContact: '2025-01-06',
          communicationPreference: 'whatsapp',
          appointmentHistory: [
            { date: '2025-01-06', service: 'Manicure', value: 35.00, status: 'completed' },
            { date: '2024-12-22', service: 'Design de Sobrancelha', value: 25.00, status: 'completed' }
          ]
        },
        {
          id: 5,
          name: 'Patricia Lima',
          email: 'patricia.lima@email.com',
          phone: '(11) 99999-7890',
          lastAppointment: '2025-01-04',
          nextAppointment: null,
          totalServices: 6,
          status: 'ativo',
          preferredServices: ['Limpeza de Pele'],
          registrationDate: '2024-11-20',
          totalSpent: 480.00,
          notes: 'Pele sensível - usar produtos hipoalergênicos',
          address: 'Alameda Santos, 654 - São Paulo, SP',
          birthDate: '1995-02-28',
          gender: 'feminino',
          loyaltyPoints: 48,
          averageTicket: 80.00,
          frequency: 'media',
          lastContact: '2025-01-04',
          communicationPreference: 'email',
          appointmentHistory: [
            { date: '2025-01-04', service: 'Limpeza de Pele', value: 80.00, status: 'completed' },
            { date: '2024-12-18', service: 'Limpeza de Pele', value: 80.00, status: 'completed' }
          ]
        }
      ];
      setClients(mockClients);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleViewClientDashboard = (client) => {
    setDashboardClient(client);
    setIsDashboardOpen(true);
  };

  const handleScheduleAppointment = (client) => {
    // Integração com sistema de agendamento
    alert(`Redirecionando para agendamento do cliente: ${client.name}`);
    // navigate(`/calendar-management?client=${client.id}&action=schedule`);
    setIsDashboardOpen(false);
  };

  const handleSendMessage = (client) => {
    // Integração com sistema de comunicação
    switch (client.communicationPreference) {
      case 'whatsapp':
        window.open(`https://wa.me/${client.phone.replace(/\D/g, '')}?text=Olá ${client.name}! Como posso ajudá-lo hoje?`);
        break;
      case 'email':
        window.open(`mailto:${client.email}?subject=Contato ServiceHub Pro&body=Olá ${client.name},%0D%0A%0D%0AComo posso ajudá-lo hoje?`);
        break;
      case 'sms':
        alert(`Enviando SMS para ${client.name}: ${client.phone}`);
        break;
      default:
        window.open(`tel:${client.phone}`);
    }
    setIsDashboardOpen(false);
  };

  const handleSaveClient = async (clientData) => {
    try {
      if (selectedClient) {
        // Update existing client
        const updatedClients = clients?.map(client => 
          client?.id === selectedClient?.id 
            ? { ...client, ...clientData }
            : client
        );
        setClients(updatedClients);
      } else {
        // Add new client
        const newClient = {
          ...clientData,
          id: Date.now(),
          registrationDate: new Date()?.toISOString()?.split('T')?.[0],
          totalServices: 0,
          totalSpent: 0
        };
        setClients([...clients, newClient]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        const updatedClients = clients?.filter(client => client?.id !== clientId);
        setClients(updatedClients);
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log('Ação em lote:', action, selectedIds);
    
    switch (action) {
      case 'schedule':
        // Redirecionar para página de agendamento com cliente pré-selecionado
        const clientId = selectedIds[0];
        const client = clients.find(c => c.id === clientId);
        if (client) {
          // Simular redirecionamento para calendário com dados do cliente
          alert(`Redirecionando para agendamento do cliente: ${client.name}`);
          // navigate(`/calendar-management?client=${clientId}`);
        }
        break;
        
      case 'email':
        // Abrir modal de envio de email em massa
        const selectedClients = clients.filter(c => selectedIds.includes(c.id));
        const emails = selectedClients.map(c => c.email).join(';');
        window.open(`mailto:${emails}?subject=Comunicado Importante&body=Olá,%0D%0A%0D%0AEsperamos que esteja bem!`);
        break;
        
      case 'export':
        // Exportar clientes selecionados
        const clientsToExport = clients.filter(c => selectedIds.includes(c.id));
        handleExportClients(clientsToExport);
        break;
        
      case 'whatsapp':
        // Enviar mensagem WhatsApp em massa (simulado)
        alert(`Enviando mensagem WhatsApp para ${selectedIds.length} clientes`);
        break;
        
      case 'viewDashboard':
        // Abrir dashboard expandido do cliente
        const clientToView = clients.find(c => c.id === selectedIds[0]);
        if (clientToView) {
          handleViewClientDashboard(clientToView);
        }
        break;
        
      default:
        console.log('Ação não implementada:', action);
    }
  };

  const handleExportClients = (clientsToExport) => {
    const headers = ['Nome', 'Email', 'Telefone', 'Status', 'Total Serviços', 'Valor Total', 'Último Agendamento'];
    const csvContent = [
      headers.join(','),
      ...clientsToExport.map(client => [
        client.name,
        client.email,
        client.phone,
        client.status,
        client.totalServices,
        client.totalSpent,
        client.lastAppointment || 'Nunca'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clientes-selecionados-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <AdminNavigationHeader 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      
      {/* Sidebar */}
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Gestão de Clientes
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus clientes e mantenha relacionamentos sólidos
            </p>
          </div>

          {/* Header Toolbar */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="flex-1">
                  <SearchBar 
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Buscar por nome, email ou telefone..."
                  />
                </div>
                <ClientFilters 
                  filters={filters}
                  onChange={setFilters}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <ExportActions 
                  clients={filteredClients}
                  onBulkAction={handleBulkAction}
                />
              </div>
            </div>
          </div>

          {/* Client Table */}
          <div className="bg-card border border-border rounded-lg">
            <ClientTable
              clients={filteredClients}
              loading={loading}
              onEdit={handleEditClient}
              onDelete={handleDeleteClient}
              onBulkAction={handleBulkAction}
              onAddClient={handleAddClient}
            />
          </div>

          {/* Client Modal */}
          <ClientModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            client={selectedClient}
            onSave={handleSaveClient}
          />

          {/* Client Dashboard */}
          <ClientDashboard
            client={dashboardClient}
            isOpen={isDashboardOpen}
            onClose={() => setIsDashboardOpen(false)}
            onScheduleAppointment={handleScheduleAppointment}
            onSendMessage={handleSendMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default ClientManagement;
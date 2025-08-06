import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import ProfessionalModal from './ProfessionalModal';

const ProfessionalManagement = ({ professionals, setProfessionals, categories }) => {
  const [professionalModal, setProfessionalModal] = useState({
    isOpen: false,
    professional: null,
    mode: 'view'
  });

  const [filters, setFilters] = useState({
    search: '',
    specialty: 'all',
    status: 'all'
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { color: 'bg-success/10 text-success border-success/20', label: 'Ativo' },
      inactive: { color: 'bg-error/10 text-error border-error/20', label: 'Inativo' },
      vacation: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Férias' }
    };
    
    const statusConfig = config[status] || config.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
        {statusConfig.label}
      </span>
    );
  };

  const getWorkingDays = (workSchedule) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    
    return days
      .filter(day => workSchedule[day]?.active)
      .map(day => dayNames[days.indexOf(day)])
      .join(', ');
  };

  // Filter professionals
  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         professional.email.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesSpecialty = filters.specialty === 'all' || 
                            professional.specialties.includes(filters.specialty);
    
    const matchesStatus = filters.status === 'all' || professional.status === filters.status;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const handleNewProfessional = () => {
    setProfessionalModal({
      isOpen: true,
      professional: {
        name: '',
        email: '',
        phone: '',
        photo: '',
        specialties: [],
        status: 'active',
        commissionRate: 18.00,
        workSchedule: {
          monday: { start: '08:00', end: '18:00', active: true },
          tuesday: { start: '08:00', end: '18:00', active: true },
          wednesday: { start: '08:00', end: '18:00', active: true },
          thursday: { start: '08:00', end: '18:00', active: true },
          friday: { start: '08:00', end: '18:00', active: true },
          saturday: { start: '08:00', end: '16:00', active: true },
          sunday: { start: '00:00', end: '00:00', active: false }
        }
      },
      mode: 'create'
    });
  };

  const handleEditProfessional = (professional) => {
    setProfessionalModal({
      isOpen: true,
      professional,
      mode: 'edit'
    });
  };

  const handleViewProfessional = (professional) => {
    setProfessionalModal({
      isOpen: true,
      professional,
      mode: 'view'
    });
  };

  const handleSaveProfessional = (professionalData) => {
    if (professionalModal.mode === 'create') {
      const newProfessional = {
        ...professionalData,
        id: Date.now().toString(),
        totalServices: 0,
        totalRevenue: 0,
        averageRating: 0,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0]
      };
      setProfessionals(prev => [...prev, newProfessional]);
    } else {
      setProfessionals(prev => 
        prev.map(p => p.id === professionalData.id ? { ...professionalData, lastActive: new Date().toISOString().split('T')[0] } : p)
      );
    }
    setProfessionalModal({ isOpen: false, professional: null, mode: 'view' });
  };

  const handleDeleteProfessional = (professionalId) => {
    if (window.confirm('Tem certeza que deseja excluir este profissional? Esta ação não pode ser desfeita.')) {
      setProfessionals(prev => prev.filter(p => p.id !== professionalId));
      setProfessionalModal({ isOpen: false, professional: null, mode: 'view' });
    }
  };

  const handleStatusChange = (professionalId, newStatus) => {
    setProfessionals(prev => 
      prev.map(p => p.id === professionalId ? { ...p, status: newStatus, lastActive: new Date().toISOString().split('T')[0] } : p)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Profissionais ({filteredProfessionals.length})
            </h2>
            <p className="text-sm text-muted-foreground">
              Gerencie sua equipe de profissionais e suas especialidades
            </p>
          </div>
          <Button
            onClick={handleNewProfessional}
            iconName="UserPlus"
            iconPosition="left"
            iconSize={16}
          >
            Novo Profissional
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <select
            value={filters.specialty}
            onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todas as Especialidades</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
            <option value="vacation">Férias</option>
          </select>
        </div>
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.map((professional) => (
          <div
            key={professional.id}
            className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={professional.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                  alt={professional.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{professional.name}</h3>
                  <p className="text-sm text-muted-foreground">{professional.email}</p>
                </div>
              </div>
              {getStatusBadge(professional.status)}
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {professional.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {professional.totalServices}
                </div>
                <div className="text-xs text-muted-foreground">Serviços</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {formatCurrency(professional.totalRevenue)}
                </div>
                <div className="text-xs text-muted-foreground">Receita</div>
              </div>
            </div>

            {/* Commission and Rating */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <div>
                <span className="text-muted-foreground">Comissão:</span>
                <span className="font-medium text-foreground ml-1">
                  {professional.commissionRate}%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Avaliação:</span>
                <span className="font-medium text-foreground ml-1">
                  {professional.averageRating.toFixed(1)} ⭐
                </span>
              </div>
            </div>

            {/* Work Schedule */}
            <div className="mb-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Trabalha:</span>
                <span className="font-medium text-foreground ml-1">
                  {getWorkingDays(professional.workSchedule)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewProfessional(professional)}
                className="flex-1"
                iconName="Eye"
                iconPosition="left"
                iconSize={14}
              >
                Ver
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditProfessional(professional)}
                className="flex-1"
                iconName="Edit"
                iconPosition="left"
                iconSize={14}
              >
                Editar
              </Button>
              <Button
                variant={professional.status === 'active' ? 'outline' : 'default'}
                size="sm"
                onClick={() => handleStatusChange(professional.id, professional.status === 'active' ? 'inactive' : 'active')}
                iconName={professional.status === 'active' ? 'UserX' : 'UserCheck'}
                iconSize={14}
                title={professional.status === 'active' ? 'Desativar profissional' : 'Ativar profissional'}
              />
            </div>

            {/* Last Active */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Último acesso: {new Date(professional.lastActive).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        ))}

        {/* Add New Professional Card */}
        <div
          onClick={handleNewProfessional}
          className="bg-background border-2 border-dashed border-border rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center min-h-[320px]"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <Icon name="UserPlus" size={24} className="text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Novo Profissional</h3>
          <p className="text-sm text-muted-foreground text-center">
            Clique para adicionar um novo membro à equipe
          </p>
        </div>
      </div>

      {/* Empty State */}
      {filteredProfessionals.length === 0 && professionals.length > 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhum profissional encontrado
          </h3>
          <p className="text-muted-foreground mb-6">
            Tente ajustar os filtros de busca
          </p>
          <Button 
            variant="outline"
            onClick={() => setFilters({ search: '', specialty: 'all', status: 'all' })}
          >
            Limpar Filtros
          </Button>
        </div>
      )}

      {filteredProfessionals.length === 0 && professionals.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhum profissional cadastrado
          </h3>
          <p className="text-muted-foreground mb-6">
            Comece adicionando o primeiro membro da sua equipe
          </p>
          <Button onClick={handleNewProfessional} iconName="UserPlus">
            Adicionar Primeiro Profissional
          </Button>
        </div>
      )}

      {/* Professional Modal */}
      <ProfessionalModal
        professional={professionalModal.professional}
        isOpen={professionalModal.isOpen}
        mode={professionalModal.mode}
        categories={categories}
        onClose={() => setProfessionalModal({ isOpen: false, professional: null, mode: 'view' })}
        onSave={handleSaveProfessional}
        onDelete={handleDeleteProfessional}
      />
    </div>
  );
};

export default ProfessionalManagement;
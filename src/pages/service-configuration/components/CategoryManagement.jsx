import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import CategoryModal from './CategoryModal';

const CategoryManagement = ({ categories, setCategories }) => {
  const [categoryModal, setCategoryModal] = useState({
    isOpen: false,
    category: null,
    mode: 'view'
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getCategoryColor = (color) => {
    const colors = {
      purple: 'text-purple-600 bg-purple-100 border-purple-200',
      pink: 'text-pink-600 bg-pink-100 border-pink-200',
      blue: 'text-blue-600 bg-blue-100 border-blue-200',
      green: 'text-green-600 bg-green-100 border-green-200',
      orange: 'text-orange-600 bg-orange-100 border-orange-200',
      red: 'text-red-600 bg-red-100 border-red-200',
      yellow: 'text-yellow-600 bg-yellow-100 border-yellow-200',
      indigo: 'text-indigo-600 bg-indigo-100 border-indigo-200'
    };
    return colors[color] || 'text-gray-600 bg-gray-100 border-gray-200';
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { color: 'bg-success/10 text-success border-success/20', label: 'Ativo' },
      inactive: { color: 'bg-error/10 text-error border-error/20', label: 'Inativo' }
    };
    
    const statusConfig = config[status] || config.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
        {statusConfig.label}
      </span>
    );
  };

  const handleNewCategory = () => {
    setCategoryModal({
      isOpen: true,
      category: {
        name: '',
        description: '',
        icon: 'Briefcase',
        color: 'blue',
        status: 'active'
      },
      mode: 'create'
    });
  };

  const handleEditCategory = (category) => {
    setCategoryModal({
      isOpen: true,
      category,
      mode: 'edit'
    });
  };

  const handleViewCategory = (category) => {
    setCategoryModal({
      isOpen: true,
      category,
      mode: 'view'
    });
  };

  const handleSaveCategory = (categoryData) => {
    if (categoryModal.mode === 'create') {
      const newCategory = {
        ...categoryData,
        id: Date.now().toString(),
        servicesCount: 0,
        averagePrice: 0,
        totalRevenue: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setCategories(prev => [...prev, newCategory]);
    } else {
      setCategories(prev => 
        prev.map(c => c.id === categoryData.id ? { ...categoryData, updatedAt: new Date().toISOString().split('T')[0] } : c)
      );
    }
    setCategoryModal({ isOpen: false, category: null, mode: 'view' });
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.')) {
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      setCategoryModal({ isOpen: false, category: null, mode: 'view' });
    }
  };

  const handleStatusChange = (categoryId, newStatus) => {
    setCategories(prev => 
      prev.map(c => c.id === categoryId ? { ...c, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : c)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Categorias de Serviços ({categories.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Gerencie as categorias que organizam seus serviços
          </p>
        </div>
        <Button
          onClick={handleNewCategory}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Nova Categoria
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getCategoryColor(category.color)}`}>
                  <Icon name={category.icon} size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
              {getStatusBadge(category.status)}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {category.servicesCount}
                </div>
                <div className="text-xs text-muted-foreground">Serviços</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {formatCurrency(category.totalRevenue)}
                </div>
                <div className="text-xs text-muted-foreground">Receita</div>
              </div>
            </div>

            {/* Average Price */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Preço Médio:</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(category.averagePrice)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewCategory(category)}
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
                onClick={() => handleEditCategory(category)}
                className="flex-1"
                iconName="Edit"
                iconPosition="left"
                iconSize={14}
              >
                Editar
              </Button>
              <Button
                variant={category.status === 'active' ? 'outline' : 'default'}
                size="sm"
                onClick={() => handleStatusChange(category.id, category.status === 'active' ? 'inactive' : 'active')}
                iconName={category.status === 'active' ? 'PauseCircle' : 'PlayCircle'}
                iconSize={14}
                title={category.status === 'active' ? 'Desativar categoria' : 'Ativar categoria'}
              />
            </div>

            {/* Last Updated */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Atualizado em: {new Date(category.updatedAt).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        ))}

        {/* Add New Category Card */}
        <div
          onClick={handleNewCategory}
          className="bg-background border-2 border-dashed border-border rounded-lg p-6 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center min-h-[280px]"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <Icon name="Plus" size={24} className="text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Nova Categoria</h3>
          <p className="text-sm text-muted-foreground text-center">
            Clique para adicionar uma nova categoria de serviços
          </p>
        </div>
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Grid3X3" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhuma categoria encontrada
          </h3>
          <p className="text-muted-foreground mb-6">
            Comece criando sua primeira categoria de serviços
          </p>
          <Button onClick={handleNewCategory} iconName="Plus">
            Criar Primeira Categoria
          </Button>
        </div>
      )}

      {/* Category Modal */}
      <CategoryModal
        category={categoryModal.category}
        isOpen={categoryModal.isOpen}
        mode={categoryModal.mode}
        onClose={() => setCategoryModal({ isOpen: false, category: null, mode: 'view' })}
        onSave={handleSaveCategory}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
};

export default CategoryManagement;
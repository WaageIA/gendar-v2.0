import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Maria Silva",
      rating: 5,
      comment: "Excelente atendimento! O agendamento online é muito prático e o serviço foi impecável.",
      service: "Corte e Escova",
      date: "2024-12-15",
      status: "approved",
      email: "maria@email.com"
    },
    {
      id: 2,
      name: "João Santos",
      rating: 5,
      comment: "Profissionais muito qualificados. Sempre saio satisfeito e o sistema de agendamento facilita muito.",
      service: "Barba e Cabelo",
      date: "2025-01-10",
      status: "approved",
      email: "joao@email.com"
    },
    {
      id: 3,
      name: "Ana Costa",
      rating: 5,
      comment: "Ambiente acolhedor e serviço de qualidade. Recomendo para todas as amigas!",
      service: "Manicure e Pedicure",
      date: "2025-01-15",
      status: "pending",
      email: "ana@email.com"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    service: '',
    date: new Date().toISOString().split('T')[0],
    status: 'approved'
  });

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData(testimonial);
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: '',
        email: '',
        rating: 5,
        comment: '',
        service: '',
        date: new Date().toISOString().split('T')[0],
        status: 'approved'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingTestimonial) {
      // Editar depoimento existente
      setTestimonials(prev => prev.map(t => 
        t.id === editingTestimonial.id ? { ...formData, id: t.id } : t
      ));
    } else {
      // Adicionar novo depoimento
      const newTestimonial = {
        ...formData,
        id: Math.max(...testimonials.map(t => t.id)) + 1
      };
      setTestimonials(prev => [...prev, newTestimonial]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este depoimento?')) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setTestimonials(prev => prev.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    ));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-amber-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { label: 'Aprovado', color: 'bg-green-100 text-green-800' },
      pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
      rejected: { label: 'Rejeitado', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const approvedCount = testimonials.filter(t => t.status === 'approved').length;
  const pendingCount = testimonials.filter(t => t.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Gerenciamento de Depoimentos
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {approvedCount} aprovados • {pendingCount} pendentes • {testimonials.length} total
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon name="Plus" size={16} className="mr-2" />
          Adicionar Depoimento
        </Button>
      </div>

      {/* Testimonials List */}
      <div className="bg-card border border-border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Cliente
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Avaliação
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Comentário
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Serviço
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="border-b border-border last:border-b-0">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(testimonial.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-foreground max-w-xs truncate">
                      "{testimonial.comment}"
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-foreground">{testimonial.service}</span>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(testimonial.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {testimonial.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(testimonial.id, 'approved')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Icon name="Check" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(testimonial.id, 'rejected')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenModal(testimonial)}
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {editingTestimonial ? 'Editar Depoimento' : 'Adicionar Depoimento'}
              </h3>
              <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Avaliação
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-md"
                  >
                    {[1, 2, 3, 4, 5].map(rating => (
                      <option key={rating} value={rating}>
                        {rating} estrela{rating > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                  >
                    <option value="approved">Aprovado</option>
                    <option value="pending">Pendente</option>
                    <option value="rejected">Rejeitado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Serviço
                  </label>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Comentário
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingTestimonial ? 'Salvar' : 'Adicionar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagement;
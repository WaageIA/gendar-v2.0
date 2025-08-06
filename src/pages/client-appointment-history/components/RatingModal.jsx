import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';

const RatingModal = ({ appointment, onClose, onSubmit }) => {
  const [rating, setRating] = useState(appointment?.rating || 0);
  const [review, setReview] = useState(appointment?.review || '');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(appointment?.id, rating, review);
      setIsSubmitting(false);
    }, 1000);
  };

  const formatDateTime = (date, time) => {
    const fullDate = new Date(date);
    return format(fullDate, "dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR });
  };

  const ratingLabels = {
    1: 'Muito Ruim',
    2: 'Ruim',
    3: 'Regular',
    4: 'Bom',
    5: 'Excelente'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Avaliar Serviço
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Appointment Info */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-foreground mb-1">
              {appointment?.serviceName}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              com {appointment?.providerName}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDateTime(appointment?.date, appointment?.time)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Como você avalia este serviço?
              </label>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 hover:scale-110 transition-transform"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Icon
                      name="Star"
                      size={24}
                      className={
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400" :"text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
              {(hoveredRating || rating) > 0 && (
                <p className="text-sm text-muted-foreground">
                  {ratingLabels?.[hoveredRating || rating]}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Conte mais sobre sua experiência (opcional)
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e?.target?.value)}
                placeholder="Compartilhe sua experiência com este serviço..."
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {review?.length}/500 caracteres
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={rating === 0 || isSubmitting}
                loading={isSubmitting}
              >
                {appointment?.rating ? 'Atualizar Avaliação' : 'Enviar Avaliação'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PreviewButton = () => {
  const handlePreview = () => {
    // Abrir em nova aba
    window.open('/public-booking-interface', '_blank');
  };

  return (
    <Button onClick={handlePreview} className="flex items-center space-x-2">
      <Icon name="Eye" size={16} />
      <span>Visualizar Interface</span>
      <Icon name="ExternalLink" size={14} />
    </Button>
  );
};

export default PreviewButton;
import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  color = 'primary',
  description 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'primary':
        return 'text-primary bg-primary/10';
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground mb-1">
            {value}
          </p>
          {change && (
            <p className={`text-sm ${getChangeColor()}`}>
              {change}
            </p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-2">
              {description}
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-full ${getIconColor()}`}>
            <Icon name={icon} size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
import React from 'react';
import Icon from '../AppIcon';

const PublicBookingHeader = ({ businessName = "ServiceHub Pro", businessPhone = "+55 11 99999-9999" }) => {
  const handleCallClick = () => {
    window.location.href = `tel:${businessPhone}`;
  };

  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Business Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{businessName}</h1>
              <p className="text-sm text-muted-foreground">Agendamento Online</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex items-center space-x-4">
            {/* Phone Number */}
            <button
              onClick={handleCallClick}
              className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="Phone" size={16} />
              <span>{businessPhone}</span>
            </button>

            {/* Mobile Phone Button */}
            <button
              onClick={handleCallClick}
              className="sm:hidden flex items-center justify-center w-10 h-10 bg-muted rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-smooth"
            >
              <Icon name="Phone" size={18} />
            </button>

            {/* Trust Indicators */}
            <div className="hidden md:flex items-center space-x-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={14} />
                <span>Seguro</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>Confirmação Instantânea</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Indicators */}
        <div className="md:hidden flex items-center justify-center space-x-6 mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} />
            <span>Seguro</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Confirmação Instantânea</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Star" size={14} />
            <span>Avaliado 5.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicBookingHeader;
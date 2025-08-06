import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { id: 1, title: 'Serviço', icon: 'Briefcase' },
    { id: 2, title: 'Data & Hora', icon: 'Calendar' },
    { id: 3, title: 'Dados', icon: 'User' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isLast = index === steps?.length - 1;

          return (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center space-y-2">
                {/* Step Circle */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                  ${status === 'completed' 
                    ? 'bg-success text-white' 
                    : status === 'current' ?'bg-primary text-white' :'bg-muted text-muted-foreground border border-border'
                  }
                `}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </div>

                {/* Step Title */}
                <div className="text-center">
                  <p className={`text-xs font-medium ${
                    status === 'current' ?'text-primary' 
                      : status === 'completed' ?'text-success' :'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </p>
                </div>
              </div>
              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className={`h-0.5 transition-all duration-200 ${
                    step?.id < currentStep ? 'bg-success' : 'bg-border'
                  }`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progresso</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoyaltyProgram = ({ points = 0, rewards = [], onRewardRedeem }) => {
  const nextRewardThreshold = 500;
  const pointsProgress = (points / nextRewardThreshold) * 100;
  const pointsToNext = nextRewardThreshold - points;

  const availableRewards = rewards?.filter(reward => points >= reward?.pointsCost && reward?.available);
  const upcomingRewards = rewards?.filter(reward => points < reward?.pointsCost || !reward?.available);

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Icon name="Gift" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Programa de Fidelidade
            </h2>
            <p className="text-sm text-muted-foreground">
              Acumule pontos e ganhe recompensas
            </p>
          </div>
        </div>

        {/* Points Display */}
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Star" size={20} className="text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">{points}</span>
            <span className="text-lg font-medium text-purple-600">pontos</span>
          </div>
          
          {/* Progress to Next Reward */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Próxima recompensa</span>
              <span className="text-foreground font-medium">{points}/{nextRewardThreshold}</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(pointsProgress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {pointsToNext > 0 ? `${pointsToNext} pontos para próxima recompensa` : 'Parabéns! Você pode resgatar recompensas'}
            </p>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      {availableRewards?.length > 0 && (
        <div className="p-6 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Gift" size={16} className="text-green-600" />
            <span>Recompensas Disponíveis</span>
          </h3>
          <div className="space-y-3">
            {availableRewards?.map((reward) => (
              <div key={reward?.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="Gift" size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{reward?.title}</h4>
                    <p className="text-xs text-muted-foreground">{reward?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">
                    {reward?.pointsCost} pontos
                  </p>
                  <Button
                    size="xs"
                    onClick={() => onRewardRedeem?.(reward?.id)}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Resgatar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Rewards */}
      <div className="p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-orange-600" />
          <span>Próximas Recompensas</span>
        </h3>
        
        {upcomingRewards?.length > 0 ? (
          <div className="space-y-3">
            {upcomingRewards?.map((reward) => (
              <div key={reward?.id} className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded-lg opacity-75">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="Lock" size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{reward?.title}</h4>
                    <p className="text-xs text-muted-foreground">{reward?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-foreground">
                    {reward?.pointsCost} pontos
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Faltam {reward?.pointsCost - points}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <Icon name="Sparkles" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Mais recompensas em breve!
            </p>
          </div>
        )}
      </div>

      {/* How to Earn Points */}
      <div className="p-6 border-t border-border bg-muted/30">
        <h4 className="text-sm font-medium text-foreground mb-3">Como Ganhar Pontos</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="CheckCircle" size={14} className="text-green-600" />
            <span>1 ponto = R$ 1,00 gasto em serviços</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="CheckCircle" size={14} className="text-green-600" />
            <span>Bônus de 25 pontos no seu aniversário</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="CheckCircle" size={14} className="text-green-600" />
            <span>10 pontos por cada indicação de amigo</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="CheckCircle" size={14} className="text-green-600" />
            <span>Pontos extras em promoções especiais</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
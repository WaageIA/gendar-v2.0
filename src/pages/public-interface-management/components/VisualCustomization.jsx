import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VisualCustomization = () => {
  const [customization, setCustomization] = useState({
    logo: null,
    logoUrl: '',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    accentColor: '#10b981',
    welcomeMessage: 'Bem-vindo ao nosso sistema de agendamento!',
    headerTitle: 'Agende seu Horário',
    headerSubtitle: 'Escolha o melhor horário para você',
    footerMessage: 'Obrigado por escolher nossos serviços!'
  });

  const [dragActive, setDragActive] = useState(false);

  const handleColorChange = (colorType, value) => {
    setCustomization(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const handleTextChange = (field, value) => {
    setCustomization(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomization(prev => ({
          ...prev,
          logo: file,
          logoUrl: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleRemoveLogo = () => {
    setCustomization(prev => ({
      ...prev,
      logo: null,
      logoUrl: ''
    }));
  };

  const handleSave = () => {
    // Aqui salvaria as customizações
    console.log('Salvando customizações:', customization);
    // Mostrar toast de sucesso
  };

  const colorPresets = [
    { name: 'Azul Clássico', primary: '#3b82f6', secondary: '#64748b', accent: '#10b981' },
    { name: 'Verde Natureza', primary: '#10b981', secondary: '#6b7280', accent: '#f59e0b' },
    { name: 'Roxo Moderno', primary: '#8b5cf6', secondary: '#64748b', accent: '#06b6d4' },
    { name: 'Rosa Elegante', primary: '#ec4899', secondary: '#6b7280', accent: '#8b5cf6' },
    { name: 'Laranja Vibrante', primary: '#f97316', secondary: '#64748b', accent: '#10b981' }
  ];

  const applyColorPreset = (preset) => {
    setCustomization(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Customização Visual
        </h2>
        <Button onClick={handleSave}>
          <Icon name="Save" size={16} className="mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Upload */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Logo da Empresa
          </h3>
          
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {customization.logoUrl ? (
              <div className="space-y-4">
                <img
                  src={customization.logoUrl}
                  alt="Logo preview"
                  className="max-h-32 mx-auto rounded-lg"
                />
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('logo-upload').click()}
                  >
                    <Icon name="Upload" size={16} className="mr-2" />
                    Alterar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveLogo}
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Remover
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Icon name="Upload" size={48} className="mx-auto text-muted-foreground" />
                <div>
                  <p className="text-foreground font-medium">
                    Arraste uma imagem aqui ou clique para selecionar
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    PNG, JPG ou SVG até 2MB
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('logo-upload').click()}
                >
                  Selecionar Arquivo
                </Button>
              </div>
            )}
          </div>
          
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>

        {/* Color Customization */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Cores do Tema
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cor Primária
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="w-12 h-10 rounded border border-border"
                />
                <input
                  type="text"
                  value={customization.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cor Secundária
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={customization.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 rounded border border-border"
                />
                <input
                  type="text"
                  value={customization.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cor de Destaque
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={customization.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                  className="w-12 h-10 rounded border border-border"
                />
                <input
                  type="text"
                  value={customization.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Color Presets */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Paletas Pré-definidas
            </label>
            <div className="grid grid-cols-1 gap-2">
              {colorPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyColorPreset(preset)}
                  className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex space-x-1">
                    <div 
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: preset.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: preset.accent }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Text Customization */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Mensagens Personalizadas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Título do Cabeçalho
            </label>
            <input
              type="text"
              value={customization.headerTitle}
              onChange={(e) => handleTextChange('headerTitle', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Subtítulo do Cabeçalho
            </label>
            <input
              type="text"
              value={customization.headerSubtitle}
              onChange={(e) => handleTextChange('headerSubtitle', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Mensagem de Boas-vindas
            </label>
            <input
              type="text"
              value={customization.welcomeMessage}
              onChange={(e) => handleTextChange('welcomeMessage', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Mensagem do Rodapé
            </label>
            <input
              type="text"
              value={customization.footerMessage}
              onChange={(e) => handleTextChange('footerMessage', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualCustomization;
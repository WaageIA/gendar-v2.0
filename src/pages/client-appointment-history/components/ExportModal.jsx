import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ appointments, onClose, currentUser }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('all');
  const [includePhotos, setIncludePhotos] = useState(false);
  const [includeReviews, setIncludeReviews] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV (Excel)' },
    { value: 'json', label: 'JSON' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'Todo o Período' },
    { value: 'year', label: 'Último Ano' },
    { value: '6months', label: 'Últimos 6 Meses' },
    { value: '3months', label: 'Últimos 3 Meses' },
    { value: 'month', label: 'Último Mês' }
  ];

  const filterAppointmentsByDateRange = (appointments, range) => {
    if (range === 'all') return appointments;

    const now = new Date();
    const cutoffDate = new Date();

    switch (range) {
      case 'month':
        cutoffDate?.setMonth(now?.getMonth() - 1);
        break;
      case '3months':
        cutoffDate?.setMonth(now?.getMonth() - 3);
        break;
      case '6months':
        cutoffDate?.setMonth(now?.getMonth() - 6);
        break;
      case 'year':
        cutoffDate?.setFullYear(now?.getFullYear() - 1);
        break;
      default:
        return appointments;
    }

    return appointments?.filter(apt => new Date(apt?.date) >= cutoffDate);
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Filter appointments by date range
    const filteredAppointments = filterAppointmentsByDateRange(appointments, dateRange);

    try {
      switch (exportFormat) {
        case 'pdf':
          await exportToPDF(filteredAppointments);
          break;
        case 'csv':
          await exportToCSV(filteredAppointments);
          break;
        case 'json':
          await exportToJSON(filteredAppointments);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Erro ao exportar:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = async (data) => {
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you would use a library like jsPDF
    const fileName = `historico-servicos-${format(new Date(), 'dd-MM-yyyy')}.pdf`;
    console.log(`Exportando para PDF: ${fileName}`, data);
    
    // Mock download
    alert('PDF gerado com sucesso! (Esta é uma simulação)');
    onClose();
  };

  const exportToCSV = async (data) => {
    const csvHeader = [
      'Data',
      'Hora',
      'Serviço',
      'Profissional',
      'Status',
      'Duração (min)',
      'Valor',
      'Avaliação',
      includeReviews ? 'Comentário' : null,
      'Observações'
    ]?.filter(Boolean)?.join(',');

    const csvRows = data?.map(apt => {
      const row = [
        format(new Date(apt?.date), 'dd/MM/yyyy', { locale: ptBR }),
        apt?.time,
        `"${apt?.serviceName}"`,
        `"${apt?.providerName}"`,
        apt?.status,
        apt?.duration,
        apt?.price?.toFixed(2)?.replace('.', ','),
        apt?.rating || '',
        includeReviews && apt?.review ? `"${apt?.review?.replace(/"/g, '""')}"` : null,
        apt?.notes ? `"${apt?.notes?.replace(/"/g, '""')}"` : ''
      ]?.filter(item => item !== null);
      
      return row?.join(',');
    });

    const csvContent = [csvHeader, ...csvRows]?.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link?.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link?.setAttribute('href', url);
      link?.setAttribute('download', `historico-servicos-${format(new Date(), 'dd-MM-yyyy')}.csv`);
      link.style.visibility = 'hidden';
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
    }
    
    onClose();
  };

  const exportToJSON = async (data) => {
    const exportData = {
      cliente: currentUser,
      dataExportacao: new Date()?.toISOString(),
      periodo: dateRangeOptions?.find(opt => opt?.value === dateRange)?.label,
      agendamentos: data?.map(apt => ({
        id: apt?.id,
        serviceName: apt?.serviceName,
        providerName: apt?.providerName,
        date: apt?.date,
        time: apt?.time,
        status: apt?.status,
        duration: apt?.duration,
        price: apt?.price,
        rating: apt?.rating,
        review: includeReviews ? apt?.review : null,
        notes: apt?.notes,
        photos: includePhotos ? apt?.photos : []
      }))
    };

    const jsonContent = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    
    if (link?.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link?.setAttribute('href', url);
      link?.setAttribute('download', `historico-servicos-${format(new Date(), 'dd-MM-yyyy')}.json`);
      link.style.visibility = 'hidden';
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
    }
    
    onClose();
  };

  const filteredCount = filterAppointmentsByDateRange(appointments, dateRange)?.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Exportar Histórico
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
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Formato de Exportação
            </label>
            <Select
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Período
            </label>
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {filteredCount} agendamentos serão incluídos
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              Opções de Exportação
            </h3>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeReviews"
                checked={includeReviews}
                onChange={(e) => setIncludeReviews(e?.target?.checked)}
              />
              <label htmlFor="includeReviews" className="text-sm text-foreground">
                Incluir avaliações e comentários
              </label>
            </div>

            {exportFormat === 'json' && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includePhotos"
                  checked={includePhotos}
                  onChange={(e) => setIncludePhotos(e?.target?.checked)}
                />
                <label htmlFor="includePhotos" className="text-sm text-foreground">
                  Incluir links das fotos (JSON apenas)
                </label>
              </div>
            )}
          </div>

          {/* Preview Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-foreground font-medium mb-1">
                  Sobre a Exportação
                </p>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• PDF: Relatório formatado para impressão</li>
                  <li>• CSV: Dados tabulares para Excel/Sheets</li>
                  <li>• JSON: Dados estruturados completos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isExporting}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleExport}
            className="flex-1"
            loading={isExporting}
            iconName="Download"
          >
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
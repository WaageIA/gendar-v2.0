import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const ExportActions = ({ clients = [], onBulkAction }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      // Create CSV content
      const headers = [
        'Nome',
        'Email', 
        'Telefone',
        'Status',
        'Último Agendamento',
        'Total Serviços',
        'Valor Total',
        'Data Cadastro'
      ];

      const csvContent = [
        headers?.join(','),
        ...clients?.map(client => [
          client?.name,
          client?.email,
          client?.phone,
          client?.status,
          client?.lastAppointment || '',
          client?.totalServices,
          client?.totalSpent,
          client?.registrationDate
        ]?.join(','))
      ]?.join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link?.setAttribute('href', url);
      link?.setAttribute('download', `clientes-${new Date()?.toISOString()?.split('T')?.[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
    } catch (error) {
      console.error('Erro ao exportar:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // Generate PDF report
      const reportData = clients?.map(client => ({
        nome: client?.name,
        email: client?.email,
        telefone: client?.phone,
        status: client?.status,
        servicos: client?.totalServices,
        valor: `R$ ${client?.totalSpent?.toFixed(2)}`
      }));

      console.log('Generating PDF report with data:', reportData);
      // In a real app, you would use a PDF library like jsPDF or send to backend
      alert('Funcionalidade de PDF será implementada com biblioteca específica');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = `
      <html>
        <head>
          <title>Lista de Clientes</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .header { text-align: center; margin-bottom: 20px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Lista de Clientes</h1>
            <p>Data: ${new Date()?.toLocaleDateString('pt-BR')}</p>
            <p>Total: ${clients?.length} clientes</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Total Serviços</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              ${clients?.map(client => `
                <tr>
                  <td>${client?.name}</td>
                  <td>${client?.email}</td>
                  <td>${client?.phone}</td>
                  <td>${client?.status}</td>
                  <td>${client?.totalServices}</td>
                  <td>R$ ${client?.totalSpent?.toFixed(2)}</td>
                </tr>
              `)?.join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    printWindow?.document?.write(printContent);
    printWindow?.document?.close();
    printWindow?.focus();
    printWindow?.print();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportCSV}
        loading={isExporting}
        iconName="Download"
        iconPosition="left"
      >
        Exportar CSV
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportPDF}
        loading={isExporting}
        iconName="FileText"
        iconPosition="left"
      >
        Gerar PDF
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handlePrint}
        iconName="Printer"
        iconPosition="left"
      >
        Imprimir
      </Button>
    </div>
  );
};

export default ExportActions;
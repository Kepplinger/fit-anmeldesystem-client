export interface BaseCsvExportComponent {
  csv: any[];

  getEntryCount(): number;

  downloadCSV(): void;
}

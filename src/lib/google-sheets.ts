import { google } from 'googleapis'
import { Passageiro } from '../app/types/index'

export class GoogleSheetsService {
  private sheets
  private spreadsheetId: string

  constructor() {
    // Inicializar com suas credenciais
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    this.sheets = google.sheets({ version: 'v4', auth })
    this.spreadsheetId = process.env.SPREADSHEET_ID!
  }

  async getPassageiros(): Promise<Passageiro[]> {
    const range = 'Passageiros!A2:F' // Ajuste conforme sua planilha
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range,
    })

    if (!response.data.values) {
      return []
    }

    return this.parsePassageiros(response.data.values)
  }

  async updatePassageiro(id: string, data: Partial<Passageiro>) {
    // Implementar atualização
  }

  async deletePassageiro(id: string) {
    // Implementar deleção
  }

  private parsePassageiros(values: any[]): Passageiro[] {
    return values.map((row) => ({
      id: row[0],
      nome: row[1],
      status: row[2],
      cpfRg: row[3],
      telefone: row[4],
      dataPagamento: row[5] ? new Date(row[5]) : undefined
    }));
  }
} 
import { google } from 'googleapis'
import { Passageiro } from '../app/types/index'

export class GoogleSheetsService {
  private sheets
  private spreadsheetId: string
  private sheetName: string

  constructor() {
    const credentials = {
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    }

    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    this.sheets = google.sheets({ version: 'v4', auth })
    this.spreadsheetId = process.env.SPREADSHEET_ID!
    this.sheetName = process.env.SHEET_NAME!
  }

  async getPassageiros(): Promise<Passageiro[]> {
    const range = `${this.sheetName}!A2:F`
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range,
    })

    return this.parsePassageiros(response.data.values || [])
  }

  async updatePassageiro(id: string, data: Partial<Passageiro>) {
    const passageiros = await this.getPassageiros()
    const rowIndex = passageiros.findIndex(p => p.id === id)
    
    if (rowIndex === -1) {
      throw new Error('Passageiro não encontrado')
    }

    const range = `${this.sheetName}!A${rowIndex + 2}:F${rowIndex + 2}`
    const updatedPassageiro = { ...passageiros[rowIndex], ...data }
    
    await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [this.passageiroToRow(updatedPassageiro)],
      },
    })

    return updatedPassageiro
  }

  async deletePassageiro(id: string) {
    const passageiros = await this.getPassageiros()
    const rowIndex = passageiros.findIndex(p => p.id === id)
    
    if (rowIndex === -1) {
      throw new Error('Passageiro não encontrado')
    }

    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        requests: [{
          deleteDimension: {
            range: {
              sheetId: 0, // Você precisará obter o sheetId correto
              dimension: 'ROWS',
              startIndex: rowIndex + 1,
              endIndex: rowIndex + 2,
            },
          },
        }],
      },
    })
  }

  async addPassageiro(data: Omit<Passageiro, 'id'>): Promise<Passageiro> {
    const newId = this.generateId()
    const newPassageiro = { id: newId, ...data }

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: `${this.sheetName}!A:F`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [this.passageiroToRow(newPassageiro)],
      },
    })

    return newPassageiro
  }

  private parsePassageiros(values: any[]): Passageiro[] {
    return values.map(row => ({
      id: row[0],
      nome: row[1],
      status: row[2],
      cpfRg: row[3],
      telefone: row[4],
      dataPagamento: row[5] ? new Date(row[5]) : undefined,
    }))
  }

  private passageiroToRow(passageiro: Passageiro): any[] {
    return [
      passageiro.id,
      passageiro.nome,
      passageiro.status,
      passageiro.cpfRg,
      passageiro.telefone,
      passageiro.dataPagamento ? passageiro.dataPagamento.toISOString() : '',
    ]
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}
import { google } from 'googleapis'
import { Passageiro } from '../app/types/index'

export class GoogleSheetsService {
  private sheets
  private spreadsheetId: string
  private sheetName: string

  constructor() {
    try {
      console.log('Iniciando GoogleSheetsService...')
      const credentials = {
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      }

      console.log('Credenciais carregadas:', {
        hasPrivateKey: !!credentials.private_key,
        clientEmail: credentials.client_email,
        spreadsheetId: process.env.SPREADSHEET_ID,
        sheetName: process.env.SHEET_NAME
      })

      const auth = new google.auth.JWT(
        credentials.client_email,
        undefined,
        credentials.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
      )

      this.sheets = google.sheets({ version: 'v4', auth })
      this.spreadsheetId = process.env.SPREADSHEET_ID!
      this.sheetName = process.env.SHEET_NAME!
      
      console.log('GoogleSheetsService inicializado com sucesso')
    } catch (error) {
      console.error('Erro ao inicializar GoogleSheetsService:', error)
      throw error
    }
  }

  async getPassageiros(): Promise<Passageiro[]> {
    try {
      // Ajustando o range para ler todas as linhas
      const range = `${this.sheetName}!A2:F`
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      })

      console.log('Dados recebidos:', response.data)
      return this.parsePassageiros(response.data.values || [])
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      throw error
    }
  }

  async updatePassageiro(id: string, data: Partial<Passageiro>) {
    const passageiros = await this.getPassageiros()
    const rowIndex = passageiros.findIndex(p => p.id === id)
    
    if (rowIndex === -1) {
      throw new Error('Passageiro não encontrado')
    }

    const range = `${this.sheetName}!A${rowIndex + 2}:F${rowIndex + 2}`
    const updatedPassageiro = { 
      ...passageiros[rowIndex], 
      ...data,
      // Garante que a data seja um objeto Date
      dataPagamento: data.dataPagamento ? new Date(data.dataPagamento) : passageiros[rowIndex].dataPagamento
    }
    
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
    try {
      // 1. Buscar todos os passageiros
      const passageiros = await this.getPassageiros()
      
      // 2. Filtrar o passageiro a ser deletado
      const remainingPassageiros = passageiros.filter(p => p.id !== id)
      
      // 3. Limpar toda a área de dados
      const clearRange = `${this.sheetName}!A2:F1000` // Ajuste o range conforme necessário
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: clearRange,
      })

      // 4. Reescrever apenas os dados válidos
      if (remainingPassageiros.length > 0) {
        const range = `${this.sheetName}!A2:F${remainingPassageiros.length + 1}`
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: {
            values: remainingPassageiros.map(p => this.passageiroToRow(p))
          },
        })
      }

      return true
    } catch (error) {
      console.error('Erro ao deletar passageiro:', error)
      throw error
    }
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
    return values
      .filter(row => row && row[1] && row[1].trim() !== '') // Filtra linhas vazias
      .map(row => ({
        id: row[0],
        nome: row[1],
        status: row[2],
        cpfRg: row[3],
        telefone: row[4],
        dataPagamento: row[5] ? new Date(row[5]) : null,
      }))
  }

  private passageiroToRow(passageiro: Passageiro): any[] {
    return [
      passageiro.id,
      passageiro.nome,
      passageiro.status,
      passageiro.cpfRg,
      passageiro.telefone,
      // Verifica se dataPagamento é uma string de data ou objeto Date
      passageiro.dataPagamento 
        ? (passageiro.dataPagamento instanceof Date 
            ? passageiro.dataPagamento.toISOString() 
            : new Date(passageiro.dataPagamento).toISOString())
        : '',
    ]
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}
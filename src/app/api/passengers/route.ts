import { GoogleSheetsService } from '../../../lib/google-sheets'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Iniciando busca de passageiros...')
    const service = new GoogleSheetsService()
    const passengers = await service.getPassageiros()
    console.log('Passageiros encontrados:', passengers)
    return NextResponse.json(passengers)
  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: 'Falha ao buscar passageiros' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const service = new GoogleSheetsService()
    const data = await request.json()
    const newPassenger = await service.addPassageiro(data)
    return NextResponse.json(newPassenger)
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao adicionar passageiro' },
      { status: 500 }
    )
  }
}
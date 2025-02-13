import { GoogleSheetsService } from '../../../lib/google-sheets'
import { NextResponse } from 'next/server'

const sheetsService = new GoogleSheetsService()

export async function GET() {
  try {
    const passengers = await sheetsService.getPassageiros()
    return NextResponse.json(passengers)
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao buscar passageiros' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newPassenger = await sheetsService.addPassageiro(data)
    return NextResponse.json(newPassenger)
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao adicionar passageiro' },
      { status: 500 }
    )
  }
}
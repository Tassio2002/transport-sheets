import { GoogleSheetsService } from '../../../lib/google-sheets'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const service = new GoogleSheetsService()
    const passengers = await service.getPassageiros()
    return NextResponse.json(passengers)
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao buscar passageiros' },
      { status: 500 }
    )
  }
} 
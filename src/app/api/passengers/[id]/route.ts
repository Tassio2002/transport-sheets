import { GoogleSheetsService } from '../../../../lib/google-sheets'
import { NextResponse } from 'next/server'

const sheetsService = new GoogleSheetsService()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const updated = await sheetsService.updatePassageiro(params.id, data)
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao atualizar passageiro' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await sheetsService.deletePassageiro(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao deletar passageiro' },
      { status: 500 }
    )
  }
}
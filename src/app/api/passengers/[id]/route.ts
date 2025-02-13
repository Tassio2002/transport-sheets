import { GoogleSheetsService } from '../../../../lib/google-sheets'
import { NextRequest, NextResponse } from 'next/server'

const sheetsService = new GoogleSheetsService()

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  if (!id) {
    return NextResponse.json(
      { error: 'ID não fornecido' },
      { status: 400 }
    )
  }

  try {
    const data = await request.json()
    const updated = await sheetsService.updatePassageiro(id, data)
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Erro ao atualizar:', error)
    return NextResponse.json(
      { error: 'Falha ao atualizar passageiro' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  if (!id) {
    return NextResponse.json(
      { error: 'ID não fornecido' },
      { status: 400 }
    )
  }

  try {
    await sheetsService.deletePassageiro(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar:', error)
    return NextResponse.json(
      { error: 'Falha ao deletar passageiro' },
      { status: 500 }
    )
  }
}
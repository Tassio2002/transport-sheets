import { z } from 'zod'

const cpfRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/
const rgRegex = /^(\d{1,2}\.?\d{3}\.?\d{3}-?[0-9A-Z])$/

export const passengerSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  status: z.enum(['PAGO', 'NOME CONFIRMADO', 'PENDENTE']),
  cpfRg: z.string()
    .refine((value) => {
      // Remove todos os caracteres especiais para validação
      const cleanValue = value.replace(/[^\dA-Z]/g, '')
      
      // Verifica se o valor limpo tem o tamanho correto
      if (cleanValue.length !== 11 && cleanValue.length !== 9) {
        return false
      }

      // Se for CPF (11 dígitos)
      if (cleanValue.length === 11) {
        // Verifica se são todos números
        if (!/^\d+$/.test(cleanValue)) {
          return false
        }
        return cpfRegex.test(value) || cpfRegex.test(cleanValue)
      }

      // Se for RG (9 caracteres)
      if (cleanValue.length === 9) {
        // Verifica se os primeiros 8 caracteres são números
        if (!/^\d{8}[0-9A-Z]$/.test(cleanValue)) {
          return false
        }
        return rgRegex.test(value) || rgRegex.test(cleanValue)
      }

      return false
    }, {
      message: 'Digite um CPF (000.000.000-00) ou RG (00.000.000-0) válido'
    }),
  telefone: z.string()
    .min(8, 'Telefone deve ter no mínimo 8 caracteres')
    .max(15, 'Telefone deve ter no máximo 15 caracteres')
    .optional(),
  dataPagamento: z.date().nullable(),
})

export type PassengerFormData = z.infer<typeof passengerSchema>
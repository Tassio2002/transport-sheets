import { z } from "zod"

export const passengerSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  status: z.enum(["PAGO", "NOME CONFIRMADO", "PENDENTE"]),
  cpfRg: z.string().min(1, "CPF/RG é obrigatório"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  dataPagamento: z.date().nullable()
})

export type PassengerFormData = z.infer<typeof passengerSchema> 
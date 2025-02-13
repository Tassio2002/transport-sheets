'use client'

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Passageiro } from "../../app/types/index"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "../../app/lib/utils"

interface PassengerFormProps {
  passenger: Passageiro | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Passageiro, 'id'>) => Promise<void>
}

const PassengerForm = ({
  passenger,
  open,
  onOpenChange,
  onSubmit,
}: PassengerFormProps) => {
  const [formData, setFormData] = useState<Partial<Passageiro>>(
    passenger || {
      nome: "",
      status: "PENDENTE",
      cpfRg: "",
      telefone: "",
      dataPagamento: undefined,
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.nome && formData.status && formData.cpfRg && formData.telefone) {
      await onSubmit({
        nome: formData.nome,
        status: formData.status,
        cpfRg: formData.cpfRg,
        telefone: formData.telefone,
        dataPagamento: formData.dataPagamento
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {passenger ? "Editar Passageiro" : "Novo Passageiro"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-medium">
              Nome
            </label>
            <Input
              id="nome"
              value={formData.nome || ""}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(value: Passageiro["status"]) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAGO">Pago</SelectItem>
                <SelectItem value="NOME CONFIRMADO">Nome Confirmado</SelectItem>
                <SelectItem value="PENDENTE">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="cpfRg" className="text-sm font-medium">
              CPF/RG
            </label>
            <Input
              id="cpfRg"
              value={formData.cpfRg || ""}
              onChange={(e) => setFormData({ ...formData, cpfRg: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="telefone" className="text-sm font-medium">
              Telefone
            </label>
            <Input
              id="telefone"
              value={formData.telefone || ""}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Data de Pagamento</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dataPagamento && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dataPagamento ? (
                    format(new Date(formData.dataPagamento), "dd/MM/yyyy", {
                      locale: ptBR,
                    })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    formData.dataPagamento
                      ? new Date(formData.dataPagamento)
                      : undefined
                  }
                  onSelect={(date) =>
                    setFormData({ ...formData, dataPagamento: date })
                  }
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PassengerForm 
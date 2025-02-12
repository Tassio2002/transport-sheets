'use client'

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Passageiro } from "../../app/types/index"
import { useState } from "react"

interface PassengerFormProps {
  passenger: Passageiro | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Partial<Passageiro>) => void
}

const PassengerForm = ({ passenger, open, onOpenChange, onSubmit }: PassengerFormProps) => {
  const [formData, setFormData] = useState<Partial<Passageiro>>(passenger || {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {passenger ? 'Editar Passageiro' : 'Novo Passageiro'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-medium">
              Nome
            </label>
            <Input
              id="nome"
              value={formData.nome || ''}
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
              onValueChange={(value: Passageiro['status']) =>
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
              value={formData.cpfRg || ''}
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
              value={formData.telefone || ''}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
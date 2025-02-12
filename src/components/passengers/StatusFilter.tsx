'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Passageiro } from "../../app/types/index"

interface StatusFilterProps {
  onStatusChange: (status: Passageiro['status'] | 'TODOS') => void
}

const StatusFilter = ({ onStatusChange }: StatusFilterProps) => {
  return (
    <Select onValueChange={onStatusChange} defaultValue="TODOS">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filtrar por status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="TODOS">Todos</SelectItem>
        <SelectItem value="PAGO">Pago</SelectItem>
        <SelectItem value="NOME CONFIRMADO">Nome Confirmado</SelectItem>
        <SelectItem value="PENDENTE">Pendente</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default StatusFilter 
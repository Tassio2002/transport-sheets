'use client'

import { Input } from "../ui/input"
import { Search } from "lucide-react"
import StatusFilter from "./StatusFilter"
import { Passageiro } from "../../app/types/index"

interface PassengersToolbarProps {
  onSearch: (value: string) => void
  onStatusChange: (status: Passageiro['status'] | 'TODOS') => void
}

const PassengersToolbar = ({ onSearch, onStatusChange }: PassengersToolbarProps) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar passageiro..."
          className="pl-8"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <StatusFilter onStatusChange={onStatusChange} />
    </div>
  )
}

export default PassengersToolbar 
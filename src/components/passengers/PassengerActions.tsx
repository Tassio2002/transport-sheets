'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Passageiro } from "../../app/types/index"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import PassengerForm from "./PassengerForm"

interface PassengerActionsProps {
  passenger: Passageiro
  onEdit: (data: Partial<Passageiro>) => void
  onDelete: (id: string) => void
}

const PassengerActions = ({ passenger, onEdit, onDelete }: PassengerActionsProps) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditing(true)} className="cursor-pointer">
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(passenger.id)}
            className="cursor-pointer text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PassengerForm
        passenger={passenger}
        open={isEditing}
        onOpenChange={setIsEditing}
        onSubmit={onEdit}
      />
    </>
  )
}

export default PassengerActions 
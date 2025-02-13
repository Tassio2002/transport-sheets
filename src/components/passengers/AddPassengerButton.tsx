'use client'

import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import PassengerForm from "./PassengerForm"
import { Passageiro } from "../../app/types/index"

interface AddPassengerButtonProps {
  onAdd: (data: Omit<Passageiro, 'id'>) => Promise<void>
}

const AddPassengerButton = ({ onAdd }: AddPassengerButtonProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Passageiro
      </Button>

      <PassengerForm
        passenger={null}
        open={open}
        onOpenChange={setOpen}
        onSubmit={onAdd}
      />
    </>
  )
}

export default AddPassengerButton 
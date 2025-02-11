import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Passageiro } from "../../app/types/index";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";

interface PassengerActionsProps {
  passenger: Passageiro;
}

const PassengerActions = ({ passenger }: PassengerActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => console.log("Editar", passenger.id)}
          className="cursor-pointer"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log("Excluir", passenger.id)}
          className="cursor-pointer text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PassengerActions; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Passageiro } from "../../app/types/index";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import StatusBadge from "./StatusBadge";
import PassengerActions from "./PassengerActions";

interface PassengersTableProps {
  passengers: Passageiro[];
}

const PassengersTable = ({ passengers }: PassengersTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CPF/RG</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data Pagamento</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {passengers.map((passenger) => (
            <TableRow key={passenger.id}>
              <TableCell className="font-medium">{passenger.nome}</TableCell>
              <TableCell>
                <StatusBadge status={passenger.status} />
              </TableCell>
              <TableCell>{passenger.cpfRg}</TableCell>
              <TableCell>{passenger.telefone}</TableCell>
              <TableCell>
                {passenger.dataPagamento
                  ? format(passenger.dataPagamento, "dd/MM/yyyy", {
                      locale: ptBR,
                    })
                  : "-"}
              </TableCell>
              <TableCell className="text-right">
                <PassengerActions passenger={passenger} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PassengersTable; 
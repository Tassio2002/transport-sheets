'use client'

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
import { useState } from "react";
import PassengersToolbar from "./PassengersToolbar";
import StatusBadge from "./StatusBadge";
import PassengerActions from "./PassengerActions";
import PaginationControls from "./PaginationControls";

interface PassengersTableProps {
  passengers: Passageiro[];
}

const PassengersTable = ({ passengers: initialPassengers }: PassengersTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Passageiro['status'] | 'TODOS'>("TODOS");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [passengers, setPassengers] = useState(initialPassengers);

  const filteredPassengers = passengers.filter((passenger) => {
    const matchesSearch = passenger.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "TODOS" || passenger.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPassengers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPassengers = filteredPassengers.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleEdit = (data: Partial<Passageiro>) => {
    setPassengers(passengers.map(p => 
      p.id === data.id ? { ...p, ...data } : p
    ));
    // Aqui você chamaria a API para atualizar os dados
  };

  const handleDelete = (id: string) => {
    setPassengers(passengers.filter(p => p.id !== id));
    // Aqui você chamaria a API para deletar o passageiro
  };

  return (
    <div className="space-y-4">
      <PassengersToolbar 
        onSearch={setSearchTerm} 
        onStatusChange={setStatusFilter}
      />
      
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
            {paginatedPassengers.map((passenger) => (
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
                  <PassengerActions
                    passenger={passenger}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default PassengersTable; 
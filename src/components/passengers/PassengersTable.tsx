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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import PassengersToolbar from "./PassengersToolbar";
import StatusBadge from "./StatusBadge";
import PassengerActions from "./PassengerActions";
import PaginationControls from "./PaginationControls";
import { Button } from "../ui/button";

interface PassengersTableProps {
  passengers: Passageiro[]
  loading: boolean
  onUpdate: (id: string, data: Partial<Passageiro>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const PassengersTable = ({ 
  passengers, 
  loading, 
  onUpdate, 
  onDelete 
}: PassengersTableProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<Passageiro['status'] | 'TODOS'>("TODOS")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [showCpfRg, setShowCpfRg] = useState(true)

  const validPassengers = passengers.filter(p => p.nome && p.nome.trim() !== '')

  const filteredPassengers = validPassengers.filter((passenger) => {
    const matchesSearch = passenger.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "TODOS" || passenger.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredPassengers.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedPassengers = filteredPassengers.slice(startIndex, startIndex + pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  const handleEdit = async (id: string, data: Partial<Passageiro>) => {
    await onUpdate(id, data)
  }

  const handleDelete = async (id: string) => {
    await onDelete(id)
  }

  const maskCpfRg = (cpfRg: string) => {
    return cpfRg.replace(/[0-9]/g, "*")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!validPassengers || validPassengers.length === 0) {
    return (
      <div className="text-center py-8">
        Nenhum passageiro encontrado
      </div>
    )
  }

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
              <TableHead>
                <div className="flex items-center gap-2">
                  CPF/RG
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCpfRg(!showCpfRg)}
                    className="h-6 w-6"
                  >
                    {showCpfRg ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPassengers.map((passenger) => {
              return (
                <TableRow key={passenger.id}>
                  <TableCell className="font-medium">{passenger.nome}</TableCell>
                  <TableCell>
                    <StatusBadge status={passenger.status} />
                  </TableCell>
                  <TableCell>
                    {showCpfRg ? passenger.cpfRg : maskCpfRg(passenger.cpfRg)}
                  </TableCell>
                  <TableCell>{passenger.telefone}</TableCell>
                  <TableCell>
                    {passenger.dataPagamento
                      ? format(new Date(passenger.dataPagamento), "dd/MM/yyyy", {
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
              )
            })}
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
  )
}

export default PassengersTable 
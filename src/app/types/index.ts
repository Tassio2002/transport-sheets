export interface Passageiro {
    id: string;
    nome: string;
    status: 'NOME CONFIRMADO' | 'PAGO' | 'PENDENTE';
    cpfRg: string;
    telefone: string;
    dataPagamento?: Date | null;
}

export interface Metricas {
    totalPassageiros: number;
    passagensPagas: number;
    totalRecebido: number;
    valorFaltante: number;
    dataEvento: Date;
    dataLimitePagamento: Date;
    diasLimitePagamento: number;
    diasParaEvento: number;
}
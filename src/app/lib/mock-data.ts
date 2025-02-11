import { Passageiro, Metricas } from "../types/index";

export const mockPassageiros: Passageiro[] = [
    {
        id: "1",
        nome: "João Silva",
        status: "PAGO",
        cpfRg: "123.456.789-00",
        telefone: "(11) 99999-9999",
        dataPagamento: new Date("2024-03-15"),
    },
    {
        id: "2",
        nome: "Maria Santos",
        status: "NOME CONFIRMADO",
        cpfRg: "987.654.321-00",
        telefone: "(11) 88888-8888",
    },
    {
        id: "3",
        nome: "Pedro Oliveira",
        status: "PENDENTE",
        cpfRg: "456.789.123-00",
        telefone: "(11) 77777-7777",
    },
    {
        id: "4",
        nome: "Ana Costa",
        status: "PAGO",
        cpfRg: "789.123.456-00",
        telefone: "(11) 66666-6666",
        dataPagamento: new Date("2024-03-13"),
    },
    {
        id: "5",
        nome: "Lucas Ferreira",
        status: "NOME CONFIRMADO",
        cpfRg: "321.654.987-00",
        telefone: "(11) 55555-5555",
    },
    {
        id: "6",
        nome: "Julia Rodrigues",
        status: "PENDENTE",
        cpfRg: "654.987.321-00",
        telefone: "(11) 44444-4444",
    },
    {
        id: "7",
        nome: "Marcos Almeida",
        status: "PAGO",
        cpfRg: "147.258.369-00",
        telefone: "(11) 33333-3333",
        dataPagamento: new Date("2024-03-11"),
    },
    {
        id: "8",
        nome: "Beatriz Lima",
        status: "NOME CONFIRMADO",
        cpfRg: "258.369.147-00",
        telefone: "(11) 22222-2222",
    },
    {
        id: "9",
        nome: "Gabriel Santos",
        status: "PENDENTE",
        cpfRg: "369.147.258-00",
        telefone: "(11) 11111-1111",
    },
    {
        id: "10",
        nome: "Carolina Souza",
        status: "PAGO",
        cpfRg: "741.852.963-00",
        telefone: "(11) 00000-0000",
        dataPagamento: new Date("2024-03-09"),
    },
    {
        id: "11",
        nome: "Ricardo Pereira",
        status: "NOME CONFIRMADO",
        cpfRg: "852.963.741-00",
        telefone: "(11) 12345-6789",
    },
    {
        id: "12",
        nome: "Fernanda Costa",
        status: "PENDENTE",
        cpfRg: "963.741.852-00",
        telefone: "(11) 98765-4321",
    },
    {
        id: "13",
        nome: "Thiago Martins",
        status: "PAGO",
        cpfRg: "159.357.846-00",
        telefone: "(11) 13579-2468",
        dataPagamento: new Date("2024-03-06"),
    },
    {
        id: "14",
        nome: "Amanda Silva",
        status: "NOME CONFIRMADO",
        cpfRg: "357.846.159-00",
        telefone: "(11) 24680-1357",
    },
    {
        id: "15",
        nome: "Bruno Oliveira",
        status: "PENDENTE",
        cpfRg: "846.159.357-00",
        telefone: "(11) 36925-1470",
    },
    {
        id: "16",
        nome: "Larissa Santos",
        status: "PAGO",
        cpfRg: "246.813.579-00",
        telefone: "(11) 14703-6925",
        dataPagamento: new Date("2024-03-04"),
    },
    {
        id: "17",
        nome: "Felipe Barbosa",
        status: "NOME CONFIRMADO",
        cpfRg: "813.579.246-00",
        telefone: "(11) 25814-7036",
    },
    {
        id: "18",
        nome: "Isabela Lima",
        status: "PENDENTE",
        cpfRg: "579.246.813-00",
        telefone: "(11) 36925-8147",
    },
    {
        id: "19",
        nome: "Rafael Costa",
        status: "PAGO",
        cpfRg: "135.792.468-00",
        telefone: "(11) 47036-9258",
        dataPagamento: new Date("2024-03-02"),
    },
    {
        id: "20",
        nome: "Camila Ferreira",
        status: "NOME CONFIRMADO",
        cpfRg: "792.468.135-00",
        telefone: "(11) 58147-0369",
    },
    {
        id: "21",
        nome: "Gustavo Alves",
        status: "PENDENTE",
        cpfRg: "468.135.792-00",
        telefone: "(11) 69258-1470",
    },
    {
        id: "22",
        nome: "Mariana Rodrigues",
        status: "PAGO",
        cpfRg: "234.567.891-00",
        telefone: "(11) 70369-2581",
        dataPagamento: new Date("2024-02-28"),
    },
    {
        id: "23",
        nome: "Leonardo Santos",
        status: "NOME CONFIRMADO",
        cpfRg: "567.891.234-00",
        telefone: "(11) 81470-3692",
    },
    {
        id: "24",
        nome: "Daniela Oliveira",
        status: "PENDENTE",
        cpfRg: "891.234.567-00",
        telefone: "(11) 92581-4703",
    },
    {
        id: "25",
        nome: "Henrique Lima",
        status: "PAGO",
        cpfRg: "345.678.912-00",
        telefone: "(11) 03692-5814",
        dataPagamento: new Date("2024-02-26"),
    },
    {
        id: "26",
        nome: "Letícia Costa",
        status: "NOME CONFIRMADO",
        cpfRg: "678.912.345-00",
        telefone: "(11) 14703-6925",
    },
    {
        id: "27",
        nome: "Vinícius Pereira",
        status: "PENDENTE",
        cpfRg: "912.345.678-00",
        telefone: "(11) 25814-7036",
    },
    {
        id: "28",
        nome: "Paula Martins",
        status: "PAGO",
        cpfRg: "432.765.198-00",
        telefone: "(11) 36925-8147",
        dataPagamento: new Date("2024-02-24"),
    },
    {
        id: "29",
        nome: "Eduardo Silva",
        status: "NOME CONFIRMADO",
        cpfRg: "765.198.432-00",
        telefone: "(11) 47036-9258",
    },
    {
        id: "30",
        nome: "Natália Santos",
        status: "PENDENTE",
        cpfRg: "198.432.765-00",
        telefone: "(11) 58147-0369",
    }
];

export const mockMetricas: Metricas = {
    totalPassageiros: 50,
    passagensPagas: 30,
    totalRecebido: 30000,
    valorFaltante: 20000,
    dataEvento: new Date("2024-06-15"),
    dataLimitePagamento: new Date("2024-05-15"),
    diasLimitePagamento: 30,
    diasParaEvento: 60,
};

export default mockPassageiros;
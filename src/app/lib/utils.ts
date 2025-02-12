import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Passageiro, Metricas } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export const calculateMetrics = (passengers: Passageiro[]): Metricas => {
  const totalPassageiros = passengers.length;
  const passagensPagas = passengers.filter(p => p.status === "PAGO").length;
  const valorPorPassagem = 28; // Valor fixo por passagem em reais

  return {
    totalPassageiros,
    passagensPagas,
    totalRecebido: passagensPagas * valorPorPassagem,
    valorFaltante: (totalPassageiros - passagensPagas) * valorPorPassagem,
    dataEvento: new Date("2025-03-15"),
    dataLimitePagamento: new Date("2025-05-01"),
    diasLimitePagamento: 30,
    diasParaEvento: 60
  };
};

import { formatCurrency } from "../../app/lib/utils";
import { Metricas } from "../../app/types/index";
import MetricCard from "./MetricCard";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MetricsGridProps {
  metrics: Metricas;
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total de Passageiros"
        value={metrics.totalPassageiros}
        description={`${metrics.passagensPagas} passagens pagas`}
      />
      
      <MetricCard
        title="Total Recebido"
        value={formatCurrency(metrics.totalRecebido)}
        description={`Faltam ${formatCurrency(metrics.valorFaltante)}`}
      />
      
      <MetricCard
        title="Data do Evento"
        value={format(metrics.dataEvento, "dd/MM/yyyy", { locale: ptBR })}
        description={`Faltam ${metrics.diasParaEvento} dias`}
      />
      
      <MetricCard
        title="Limite para Pagamento"
        value={format(metrics.dataLimitePagamento, "dd/MM/yyyy", { locale: ptBR })}
        description={`${metrics.diasLimitePagamento} dias restantes`}
      />
    </div>
  );
};

export default MetricsGrid; 
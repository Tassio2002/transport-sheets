import MetricsGrid from "../components/metrics/MetricsGrid";
import PassengersTable from "../components/passengers/PassengersTable";
import { mockMetricas, mockPassageiros } from "../app/lib/mock-data";

export default function Dashboard() {
  return (
    <main className="container mx-auto p-4 space-y-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Dashboard de Passageiros</h1>
        <p className="text-muted-foreground">
          Gerencie os passageiros e acompanhe os pagamentos
        </p>
      </header>

      <MetricsGrid metrics={mockMetricas} />
      
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Lista de Passageiros</h2>
        <PassengersTable passengers={mockPassageiros} />
      </div>
    </main>
  );
}

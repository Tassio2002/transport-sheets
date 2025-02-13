'use client'

import { usePassengers } from '../hooks/usePassengers'
import PassengersTable from '../components/passengers/PassengersTable'
import MetricsGrid from '../components/metrics/MetricsGrid'
import { calculateMetrics } from '../app/lib/utils'
import { Toaster } from '../components/ui/toaster'
import AddPassengerButton from '@components/components/passengers/AddPassengerButton'

export default function Dashboard() {
  const { 
    passengers, 
    loading, 
    addPassenger,
    updatePassenger, 
    deletePassenger 
  } = usePassengers()

  return (
    <>
      <main className="container mx-auto p-4 space-y-8">
        <header className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Dashboard de Passageiros</h1>
            <p className="text-muted-foreground">
              Gerencie os passageiros e acompanhe os pagamentos
            </p>
          </div>
          <AddPassengerButton onAdd={addPassenger} />
        </header>

        <MetricsGrid metrics={calculateMetrics(passengers)} />
        <PassengersTable 
          passengers={passengers}
          loading={loading}
          onUpdate={updatePassenger}
          onDelete={deletePassenger}
        />
      </main>
      <Toaster />
    </>
  )
}

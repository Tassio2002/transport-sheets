'use client'

import { Passageiro } from '../app/types'
import { useState, useEffect } from 'react'
import { mockPassageiros } from '../app/lib/mock-data'

export const usePassengers = () => {
  const [passengers, setPassengers] = useState<Passageiro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        // Por enquanto usando dados mock
        setPassengers(mockPassageiros)
        setLoading(false)
      } catch (err) {
        setError('Erro ao carregar passageiros')
        setLoading(false)
      }
    }

    fetchPassengers()
  }, [])

  return { passengers, loading, error }
} 
'use client'

import { Passageiro } from '../app/types/index'
import { useState, useEffect } from 'react'
import { useToast } from '../hooks/use-toast'

export const usePassengers = () => {
  const [passengers, setPassengers] = useState<Passageiro[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchPassengers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/passengers')
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error || 'Erro ao carregar dados')
      
      setPassengers(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os passageiros",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addPassenger = async (data: Omit<Passageiro, 'id'>) => {
    try {
      setLoading(true)
      const response = await fetch('/api/passengers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Falha ao adicionar')

      await fetchPassengers()
      toast({
        title: "Sucesso",
        description: "Passageiro adicionado com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o passageiro",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updatePassenger = async (id: string, data: Partial<Passageiro>) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/passengers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Falha ao atualizar')

      await fetchPassengers()
      toast({
        title: "Sucesso",
        description: "Passageiro atualizado com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o passageiro",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deletePassenger = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/passengers/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Falha ao deletar')

      await fetchPassengers()
      toast({
        title: "Sucesso",
        description: "Passageiro removido com sucesso",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o passageiro",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPassengers()
  }, [])

  return {
    passengers,
    loading,
    addPassenger,
    updatePassenger,
    deletePassenger,
  }
} 
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PassengerForm from '../PassengerForm'

describe('PassengerForm', () => {
  const mockOnSubmit = vi.fn()
  const mockOnOpenChange = vi.fn()

  const defaultProps = {
    passenger: null,
    open: true,
    onOpenChange: mockOnOpenChange,
    onSubmit: mockOnSubmit,
  }

  it('renders form fields correctly', () => {
    render(<PassengerForm {...defaultProps} />)

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/cpf\/rg/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data de pagamento/i)).toBeInTheDocument()
  })

  it('shows validation errors for invalid input', async () => {
    render(<PassengerForm {...defaultProps} />)

    const submitButton = screen.getByText(/salvar/i)
    fireEvent.click(submitButton)

    expect(await screen.findByText(/nome deve ter no mínimo/i)).toBeInTheDocument()
  })
}) 
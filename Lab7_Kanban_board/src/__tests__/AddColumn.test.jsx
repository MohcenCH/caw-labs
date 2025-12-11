import { render, screen, fireEvent } from '@testing-library/react'
import AddColumn from '../AddColumn'

describe('AddColumn', () => {
  const mockOnAddColumn = jest.fn()

  beforeEach(() => {
    mockOnAddColumn.mockClear()
  })

  it('renders the add column button', () => {
    render(<AddColumn onAddColumn={mockOnAddColumn} />)
    expect(screen.getByText('+ Add New Column')).toBeInTheDocument()
  })

  it('opens form when button is clicked', () => {
    render(<AddColumn onAddColumn={mockOnAddColumn} />)
    fireEvent.click(screen.getByText('+ Add New Column'))
    expect(screen.getByPlaceholderText(/enter column title/i)).toBeInTheDocument()
  })

  it('calls onAddColumn with title when form is submitted', () => {
    render(<AddColumn onAddColumn={mockOnAddColumn} />)
    fireEvent.click(screen.getByText('+ Add New Column'))
    
    const input = screen.getByPlaceholderText(/enter column title/i)
    fireEvent.change(input, { target: { value: 'New Column' } })
    fireEvent.submit(input.closest('form'))
    
    expect(mockOnAddColumn).toHaveBeenCalledWith('New Column')
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '../ThemeToggle'

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn()

  it('renders the theme toggle button', () => {
    render(<ThemeToggle theme="light" toggleTheme={mockToggleTheme} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('displays correct icon based on theme', () => {
    const { rerender } = render(<ThemeToggle theme="light" toggleTheme={mockToggleTheme} />)
    expect(screen.getByText('🌙')).toBeInTheDocument()
    
    rerender(<ThemeToggle theme="dark" toggleTheme={mockToggleTheme} />)
    expect(screen.getByText('☀️')).toBeInTheDocument()
  })

  it('calls toggleTheme when clicked', () => {
    render(<ThemeToggle theme="light" toggleTheme={mockToggleTheme} />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import TaskForm from '../TaskForm'

describe('TaskForm', () => {
  const mockOnAddTask = jest.fn()
  const mockColumns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' }
  ]

  beforeEach(() => {
    mockOnAddTask.mockClear()
  })

  it('renders the add task button initially', () => {
    render(<TaskForm onAddTask={mockOnAddTask} columns={mockColumns} />)
    expect(screen.getByText('+ Add Task')).toBeInTheDocument()
  })

  it('opens form when button is clicked', () => {
    render(<TaskForm onAddTask={mockOnAddTask} columns={mockColumns} />)
    fireEvent.click(screen.getByText('+ Add Task'))
    expect(screen.getByPlaceholderText(/enter task title/i)).toBeInTheDocument()
  })

  it('calls onAddTask when form is submitted', () => {
    render(<TaskForm onAddTask={mockOnAddTask} columns={mockColumns} defaultCategory="todo" />)
    fireEvent.click(screen.getByText('+ Add Task'))
    
    const titleInput = screen.getByPlaceholderText(/enter task title/i)
    fireEvent.change(titleInput, { target: { value: 'Test Task' } })
    fireEvent.submit(titleInput.closest('form'))
    
    expect(mockOnAddTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Task',
        category: 'todo'
      })
    )
  })
})

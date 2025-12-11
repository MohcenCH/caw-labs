import { render, screen, fireEvent } from '@testing-library/react'
import Column from '../Column'

describe('Column', () => {
  const mockColumn = { id: 'todo', title: 'To Do' }
  const mockTasks = [
    { id: '1', title: 'Task 1', description: '', category: 'todo', deadline: '', flag: null }
  ]
  const mockAllColumns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' }
  ]

  const defaultProps = {
    column: mockColumn,
    tasks: mockTasks,
    onUpdateTask: jest.fn(),
    onDeleteTask: jest.fn(),
    onMoveTask: jest.fn(),
    onUpdateColumnTitle: jest.fn(),
    onDeleteColumn: jest.fn(),
    onAddTask: jest.fn(),
    allColumns: mockAllColumns
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders column with title and tasks', () => {
    render(<Column {...defaultProps} />)
    expect(screen.getByRole('heading', { name: 'To Do' })).toBeInTheDocument()
    expect(screen.getByText('Task 1')).toBeInTheDocument()
  })

  it('allows editing column title', () => {
    render(<Column {...defaultProps} />)
    const title = screen.getByRole('heading', { name: 'To Do' })
    fireEvent.click(title)
    
    const inputs = screen.getAllByDisplayValue('To Do')
    const columnTitleInput = inputs.find(input => input.className.includes('column-title-input'))
    if (columnTitleInput) {
      fireEvent.change(columnTitleInput, { target: { value: 'New Title' } })
      fireEvent.blur(columnTitleInput)
    }
    
    expect(defaultProps.onUpdateColumnTitle).toHaveBeenCalledWith('todo', 'New Title')
  })

  it('calls onDeleteColumn when delete button is clicked', () => {
    render(<Column {...defaultProps} />)
    const deleteButton = screen.getByTitle(/delete column/i)
    fireEvent.click(deleteButton)
    expect(defaultProps.onDeleteColumn).toHaveBeenCalledWith('todo')
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import TaskCard from '../TaskCard'

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    category: 'todo',
    deadline: '',
    flag: null
  }

  const mockAllColumns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' }
  ]

  const defaultProps = {
    task: mockTask,
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
    onMove: jest.fn(),
    allColumns: mockAllColumns,
    currentColumn: 'todo'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders task title and description', () => {
    render(<TaskCard {...defaultProps} />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('allows editing task', () => {
    render(<TaskCard {...defaultProps} />)
    const title = screen.getByText('Test Task')
    fireEvent.click(title)
    
    const input = screen.getByDisplayValue('Test Task')
    fireEvent.change(input, { target: { value: 'Updated Task' } })
    fireEvent.click(screen.getByText('Save'))
    
    expect(defaultProps.onUpdate).toHaveBeenCalledWith('1', {
      title: 'Updated Task',
      description: 'Test Description',
      deadline: ''
    })
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<TaskCard {...defaultProps} />)
    const deleteButton = screen.getByTitle(/delete task/i)
    fireEvent.click(deleteButton)
    
    jest.advanceTimersByTime(300)
    expect(defaultProps.onDelete).toHaveBeenCalledWith('1')
  })
})

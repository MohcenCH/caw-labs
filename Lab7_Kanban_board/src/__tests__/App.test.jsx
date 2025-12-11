import { render, screen, fireEvent } from '@testing-library/react'
import App from '../../App'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString()
    }),
    clear: jest.fn(() => {
      store = {}
    })
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

window.confirm = jest.fn(() => true)

describe('App', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  it('renders the kanban board with default columns', () => {
    render(<App />)
    expect(screen.getByText('Kanban Board')).toBeInTheDocument()
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('adds a new task', () => {
    render(<App />)
    const addTaskButton = screen.getAllByText('+ Add Task')[0]
    fireEvent.click(addTaskButton)
    
    const titleInput = screen.getByPlaceholderText(/enter task title/i)
    fireEvent.change(titleInput, { target: { value: 'New Task' } })
    fireEvent.submit(titleInput.closest('form'))
    
    expect(screen.getByText('New Task')).toBeInTheDocument()
  })

  it('adds a new column', () => {
    render(<App />)
    const addColumnButton = screen.getByText('+ Add New Column')
    fireEvent.click(addColumnButton)
    
    const input = screen.getByPlaceholderText(/enter column title/i)
    fireEvent.change(input, { target: { value: 'New Column' } })
    fireEvent.submit(input.closest('form'))
    
    expect(screen.getByText('New Column')).toBeInTheDocument()
  })
})

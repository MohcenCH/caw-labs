import { useState, useEffect } from 'react'
import Column from './components/Column'
import ThemeToggle from './components/ThemeToggle'
import AddColumn from './components/AddColumn'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ])
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      category: taskData.category || 'todo',
      deadline: taskData.deadline || '',
      flag: taskData.flag || null,
      createdAt: new Date().toISOString()
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const moveTask = (taskId, newCategory) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, category: newCategory } : task
    ))
  }

  const updateColumnTitle = (columnId, newTitle) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, title: newTitle } : col
    ))
  }

  const addColumn = (title) => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title: title || 'New Column'
    }
    setColumns([...columns, newColumn])
  }

  const deleteColumn = (columnId) => {
    const columnTasks = tasks.filter(task => task.category === columnId)
    if (columnTasks.length > 0) {
      if (!window.confirm(`This column has ${columnTasks.length} task(s). Are you sure you want to delete it? All tasks will be removed.`)) {
        return
      }
      const taskIds = columnTasks.map(task => task.id)
      setTasks(tasks.filter(task => !taskIds.includes(task.id)))
    }
    setColumns(columns.filter(col => col.id !== columnId))
  }

  const getTasksForColumn = (columnId) => {
    return tasks.filter(task => task.category === columnId)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Kanban Board</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      
      <div className="columns-container">
        {columns.map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={getTasksForColumn(column.id)}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
            onUpdateColumnTitle={updateColumnTitle}
            onDeleteColumn={deleteColumn}
            onAddTask={addTask}
            allColumns={columns}
          />
        ))}
        <AddColumn onAddColumn={addColumn} />
      </div>
    </div>
  )
}

export default App

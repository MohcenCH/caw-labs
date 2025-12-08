import { useState } from 'react'
import './TaskForm.css'

function TaskForm({ onAddTask, columns }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(columns[0]?.id || 'todo')
  const [deadline, setDeadline] = useState('')
  const [flag, setFlag] = useState(null)

  const FLAG_COLORS = [
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        category,
        deadline: deadline || undefined,
        flag: flag
      })
      setTitle('')
      setDescription('')
      setCategory(columns[0]?.id || 'todo')
      setDeadline('')
      setFlag(null)
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setDescription('')
    setCategory(columns[0]?.id || 'todo')
    setDeadline('')
    setFlag(null)
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <div className="task-form-toggle">
        <button className="btn-add-task" onClick={() => setIsOpen(true)}>
          + Add New Task
        </button>
      </div>
    )
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>Create New Task</h3>
        <button type="button" className="btn-close" onClick={handleCancel}>×</button>
      </div>
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          autoFocus
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          rows="3"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {columns.map(col => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>Flag Color</label>
        <div className="flag-options">
          {FLAG_COLORS.map(flagColor => (
            <button
              key={flagColor.value}
              type="button"
              className={`flag-option ${flag?.value === flagColor.value ? 'active' : ''}`}
              onClick={() => setFlag(flag?.value === flagColor.value ? null : { value: flagColor.value, name: flagColor.name })}
              style={{ backgroundColor: flagColor.value }}
              title={flagColor.name}
            >
              {flag?.value === flagColor.value && '✓'}
            </button>
          ))}
        </div>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn-submit">Add Task</button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default TaskForm


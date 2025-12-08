import { useState } from 'react'
import './TaskCard.css'

const FLAG_COLORS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Pink', value: '#ec4899' }
]

function TaskCard({ task, onUpdate, onDelete, onMove, allColumns, currentColumn }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description)
  const [editedDeadline, setEditedDeadline] = useState(task.deadline || '')
  const [showFlagMenu, setShowFlagMenu] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSave = () => {
    onUpdate(task.id, {
      title: editedTitle.trim() || task.title,
      description: editedDescription,
      deadline: editedDeadline
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(task.title)
    setEditedDescription(task.description)
    setEditedDeadline(task.deadline || '')
    setIsEditing(false)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(task.id)
    }, 300)
  }

  const handleFlagSelect = (color) => {
    const newFlag = task.flag?.value === color ? null : { value: color, name: FLAG_COLORS.find(f => f.value === color)?.name }
    onUpdate(task.id, { flag: newFlag })
    setShowFlagMenu(false)
  }

  const handleMove = (newColumnId) => {
    if (newColumnId !== currentColumn) {
      onMove(task.id, newColumnId)
    }
  }

  const formatDeadline = (deadline) => {
    if (!deadline) return null
    const date = new Date(deadline)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const taskDate = new Date(date)
    taskDate.setHours(0, 0, 0, 0)
    
    const diffTime = taskDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, className: 'overdue' }
    } else if (diffDays === 0) {
      return { text: 'Due today', className: 'due-today' }
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', className: 'due-soon' }
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, className: 'due-soon' }
    } else {
      return { text: date.toLocaleDateString(), className: 'due-later' }
    }
  }

  const deadlineInfo = formatDeadline(task.deadline)

  if (isDeleting) {
    return <div className="task-card deleting"></div>
  }

  return (
    <div className="task-card">
      {isEditing ? (
        <div className="task-card-edit">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Task title"
            className="task-title-input"
            autoFocus
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Task description (optional)"
            className="task-description-input"
            rows="3"
          />
          <input
            type="datetime-local"
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
            className="task-deadline-input"
          />
          <div className="task-actions">
            <button onClick={handleSave} className="btn-save">Save</button>
            <button onClick={handleCancel} className="btn-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-card-header">
            <h3 
              className="task-title"
              onClick={() => setIsEditing(true)}
              title="Click to edit"
            >
              {task.title}
            </h3>
            <div className="task-card-actions">
              <div className="flag-menu-container">
                <button
                  className={`flag-button ${task.flag ? 'has-flag' : ''}`}
                  onClick={() => setShowFlagMenu(!showFlagMenu)}
                  title="Add/Edit flag"
                >
                  {task.flag ? (
                    <span 
                      className="flag-indicator" 
                      style={{ backgroundColor: task.flag.value }}
                    ></span>
                  ) : (
                    <span className="flag-icon">🏷️</span>
                  )}
                </button>
                {showFlagMenu && (
                  <div className="flag-menu">
                    <div className="flag-options">
                      {FLAG_COLORS.map(flag => (
                        <button
                          key={flag.value}
                          className={`flag-option ${task.flag?.value === flag.value ? 'active' : ''}`}
                          onClick={() => handleFlagSelect(flag.value)}
                          style={{ backgroundColor: flag.value }}
                          title={flag.name}
                        >
                          {task.flag?.value === flag.value && '✓'}
                        </button>
                      ))}
                      {task.flag && (
                        <button
                          className="flag-option remove"
                          onClick={() => handleFlagSelect(null)}
                          title="Remove flag"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button
                className="btn-delete"
                onClick={handleDelete}
                title="Delete task"
              >
                ×
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          {task.deadline && deadlineInfo && (
            <div className={`task-deadline ${deadlineInfo.className}`}>
              📅 {deadlineInfo.text}
            </div>
          )}
          
          {!task.deadline && (
            <button
              className="btn-add-deadline"
              onClick={() => setIsEditing(true)}
              title="Add deadline"
            >
              + Add deadline
            </button>
          )}
          
          <div className="task-move-menu">
            <select
              value={currentColumn}
              onChange={(e) => handleMove(e.target.value)}
              className="move-select"
            >
              {allColumns.map(col => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  )
}

export default TaskCard


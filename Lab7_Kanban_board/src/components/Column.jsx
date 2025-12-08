import { useState } from 'react'
import TaskCard from './TaskCard'
import './Column.css'

function Column({ column, tasks, onUpdateTask, onDeleteTask, onMoveTask, onUpdateColumnTitle, allColumns }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(column.title)

  const handleTitleSubmit = (e) => {
    e.preventDefault()
    if (editedTitle.trim()) {
      onUpdateColumnTitle(column.id, editedTitle.trim())
      setIsEditingTitle(false)
    }
  }

  const handleTitleBlur = () => {
    if (editedTitle.trim()) {
      onUpdateColumnTitle(column.id, editedTitle.trim())
    } else {
      setEditedTitle(column.title)
    }
    setIsEditingTitle(false)
  }

  return (
    <div className="column">
      <div className="column-header">
        {isEditingTitle ? (
          <form onSubmit={handleTitleSubmit} onBlur={handleTitleBlur}>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onFocus={(e) => e.target.select()}
              autoFocus
              className="column-title-input"
            />
          </form>
        ) : (
          <h2 
            className="column-title"
            onClick={() => setIsEditingTitle(true)}
            title="Click to edit"
          >
            {column.title}
          </h2>
        )}
        <span className="task-count">{tasks.length}</span>
      </div>
      
      <div className="tasks-container">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            onMove={onMoveTask}
            allColumns={allColumns}
            currentColumn={column.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Column


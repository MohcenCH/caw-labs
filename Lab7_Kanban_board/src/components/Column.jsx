import { useState } from 'react'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'
import './Column.css'

function Column({ column, tasks, onUpdateTask, onDeleteTask, onMoveTask, onUpdateColumnTitle, onDeleteColumn, onAddTask, allColumns }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(column.title)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      const taskId = data.taskId || e.dataTransfer.getData('text/plain')
      const fromColumn = data.fromColumn
      
      if (fromColumn !== column.id && taskId) {
        onMoveTask(taskId, column.id)
      }
    } catch (error) {
      const taskId = e.dataTransfer.getData('text/plain')
      if (taskId) {
        onMoveTask(taskId, column.id)
      }
    }
  }

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
    <div 
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
        <div className="column-header-actions">
          <span className="task-count">{tasks.length}</span>
          <button
            className="btn-delete-column"
            onClick={() => onDeleteColumn(column.id)}
            title="Delete column"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className={`tasks-container ${isDragOver ? 'drag-over' : ''}`}>
        {tasks.length === 0 && isDragOver && (
          <div className="drop-indicator">Drop task here</div>
        )}
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
      
      <div className="column-footer">
        <TaskForm 
          onAddTask={onAddTask} 
          columns={allColumns}
          defaultCategory={column.id}
        />
      </div>
    </div>
  )
}

export default Column


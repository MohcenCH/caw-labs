import { useState } from 'react'
import './AddColumn.css'

function AddColumn({ onAddColumn }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAddColumn(title.trim())
      setTitle('')
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <div className="add-column-card">
        <button className="btn-add-column" onClick={() => setIsOpen(true)}>
          + Add New Column
        </button>
      </div>
    )
  }

  return (
    <div className="add-column-form-container">
      <form className="add-column-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter column title"
          className="add-column-input"
          autoFocus
          required
        />
        <div className="add-column-actions">
          <button type="submit" className="btn-add-column-submit">Add</button>
          <button type="button" className="btn-add-column-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddColumn


import React, { useState, useEffect } from 'react'
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi'
import './Journal.css'

const Journal = () => {
  const [entries, setEntries] = useState([])
  const [isWriting, setIsWriting] = useState(false)
  const [currentEntry, setCurrentEntry] = useState({ id: null, content: '', date: '' })
  const [editingId, setEditingId] = useState(null)

  // ⭐ Load saved journals permanently
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('journalEntries') || '[]')
    setEntries(saved)
  }, [])

  // ⭐ Save journal entries permanently
  const saveToLocalStorage = (data) => {
    localStorage.setItem('journalEntries', JSON.stringify(data))
  }

  const handleStartWriting = () => {
    setIsWriting(true)
    setCurrentEntry({
      id: null,
      content: '',
      date: new Date().toISOString().split('T')[0],
    })
    setEditingId(null)
  }

  const handleSave = () => {
    if (!currentEntry.content.trim()) {
      alert('Please write something before saving')
      return
    }

    let updatedEntries;

    // ⭐ Editing existing entry
    if (editingId) {
      updatedEntries = entries.map(entry =>
        entry.id === editingId
          ? { ...entry, content: currentEntry.content, date: currentEntry.date }
          : entry
      )
    } 
    // ⭐ Creating a NEW journal entry
    else {
      const newEntry = {
        id: Date.now(),
        content: currentEntry.content,
        date: currentEntry.date,
      }

      updatedEntries = [...entries, newEntry]
    }

    setEntries(updatedEntries)
    saveToLocalStorage(updatedEntries)   // ⭐ FIX: Save permanently

    setIsWriting(false)
    setCurrentEntry({ id: null, content: '', date: '' })
    setEditingId(null)
  }

  const handleCancel = () => {
    setIsWriting(false)
    setCurrentEntry({ id: null, content: '', date: '' })
    setEditingId(null)
  }

  const handleEdit = (entry) => {
    setCurrentEntry(entry)
    setIsWriting(true)
    setEditingId(entry.id)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updated = entries.filter(entry => entry.id !== id)
      setEntries(updated)
      saveToLocalStorage(updated)  // ⭐ FIX: Update local storage
    }
  }

  return (
    <div className="journal">
      <div className="journal-header">
        <div>
          <h1>Journal</h1>
          <p>Express your thoughts and feelings</p>
        </div>

        {!isWriting && (
          <button className="new-entry-btn" onClick={handleStartWriting}>
            <FiPlus />
            New Entry
          </button>
        )}
      </div>

      {isWriting && (
        <div className="journal-editor">
          <div className="editor-header">
            <input
              type="date"
              value={currentEntry.date}
              onChange={(e) =>
                setCurrentEntry({ ...currentEntry, date: e.target.value })
              }
              className="date-input"
            />

            <div className="editor-actions">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save Entry
              </button>
            </div>
          </div>

          <textarea
            value={currentEntry.content}
            onChange={(e) =>
              setCurrentEntry({ ...currentEntry, content: e.target.value })
            }
            placeholder="Write your thoughts here..."
            className="journal-textarea"
            rows="15"
            autoFocus
          />
        </div>
      )}

      <div className="journal-entries">
        {entries.length === 0 ? (
          <div className="empty-state">
            <p>No journal entries yet. Start writing your first one!</p>
          </div>
        ) : (
          entries.slice().reverse().map((entry) => (
            <div key={entry.id} className="journal-entry">
              <div className="entry-header">
                <div className="entry-date">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                <div className="entry-actions">
                  <button className="edit-btn" onClick={() => handleEdit(entry)}>
                    <FiEdit2 />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(entry.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="entry-content">
                {entry.content.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Journal
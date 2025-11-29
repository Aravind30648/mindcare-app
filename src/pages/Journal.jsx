import React, { useState, useEffect } from 'react'
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi'
import './Journal.css'

const Journal = () => {
  const [entries, setEntries] = useState([])
  const [isWriting, setIsWriting] = useState(false)
  const [currentEntry, setCurrentEntry] = useState({ id: null, content: '', date: '' })
  const [editingId, setEditingId] = useState(null)

  /* -----------------------------------------------------
      ⭐ LOAD DATA FROM LOCAL STORAGE ONCE AT PAGE OPEN
  ------------------------------------------------------*/
  useEffect(() => {
    const saved = localStorage.getItem('journalEntries')
    if (saved) {
      try {
        setEntries(JSON.parse(saved))
      } catch {
        setEntries([])
      }
    }
  }, [])

  /* -----------------------------------------------------
      ⭐ AUTO-SAVE TO LOCAL STORAGE WHEN ENTRIES CHANGE
  ------------------------------------------------------*/
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries))
  }, [entries])

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

    /* -----------------------------------------------------
        ⭐ UPDATE EXISTING ENTRY
    ------------------------------------------------------*/
    if (editingId) {
      const updated = entries.map(entry =>
        entry.id === editingId
          ? { ...entry, content: currentEntry.content, date: currentEntry.date }
          : entry
      )
      setEntries(updated)
    }

    /* -----------------------------------------------------
        ⭐ ADD NEW ENTRY
    ------------------------------------------------------*/
    else {
      const newEntry = {
        id: Date.now(),
        content: currentEntry.content,
        date: currentEntry.date || new Date().toISOString().split('T')[0],
      }
      setEntries(prev => [...prev, newEntry])
    }

    // reset form
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
    setCurrentEntry({
      id: entry.id,
      content: entry.content,
      date: entry.date,
    })
    setIsWriting(true)
    setEditingId(entry.id)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== id))
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

      {/* -----------------------------------------------------
          ⭐ JOURNAL WRITING EDITOR
      ------------------------------------------------------*/}
      {isWriting && (
        <div className="journal-editor">
          <div className="editor-header">
            <input
              type="date"
              value={currentEntry.date}
              onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}
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
            onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
            placeholder="Write your thoughts here... What happened today? How are you feeling? What are you grateful for?"
            className="journal-textarea"
            rows="15"
            autoFocus
          />
        </div>
      )}

      {/* -----------------------------------------------------
          ⭐ JOURNAL LIST VIEW
      ------------------------------------------------------*/}
      <div className="journal-entries">
        {entries.length === 0 && !isWriting ? (
          <div className="empty-state">
            <p>No journal entries yet. Start writing to track your thoughts and feelings!</p>
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
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(entry)}
                    title="Edit entry"
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(entry.id)}
                    title="Delete entry"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="entry-content">
                {entry.content.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph.trim() !== "" ? paragraph : "\u00A0"}</p>
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

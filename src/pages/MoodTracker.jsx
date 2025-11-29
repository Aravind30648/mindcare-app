import React, { useState, useEffect } from 'react'
import { FiSmile, FiFrown, FiMeh } from 'react-icons/fi'
import './MoodTracker.css'

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [rating, setRating] = useState(5)
  const [note, setNote] = useState('')
  const [moodHistory, setMoodHistory] = useState([])

  /* ----------------------------------------------------
     ⭐ LOAD DATA FROM LOCAL STORAGE WHEN PAGE OPENS
  ---------------------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem('moodData')
    if (saved) {
      try {
        setMoodHistory(JSON.parse(saved))
      } catch {
        setMoodHistory([])
      }
    }
  }, [])

  /* ----------------------------------------------------
     ⭐ SAVE DATA TO LOCAL STORAGE WHENEVER HISTORY CHANGES
  ---------------------------------------------------- */
  useEffect(() => {
    localStorage.setItem('moodData', JSON.stringify(moodHistory))
  }, [moodHistory])

  const moods = [
    { id: 'happy', label: 'Happy', icon: FiSmile, color: '#10b981' },
    { id: 'neutral', label: 'Neutral', icon: FiMeh, color: '#f59e0b' },
    { id: 'sad', label: 'Sad', icon: FiFrown, color: '#ef4444' },
  ]

  /* ----------------------------------------------------
     ⭐ HANDLE SAVE MOOD ENTRY
  ---------------------------------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedMood) {
      alert('Please select a mood')
      return
    }

    const entry = {
      id: Date.now(),
      mood: selectedMood,
      rating,
      note,
      date: new Date().toISOString(),
    }

    // update list
    setMoodHistory(prev => [...prev, entry])

    // reset form
    setSelectedMood(null)
    setRating(5)
    setNote('')

    alert('Mood tracked successfully!')
  }

  const getMoodIcon = (moodId) => {
    return moods.find(m => m.id === moodId)?.icon || FiMeh
  }

  const getMoodColor = (moodId) => {
    return moods.find(m => m.id === moodId)?.color || '#64748b'
  }

  return (
    <div className="mood-tracker">
      <div className="mood-tracker-header">
        <h1>Mood Tracker</h1>
        <p>Track your daily mood and emotions</p>
      </div>

      <div className="mood-tracker-content">
        <form className="mood-form" onSubmit={handleSubmit}>
          
          {/* MOOD SELECTION */}
          <div className="mood-selection">
            <h3>How are you feeling today?</h3>
            <div className="mood-options">
              {moods.map((mood) => {
                const Icon = mood.icon
                return (
                  <button
                    key={mood.id}
                    type="button"
                    className={`mood-option ${selectedMood === mood.id ? 'selected' : ''}`}
                    onClick={() => setSelectedMood(mood.id)}
                    style={{
                      borderColor: selectedMood === mood.id ? mood.color : 'var(--border-color)',
                      background: selectedMood === mood.id ? `${mood.color}15` : 'transparent',
                    }}
                  >
                    <Icon style={{ color: mood.color, fontSize: '2rem' }} />
                    <span>{mood.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* RATING */}
          <div className="rating-section">
            <h3>Rate your overall mood (1–10)</h3>
            <div className="rating-input">
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="slider"
              />
              <div className="rating-value">{rating}/10</div>
            </div>
          </div>

          {/* NOTE */}
          <div className="note-section">
            <h3>Add a note (optional)</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind? What made you feel this way?"
              rows="4"
              className="note-input"
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Mood Entry
          </button>
        </form>

        {/* HISTORY */}
        {moodHistory.length > 0 && (
          <div className="mood-history">
            <h2>Your Mood History</h2>

            <div className="history-list">
              {moodHistory.slice().reverse().map((entry) => {
                const Icon = getMoodIcon(entry.mood)
                const color = getMoodColor(entry.mood)

                return (
                  <div key={entry.id} className="history-item">
                    <div className="history-date">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>

                    <div className="history-content">
                      <div className="history-mood">
                        <Icon style={{ color, fontSize: '1.5rem' }} />
                        <span className="history-rating">{entry.rating}/10</span>
                      </div>

                      {entry.note && (
                        <p className="history-note">{entry.note}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MoodTracker

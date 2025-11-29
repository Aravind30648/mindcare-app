import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiTrendingUp, FiCalendar, FiBook, FiHeart, FiVideo, FiUsers } from 'react-icons/fi'
import './Dashboard.css'

const Dashboard = () => {
  const [moodData, setMoodData] = useState([])
  const [journalEntries, setJournalEntries] = useState([])

  useEffect(() => {
    // Load data from localStorage
    const savedMoods = JSON.parse(localStorage.getItem('moodData') || '[]')
    const savedJournals = JSON.parse(localStorage.getItem('journalEntries') || '[]')
    setMoodData(savedMoods.slice(-7)) // Last 7 days
    setJournalEntries(savedJournals.slice(-3)) // Last 3 entries
  }, [])

  const getMoodStats = () => {
    if (moodData.length === 0) return { average: 0, trend: 'neutral' }
    const avg = moodData.reduce((sum, m) => sum + m.rating, 0) / moodData.length
    const recent = moodData.slice(-3)
    const older = moodData.slice(0, -3)
    const recentAvg = recent.reduce((sum, m) => sum + m.rating, 0) / recent.length
    const olderAvg = older.length > 0 
      ? older.reduce((sum, m) => sum + m.rating, 0) / older.length 
      : recentAvg
    return {
      average: Math.round(avg),
      trend: recentAvg > olderAvg ? 'up' : recentAvg < olderAvg ? 'down' : 'neutral'
    }
  }

  const stats = getMoodStats()

  const quickActions = [
    { path: '/mood-tracker', icon: FiHeart, title: 'Track Your Mood' },
    { path: '/journal', icon: FiBook, title: 'Write in Journal' },
    { path: '/counseling', icon: FiVideo, title: 'Book Counseling' },
    { path: '/community', icon: FiUsers, title: 'Join Community' },
    { path: '/assessment', icon: FiTrendingUp, title: 'Self Assessment' },
    { path: '/resources', icon: FiCalendar, title: 'View Resources' },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome Back! 👋</h1>
        <p className="subtitle">Take care of your mental health today</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiHeart />
          </div>
          <div className="stat-content">
            <h3>Mood Average</h3>
            <p className="stat-value">{stats.average || 'N/A'}/10</p>
            <span className={`stat-trend ${stats.trend}`}>
              {stats.trend === 'up' && '↗ Improving'}
              {stats.trend === 'down' && '↘ Needs attention'}
              {stats.trend === 'neutral' && '→ Stable'}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiBook />
          </div>
          <div className="stat-content">
            <h3>Journal Entries</h3>
            <p className="stat-value">{journalEntries.length}</p>
            <span className="stat-trend">Recent entries</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <h3>Days Tracked</h3>
            <p className="stat-value">{moodData.length}</p>
            <span className="stat-trend">This week</span>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {quickActions.map((action, idx) => {
            const Icon = action.icon
            return (
              <Link key={idx} to={action.path} className="action-card">
                <div className="action-icon">
                  <Icon />
                </div>
                <h3>{action.title}</h3>
              </Link>
            )
          })}
        </div>
      </div>

      {journalEntries.length > 0 && (
        <div className="recent-journals">
          <h2>Recent Journal Entries</h2>
          <div className="journal-list">
            {journalEntries.map((entry, idx) => (
              <div key={idx} className="journal-preview">
                <div className="journal-date">{new Date(entry.date).toLocaleDateString()}</div>
                <p className="journal-text">{entry.content.substring(0, 150)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

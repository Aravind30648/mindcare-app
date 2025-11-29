import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiHome, FiHeart, FiBook, FiBookOpen, FiClipboard, FiLogOut, FiUser, FiVideo, FiUsers, FiSettings } from 'react-icons/fi'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail')
  const isAdmin = localStorage.getItem('isAdmin') === 'true' || userEmail?.includes('admin')

  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/mood-tracker', icon: FiHeart, label: 'Mood Tracker' },
    { path: '/journal', icon: FiBook, label: 'Journal' },
    { path: '/resources', icon: FiBookOpen, label: 'Resources' },
    { path: '/counseling', icon: FiVideo, label: 'Counseling' },
    { path: '/community', icon: FiUsers, label: 'Community' },
    { path: '/assessment', icon: FiClipboard, label: 'Assessment' },
  ]

  if (isAdmin) {
    navItems.push({ path: '/admin', icon: FiSettings, label: 'Admin' })
  }

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FiHeart className="logo-icon" />
          <span>MindCare</span>
        </Link>

        <ul className="navbar-menu">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <Icon />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="navbar-user">
          <div className="user-info">
            <FiUser />
            <span className="user-email">{userEmail || 'User'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import MoodTracker from './pages/MoodTracker'
import Journal from './pages/Journal'
import Resources from './pages/Resources'
import Counseling from './pages/Counseling'
import Community from './pages/Community'
import SelfAssessment from './pages/SelfAssessment'
import Admin from './pages/Admin'
import Profile from './pages/Profile'   // ⭐ ADDED
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app">
                <Navbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/mood-tracker" element={<MoodTracker />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/counseling" element={<Counseling />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/assessment" element={<SelfAssessment />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/profile" element={<Profile />} /> {/* ⭐ ADDED */}
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  )
}

export default App

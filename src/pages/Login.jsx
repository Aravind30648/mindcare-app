import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiHeart } from 'react-icons/fi'
import Captcha from '../components/Captcha'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState("")
  const [passwordColor, setPasswordColor] = useState("")

  const [userCaptcha, setUserCaptcha] = useState("")
  const [generatedCaptcha, setGeneratedCaptcha] = useState("")

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    if (isAuthenticated) navigate('/')
  }, [navigate])

  // ⭐ Password Strength Check
  const checkPasswordStrength = (pw) => {
    if (!pw) {
      setPasswordStrength("")
      return
    }

    const hasLetter = /[A-Za-z]/.test(pw)
    const hasNumber = /[0-9]/.test(pw)
    const hasSymbol = /[^A-Za-z0-9]/.test(pw)
    const hasUpper = /[A-Z]/.test(pw)

    if (pw.length < 6) {
      setPasswordStrength("Weak")
      setPasswordColor("red")
    } 
    else if (pw.length >= 6 && hasLetter && hasNumber && !hasSymbol) {
      setPasswordStrength("Medium")
      setPasswordColor("orange")
    } 
    else if (pw.length >= 8 && hasLetter && hasNumber && hasSymbol && hasUpper) {
      setPasswordStrength("Strong")
      setPasswordColor("green")
    } 
    else {
      setPasswordStrength("Medium")
      setPasswordColor("orange")
    }
  }

  // ⭐ Validate Form
  const validate = () => {
    const newErrors = {}

    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format'

    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'

    if (userCaptcha !== generatedCaptcha)
      newErrors.captcha = "Captcha does not match!"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ⭐ Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', formData.email)
      navigate('/')
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-card">
          
          {/* HEADER */}
          <div className="login-header">
            <div className="login-logo">
              <FiHeart className="logo-icon" />
              <span>MindCare</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to continue your mental health journey</p>
          </div>

          {/* FORM */}
          <form className="login-form" onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="form-group">
              <label><FiMail /> Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label><FiLock /> Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    checkPasswordStrength(e.target.value)
                  }}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* Password Note */}
              <small style={{
                color: "#888",
                fontSize: "0.85rem",
                marginTop: "4px",
                display: "block"
              }}>
                Use a strong password for better security.
              </small>

              {/* Password Category */}
              {passwordStrength && (
                <small style={{
                  color: passwordColor,
                  fontWeight: "bold",
                  marginTop: "4px",
                  display: "block",
                  fontSize: "0.9rem"
                }}>
                  Strength: {passwordStrength}
                </small>
              )}

              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* ⭐ CUSTOM CAPTCHA (FIXED) */}
            <Captcha
              onChange={(value) => setUserCaptcha(value)}
              onGenerate={(text) => setGeneratedCaptcha(text)}  // IMPORTANT FIX
            />

            {errors.captcha && <span className="error-message">{errors.captcha}</span>}

            {/* BUTTON */}
            <button type="submit" className="login-btn">Sign In</button>

            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login

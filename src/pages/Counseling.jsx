import React, { useState } from 'react'
import { FiVideo, FiCalendar, FiClock, FiUser, FiMail, FiPhone } from 'react-icons/fi'
import './Counseling.css'

const Counseling = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
  })

  const counselors = [
    {
      id: 1,
      name: 'Dr. Aravind',
      specialization: 'Anxiety & Stress Management',
      experience: '10+ years',
      availability: 'Mon-Fri, 9 AM - 5 PM',
      image: '👨‍⚕️',
    },
    {
      id: 2,
      name: 'Dr. Anirudh',
      specialization: 'Depression & Mood Disorders',
      experience: '8+ years',
      availability: 'Tue-Sat, 10 AM - 6 PM',
      image: '👨‍⚕️',
    },
    {
      id: 3,
      name: 'Dr. Charan',
      specialization: 'Student Counseling',
      experience: '12+ years',
      availability: 'Mon-Thu, 8 AM - 4 PM',
      image: '👨‍⚕️',
    },
  ]

  const services = [
    {
      id: 1,
      title: 'Individual Therapy Session',
      duration: '50 minutes',
      price: 'Free for Students',
      description: 'One-on-one virtual counseling session with a licensed therapist.',
    },
    {
      id: 2,
      title: 'Group Therapy Session',
      duration: '60 minutes',
      price: 'Free for Students',
      description: 'Join a small group session with peers facing similar challenges.',
    },
    {
      id: 3,
      title: 'Crisis Support Session',
      duration: '30 minutes',
      price: 'Free',
      description: 'Immediate support for urgent mental health concerns.',
    },
  ]

  const handleServiceSelect = (service) => {
    setSelectedService(service)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!selectedService) {
      alert('Please select a service first')
      return
    }
    
    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('counselingBookings') || '[]')
    const newBooking = {
      id: Date.now(),
      service: selectedService,
      ...bookingForm,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }
    bookings.push(newBooking)
    localStorage.setItem('counselingBookings', JSON.stringify(bookings))
    
    alert('Booking request submitted successfully! You will receive a confirmation email shortly.')
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      reason: '',
    })
    setSelectedService(null)
  }

  return (
    <div className="counseling">
      <div className="counseling-header">
        <h1>Counseling Services</h1>
        <p>Book virtual therapy sessions with licensed mental health professionals</p>
      </div>

      <div className="counseling-content">
        <section className="services-section">
          <h2>Available Services</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                onClick={() => handleServiceSelect(service)}
              >
                <div className="service-icon">
                  <FiVideo />
                </div>
                <h3>{service.title}</h3>
                <p className="service-duration">
                  <FiClock /> {service.duration}
                </p>
                <p className="service-price">{service.price}</p>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="counselors-section">
          <h2>Our Counselors</h2>
          <div className="counselors-grid">
            {counselors.map((counselor) => (
              <div key={counselor.id} className="counselor-card">
                <div className="counselor-image">{counselor.image}</div>
                <h3>{counselor.name}</h3>
                <p className="counselor-specialization">{counselor.specialization}</p>
                <p className="counselor-experience">Experience: {counselor.experience}</p>
                <p className="counselor-availability">
                  <FiCalendar /> {counselor.availability}
                </p>
              </div>
            ))}
          </div>
        </section>

        {selectedService && (
          <section className="booking-section">
            <h2>Book a Session</h2>
            <div className="booking-card">
              <div className="selected-service-info">
                <h3>{selectedService.title}</h3>
                <p>{selectedService.description}</p>
              </div>
              <form className="booking-form" onSubmit={handleBookingSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <FiUser /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <FiMail /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <FiPhone /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <FiCalendar /> Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <FiClock /> Preferred Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={bookingForm.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Reason for Session (Optional)</label>
                  <textarea
                    name="reason"
                    value={bookingForm.reason}
                    onChange={handleInputChange}
                    placeholder="Briefly describe what you'd like to discuss..."
                    rows="4"
                  />
                </div>
                <button type="submit" className="submit-booking-btn">
                  Submit Booking Request
                </button>
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Counseling



import React, { useState, useEffect } from 'react'
import { FiSettings, FiPlus, FiEdit2, FiTrash2, FiBook, FiUsers, FiVideo } from 'react-icons/fi'
import './Admin.css'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('resources')
  const [resources, setResources] = useState([])
  const [services, setServices] = useState([])
  const [newResource, setNewResource] = useState({ title: '', description: '', category: '', url: '' })
  const [newService, setNewService] = useState({ title: '', description: '', duration: '', price: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    // Load resources and services from localStorage
    const savedResources = JSON.parse(localStorage.getItem('adminResources') || '[]')
    const savedServices = JSON.parse(localStorage.getItem('adminServices') || '[]')
    setResources(savedResources)
    setServices(savedServices)
  }, [])

  const handleAddResource = (e) => {
    e.preventDefault()
    const resource = {
      id: Date.now(),
      ...newResource,
      createdAt: new Date().toISOString(),
    }
    const updated = [...resources, resource]
    setResources(updated)
    localStorage.setItem('adminResources', JSON.stringify(updated))
    setNewResource({ title: '', description: '', category: '', url: '' })
    alert('Resource added successfully!')
  }

  const handleAddService = (e) => {
    e.preventDefault()
    const service = {
      id: Date.now(),
      ...newService,
      createdAt: new Date().toISOString(),
    }
    const updated = [...services, service]
    setServices(updated)
    localStorage.setItem('adminServices', JSON.stringify(updated))
    setNewService({ title: '', description: '', duration: '', price: '' })
    alert('Service added successfully!')
  }

  const handleDeleteResource = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const updated = resources.filter(r => r.id !== id)
      setResources(updated)
      localStorage.setItem('adminResources', JSON.stringify(updated))
    }
  }

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updated = services.filter(s => s.id !== id)
      setServices(updated)
      localStorage.setItem('adminServices', JSON.stringify(updated))
    }
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>
          <FiSettings /> Admin Panel
        </h1>
        <p>Manage mental health resources and support services</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <FiBook /> Resources
        </button>
        <button
          className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <FiVideo /> Services
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FiUsers /> Users
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'resources' && (
          <div className="tab-content">
            <h2>Manage Resources</h2>
            <div className="add-form">
              <h3>Add New Resource</h3>
              <form onSubmit={handleAddResource}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={newResource.title}
                      onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                      required
                      placeholder="Resource title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={newResource.category}
                      onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                      required
                      placeholder="e.g., Mental Health Basics"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    required
                    rows="3"
                    placeholder="Resource description"
                  />
                </div>
                <div className="form-group">
                  <label>URL</label>
                  <input
                    type="url"
                    value={newResource.url}
                    onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                    required
                    placeholder="https://example.com"
                  />
                </div>
                <button type="submit" className="submit-btn">
                  <FiPlus /> Add Resource
                </button>
              </form>
            </div>

            <div className="items-list">
              <h3>Existing Resources ({resources.length})</h3>
              {resources.length === 0 ? (
                <p className="empty-message">No resources added yet.</p>
              ) : (
                <div className="items-grid">
                  {resources.map((resource) => (
                    <div key={resource.id} className="item-card">
                      <div className="item-header">
                        <span className="item-category">{resource.category}</span>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteResource(resource.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      <h4>{resource.title}</h4>
                      <p>{resource.description}</p>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="item-link">
                        View Resource →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="tab-content">
            <h2>Manage Services</h2>
            <div className="add-form">
              <h3>Add New Service</h3>
              <form onSubmit={handleAddService}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      required
                      placeholder="Service title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={newService.duration}
                      onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                      required
                      placeholder="e.g., 50 minutes"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      value={newService.price}
                      onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                      required
                      placeholder="e.g., Free for Students"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    required
                    rows="3"
                    placeholder="Service description"
                  />
                </div>
                <button type="submit" className="submit-btn">
                  <FiPlus /> Add Service
                </button>
              </form>
            </div>

            <div className="items-list">
              <h3>Existing Services ({services.length})</h3>
              {services.length === 0 ? (
                <p className="empty-message">No services added yet.</p>
              ) : (
                <div className="items-grid">
                  {services.map((service) => (
                    <div key={service.id} className="item-card">
                      <div className="item-header">
                        <span className="item-category">{service.duration}</span>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                      <div className="item-price">{service.price}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="tab-content">
            <h2>User Management</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-value">1,234</p>
                <span className="stat-label">Active accounts</span>
              </div>
              <div className="stat-card">
                <h3>Active Sessions</h3>
                <p className="stat-value">89</p>
                <span className="stat-label">This week</span>
              </div>
              <div className="stat-card">
                <h3>Bookings</h3>
                <p className="stat-value">156</p>
                <span className="stat-label">Pending</span>
              </div>
            </div>
            <div className="info-message">
              <p>User management features coming soon. This section will allow you to view and manage user accounts, monitor activity, and handle support requests.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin




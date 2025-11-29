import React, { useState, useEffect } from 'react'
import { FiMessageCircle, FiPlus, FiHeart, FiUser, FiClock } from 'react-icons/fi'
import './Community.css'

const Community = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General' })
  const [showForm, setShowForm] = useState(false)
  const userEmail = localStorage.getItem('userEmail') || 'Anonymous'

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]')
    setPosts(savedPosts)
  }, [])

  const categories = ['General', 'Anxiety Support', 'Depression Support', 'Study Stress', 'Wellness Tips', 'Success Stories']

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!newPost.title || !newPost.content) {
      alert('Please fill in both title and content')
      return
    }

    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      author: userEmail.split('@')[0],
      authorEmail: userEmail,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    }

    const updated = [post, ...posts]
    setPosts(updated)
    localStorage.setItem('communityPosts', JSON.stringify(updated))
    
    setNewPost({ title: '', content: '', category: 'General' })
    setShowForm(false)
    alert('Post created successfully!')
  }

  const handleLike = (postId) => {
    const updated = posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    )
    setPosts(updated)
    localStorage.setItem('communityPosts', JSON.stringify(updated))
  }

  const handleComment = (postId, commentText) => {
    if (!commentText.trim()) return
    
    const updated = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              author: userEmail.split('@')[0],
              text: commentText,
              createdAt: new Date().toISOString(),
            }
          ]
        }
      }
      return post
    })
    setPosts(updated)
    localStorage.setItem('communityPosts', JSON.stringify(updated))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="community">
      <div className="community-header">
        <div>
          <h1>Support Groups & Community</h1>
          <p>Connect with peers, share experiences, and find support</p>
        </div>
        <button className="new-post-btn" onClick={() => setShowForm(!showForm)}>
          <FiPlus />
          New Post
        </button>
      </div>

      {showForm && (
        <div className="new-post-form">
          <h2>Create New Post</h2>
          <form onSubmit={handlePostSubmit}>
            <div className="form-group">
              <label>Category</label>
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="What's your post about?"
                required
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Share your thoughts, experiences, or ask for support..."
                rows="6"
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Post
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="empty-state">
            <FiMessageCircle className="empty-icon" />
            <p>No posts yet. Be the first to share!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-category">{post.category}</div>
                <div className="post-meta">
                  <FiUser />
                  <span>{post.author}</span>
                  <FiClock />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>
              <div className="post-actions">
                <button className="like-btn" onClick={() => handleLike(post.id)}>
                  <FiHeart />
                  <span>{post.likes}</span>
                </button>
                <span className="comment-count">
                  <FiMessageCircle />
                  {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                </span>
              </div>
              {post.comments.length > 0 && (
                <div className="comments-section">
                  <h4>Comments</h4>
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <strong>{comment.author}</strong>
                      <span className="comment-date">{formatDate(comment.createdAt)}</span>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleComment(post.id, e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Community




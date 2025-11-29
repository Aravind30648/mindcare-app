import React from 'react'
import { FiExternalLink, FiBook, FiVideo, FiHeadphones, FiUsers } from 'react-icons/fi'
import './Resources.css'

const Resources = () => {
  const resources = {
    articles: [
      // ❌ REMOVED the "Understanding Stress and Anxiety" article

      {
        title: 'Building Resilience in Students',
        description: 'Strategies to develop emotional resilience and cope with academic and personal challenges.',
        category: 'Self-Improvement',
        url: 'https://www.apa.org/topics/resilience',
      },
      {
        title: 'Sleep and Mental Health',
        description: 'The connection between sleep quality and mental wellbeing, with tips for better sleep.',
        category: 'Wellness',
        url: 'https://www.sleepfoundation.org/mental-health',
      },
      {
        title: 'Social Media and Mental Health',
        description: 'Understanding the impact of social media on mental health and how to use it mindfully.',
        category: 'Digital Wellness',
        url: 'https://www.mcleanhospital.org/essential/it-or-not-social-medias-affecting-your-mental-health',
      },
    ],

    videos: [
      {
        title: 'Mindfulness Meditation for Beginners',
        description: 'A 10-minute guided meditation to help you relax and reduce stress.',
        duration: '10 min',
        url: 'https://www.youtube.com/results?search_query=mindfulness+meditation+for+beginners',
      },
      {
        title: 'Breathing Exercises for Anxiety',
        description: 'Learn simple breathing techniques to calm your mind during anxious moments.',
        duration: '5 min',
        url: 'https://www.youtube.com/results?search_query=breathing+exercises+for+anxiety',
      },
      {
        title: 'Building Healthy Study Habits',
        description: 'Tips and strategies for maintaining balance while studying.',
        duration: '15 min',
        url: 'https://www.youtube.com/results?search_query=healthy+study+habits+for+students',
      },
    ],

    podcasts: [
      {
        title: 'The Mental Health Podcast',
        description: 'Weekly discussions about mental health topics relevant to students.',
        episodes: '50+ episodes',
        url: 'https://www.spotify.com/us/podcasts/',
      },
      {
        title: 'Mindful Moments',
        description: 'Short daily episodes with mindfulness tips and guided practices.',
        episodes: 'Daily',
        url: 'https://www.spotify.com/us/podcasts/',
      },
      {
        title: 'Student Success Stories',
        description: 'Inspiring stories from students who overcame mental health challenges.',
        episodes: '30+ episodes',
        url: 'https://www.spotify.com/us/podcasts/',
      },
    ],

    support: [
      {
        title: 'Crisis Text Line',
        description: 'Text HOME to 741741 for 24/7 crisis support',
        contact: 'Text: 741741',
        type: 'Crisis Support',
        url: 'https://www.crisistextline.org/',
      },
      {
        title: 'National Suicide Prevention Lifeline',
        description: '24/7 free and confidential support for people in distress',
        contact: 'Call: 988',
        type: 'Crisis Support',
        url: 'https://988lifeline.org/',
      },
      {
        title: 'Student Counseling Services',
        description: 'On-campus mental health services available to all students',
        contact: 'Contact your school',
        type: 'Campus Resources',
        url: 'https://www.mentalhealth.gov/get-help/immediate-help',
      },
    ],
  }

  const handleResourceClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="resources">
      <div className="resources-header">
        <h1>Resources</h1>
        <p>Helpful articles, videos, and support resources for your mental health journey</p>
      </div>

      <div className="resources-content">
        {/* Articles */}
        <section className="resource-section">
          <div className="section-header">
            <FiBook className="section-icon" />
            <h2>Articles & Guides</h2>
          </div>

          <div className="resource-grid">
            {resources.articles.map((article, idx) => (
              <div key={idx} className="resource-card">
                <div className="resource-category">{article.category}</div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <button
                  className="resource-btn"
                  onClick={() => handleResourceClick(article.url)}
                >
                  Read More <FiExternalLink />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Videos */}
        <section className="resource-section">
          <div className="section-header">
            <FiVideo className="section-icon" />
            <h2>Videos & Tutorials</h2>
          </div>

          <div className="resource-grid">
            {resources.videos.map((video, idx) => (
              <div key={idx} className="resource-card">
                <div className="resource-duration">{video.duration}</div>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <button
                  className="resource-btn"
                  onClick={() => handleResourceClick(video.url)}
                >
                  Watch <FiExternalLink />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Podcasts */}
        <section className="resource-section">
          <div className="section-header">
            <FiHeadphones className="section-icon" />
            <h2>Podcasts</h2>
          </div>

          <div className="resource-grid">
            {resources.podcasts.map((podcast, idx) => (
              <div key={idx} className="resource-card">
                <div className="resource-episodes">{podcast.episodes}</div>
                <h3>{podcast.title}</h3>
                <p>{podcast.description}</p>
                <button
                  className="resource-btn"
                  onClick={() => handleResourceClick(podcast.url)}
                >
                  Listen <FiExternalLink />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Support */}
        <section className="resource-section">
          <div className="section-header">
            <FiUsers className="section-icon" />
            <h2>Support & Help</h2>
          </div>

          <div className="resource-grid">
            {resources.support.map((support, idx) => (
              <div key={idx} className="resource-card support-card">
                <div className="support-type">{support.type}</div>
                <h3>{support.title}</h3>
                <p>{support.description}</p>
                <div className="support-contact">
                  <strong>{support.contact}</strong>
                </div>
                <button
                  className="resource-btn"
                  onClick={() => handleResourceClick(support.url)}
                >
                  Learn More <FiExternalLink />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Resources

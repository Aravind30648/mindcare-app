# Student Mental Health Platform

A comprehensive React-based mental health platform designed specifically for students to track their mental wellbeing, journal their thoughts, access resources, and take self-assessments.

## Features

- **Dashboard**: Overview of mood statistics, journal entries, and quick actions
- **Mood Tracker**: Daily mood tracking with ratings and notes
- **Journal**: Personal journaling with date tracking and entry management
- **Resources**: Curated articles, videos, podcasts, and support resources
- **Self-Assessment**: Mental health assessment tool with personalized recommendations

## Tech Stack

- React 18
- React Router DOM
- Vite
- React Icons

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── MoodTracker.jsx
│   │   ├── MoodTracker.css
│   │   ├── Journal.jsx
│   │   ├── Journal.css
│   │   ├── Resources.jsx
│   │   ├── Resources.css
│   │   ├── SelfAssessment.jsx
│   │   └── SelfAssessment.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Features in Detail

### Dashboard
- View mood statistics and trends
- Quick access to all platform features
- Recent journal entries preview

### Mood Tracker
- Select mood (Happy, Neutral, Sad)
- Rate mood on a scale of 1-10
- Add optional notes
- View mood history

### Journal
- Create, edit, and delete journal entries
- Date-based organization
- Rich text support

### Resources
- Mental health articles
- Video tutorials
- Podcast recommendations
- Crisis support information

### Self-Assessment
- 8-question mental health assessment
- Personalized results and recommendations
- Progress tracking

## Data Storage

All data is stored locally in the browser using localStorage. No data is sent to external servers.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.


import React, { useState } from 'react'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import './SelfAssessment.css'

const SelfAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const questions = [
    {
      id: 1,
      question: 'How often have you felt down, depressed, or hopeless in the past 2 weeks?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' },
      ],
    },
    {
      id: 2,
      question: 'How often have you had little interest or pleasure in doing things?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' },
      ],
    },
    {
      id: 3,
      question: 'How often have you felt nervous, anxious, or on edge?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' },
      ],
    },
    {
      id: 4,
      question: 'How often have you been unable to stop or control worrying?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' },
      ],
    },
    {
      id: 5,
      question: 'How often have you had trouble falling or staying asleep?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' },
      ],
    },
    {
      id: 6,
      question: 'How often have you felt tired or had little energy?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' },
      ],
    },
    {
      id: 7,
      question: 'How often have you had poor appetite or overeating?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' },
      ],
    },
    {
      id: 8,
      question: 'How often have you had trouble concentrating on things?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' },
      ],
    },
  ]

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateResult()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateResult = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0)
    const maxScore = questions.length * 3
    const percentage = (totalScore / maxScore) * 100

    let level, message, recommendations

    if (percentage < 25) {
      level = 'Low'
      message = 'Your mental health appears to be in good shape. Keep up the good work!'
      recommendations = [
        'Continue practicing self-care',
        'Maintain healthy routines',
        'Stay connected with friends and family',
      ]
    } else if (percentage < 50) {
      level = 'Mild'
      message = 'You may be experiencing some mild symptoms. Consider practicing self-care techniques.'
      recommendations = [
        'Try mindfulness and meditation',
        'Ensure adequate sleep',
        'Engage in regular physical activity',
        'Consider talking to someone you trust',
      ]
    } else if (percentage < 75) {
      level = 'Moderate'
      message = 'You may be experiencing moderate symptoms. It might be helpful to seek support.'
      recommendations = [
        'Consider speaking with a counselor or therapist',
        'Practice stress management techniques',
        'Maintain a regular sleep schedule',
        'Connect with support groups',
        'Use the resources section for additional help',
      ]
    } else {
      level = 'High'
      message = 'You may be experiencing significant symptoms. Please consider seeking professional help.'
      recommendations = [
        'Reach out to a mental health professional',
        'Contact crisis support if needed',
        'Talk to someone you trust',
        'Use the support resources available',
        'Consider speaking with your school counselor',
      ]
    }

    setResult({ level, message, recommendations, score: totalScore, percentage })
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    return (
      <div className="assessment">
        <div className="assessment-header">
          <h1>Assessment Results</h1>
        </div>
        <div className="result-container">
          <div className={`result-card ${result.level.toLowerCase()}`}>
            <div className="result-icon">
              {result.level === 'Low' ? (
                <FiCheckCircle style={{ color: '#10b981' }} />
              ) : (
                <FiAlertCircle style={{ color: result.level === 'High' ? '#ef4444' : '#f59e0b' }} />
              )}
            </div>
            <h2>Level: {result.level}</h2>
            <div className="result-score">
              Score: {result.score} / {questions.length * 3}
            </div>
            <p className="result-message">{result.message}</p>
            <div className="recommendations">
              <h3>Recommendations:</h3>
              <ul>
                {result.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
            <button className="restart-btn" onClick={handleRestart}>
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="assessment">
      <div className="assessment-header">
        <h1>Self-Assessment</h1>
        <p>This assessment helps you understand your current mental health state</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">
          Question {currentStep + 1} of {questions.length}
        </div>
      </div>

      <div className="assessment-content">
        <div className="question-card">
          <h2 className="question-text">{currentQuestion.question}</h2>
          <div className="options-list">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${answers[currentQuestion.id] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="question-actions">
            {currentStep > 0 && (
              <button className="prev-btn" onClick={handlePrevious}>
                Previous
              </button>
            )}
            <button
              className="next-btn"
              onClick={handleNext}
              disabled={answers[currentQuestion.id] === undefined}
            >
              {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelfAssessment


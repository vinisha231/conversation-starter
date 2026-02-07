import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const languages = useMemo(
    () => [
      { id: 'fr', label: 'French' },
      { id: 'es', label: 'Spanish' },
      { id: 'jp', label: 'Japanese' },
    ],
    []
  )
  const scenarios = useMemo(
    () => [
      { id: 'cafe', label: 'Ordering at a cafe' },
      { id: 'meet', label: 'Meeting someone new' },
      { id: 'directions', label: 'Asking for directions' },
      { id: 'shop', label: 'Shopping for a gift' },
    ],
    []
  )
  const prompts = useMemo(
    () => ({
      fr: {
        cafe: 'You are at a cafe in Paris. Order a coffee and ask if they have oat milk.',
        meet: 'You are at a language meetup in Lyon. Introduce yourself and ask what the other person does.',
        directions: 'You are near the Louvre. Ask how to get to the nearest metro station.',
        shop: 'You are in a small shop. Ask for a gift recommendation under 20 euros.',
      },
      es: {
        cafe: 'You are at a cafe in Madrid. Order a coffee and ask if they have oat milk.',
        meet: 'You are meeting a neighbor in Mexico City. Introduce yourself and ask where they are from.',
        directions: 'You are in Barcelona. Ask how to get to the beach and if it is walkable.',
        shop: 'You are in a market. Ask for a souvenir that is easy to pack.',
      },
      jp: {
        cafe: 'You are at a cafe in Tokyo. Order a matcha latte and ask if it is sweetened.',
        meet: 'You are meeting a friend of a friend. Introduce yourself and ask what they like to do.',
        directions: 'You are at a train station. Ask which platform you need for Shibuya.',
        shop: 'You are in a bookstore. Ask for a recommendation for beginners learning Japanese.',
      },
    }),
    []
  )

  const [language, setLanguage] = useState('')
  const [scenario, setScenario] = useState('')
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!language || !scenario) {
      setPrompt('')
      setError('')
      setIsGenerating(false)
      return
    }

    setIsGenerating(true)
    setPrompt('')
    setFeedback('')
    setError('')
    setResponse('')

    const timer = setTimeout(() => {
      const nextPrompt = prompts[language]?.[scenario]
      if (!nextPrompt) {
        setError('No prompt found for that selection. Try another scenario.')
        setPrompt('')
      } else {
        setPrompt(nextPrompt)
      }
      setIsGenerating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [language, scenario, prompts])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!prompt) {
      setError('Select a language and scenario to get a prompt.')
      return
    }
    if (!response.trim()) {
      setError('Type a response before submitting.')
      return
    }

    setError('')
    setFeedback('')
    setIsSubmitting(true)

    setTimeout(() => {
      const wordCount = response.trim().split(/\s+/).length
      const endsWithQuestion = response.trim().endsWith('?')
      if (wordCount < 6) {
        setFeedback('Good start. Try adding one more sentence to make it feel natural.')
      } else if (!endsWithQuestion) {
        setFeedback('Nice! Consider adding a polite question to keep the conversation going.')
      } else {
        setFeedback('Great flow! Your response sounds conversational and polite.')
      }
      setIsSubmitting(false)
    }, 700)
  }

  return (
    <div className="app">
      <header className="header">
        <p className="eyebrow">Conversation Starter MVP</p>
        <h1>Practice real-world language chats</h1>
        <p className="subhead">
          Pick a language and scenario. You will get a short prompt to respond to.
        </p>
      </header>

      <main className="screen">
        <section className="panel">
          <h2>Choose your practice</h2>
          <div className="field">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="">Select a language</option>
              {languages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="scenario">Scenario</label>
            <select
              id="scenario"
              value={scenario}
              onChange={(event) => setScenario(event.target.value)}
            >
              <option value="">Select a scenario</option>
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="panel">
          <div className="prompt-header">
            <h2>Conversation prompt</h2>
            {language && scenario ? (
              <span className="badge">
                {isGenerating ? 'Loading' : 'Ready'}
              </span>
            ) : (
              <span className="badge muted">Waiting</span>
            )}
          </div>

          <div className="prompt-body">
            {isGenerating && <p className="status">Creating a prompt...</p>}
            {!isGenerating && !prompt && !error && (
              <p className="status">Select a language and scenario to begin.</p>
            )}
            {!isGenerating && error && <p className="status error">{error}</p>}
            {!isGenerating && prompt && <p className="prompt-text">{prompt}</p>}
          </div>

          <form className="response" onSubmit={handleSubmit}>
            <label htmlFor="response">Your response</label>
            <textarea
              id="response"
              placeholder="Type your response in the selected language."
              value={response}
              onChange={(event) => setResponse(event.target.value)}
              rows={4}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Checking...' : 'Submit response'}
            </button>
          </form>

          {feedback && (
            <div className="feedback">
              <h3>Quick feedback</h3>
              <p>{feedback}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { questions as initialQuestions } from './data/questions'

export interface Answer {
  text: string
  percentage: number
}

export interface Question {
  id: number
  text: string
  answers: Answer[]
}

function App() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(
    new Array(6).fill(false)
  )
  const [team1Score, setTeam1Score] = useState(0)
  const [team2Score, setTeam2Score] = useState(0)
  const [showScorePanel, setShowScorePanel] = useState(false)
  const [scoreTeam, setScoreTeam] = useState<1 | 2>(1)
  const [scoreValue, setScoreValue] = useState('')
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [configTab, setConfigTab] = useState<'list' | 'edit' | 'add'>('list')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmConfig, setConfirmConfig] = useState<{ type: 'delete-question' | 'restart' | 'empty-question', id?: number } | null>(null)

  const currentQuestion: Question = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  const handleRevealAnswer = (index: number) => {
    if (!revealedAnswers[index]) {
      const newRevealed = [...revealedAnswers]
      newRevealed[index] = true
      setRevealedAnswers(newRevealed)
    }
  }

  const handleRevealAll = () => {
    setRevealedAnswers(new Array(6).fill(true))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setRevealedAnswers(new Array(6).fill(false))
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setRevealedAnswers(new Array(6).fill(false))
    }
  }

  const handleOpenScorePanel = (team: 1 | 2) => {
    setScoreTeam(team)
    setScoreValue('')
    setShowScorePanel(true)
  }

  const handleAddScore = () => {
    const points = parseInt(scoreValue) || 0
    if (points > 0) {
      if (scoreTeam === 1) {
        setTeam1Score(team1Score + points)
      } else {
        setTeam2Score(team2Score + points)
      }
    }
    setShowScorePanel(false)
  }

  const handleRestartGame = () => {
    setConfirmConfig({ type: 'restart' })
    setShowConfirmModal(true)
  }

  const getTopAnswers = () => {
    const sorted = [...currentQuestion.answers].sort((a, b) => b.percentage - a.percentage)
    return sorted.slice(0, 6)
  }

  const topAnswers = getTopAnswers()

  // Configuración - Gestión de preguntas
  const handleOpenConfig = () => {
    setShowConfigModal(true)
    setConfigTab('list')
    setEditingQuestion(null)
  }

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({ ...question, answers: [...question.answers] })
    setConfigTab('edit')
  }

  const handleAddNewQuestion = () => {
    setEditingQuestion({
      id: Date.now(),
      text: '',
      answers: [
        { text: '', percentage: 0 }
      ]
    })
    setConfigTab('edit')
  }

  const handleSaveQuestion = () => {
    if (!editingQuestion) return

    if (editingQuestion.text.trim() === '') {
      setConfirmConfig({ type: 'empty-question' })
      setShowConfirmModal(true)
      return
    }

    const existingIndex = questions.findIndex(q => q.id === editingQuestion.id)

    if (existingIndex >= 0) {
      // Actualizar pregunta existente
      const newQuestions = [...questions]
      newQuestions[existingIndex] = editingQuestion
      setQuestions(newQuestions)
    } else {
      // Agregar nueva pregunta
      setQuestions([...questions, editingQuestion])
    }

    setEditingQuestion(null)
    setConfigTab('list')
  }

  const handleDeleteQuestion = (id: number) => {
    setConfirmConfig({ type: 'delete-question', id })
    setShowConfirmModal(true)
  }

  const handleConfirmAction = () => {
    if (!confirmConfig) return

    if (confirmConfig.type === 'delete-question' && confirmConfig.id) {
      const newQuestions = questions.filter(q => q.id !== confirmConfig.id)
      setQuestions(newQuestions)
      if (currentQuestionIndex >= newQuestions.length) {
        setCurrentQuestionIndex(Math.max(0, newQuestions.length - 1))
      }
    } else if (confirmConfig.type === 'restart') {
      setCurrentQuestionIndex(0)
      setRevealedAnswers(new Array(6).fill(false))
      setTeam1Score(0)
      setTeam2Score(0)
    }

    setShowConfirmModal(false)
    setConfirmConfig(null)
  }

  const getConfirmMessage = () => {
    if (!confirmConfig) return ''
    switch (confirmConfig.type) {
      case 'delete-question':
        return '¿Estás seguro de eliminar esta pregunta?'
      case 'restart':
        return '¿Estás seguro de reiniciar el juego?'
      case 'empty-question':
        return 'La pregunta no puede estar vacía'
      default:
        return ''
    }
  }

  const handleUpdateAnswer = (answerIndex: number, field: 'text' | 'percentage', value: string | number) => {
    if (!editingQuestion) return
    const newAnswers = [...editingQuestion.answers]
    newAnswers[answerIndex] = { ...newAnswers[answerIndex], [field]: value }
    setEditingQuestion({ ...editingQuestion, answers: newAnswers })
  }

  const handleDeleteAnswer = (answerIndex: number) => {
    if (!editingQuestion) return
    const newAnswers = editingQuestion.answers.filter((_, index) => index !== answerIndex)
    setEditingQuestion({ ...editingQuestion, answers: newAnswers })
  }

  const handleAddAnswer = () => {
    if (!editingQuestion) return
    const newAnswers = [...editingQuestion.answers, { text: '', percentage: 0 }]
    setEditingQuestion({ ...editingQuestion, answers: newAnswers })
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <h1 className="game-title">100 Mexicanos Dijeron</h1>
      </header>

      {/* Marcador */}
      <div className="scoreboard">
        <div className="team">
          <span className="team-name">Equipo 1</span>
          <div
            className="team-score"
            onClick={() => handleOpenScorePanel(1)}
            style={{ cursor: 'pointer' }}
          >
            {team1Score}
          </div>
          <button
            className="control-btn btn-score"
            onClick={() => handleOpenScorePanel(1)}
          >
            + Puntos
          </button>
        </div>

        <span className="vs-divider">VS</span>

        <div className="team">
          <span className="team-name">Equipo 2</span>
          <div
            className="team-score"
            onClick={() => handleOpenScorePanel(2)}
            style={{ cursor: 'pointer' }}
          >
            {team2Score}
          </div>
          <button
            className="control-btn btn-score"
            onClick={() => handleOpenScorePanel(2)}
          >
            + Puntos
          </button>
        </div>
      </div>

      {/* Selector de pregunta */}
      <div className="question-selector">
        <span className="question-number">
          Pregunta {currentQuestionIndex + 1} de {totalQuestions}
        </span>
        <h2 className="question-text">{currentQuestion.text}</h2>
      </div>

      {/* Tablero de respuestas */}
      <div className="answer-board">
        {topAnswers.map((answer, index) => (
          <div
            key={index}
            className={`answer-slot ${revealedAnswers[index] ? 'revealed' : ''}`}
            onClick={() => handleRevealAnswer(index)}
          >
            <span className="slot-number">{index + 1}</span>
            <span className={`slot-answer ${!revealedAnswers[index] ? 'hidden' : ''}`}>
              {answer.text}
            </span>
            <span className="slot-percentage">
              {revealedAnswers[index] ? `${answer.percentage}%` : '???'}
            </span>
          </div>
        ))}
      </div>

      {/* Controles */}
      <div className="controls">
        <button
          className="control-btn btn-prev"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          ◀ Anterior
        </button>

        <button
          className="control-btn btn-next"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Siguiente ▶
        </button>

        <button
          className="control-btn btn-reveal"
          onClick={handleRevealAll}
        >
          Revelar Todas
        </button>

        <button
          className="control-btn btn-restart"
          onClick={handleRestartGame}
        >
          🔄 Reiniciar
        </button>

        <button
          className="control-btn btn-config"
          onClick={handleOpenConfig}
        >
          ⚙️ Configurar
        </button>
      </div>

      {/* Panel de puntuación */}
      {showScorePanel && (
        <div className="score-panel" onClick={() => setShowScorePanel(false)}>
          <div className="score-content" onClick={e => e.stopPropagation()}>
            <h2>Agregar Puntos - Equipo {scoreTeam}</h2>
            <div className="score-input">
              <input
                type="number"
                value={scoreValue}
                onChange={(e) => setScoreValue(e.target.value)}
                placeholder="0"
                min="0"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleAddScore()}
              />
            </div>
            <div className="score-buttons">
              <button
                className="control-btn btn-score"
                onClick={handleAddScore}
              >
                Añadir
              </button>
              <button
                className="control-btn btn-restart"
                onClick={() => setShowScorePanel(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configuración */}
      {showConfigModal && (
        <div className="config-modal">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚙️ Configurar Preguntas</h2>
              <button
                className="btn-close"
                onClick={() => setShowConfigModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Pestañas */}
            <div className="config-tabs">
              <button
                className={`config-tab ${configTab === 'list' ? 'active' : ''}`}
                onClick={() => setConfigTab('list')}
              >
                📋 Lista de Preguntas
              </button>
              <button
                className={`config-tab ${configTab === 'add' ? 'active' : ''}`}
                onClick={handleAddNewQuestion}
              >
                ➕ Nueva Pregunta
              </button>
            </div>

            {/* Contenido de pestañas */}
            <div className="config-body">
              {configTab === 'list' && (
                <div className="questions-list">
                  {questions.map((q, index) => (
                    <div key={q.id} className="question-item">
                      <div className="question-item-header">
                        <span className="question-item-number">{index + 1}</span>
                        <span className="question-item-text">{q.text}</span>
                      </div>
                      <div className="question-item-actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEditQuestion(q)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteQuestion(q.id)}
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {configTab === 'edit' && editingQuestion && (
                <div className="question-editor">
                  <div className="form-group">
                    <label>Pregunta:</label>
                    <textarea
                      value={editingQuestion.text}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                      placeholder="Escribe la pregunta..."
                      rows={3}
                    />
                  </div>

                  <h3>Respuestas:</h3>
                  <div className="answers-editor">
                    {editingQuestion.answers.map((answer, index) => (
                      <div key={index} className="answer-row">
                        <span className="answer-number">{index + 1}</span>
                        <input
                          type="text"
                          value={answer.text}
                          onChange={(e) => handleUpdateAnswer(index, 'text', e.target.value)}
                          placeholder="Respuesta"
                          className="answer-text-input"
                        />
                        <input
                          type="number"
                          value={answer.percentage}
                          onChange={(e) => handleUpdateAnswer(index, 'percentage', parseInt(e.target.value) || 0)}
                          placeholder="%"
                          className="answer-percent-input"
                        />
                        <span className="percent-sign">%</span>
                        {editingQuestion.answers.length > 1 && (
                          <button
                            className="btn-remove-answer"
                            onClick={() => handleDeleteAnswer(index)}
                            title="Eliminar respuesta"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    {editingQuestion.answers.length < 7 && (
                      <button
                        className="btn-add-answer"
                        onClick={handleAddAnswer}
                      >
                        + Agregar respuesta
                      </button>
                    )}
                  </div>

                  <div className="editor-actions">
                    <button
                      className="control-btn btn-score"
                      onClick={handleSaveQuestion}
                    >
                      💾 Guardar
                    </button>
                    <button
                      className="control-btn btn-restart"
                      onClick={() => {
                        setEditingQuestion(null)
                        setConfigTab('list')
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <div className="config-modal" onClick={() => { setShowConfirmModal(false); setConfirmConfig(null); }}>
          <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{confirmConfig?.type === 'empty-question' ? 'Advertencia' : 'Confirmar'}</h2>
              <button
                className="btn-close"
                onClick={() => { setShowConfirmModal(false); setConfirmConfig(null); }}
              >
                ✕
              </button>
            </div>
            <div className="confirm-body">
              <p>{getConfirmMessage()}</p>
            </div>
            <div className="editor-actions">
              {confirmConfig?.type !== 'empty-question' && (
                <button
                  className="control-btn btn-score"
                  onClick={handleConfirmAction}
                >
                  Aceptar
                </button>
              )}
              <button
                className="control-btn btn-restart"
                onClick={() => { setShowConfirmModal(false); setConfirmConfig(null); }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

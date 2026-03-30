import { useState } from 'react'
import './App.css'
import { ThemeProvider, useTheme } from './components/context/dark-mode'
import ThemeToggle from './components/toggle-theme/toggle-theme'

const initialTodos = [
  { id: 1, text: 'NOTE #1', done: false },
  { id: 2, text: 'NOTE #2', done: true },
  { id: 3, text: 'NOTE #3', done: false },
]

const FILTERS = ['ALL', 'Complete', 'Incomplete']

function AppContent() {
  const { darkMode } = useTheme()
  const [todos, setTodos] = useState(initialTodos)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [addText, setAddText] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = todos.filter(t => {
    const matchSearch = t.text.toLowerCase().includes(search.toLowerCase())
    if (filter === 'Incomplete') return matchSearch && !t.done
    if (filter === 'Complete') return matchSearch && t.done
    return matchSearch
  })

  function toggle(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function remove(id) {
    setTodos(todos.filter(t => t.id !== id))
  }

  function startEdit(todo) {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  function saveEdit(id) {
    if (editText.trim()) {
      setTodos(todos.map(t => t.id === id ? { ...t, text: editText.trim() } : t))
    }
    setEditId(null)
    setEditText('')
  }

  function addTodo() {
    if (addText.trim()) {
      setTodos([...todos, { id: Date.now(), text: addText.trim(), done: false }])
      setAddText('')
      setShowAdd(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">TODO LIST</h1>

        <div className="toolbar">
          <div className="search-wrap">
            <img src={darkMode ? "/Vector-dark.svg" : "/Vector.svg"} className="search-icon" alt="" />
            <input
              className="search"
              placeholder="Search note..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-wrap">
            <button className="filter-btn" onClick={() => setFilterOpen(o => !o)}>
              {filter}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {filterOpen && (
              <ul className="filter-dropdown">
                {FILTERS.map(f => (
                  <li key={f} className={f === filter ? 'active' : ''} onClick={() => { setFilter(f); setFilterOpen(false) }}>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="theme-toggle">
            <ThemeToggle />
          </div>

        </div>

        <ul className="todo-list">
          {filtered.map(todo => (
            <li key={todo.id} className={`todo-item${todo.done ? ' done' : ''}`}>
              <button className={`checkbox${todo.done ? ' checked' : ''}`} onClick={() => toggle(todo.id)}>
                {todo.done && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </button>

              {editId === todo.id ? (
                <input
                  className="edit-input"
                  value={editText}
                  autoFocus
                  onChange={e => setEditText(e.target.value)}
                  onBlur={() => saveEdit(todo.id)}
                  onKeyDown={e => { if (e.key === 'Enter') saveEdit(todo.id); if (e.key === 'Escape') setEditId(null) }}
                />
              ) : (
                <span className="todo-text">{todo.text}</span>
              )}

              <div className="actions">
                <button className="action-btn" onClick={() => startEdit(todo)}>
                  <img src="/Frame 6.svg" alt="" />
                </button>
                <button className="action-btn delete" onClick={() => remove(todo.id)}>
                  <img src="/trash.svg" alt="" />
                </button>
              </div>
            </li>
          ))}

          {filtered.length === 0 && (
            <li className="empty">
              <img src={darkMode ? "/Detective-dark.png" : "/Detective.png"} className="empty-img" alt="" />
              <span>Empty...</span>
            </li>
          )}
        </ul>
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>New Note</h2>
            <input
              className="modal-input"
              placeholder="Input your note..."
              value={addText}
              autoFocus
              onChange={e => setAddText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addTodo(); if (e.key === 'Escape') setShowAdd(false) }}
            />
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="modal-add" onClick={addTodo}>Apply</button>
            </div>
          </div>
        </div>
      )}

      <button className="fab" onClick={() => setShowAdd(true)}>
        <img src="/plus.svg" alt="" />
      </button>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'

export default function Login({ onLogin }: { onLogin: (u: string, p: string) => boolean }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = onLogin(username, password)
    if (ok) {
      navigate('/')
    } else {
      setError('Usuário ou senha incorretos')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">AeroCode ✈️</h1>
        <form onSubmit={handleSubmit}>
          <label>Usuário</label>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required />
          <label>Senha</label>
          <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="123" required />
          {error && <p className="error">{error}</p>}
          <button className="login-btn" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

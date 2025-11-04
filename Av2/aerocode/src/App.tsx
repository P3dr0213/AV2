import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Aeronaves from './pages/Aeronaves'
import Pecas from './pages/Pecas'
import Funcionarios from './pages/Funcionarios'
import GerenciarAeronaves from './pages/GerenciarAeronaves'
import Login from './pages/Login'

export default function App() {
  const [user, setUser] = useState<{ name: string } | null>(null)

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === '123') {
      setUser({ name: 'Administrador' })
      return true
    }
    return false
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aeronaves" element={<Aeronaves />} />
        <Route path="/pecas" element={<Pecas />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/gerenciar" element={<GerenciarAeronaves />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

import React, { useState } from 'react'
import '../styles/funcionarios.css'

type Func = { id: number; nome: string; cargo: string; matricula: string }

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState<Func[]>([])
  const [form, setForm] = useState({ nome: '', cargo: '', matricula: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    setFuncionarios([...funcionarios, { ...form, id: Date.now() } as Func])
    setForm({ nome: '', cargo: '', matricula: '' })
  }

  return (
    <div className="funcionarios-page">
      <h1>Funcionários</h1>

      <div className="form-container">
        <h2>Cadastro de Funcionário</h2>
        <form onSubmit={add}>
          <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
          <input name="cargo" value={form.cargo} onChange={handleChange} placeholder="Cargo" required />
          <input name="matricula" value={form.matricula} onChange={handleChange} placeholder="Matrícula" required />
          <button type="submit">Adicionar Funcionário</button>
        </form>
      </div>

      <div className="table-container">
        <h2>Lista de Funcionários</h2>
        <table>
          <thead><tr><th>Nome</th><th>Cargo</th><th>Matrícula</th></tr></thead>
          <tbody>
            {funcionarios.map(f => <tr key={f.id}><td>{f.nome}</td><td>{f.cargo}</td><td>{f.matricula}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

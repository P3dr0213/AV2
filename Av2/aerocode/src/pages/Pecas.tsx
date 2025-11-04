import React, { useState } from 'react'
import '../styles/pecas.css'

type Peca = { id: number; nome: string; codigo: string; descricao?: string }

export default function Pecas() {
  const [pecas, setPecas] = useState<Peca[]>([])
  const [form, setForm] = useState({ nome: '', codigo: '', descricao: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    setPecas([...pecas, { ...form, id: Date.now() } as Peca])
    setForm({ nome: '', codigo: '', descricao: '' })
  }

  return (
    <div className="pecas-page">
      <h1>Peças</h1>
      <div className="form-container">
        <h2>Cadastro de Peça</h2>
        <form onSubmit={add}>
          <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome da Peça" required />
          <input name="codigo" value={form.codigo} onChange={handleChange} placeholder="Código" required />
          <input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição (opcional)" />
          <button type="submit">Adicionar Peça</button>
        </form>
      </div>

      <div className="table-container">
        <h2>Lista de Peças</h2>
        <table>
          <thead>
            <tr><th>Nome</th><th>Código</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            {pecas.map(p => (
              <tr key={p.id}><td>{p.nome}</td><td>{p.codigo}</td><td>{p.descricao}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

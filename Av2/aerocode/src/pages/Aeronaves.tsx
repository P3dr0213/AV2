import React, { useState } from 'react'
import '../styles/aeronaves.css'

type Aero = { id: number; modelo: string; prefixo: string; status: string }

export default function Aeronaves() {
  const [aeronaves, setAeronaves] = useState<Aero[]>([
    { id: 1, modelo: 'Boeing 737', prefixo: 'ABC123', status: 'Operacional' },
    { id: 2, modelo: 'Airbus A320', prefixo: 'DEF456', status: 'Em manutenção' },
  ])

  const [form, setForm] = useState({ modelo: '', prefixo: '', status: 'Operacional' })
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    setAeronaves([...aeronaves, { ...form, id: Date.now() } as Aero])
    setForm({ modelo: '', prefixo: '', status: 'Operacional' })
  }

  const filtered = aeronaves.filter(a =>
    (filterStatus ? a.status === filterStatus : true) &&
    (search ? a.modelo.toLowerCase().includes(search.toLowerCase()) || a.prefixo.toLowerCase().includes(search.toLowerCase()) : true)
  )

  return (
    <div className="aeronaves-page">
      <h1>Aeronaves</h1>

      <div className="controls">
        <input placeholder="Buscar por modelo ou prefixo" value={search} onChange={e => setSearch(e.target.value)} />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Todos os status</option>
          <option>Operacional</option>
          <option>Em manutenção</option>
          <option>Indisponível</option>
        </select>
      </div>

      <div className="form-container">
        <h2>Cadastro de Aeronave</h2>
        <form onSubmit={add}>
          <input name="modelo" value={form.modelo} onChange={handleChange} placeholder="Modelo" required />
          <input name="prefixo" value={form.prefixo} onChange={handleChange} placeholder="Prefixo" required />
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Operacional</option>
            <option>Em manutenção</option>
            <option>Indisponível</option>
          </select>
          <button type="submit">Adicionar Aeronave</button>
        </form>
      </div>

      <div className="table-container">
        <h2>Lista de Aeronaves</h2>
        <table>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Prefixo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td>{a.modelo}</td>
                <td>{a.prefixo}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

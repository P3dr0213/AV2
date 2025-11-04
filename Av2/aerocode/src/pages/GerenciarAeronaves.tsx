import React, { useState, useEffect } from 'react'
import '../styles/gerenciar.css'

type Aero = { id: number; modelo: string; prefixo: string; status: string; pecas: any[]; funcionarios: any[] }

export default function GerenciarAeronaves() {
  const [aeronaves, setAeronaves] = useState<Aero[]>([
    { id: 1, modelo: 'Boeing 737', prefixo: 'ABC123', status: 'Operacional', pecas: [], funcionarios: [] },
    { id: 2, modelo: 'Airbus A320', prefixo: 'DEF456', status: 'Em manutenção', pecas: [], funcionarios: [] },
  ])
  const [pecasDisponiveis, setPecasDisponiveis] = useState([{ id: 1, nome: 'Motor', codigo: 'MTR01' }, { id: 2, nome: 'Trem de pouso', codigo: 'TP02' }])
  const [funcDisponiveis, setFuncDisponiveis] = useState([{ id: 1, nome: 'João Silva', cargo: 'Piloto' }, { id: 2, nome: 'Maria Souza', cargo: 'Engenheira' }])

  const [selectedAeroId, setSelectedAeroId] = useState<number | null>(null)
  const [selectedPecaId, setSelectedPecaId] = useState<number | null>(null)
  const [selectedFuncId, setSelectedFuncId] = useState<number | null>(null)
  const [novoStatus, setNovoStatus] = useState('')

  const [filtroStatus, setFiltroStatus] = useState('')
  const [filtroNome, setFiltroNome] = useState('')

  const aeronavesFiltradas = aeronaves.filter(a =>
    (filtroStatus ? a.status === filtroStatus : true) &&
    (filtroNome ? a.modelo.toLowerCase().includes(filtroNome.toLowerCase()) : true)
  )

  const selectedAeronave = aeronaves.find(a => a.id === selectedAeroId) || null

  const alterarStatus = () => {
    if (!selectedAeronave || !novoStatus) return
    setAeronaves(aeronaves.map(a => a.id === selectedAeroId ? { ...a, status: novoStatus } : a))
    setNovoStatus('')
  }

  const adicionarPeca = () => {
    if (!selectedAeronave || !selectedPecaId) return
    const p = pecasDisponiveis.find(p => p.id === selectedPecaId)
    if (!p) return
    setAeronaves(aeronaves.map(a => a.id === selectedAeroId ? { ...a, pecas: [...a.pecas, p] } : a))
    setSelectedPecaId(null)
  }

  const adicionarFuncionario = () => {
    if (!selectedAeronave || !selectedFuncId) return
    const f = funcDisponiveis.find(f => f.id === selectedFuncId)
    if (!f) return
    setAeronaves(aeronaves.map(a => a.id === selectedAeroId ? { ...a, funcionarios: [...a.funcionarios, f] } : a))
    setSelectedFuncId(null)
  }

  return (
    <div className="gerenciar-page">
      <h1>Gerenciar Aeronaves</h1>

      <div className="gerenciar-container">
        <div className="section filtros">
          <h2>Filtros</h2>
          <div className="filtro-group">
            <input placeholder="Buscar por modelo" value={filtroNome} onChange={e => setFiltroNome(e.target.value)} />
            <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
              <option value="">Todos os status</option>
              <option>Operacional</option>
              <option>Em manutenção</option>
              <option>Indisponível</option>
            </select>
          </div>
        </div>

        <div className="section">
          <h2>Selecionar Aeronave</h2>
          <select value={selectedAeroId ?? ''} onChange={e => setSelectedAeroId(e.target.value ? parseInt(e.target.value) : null)}>
            <option value="">-- Selecione --</option>
            {aeronavesFiltradas.map(a => <option key={a.id} value={a.id}>{a.modelo} ({a.prefixo}) - {a.status}</option>)}
          </select>
        </div>

        {selectedAeronave && (
          <>
            <div className="section">
              <h2>Alterar Status</h2>
              <select value={novoStatus} onChange={e => setNovoStatus(e.target.value)}>
                <option value="">-- Selecione novo status --</option>
                <option>Operacional</option>
                <option>Em manutenção</option>
                <option>Indisponível</option>
              </select>
              <button onClick={alterarStatus}>Atualizar Status</button>
            </div>

            <div className="section">
              <h2>Adicionar Peça</h2>
              <select value={selectedPecaId ?? ''} onChange={e => setSelectedPecaId(e.target.value ? parseInt(e.target.value) : null)}>
                <option value="">-- Selecione peça --</option>
                {pecasDisponiveis.map(p => <option key={p.id} value={p.id}>{p.nome} ({p.codigo})</option>)}
              </select>
              <button onClick={adicionarPeca}>Adicionar Peça</button>
            </div>

            <div className="section">
              <h2>Adicionar Funcionário</h2>
              <select value={selectedFuncId ?? ''} onChange={e => setSelectedFuncId(e.target.value ? parseInt(e.target.value) : null)}>
                <option value="">-- Selecione funcionário --</option>
                {funcDisponiveis.map(f => <option key={f.id} value={f.id}>{f.nome} ({f.cargo})</option>)}
              </select>
              <button onClick={adicionarFuncionario}>Adicionar Funcionário</button>
            </div>

            <div className="section table-section">
              <h2>Detalhes da Aeronave</h2>
              <p><strong>Status:</strong> {selectedAeronave.status}</p>
              <p><strong>Peças:</strong> {selectedAeronave.pecas.map(p => p.nome).join(', ') || 'Nenhuma'}</p>
              <p><strong>Funcionários:</strong> {selectedAeronave.funcionarios.map(f => f.nome).join(', ') || 'Nenhum'}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

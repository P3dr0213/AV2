import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="brand">✈️ AeroCode</h2>
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/aeronaves">Aeronaves</NavLink></li>
        <li><NavLink to="/pecas">Peças</NavLink></li>
        <li><NavLink to="/funcionarios">Funcionários</NavLink></li>
        <li><NavLink to="/gerenciar">Gerenciar</NavLink></li>
      </ul>
    </nav>
  )
}

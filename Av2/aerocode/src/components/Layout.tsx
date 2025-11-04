import React from 'react'
import Navbar from './Navbar'
import '../styles/layout.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">{children}</main>
    </div>
  )
}

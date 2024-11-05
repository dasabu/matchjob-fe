import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../components/shared/Navbar'
import Footer from '../../components/shared/Footer'

interface ILayoutClientProps {
  children?: React.ReactNode
}

export default function LayoutClient({ children }: ILayoutClientProps) {
  return (
    <div>
      <Navbar />
      {children}
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

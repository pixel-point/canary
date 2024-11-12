import React from 'react'
import { Outlet } from 'react-router-dom'

const FullscreenLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <Outlet />
    </div>
  )
}

export default FullscreenLayout

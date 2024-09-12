import React from 'react'
import { Outlet } from 'react-router-dom'
import { TopBarWidget } from '../components/layout/top-bar-widget'
import { mockProjects } from '../data/mockProjects'

const PipelineLayout: React.FC = () => {
  return (
    <>
      <TopBarWidget projects={mockProjects} />
      <Outlet />
    </>
  )
}

export default PipelineLayout

import { Outlet } from 'react-router-dom'
import { noop } from 'lodash-es'
import { TopBarWidget } from '../components/layout/top-bar-widget'
import { mockProjects } from '../data/mockProjects'

const PipelineLayout: React.FC = () => {
  return (
    <>
      <TopBarWidget projects={mockProjects} onSelectProject={noop} />
      <Outlet />
    </>
  )
}

export default PipelineLayout

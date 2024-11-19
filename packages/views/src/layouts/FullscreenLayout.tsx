import { Outlet } from 'react-router-dom'

const FullscreenLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <Outlet />
    </div>
  )
}

export default FullscreenLayout

import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { spaces } = useAppContext()
  if (!spaces || !spaces.length) {
    return null
  }
  const preSelectedProject = spaces[0]
  if (preSelectedProject?.space?.path) {
    navigate(`/${preSelectedProject.space.path}/repos`)
  }
}

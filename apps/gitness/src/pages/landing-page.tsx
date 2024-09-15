import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { selectedSpace } = useAppContext()
  if (selectedSpace) {
    navigate(`/${selectedSpace}/repos`)
  }
  return null
}

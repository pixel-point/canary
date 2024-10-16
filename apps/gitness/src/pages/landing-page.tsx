import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'
import { useEffect } from 'react'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { spaces } = useAppContext()
  useEffect(() => {
    if (!spaces.length) {
      navigate('/create-project')
    }
    if (spaces[0]?.path) {
      navigate(`${spaces[0].path}/repos`)
    }
  }, [spaces])
  return null
}

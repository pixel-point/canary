import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useToken from '../framework/hooks/useToken'

export const Logout: React.FC = () => {
  const navigate = useNavigate()
  const { removeToken } = useToken()

  useEffect(() => {
    removeToken()
    navigate('/signin')
  }, [])

  return null
}

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOpLogoutMutation } from '@harnessio/code-service-client'
import { useAppContext } from '../framework/context/AppContext'

export const Logout: React.FC = () => {
  const { resetApp } = useAppContext()
  const navigate = useNavigate()
  const { mutate: logout, isSuccess } = useOpLogoutMutation({})

  useEffect(() => {
    if (isSuccess) {
      resetApp()
      navigate('/signin') // Redirect to sign-in page
    }
  }, [isSuccess, navigate, resetApp])

  useEffect(() => {
    logout({})
  }, [logout])

  return 'Redirecting...'
}

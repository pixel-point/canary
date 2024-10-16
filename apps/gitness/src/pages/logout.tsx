import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@harnessio/canary'
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
  }, [isSuccess])

  const handleLogout = () => {
    logout({})
  }

  return (
    <Button theme="error" type="button" size="sm" onClick={handleLogout}>
      Log Out
    </Button>
  )
}

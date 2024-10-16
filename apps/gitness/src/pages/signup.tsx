import React, { useEffect } from 'react'
import { SignUpPage, SignUpDataProps } from '@harnessio/playground'
import { useOnRegisterMutation } from '@harnessio/code-service-client'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'

export const SignUp: React.FC = () => {
  const { setIsUserAuthorized } = useAppContext()
  const navigate = useNavigate()

  const {
    mutate: register,
    isLoading,
    isSuccess,
    error
  } = useOnRegisterMutation({ queryParams: { include_cookie: true } })

  useEffect(() => {
    if (isSuccess) {
      setIsUserAuthorized(true)
      navigate('/') // Redirect to Home page
    }
  }, [isSuccess])

  const handleSignUp = (data: SignUpDataProps) => {
    register({
      body: {
        email: data.email,
        password: data.password,
        uid: data.userId,
        display_name: data.userId
      }
    })
  }

  return <SignUpPage isLoading={isLoading} handleSignUp={handleSignUp} error={error?.message} />
}

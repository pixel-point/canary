import React, { useEffect } from 'react'
import { SignInPage } from '@harnessio/playground'
import { useOnLoginMutation } from '@harnessio/code-service-client'
import { useNavigate } from 'react-router-dom'
import { DataProps } from '@harnessio/playground'
import { useAppContext } from '../framework/context/AppContext'

export const SignIn: React.FC = () => {
  const { setIsUserAuthorized } = useAppContext()
  const navigate = useNavigate()
  const { mutate: login, isLoading, isSuccess } = useOnLoginMutation({ queryParams: { include_cookie: true } })

  useEffect(() => {
    if (isSuccess) {
      setIsUserAuthorized(true)
      navigate('/') // Redirect to Home page
    }
  }, [isSuccess])

  return (
    <SignInPage
      isLoading={isLoading}
      handleSignIn={(data: DataProps) => {
        login({
          body: {
            login_identifier: data.email,
            password: data.password
          }
        })
      }}
    />
  )
}

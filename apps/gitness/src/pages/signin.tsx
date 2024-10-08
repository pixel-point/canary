import React, { useEffect } from 'react'
import { SignInPage } from '@harnessio/playground'
import { useOnLoginMutation } from '@harnessio/code-service-client'
import { useNavigate } from 'react-router-dom'
import { DataProps } from '@harnessio/playground'
import useToken from '../framework/hooks/useToken'

export const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { mutate: login, isLoading, isSuccess, data } = useOnLoginMutation({ queryParams: { include_cookie: true } })
  const { setToken } = useToken()

  useEffect(() => {
    if (isSuccess) {
      // Redirect to the home page
      if (data?.access_token) {
        setToken(data.access_token)
      }
      navigate('/')
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

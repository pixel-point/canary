import React, { useEffect } from 'react'
import { SignInPage } from '@harnessio/playground'
import { useOnLoginMutation } from '@harnessio/code-service-client'
import { useNavigate } from 'react-router-dom'
import { DataProps } from '@harnessio/playground'

export default function SignIn() {
  const navigate = useNavigate()
  const {
    mutate: login,
    isLoading,
    error,
    isSuccess,
    data
  } = useOnLoginMutation({ queryParams: { include_cookie: true } })

  useEffect(() => {
    if (isSuccess) {
      // Redirect to the home page
      if (data?.access_token) {
        localStorage.setItem('token', data.access_token)
      }
      navigate('/')
    } else {
      console.log({ error })
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

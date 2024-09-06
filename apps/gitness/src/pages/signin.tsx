import React, { useEffect } from 'react'
import { SignInPage } from '@harnessio/playground'
import { useOnLoginMutation } from '@harnessio/code-service-client'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()
  const { mutate: login, isLoading, error, isSuccess } = useOnLoginMutation({})

  useEffect(() => {
    if (isSuccess) {
      // Redirect to the home page
      navigate('/')
    } else {
      console.log({ error })
    }
  }, [isSuccess])

  return (
    <SignInPage
      isLoading={isLoading}
      handleSignIn={data => {
        login({
          queryParams: {},
          body: {
            login_identifier: data.email,
            password: data.password
          }
        })
      }}
    />
  )
}

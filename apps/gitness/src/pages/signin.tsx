import React, { useEffect } from 'react'
import { SignInPage } from '@harnessio/playground'
import { useOnLoginMutation } from '@harnessio/code-service-client'
import { useNavigate } from 'react-router-dom'

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
      // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
      if (data?.content?.access_token) {
        // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
        localStorage.setItem('token', data.content.access_token)
      }
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
          body: {
            login_identifier: data.email,
            password: data.password
          }
        })
      }}
    />
  )
}

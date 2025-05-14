import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Card, FormInput, FormWrapper, Input, Link, Spacer, Text } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Floating1ColumnLayout } from '..'
import { Agreements } from './components/agreements'
import { AnimatedHarnessLogo } from './components/animated-harness-logo'

interface SignInPageProps {
  handleSignIn: (data: SignInData) => void
  isLoading?: boolean
  error?: string
}

export interface SignInData {
  email?: string
  password?: string
}

const signInSchema = z.object({
  email: z.string().min(1, { message: 'The field can’t be blank' }),
  password: z.string().min(1, { message: 'The field can’t be blank' })
})

export function SignInPage({ handleSignIn, isLoading, error }: SignInPageProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const formMethods = useForm({
    resolver: zodResolver(signInSchema)
  })

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    trigger
  } = formMethods

  const onSubmit = (data: SignInData) => {
    handleSignIn(data)
  }

  const handleInputChange = async () => {
    if (serverError) {
      setServerError(null)
      clearErrors(['password'])
      await trigger()
    }
  }

  useEffect(() => {
    if (error) {
      setServerError(error)
      setError('email', {
        type: 'manual',
        message: ' '
      })
      setError('password', {
        type: 'manual',
        message: error
      })
    } else {
      setServerError(null)
      clearErrors(['email', 'password'])
    }
  }, [error, setError, clearErrors])

  const hasError = Object.keys(errors).length > 0 || !!serverError

  return (
    <Floating1ColumnLayout
      className="flex-col bg-cn-background-1 pt-20 sm:pt-[186px]"
      highlightTheme={hasError ? 'error' : 'blue'}
      verticalCenter
    >
      <Card.Root className="relative z-10 mb-8 max-w-full" variant="plain" width="xl">
        <Card.Header className="items-center">
          <AnimatedHarnessLogo theme={hasError ? 'error' : 'blue'} />
          <Card.Title className="mt-3 text-center" as="h1">
            Sign in to Harness
          </Card.Title>
          <Text className="mt-0.5 leading-snug" size={2} color="foreground-4" align="center" as="p">
            Welcome back! Please enter your details.
          </Text>
        </Card.Header>
        <Card.Content className="mt-10">
          <FormWrapper {...formMethods} onSubmit={handleSubmit(onSubmit)}>
            <FormInput.Text
              id="email"
              label="Username/Email"
              placeholder="Your email"
              {...register('email', { onChange: handleInputChange })}
              autoFocus
            />
            <FormInput.Text
              id="password"
              type="password"
              {...register('password', { onChange: handleInputChange })}
              label="Password"
              placeholder="Password"
            />
            <Button className="mt-10 w-full" rounded type="submit" loading={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </FormWrapper>
          <Spacer size={4} />
          <Text className="block" size={2} color="foreground-5" weight="normal" align="center" as="p">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </Text>
        </Card.Content>
      </Card.Root>
      <Agreements />
    </Floating1ColumnLayout>
  )
}

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Floating1ColumnLayout } from '..'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Spacer, Text } from '../../components'
import { Agreements } from './components/agreements'
import { AnimatedHarnessLogo } from './components/animated-harness-logo'

interface ForgotPasswordPageProps {
  isLoading?: boolean
  onSubmit?: (emailData: ForgotPasswordData) => void
  error?: string
}

export interface ForgotPasswordData {
  email?: string
}

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' })
})

export function ForgotPasswordPage({ isLoading, onSubmit, error }: ForgotPasswordPageProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const handleOnSubmit: SubmitHandler<ForgotPasswordData> = data => {
    // Handle the submission of the forgot password form
    if (onSubmit) {
      onSubmit(data)
    }
  }

  const handleInputChange = async () => {
    if (serverError) {
      setServerError(null)
      clearErrors(['email'])
      await trigger()
    }
  }

  useEffect(() => {
    if (error) {
      setServerError(error)
      setError('email', {
        type: 'manual',
        message: error
      })
    } else {
      setServerError(null)
      clearErrors(['email'])
    }
  }, [error, setError, clearErrors])

  const hasError = Object.keys(errors).length > 0 || !!serverError

  return (
    <Floating1ColumnLayout
      className="sm:pt-[186px] pt-20 flex-col bg-background-7"
      highlightTheme={hasError ? 'error' : 'blue'}
      verticalCenter
    >
      <Card className="relative z-10 mb-8 max-w-full" variant="plain" width="xl">
        <CardHeader className="items-center">
          <AnimatedHarnessLogo theme={hasError ? 'error' : 'blue'} />
          <CardTitle className="mt-3 text-center" as="h1">
            Forgot password?
          </CardTitle>
          <Text className="mt-0.5 leading-snug" size={2} color="foreground-4" align="center" as="p">
            Enter your email to receive the verification code.
          </Text>
        </CardHeader>
        <CardContent className="mt-10">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Label htmlFor="email" variant="default">
              Email
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="email"
              type="email"
              placeholder="Your email"
              {...register('email', { onChange: handleInputChange })}
              error={errors.email?.message?.toString()}
              autoFocus
            />
            <Button
              className="mt-10 w-full"
              variant="default"
              borderRadius="full"
              type="submit"
              size="md"
              loading={isLoading}
              disabled={hasError}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>
          <Spacer size={4} />
          <Text className="block" size={2} color="foreground-5" weight="normal" align="center" as="p">
            Don’t have an account?{' '}
            <Link className="text-primary" to="/signup">
              Sign up
            </Link>
          </Text>
        </CardContent>
      </Card>
      <Agreements />
    </Floating1ColumnLayout>
  )
}

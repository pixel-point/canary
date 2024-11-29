import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Floating1ColumnLayout } from '..'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Text } from '../../components'
import { Agreements } from './components/agreements'
import { AnimatedHarnessLogo } from './components/animated-harness-logo'

interface NewPasswordPageProps {
  isLoading?: boolean
  handleFormSubmit?: (data: NewPasswordData) => void
  error?: string
}

export interface NewPasswordData {
  password?: string
  confirmPassword?: string
}

const newPasswordSchema = z
  .object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export function NewPasswordPage({ isLoading, handleFormSubmit, error }: NewPasswordPageProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(newPasswordSchema)
  })

  const onFormSubmit = (data: NewPasswordData) => {
    handleFormSubmit?.(data)
  }

  const handleInputChange = async () => {
    if (serverError) {
      setServerError(null)
      clearErrors(['confirmPassword'])
      await trigger()
    }
  }

  useEffect(() => {
    if (error) {
      setServerError(error)
      setError('password', {
        type: 'manual',
        message: ' '
      })
      setError('confirmPassword', {
        type: 'manual',
        message: error
      })
    } else {
      setServerError(null)
      clearErrors(['password', 'confirmPassword'])
    }
  }, [error, setError, clearErrors])

  const hasError = Object.keys(errors).length > 0 || !!serverError

  return (
    <Floating1ColumnLayout
      className="flex-col bg-background-7 pt-20 sm:pt-[186px]"
      highlightTheme={hasError ? 'error' : 'blue'}
      verticalCenter
    >
      <Card className="relative z-10 mb-8 max-w-full" variant="plain" width="xl">
        <CardHeader className="items-center">
          <AnimatedHarnessLogo theme={hasError ? 'error' : 'blue'} />
          <CardTitle className="mt-3 text-center" as="h1">
            Create new password
          </CardTitle>
          <Text className="mt-0.5 leading-snug" size={2} color="foreground-4" align="center" as="p">
            Your new password must be different from your previously used password.
          </Text>
        </CardHeader>
        <CardContent className="mt-10">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Label htmlFor="password" variant="default">
              New password
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="password"
              type="password"
              {...register('password', { onChange: handleInputChange })}
              placeholder="Password (6+ characters)"
              error={errors.password?.message?.toString()}
            />
            <Label className="mt-5" htmlFor="confirmPassword" variant="default">
              Confirm password
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', { onChange: handleInputChange })}
              placeholder="Confirm password"
              error={errors.confirmPassword?.message?.toString()}
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
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Agreements />
    </Floating1ColumnLayout>
  )
}

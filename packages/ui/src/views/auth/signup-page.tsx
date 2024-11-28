import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Floating1ColumnLayout } from '..'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Spacer, Text } from '../../components'
import { Agreements } from './components/agreements'
import { AnimatedHarnessLogo } from './components/animated-harness-logo'

interface PageProps {
  isLoading?: boolean
  handleSignUp: (data: SignUpDataProps) => void
  error?: string
}

export interface SignUpDataProps {
  userId?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const signUpSchema = z
  .object({
    userId: z.string().nonempty({ message: 'User ID cannot be blank' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export function SignUpPage({ isLoading, handleSignUp, error }: PageProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = (data: SignUpDataProps) => {
    handleSignUp(data)
    reset()
  }

  const hasError = Object.keys(errors).length > 0 || !!error

  return (
    <Floating1ColumnLayout
      className="sm:pt-[186px] pt-20 flex-col bg-background-7"
      highlightTheme={hasError ? 'error' : 'green'}
      verticalCenter
    >
      <Card className="relative z-10 mb-8 max-w-full" variant="plain" width="xl">
        <CardHeader className="items-center">
          <AnimatedHarnessLogo theme={hasError ? 'error' : 'green'} />
          <CardTitle className="mt-3 text-center text-2xl" as="h1">
            Sign up to Harness
          </CardTitle>
          <Text className="mt-0.5" size={2} color="foreground-4" align="center" as="p">
            Let’s start your journey with us today.
          </Text>
        </CardHeader>
        <CardContent className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="userId" variant="default">
              User ID
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="userId"
              type="text"
              {...register('userId')}
              placeholder="User ID"
              autoFocus
              error={errors.userId?.message?.toString()}
            />
            <Label className="mt-5" htmlFor="email" variant="default">
              Email
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="email"
              type="email"
              {...register('email')}
              placeholder="Your email"
              error={errors.email?.message?.toString()}
            />
            <Label className="mt-5" htmlFor="password" variant="default">
              Password
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="password"
              type="password"
              placeholder="Password (6+ characters)"
              {...register('password')}
              error={errors.password?.message?.toString()}
            />
            <Label className="mt-5" htmlFor="confirmPassword" variant="default">
              Confirm password
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message?.toString()}
            />
            {error && (
              <>
                <Text size={1} className="text-destructive">
                  {error}
                </Text>
              </>
            )}
            <Button
              className="mt-10 w-full"
              variant="default"
              borderRadius="full"
              type="submit"
              size="md"
              loading={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Button>
          </form>
          <Spacer size={4} />
          <Text className="block" size={2} color="foreground-5" weight="normal" align="center" as="p">
            Already have an account?{' '}
            <Link className="text-foreground-accent" to="/v2/signin">
              Sign in
            </Link>
          </Text>
        </CardContent>
      </Card>
      <Agreements />
    </Floating1ColumnLayout>
  )
}

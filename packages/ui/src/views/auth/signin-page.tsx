import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Floating1ColumnLayout } from '..'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Spacer, Text } from '../../components'
import { Agreements } from './components/agreements'
import { AnimatedHarnessLogo } from './components/animated-harness-logo'

interface PageProps {
  handleSignIn: (data: SignInDataProps) => void
  isLoading?: boolean
  error?: string
}

export interface SignInDataProps {
  email?: string
  password?: string
}

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'The field can’t be blank' })
})

export function SignInPage({ handleSignIn, isLoading, error }: PageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = (data: SignInDataProps) => {
    handleSignIn(data)
  }

  const hasError = Object.keys(errors).length > 0 || !!error

  return (
    <Floating1ColumnLayout
      className="sm:pt-[186px] pt-20 flex-col bg-background-7"
      highlightTheme={hasError ? 'error' : 'blue'}
      verticalCenter
    >
      <Card className="relative z-10 mb-8 max-w-full" variant="plain" width="xl">
        <CardHeader className="items-center">
          <AnimatedHarnessLogo theme={hasError ? 'error' : 'blue'} />
          <CardTitle className="mt-3 text-center text-2xl" as="h1">
            Sign in to Harness
          </CardTitle>
          <Text className="mt-0.5" size={2} color="foreground-4" align="center" as="p">
            Welcome back! Please enter your details.
          </Text>
        </CardHeader>
        <CardContent className="mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email" variant="default">
              Email
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="email"
              type="email"
              placeholder="Your email"
              {...register('email')}
              autoFocus
              error={errors.email?.message?.toString()}
            />
            <Label className="mt-5" htmlFor="password" variant="default">
              Password
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="password"
              type="password"
              {...register('password')}
              placeholder="Password"
              error={errors.password?.message?.toString()}
            />
            <Button
              className="mt-10 w-full"
              variant="default"
              borderRadius="full"
              type="submit"
              size="md"
              loading={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <Spacer size={4} />
          <Text className="block" size={2} color="foreground-5" weight="normal" align="center" as="p">
            Don’t have an account?{' '}
            <Link className="text-foreground-accent" to="/v2/signup">
              Sign up
            </Link>
          </Text>
        </CardContent>
      </Card>
      <Agreements />
    </Floating1ColumnLayout>
  )
}

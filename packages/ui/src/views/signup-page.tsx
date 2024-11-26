import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Card, CardContent, CardHeader, CardTitle, Icon, Input, Label, Spacer, Text } from '../components'
import { SignInLayout } from './layouts/SignInLayout'

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

  return (
    <SignInLayout theme="green">
      <Card className="relative z-10 mb-8 max-w-full" variant="plain" width="xl">
        <CardHeader className="items-center">
          <div className="-mb-5 relative">
            <span
              className="absolute size-[68px] left-1.5 top-1.5 -z-10 rounded-[100%] bg-[#70DCD3] blur-[10px] opacity-[0.08]"
              aria-hidden
            />
            <Icon name="harness-ellipse-gradient-green" size={104} />
          </div>
          <CardTitle className="mt-3 text-center text-2xl" as="h1">
            Sign up to Harness
          </CardTitle>
          <Text className="mt-0.5" size={2} color="foreground-4" align="center" as="p">
            Let’s start your journey with us today.
          </Text>
        </CardHeader>
        <CardContent className="mt-7">
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
            <Link to="/v2/signin" className="text-foreground-1">
              Sign in
            </Link>
          </Text>
        </CardContent>
      </Card>
    </SignInLayout>
  )
}

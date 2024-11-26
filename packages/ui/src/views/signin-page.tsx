import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Card, CardContent, CardHeader, CardTitle, Icon, Input, Label, Spacer, Text } from '../components'
import { SignInLayout } from './layouts/SignInLayout'

interface PageProps {
  handleSignIn: (data: DataProps) => void
  isLoading?: boolean
}

export interface DataProps {
  email?: string
  password?: string
}

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'The field can’t be blank' })
})

export function SignInPage({ handleSignIn, isLoading }: PageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = (data: DataProps) => {
    handleSignIn(data)
  }

  return (
    <SignInLayout>
      <Card className="relative z-10 mb-8 max-w-full" variant="plain" width="xl">
        <CardHeader className="items-center">
          <div className="-mb-5 relative">
            <span
              className="absolute size-[68px] left-1.5 top-1.5 -z-10 rounded-[100%] bg-[#AD79D2] blur-[10px] opacity-[0.08]"
              aria-hidden
            />
            <Icon name="gitness-logo" size={104} />
          </div>
          <CardTitle className="mt-3 text-center text-2xl" as="h1">
            Sign in to Gitness
          </CardTitle>
          <Text className="mt-0.5" size={2} color="foreground-4" align="center" as="p">
            Welcome back! Please enter your details.
          </Text>
        </CardHeader>
        <CardContent className="mt-7">
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
            <div className="mt-5 flex justify-between">
              <Label htmlFor="password" variant="default">
                Password
              </Label>
              <Link className="text-foreground-4 text-12 tracking-tight leading-none" to="/v2/forgot">
                Forgot password?
              </Link>
            </div>
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
            <Link className="text-foreground-1" to="/v2/signup">
              Sign up
            </Link>
          </Text>
        </CardContent>
      </Card>
    </SignInLayout>
  )
}

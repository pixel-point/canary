import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Card, CardContent, CardHeader, CardTitle, Icon, Input, Label, Spacer, Text } from '../components'
import { Floating1ColumnLayout } from './layouts/Floating1ColumnLayout'

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
    <Floating1ColumnLayout className="relative flex-col max-w-full overflow-hidden bg-background-7" verticalCenter>
      <Card className="my-auto relative z-10 max-w-full" variant="plain" width="xl">
        <CardHeader className="items-center">
          <Icon className="-mb-5" name="gitness-logo" size={104} />
          <CardTitle className="mt-3 text-center text-2xl" as="h1">
            Sign in to Gitness
          </CardTitle>
          <Text className="mt-0.5" size={2} color="foreground-4" align="center" as="p">
            Welcome back! Please enter your details.
          </Text>
        </CardHeader>
        <CardContent className="mt-7 p-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email" variant="default">
              Email
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="email"
              type="email"
              {...register('email')}
              placeholder="Your email"
              autoFocus
              error={errors.email?.message?.toString()}
            />
            <div className="mt-5 flex justify-between">
              <Label htmlFor="password" variant="default">
                Password
              </Label>
              <Link className="text-foreground-4 text-12 tracking-tight leading-none" to="/forgot-password">
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
          <Text className="block" size={2} color="foreground-5" weight="normal" align="center">
            Don’t have an account?{' '}
            <Link className="text-foreground-1" to="/signup">
              Sign up
            </Link>
          </Text>
        </CardContent>
      </Card>
      <Text className="leading-tight mt-auto relative z-10" size={0} color="foreground-5" align="center">
        By joining, you agree to{' '}
        <Link className="text-foreground-1 whitespace-nowrap" to="/">
          Terms of Service
        </Link>{' '}
        and&nbsp;
        <Link className="text-foreground-1 whitespace-nowrap" to="/">
          Privacy Policy
        </Link>
      </Text>
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <span className="absolute -top-1.5 left-1/2 -translate-x-[65%] -translate-y-1/2 w-[528px] h-[178px] rounded-[100%] bg-[radial-gradient(50%_50%_at_50%_50%,#C5A0DF_27.5%,transparent_100%)] border border-borders-danger blur-[30px] opacity-[0.14]" />
        <span className="absolute top-3 -translate-y-1/2 left-1/2 -translate-x-[84.5%] w-[895px] h-[377px] rounded-[100%] bg-[radial-gradient(50%_50%_at_50%_50%,#AD79D2_0%,transparent_100%)]  border border-borders-danger blur-[30px] opacity-10" />
        <span className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-[104px] w-[895px] h-[261px] rounded-[100%] bg-[radial-gradient(50%_50%_at_50%_50%,#AD79D2_0%,transparent_100%)] border border-borders-danger blur-[30px] opacity-[0.08]" />
      </div>
      <span
        className="absolute inset-0 bg-[url('/images/signin/noise.png')] bg-[size:100px_100px] bg-repeat opacity-70 mix-blend-overlay"
        aria-hidden
      />
    </Floating1ColumnLayout>
  )
}

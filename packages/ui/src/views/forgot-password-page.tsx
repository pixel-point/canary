import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button, Card, CardContent, CardHeader, CardTitle, Icon, Input, Label, Spacer, Text } from '../components'
import { SignInLayout } from './layouts/SignInLayout'

interface PageProps {
  isLoading?: boolean
  onSubmit?: (emailData: ForgotPasswordDataProps) => void
}

export interface ForgotPasswordDataProps {
  email?: string
}

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' })
})

export function ForgotPasswordPage({ isLoading, onSubmit }: PageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const handleOnSubmit: SubmitHandler<ForgotPasswordDataProps> = data => {
    // Handle the submission of the forgot password form
    if (onSubmit) {
      onSubmit(data)
    }
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
            Forgot password?
          </CardTitle>
          <Text className="mt-0.5" size={2} color="foreground-4" align="center" as="p">
            Enter your email to receive the verification code.
          </Text>
        </CardHeader>
        <CardContent className="mt-7">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Label htmlFor="email" variant="default">
              Email
            </Label>
            <Input
              wrapperClassName="mt-2.5"
              id="email"
              type="email"
              placeholder="Your email"
              {...register('email')}
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
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>
          <Spacer size={4} />
          <Text className="block" size={2} color="foreground-5" weight="normal" align="center" as="p">
            Don’t have an account?{' '}
            <Link className="text-primary" to="/v2/signup">
              Sign up
            </Link>
          </Text>
        </CardContent>
      </Card>
    </SignInLayout>
  )
}

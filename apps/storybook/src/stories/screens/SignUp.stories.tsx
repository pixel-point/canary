import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Label, Input } from '@harnessio/canary'
import Container from '../../components/layout/container'
import Logo from '../../components/misc/logo-green'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import bodyBlur from '../../assets/body-green-blur.svg'
import FooterStrap from '../../components/layout/FooterStrap'

interface DataProps {
  userId?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const signUpSchema = z.object({
  userId: z.string().nonempty({ message: 'User ID cannot be blank' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string()
})

export default {
  title: 'Screens/Sign Up',
  parameters: {
    layout: 'fullscreen'
  }
}

export function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signUpSchema)
  })
  const [isLoading, setIsLoading] = useState(false)

  // Watch password and confirmPassword fields
  const password = watch('password', '')
  const confirmPassword = watch('confirmPassword', '')

  const onSubmit = (data: DataProps) => {
    if (data.password !== data.confirmPassword) {
      // Manually set error for confirmPassword
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Container.Root>
      <Container.Main>
        <Container.CenteredContent>
          <Card className="card-auth bg-transparent relative">
            <img
              src={bodyBlur}
              className="bg-cover bg-top opacity-[20%] max-w-[1000px] absolute -left-[calc((1000px-362px)/2)] -top-[200px] w-[1000px] h-[900px]"
            />
            <CardHeader className="card-auth-header relative z-10">
              <CardTitle className="flex flex-col place-items-center">
                <Logo />
              </CardTitle>
            </CardHeader>
            <CardContent className="card-auth-content relative z-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <div>
                    <Label htmlFor="userId" variant="sm">
                      User ID
                    </Label>
                    <Input
                      id="userId"
                      type="text"
                      {...register('userId')}
                      placeholder="Enter your user ID"
                      className="form-input"
                      autoFocus
                    />
                    {errors.userId && <p className="text-form-error">{errors.userId.message?.toString()}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" variant="sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="email@work.com"
                      className="form-input"
                    />
                    {errors.email && <p className="text-form-error">{errors.email.message?.toString()}</p>}
                  </div>
                  <div>
                    <Label htmlFor="password" variant="sm">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      {...register('password')}
                      placeholder="Enter the password for your account"
                      className="form-input"
                    />
                    {errors.password && <p className="text-form-error">{errors.password.message?.toString()}</p>}
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" variant="sm">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...register('confirmPassword')}
                      placeholder="Re-enter your password"
                      className="form-input"
                    />
                    {errors.confirmPassword && (
                      <p className="text-form-error">{errors.confirmPassword.message?.toString()}</p>
                    )}
                    {password !== confirmPassword && <p className="text-form-error">Passwords do not match</p>}
                  </div>
                </div>
                <Button variant="default" borderRadius="full" type="submit" loading={isLoading}>
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm font-light text-white/70">
                  Already have an account? <a className="text-white">Sign in</a>
                </p>
              </div>
            </CardContent>
          </Card>
          <FooterStrap>
            <p className="text-xs font-light text-white/40">
              By joining, you agree to <a className="text-white/60">Terms of Service</a> and{' '}
              <a className="text-white/60">Privacy Policy</a>
            </p>
          </FooterStrap>
        </Container.CenteredContent>
      </Container.Main>
    </Container.Root>
  )
}

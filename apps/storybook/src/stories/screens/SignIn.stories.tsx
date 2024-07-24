import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label } from '@harnessio/canary'
import Logo from '../../components/misc/logo-purple'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import bodyBlur from '../../assets/body-purple-blur.svg'
import FooterStrap from '../../components/layout/FooterStrap'
import Container from '../../components/layout/container'

interface DataProps {
  email?: string
  password?: string
}

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

export default {
  title: 'Screens/Sign In',
  parameters: {
    layout: 'fullscreen'
  }
}

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signInSchema)
  })
  const [isLoading, setIsloading] = useState<boolean>(false)

  const onSubmit = (data: DataProps) => {
    console.log(data)

    setIsloading(true)
    setTimeout(() => {
      setIsloading(false)
    }, 2000)
  }

  return (
    <Container.Root>
      <Container.Main>
        <Container.CenteredContent>
          <Card className="card-auth bg-transparent relative z-10">
            <img
              src={bodyBlur}
              className="bg-cover bg-top opacity-[20%] max-w-[1000px] absolute -left-[calc((1000px-362px)/2)] -top-[200px] w-[1000px] h-[900px]"
            />
            <CardHeader className="card-auth-header relative z-10">
              <CardTitle className="flex flex-col place-items-center">
                <Logo />
                <p className="title-primary text-radial-gradient">Sign in to Gitness</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="card-auth-content relative z-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full flex flex-col gap-4">
                <div className="flex flex-col gap-3">
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
                      autoFocus
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
                </div>
                <Button variant="default" borderRadius="full" type="submit" loading={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm font-light text-white/70">
                  Don&apos;t have an account? <a className="text-white">Sign up</a>
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

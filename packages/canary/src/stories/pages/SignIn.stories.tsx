import { Card, CardContent, CardHeader, CardTitle } from '@/components/card'
import Container from '@/components/layout/container'
import Footer from '@/components/layout/footer'
import Logo from '@/components/misc/logo'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Button } from '@/components/button'

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

export default {
  title: 'Pages/Sign In',
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

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Container alignContent="center">
      <Card className="card-auth">
        <CardHeader className="card-auth-header">
          <CardTitle className="flex gap-3 flex-col place-items-center">
            <Logo />
            <p className="title-primary text-radial-gradient">Sign in to Gitness</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="card-auth-content">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="email" className="text-white text-xs">
                  Email
                </Label>
                <Input id="email" type="email" {...register('email')} className="w-full mt-1" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password" className="text-white text-xs">
                  Password
                </Label>
                <Input id="password" type="password" {...register('password')} className="w-full mt-1" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>
            <Button variant="default" type="submit">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
      <Footer>
        <p className="text-xs font-light text-white/40">
          By joining, you agree to <a className="text-white/60">Terms of Service</a> and{' '}
          <a className="text-white/60">Privacy Policy</a>
        </p>
      </Footer>
    </Container>
  )
}

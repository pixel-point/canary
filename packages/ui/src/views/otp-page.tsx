import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Spacer,
  Text
} from '../components'
import { SignInLayout } from './layouts/SignInLayout'

const OTP_LENGTH = 4

interface PageProps {
  handleResend?: () => void
  isLoading?: boolean
  handleFormSubmit?: (data: OtpPageDataProps) => void
}

export interface OtpPageDataProps {
  email?: string
}

const otpPasswordSchema = z.object({
  otp: z
    .string()
    .length(OTP_LENGTH, { message: `Code must be ${OTP_LENGTH} digits` })
    .regex(/^\d+$/, { message: 'Code must contain only numbers' })
})

export function OTPPage({ handleResend, isLoading, handleFormSubmit }: PageProps) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(otpPasswordSchema)
  })

  const onSubmit = (data: OtpPageDataProps) => {
    handleFormSubmit?.(data)
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
            <Icon name="harness-ellipse-gradient-purple" size={104} />
          </div>
          <CardTitle className="mt-3 text-center text-2xl" as="h1">
            Verify your email
          </CardTitle>
          <Text className="mt-0.5" size={2} color="foreground-4" align="center" as="p">
            Please enter the verification code we’ve sent to your email stevenm@gmail.com
          </Text>
        </CardHeader>
        <CardContent className="mt-7">
          <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <InputOTP maxLength={OTP_LENGTH}>
              <InputOTPGroup id="otp" className="gap-x-3" {...register('otp')}>
                {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                  <InputOTPSlot key={`otp-code-${index}`} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <Button
              className="mt-10 w-full max-w-[212px]"
              variant="default"
              borderRadius="full"
              type="submit"
              size="md"
              loading={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
          <Spacer size={4} />
          <Text className="block" size={2} color="foreground-5" weight="normal" align="center" as="p">
            Didn&apos;t receive the code?{' '}
            <Button className="p-0.5" variant="link" onClick={handleResend}>
              Resend
            </Button>
          </Text>
        </CardContent>
      </Card>
    </SignInLayout>
  )
}

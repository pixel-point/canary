import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Fragment } from 'react/jsx-runtime'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Floating1ColumnLayout } from '..'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Spacer,
  Text
} from '../../components'
import { Agreements } from './components/agreements'
import { AnimatedHarnessLogo } from './components/animated-harness-logo'

const OTP_LENGTH = 4

interface PageProps {
  handleResend?: () => void
  isLoading?: boolean
  handleFormSubmit?: (data: OtpPageDataProps) => void
  error?: string
}

export interface OtpPageDataProps {
  email?: string
  otp: string
}

const otpPasswordSchema = z.object({
  otp: z
    .string()
    .length(OTP_LENGTH, { message: `Code must be ${OTP_LENGTH} digits` })
    .regex(/^\d+$/, { message: 'Code must contain only numbers' })
})

export function OTPPage({ handleResend, isLoading, handleFormSubmit, error }: PageProps) {
  // TODO: get email from url or from context
  const email = 'stevenm@gmail.com'

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm<OtpPageDataProps>({
    mode: 'onSubmit',
    resolver: zodResolver(otpPasswordSchema),
    defaultValues: {
      otp: ''
    }
  })
  const otpValue = watch('otp')

  const onSubmit = (data: OtpPageDataProps) => {
    handleFormSubmit?.({ ...data, email })
    reset()
  }

  useEffect(() => {
    if (otpValue.length === OTP_LENGTH) {
      handleSubmit(onSubmit)()
    }
  }, [otpValue, handleSubmit, onSubmit])

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
            Verify your email
          </CardTitle>
          <Text className="mt-0.5" size={2} color="foreground-4" align="center" as="p">
            Please enter the verification code we’ve sent to your email{' '}
            <span className="text-foreground-1">{email}</span>
          </Text>
        </CardHeader>
        <CardContent className="mt-10">
          <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <Controller
                name="otp"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputOTP value={value} onChange={onChange} maxLength={OTP_LENGTH}>
                    <InputOTPGroup className="gap-x-3">
                      {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
                        <Fragment key={idx}>
                          <InputOTPSlot index={idx} />
                        </Fragment>
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.otp && (
                <Text
                  className="text-foreground-danger w-full absolute top-full leading-none translate-y-2 tracking-tight"
                  weight="light"
                  align="center"
                  size={1}
                  as="p"
                >
                  {errors.otp.message}
                </Text>
              )}
            </div>
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
            <Button className="p-0 leading-none h-5" variant="link" onClick={handleResend}>
              Resend
            </Button>
          </Text>
        </CardContent>
      </Card>
      <Agreements />
    </Floating1ColumnLayout>
  )
}

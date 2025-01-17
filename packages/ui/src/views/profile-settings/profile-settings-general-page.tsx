import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ButtonGroup,
  ControlGroup,
  Fieldset,
  FormSeparator,
  FormWrapper,
  Icon,
  Input,
  Legend,
  Message,
  MessageTheme,
  SkeletonList,
  Spacer,
  Text
} from '@/components'
import { IProfileSettingsStore, SandboxLayout, TranslationStore } from '@/views'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInitials } from '@utils/stringUtils'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(1, { message: 'Please provide your name' }),
  username: z.string().min(1, { message: 'Please provide a username' }),
  email: z.string().email({ message: 'Please provide a valid email address' })
})

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters' })
      .regex(/[0-9]/, 'New password must contain at least one number')
      .regex(/[A-Z]/, 'New password must contain at least one uppercase letter'),
    confirmPassword: z.string().min(6, { message: 'Please confirm your new password' })
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

// Define TypeScript types
export type ProfileFields = z.infer<typeof profileSchema>
export type PasswordFields = z.infer<typeof passwordSchema>

interface SettingsAccountGeneralPageProps {
  isLoadingUser: boolean
  isUpdatingUser: boolean
  isUpdatingPassword: boolean
  profileUpdateSuccess: boolean
  passwordUpdateSuccess: boolean
  error: { type: 'profile' | 'password'; message: string } | null
  onUpdateUser: (data: Omit<ProfileFields, 'username'>) => void
  onUpdatePassword: (data: PasswordFields) => void
  useProfileSettingsStore: () => IProfileSettingsStore
  useTranslationStore: () => TranslationStore
}

const SettingsAccountGeneralPage: React.FC<SettingsAccountGeneralPageProps> = ({
  useProfileSettingsStore,
  isLoadingUser,
  isUpdatingUser,
  isUpdatingPassword,
  profileUpdateSuccess,
  passwordUpdateSuccess,
  error,
  onUpdateUser,
  onUpdatePassword,
  useTranslationStore
}) => {
  // Profile form handling
  const { t } = useTranslationStore()
  const { userData } = useProfileSettingsStore()
  const [profileSubmitted, setProfileSubmitted] = useState(false)
  const [passwordSubmitted, setPasswordSubmitted] = useState(false)
  const TRUNCATE_INITIALS_LEN = 2

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfileForm,

    formState: { errors: profileErrors, isValid: isProfileValid, dirtyFields: profileDirtyFields }
  } = useForm<ProfileFields>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      name: userData?.name || '',
      username: userData?.username || '',
      email: userData?.email || ''
    }
  })

  // Password form handling
  const {
    register: registerPassword,
    reset: resetPasswordForm, // Add reset for password form
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isValid: isPasswordValid }
  } = useForm<PasswordFields>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  })

  useEffect(() => {
    if (userData) {
      resetProfileForm({
        name: userData.name,
        username: userData.username,
        email: userData.email
      })
    }
  }, [resetProfileForm, userData])

  useEffect(() => {
    if (profileUpdateSuccess) {
      resetProfileForm({
        name: userData?.name,
        username: userData?.username,
        email: userData?.email
      })
      setProfileSubmitted(true)
      setTimeout(() => setProfileSubmitted(false), 2000)
    }
  }, [profileUpdateSuccess, resetProfileForm, userData?.email, userData?.name, userData?.username])

  useEffect(() => {
    if (passwordUpdateSuccess) {
      resetPasswordForm()

      setPasswordSubmitted(true)
      setTimeout(() => setPasswordSubmitted(false), 2000)
    }
  }, [passwordUpdateSuccess, resetPasswordForm])

  // Profile form submit handler
  const onProfileSubmit: SubmitHandler<ProfileFields> = data => {
    const { username: _, ...updatedData } = data
    onUpdateUser(updatedData)
  }

  // Password form submit
  const onPasswordSubmit: SubmitHandler<PasswordFields> = data => {
    onUpdatePassword(data)
  }

  if (isLoadingUser) {
    return (
      <SandboxLayout.Main>
        <SandboxLayout.Content maxWidth="2xl">
          <SkeletonList />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    )
  }

  return (
    <SandboxLayout.Main>
      <SandboxLayout.Content maxWidth="2xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'} className="flex justify-center">
          {t('views:profileSettings.general', 'General')}
        </Text>
        <Spacer size={6} />
        <FormWrapper onSubmit={handleProfileSubmit(onProfileSubmit)}>
          <Fieldset>
            {/* PERSONAL INFORMATION */}
            <Legend
              className="flex justify-center"
              title={t('views:profileSettings.personalInfo', 'Personal information')}
            />
            <ControlGroup className="flex w-auto flex-row items-center justify-center gap-x-6">
              <Avatar size="80" className="size-20 rounded-full bg-primary/[0.02] shadow-md">
                <AvatarImage src="/images/anon.jpg" />
                <AvatarFallback>
                  <Text size={5} weight="medium" color="tertiaryBackground">
                    {getInitials(userData?.name || '', TRUNCATE_INITIALS_LEN)}
                  </Text>
                </AvatarFallback>
              </Avatar>
            </ControlGroup>

            {/* NAME */}
            <ControlGroup>
              <Input
                id="name"
                {...registerProfile('name')}
                placeholder={t('views:profileSettings.enterNamePlaceholder', 'Enter your name')}
                label={t('views:profileSettings.name', 'Name')}
              />
              {profileErrors.name && (
                <Message theme={MessageTheme.ERROR}>{profileErrors.name.message?.toString()}</Message>
              )}
            </ControlGroup>

            {/* USERNAME */}
            <ControlGroup>
              <Input
                id="username"
                {...registerProfile('username')}
                placeholder={t('views:profileSettings.enterUsernamePlaceholder', 'Enter your username')}
                disabled
                label={t('views:profileSettings.username', 'Username')}
              />
              {profileErrors.username && (
                <Message theme={MessageTheme.ERROR}>{profileErrors.username.message?.toString()}</Message>
              )}
            </ControlGroup>

            {/* EMAIL */}
            <ControlGroup>
              <Input
                id="email"
                {...registerProfile('email')}
                placeholder="name@domain.com"
                label={t('views:profileSettings.accountEmail', 'Account email')}
              />
              {profileErrors.email && (
                <Message theme={MessageTheme.ERROR}>{profileErrors.email.message?.toString()}</Message>
              )}
            </ControlGroup>

            {error && error.type === 'profile' && (
              <>
                <Spacer size={2} />
                <Text size={1} className="text-destructive">
                  {error.message}
                </Text>
              </>
            )}

            {/* UPDATE PROFILE BUTTON */}
            <ControlGroup type="button">
              <ButtonGroup>
                {!profileSubmitted ? (
                  <Button
                    size="sm"
                    type="submit"
                    disabled={!isProfileValid || isUpdatingUser || !Object.keys(profileDirtyFields).length}
                  >
                    {isUpdatingUser
                      ? t('views:profileSettings.upatingProfileButton', 'Updating...')
                      : t('views:profileSettings.updateProfileButton', 'Update profile')}
                  </Button>
                ) : (
                  <Button variant="ghost" type="button" size="sm" theme="success" className="pointer-events-none">
                    {t('views:profileSettings.updatedButton', 'Updated')}&nbsp;&nbsp;
                    <Icon name="tick" size={14} />
                  </Button>
                )}
              </ButtonGroup>
            </ControlGroup>
          </Fieldset>
        </FormWrapper>

        <Fieldset className="my-7">
          <FormSeparator />
        </Fieldset>

        {/* PASSWORD SETTINGS */}
        <FormWrapper onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
          <Fieldset>
            <Legend
              title={t('views:profileSettings.passwordSettingsTitle', 'Password settings')}
              description={t(
                'views:profileSettings.passwordSettingsDesc',
                'Minimum of 6 characters long containing at least one number and a mixture of uppercase and lowercase letters.'
              )}
            />

            {/* NEW PASSWORD */}
            <ControlGroup>
              <Input
                id="newPassword"
                type="password"
                {...registerPassword('newPassword')}
                placeholder={t('views:profileSettings.enterPasswordPlaceholder', 'Enter a new password')}
                label={t('views:profileSettings.newPassword', 'New password')}
              />
              {passwordErrors.newPassword && (
                <Message theme={MessageTheme.ERROR}>{passwordErrors.newPassword.message?.toString()}</Message>
              )}
            </ControlGroup>

            {/* CONFIRM PASSWORD */}
            <ControlGroup>
              <Input
                id="confirmPassword"
                type="password"
                {...registerPassword('confirmPassword')}
                placeholder={t('views:profileSettings.confirmPasswordPlaceholder', 'Confirm your new password')}
                label={t('views:profileSettings.confirmPassword', 'Confirm password')}
              />
              {passwordErrors.confirmPassword && (
                <Message theme={MessageTheme.ERROR}>{passwordErrors.confirmPassword.message?.toString()}</Message>
              )}
            </ControlGroup>

            {error && error.type === 'password' && (
              <>
                <Spacer size={2} />
                <Text size={1} className="text-destructive">
                  {error.message}
                </Text>
              </>
            )}

            {/* UPDATE PASSWORD BUTTON */}
            <ControlGroup type="button">
              <ButtonGroup className="flex justify-between">
                {!passwordSubmitted ? (
                  <Button size="sm" type="submit" disabled={!isPasswordValid || isUpdatingPassword}>
                    {isUpdatingPassword
                      ? t('views:profileSettings.upadtingPasswordButton', 'Updating...')
                      : t('views:profileSettings.updatePasswordButton', 'Update password')}
                  </Button>
                ) : (
                  <Button variant="ghost" type="button" size="sm" theme="success" className="pointer-events-none">
                    {t('views:profileSettings.updatedButton', 'Updated')}&nbsp;&nbsp;
                    <Icon name="tick" size={14} />
                  </Button>
                )}
              </ButtonGroup>
            </ControlGroup>
          </Fieldset>
        </FormWrapper>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SettingsAccountGeneralPage }

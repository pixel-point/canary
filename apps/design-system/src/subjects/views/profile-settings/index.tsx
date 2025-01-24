import { useEffect, useState } from 'react'

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
  Input,
  Legend,
  SkeletonForm,
  Spacer
} from '@harnessio/ui/components'
import { SandboxLayout } from '@harnessio/ui/views'

export const ProfileSettingsView = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    setIsLoadingUser(false)
  }, [])

  return (
    <SandboxLayout.Content className="max-w-[476px] px-0">
      <h1 className="text-24 font-medium text-foreground-1">Account settings</h1>
      <Spacer size={10} />
      {isLoadingUser ? (
        <SkeletonForm />
      ) : (
        <>
          <FormWrapper>
            <Legend title="Personal information" />
            <Avatar size="20" className="size-20 shadow-md">
              <AvatarImage src="/images/anon.jpg" />
              <AvatarFallback>
                <span className="text-2xl font-medium text-foreground-3">TN</span>
              </AvatarFallback>
            </Avatar>
            <Fieldset>
              <Input id="name" size="md" placeholder="Enter your name" label="Name" value="Test Name" />
            </Fieldset>
            <Fieldset>
              <Input
                id="username"
                size="md"
                placeholder="Enter your username"
                disabled
                label="Username"
                value="test-user"
                caption="This username will be shown across the platform."
              />
            </Fieldset>
            <Fieldset>
              <Input id="email" size="md" value="user@domain.com" placeholder="name@domain.com" label="Account email" />
            </Fieldset>

            <ControlGroup type="button">
              <ButtonGroup>
                <Button type="button" disabled>
                  Update profile
                </Button>
              </ButtonGroup>
            </ControlGroup>
          </FormWrapper>

          <FormSeparator className="my-7 border-borders-4" />

          <FormWrapper>
            <Legend
              title="Password settings"
              description="Minimum of 6 characters long containing at least one number and a mixture of uppercase and lowercase letters."
            />
            <Fieldset>
              <Input
                id="newPassword"
                type="password"
                size="md"
                placeholder="Enter a new password"
                label="New password"
              />
            </Fieldset>
            <Fieldset>
              <Input
                id="confirmPassword"
                type="password"
                size="md"
                placeholder="Confirm your new password"
                label="Confirm password"
              />
            </Fieldset>

            <ControlGroup type="button">
              <ButtonGroup>
                <Button type="submit" disabled>
                  Update password
                </Button>
              </ButtonGroup>
            </ControlGroup>
          </FormWrapper>
        </>
      )}
    </SandboxLayout.Content>
  )
}

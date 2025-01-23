import { useState } from 'react'

import { noop, useTranslationsStore } from '@utils/viewUtils'

import {
  Button,
  ControlGroup,
  DeleteAlertDialog,
  Fieldset,
  FormSeparator,
  FormWrapper,
  Legend,
  Spacer
} from '@harnessio/ui/components'
import {
  ProfileKeysList,
  ProfileSettingsKeysCreateDialog,
  ProfileSettingsTokenCreateDialog,
  ProfileTokensList,
  SandboxLayout
} from '@harnessio/ui/views'

const tokens = [
  {
    principal_id: 4,
    type: 'pat',
    identifier: 'qwerty',
    issued_at: 1737564327622,
    created_by: 4,
    uid: 'qwerty'
  },
  {
    principal_id: 4,
    type: 'pat',
    identifier: 'test',
    expires_at: 1745323832408,
    issued_at: 1737547832408,
    created_by: 4,
    uid: 'test'
  }
]

const publicKeys = [
  {
    created: 1737548081988,
    verified: null,
    identifier: 'test',
    usage: 'auth',
    fingerprint: 'SHA256:aAzJHzgAHpY08hwRgwNJPa/hnlaHsne0aJfkfHfi+gc',
    comment: 'your@email.com',
    type: 'ssh-rsa'
  }
]

export const ProfileSettingsKeysView = () => {
  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false)
  const [isKeysDialogOpen, setIsKeysDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <SandboxLayout.Content className="px-0">
        <h1 className="text-2xl font-medium text-foreground-1">Keys and Tokens</h1>
        <Spacer size={10} />
        <FormWrapper>
          <Fieldset className="gap-y-5">
            <Legend
              title={
                <span className="flex justify-between gap-x-4">
                  Personal access token
                  <Button
                    type="button"
                    variant="outline"
                    className="text-primary"
                    onClick={() => setIsTokenDialogOpen(true)}
                  >
                    Add new token
                  </Button>
                </span>
              }
              description="Personal access tokens allow you to authenticate with the API."
            />
            <ControlGroup>
              <ProfileTokensList
                tokens={tokens}
                openAlertDeleteDialog={() => setIsDeleteDialogOpen(true)}
                useTranslationStore={useTranslationsStore}
              />
            </ControlGroup>
          </Fieldset>

          <FormSeparator />

          <Fieldset className="gap-y-5">
            <div className="flex items-end justify-between">
              <Legend
                className="max-w-[400px]"
                title="My SSH keys"
                description="SSH keys allow you to establish a secure connection to your code repository."
              />
              <Button
                className="text-primary"
                variant="outline"
                type="button"
                onClick={() => setIsKeysDialogOpen(true)}
              >
                Add new SSH key
              </Button>
            </div>
            <ControlGroup>
              <ProfileKeysList
                publicKeys={publicKeys}
                openAlertDeleteDialog={noop}
                useTranslationStore={useTranslationsStore}
              />
            </ControlGroup>
          </Fieldset>
        </FormWrapper>
      </SandboxLayout.Content>
      <ProfileSettingsTokenCreateDialog
        open={isTokenDialogOpen}
        onClose={() => setIsTokenDialogOpen(false)}
        handleCreateToken={noop}
        error={null}
        isLoading={false}
        useTranslationStore={useTranslationsStore}
      />
      <ProfileSettingsKeysCreateDialog
        open={isKeysDialogOpen}
        onClose={() => setIsKeysDialogOpen(false)}
        handleCreateSshKey={noop}
        error={null}
        useTranslationStore={useTranslationsStore}
      />
      <DeleteAlertDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        deleteFn={noop}
        error={null}
        isLoading={false}
        useTranslationStore={useTranslationsStore}
      />
    </>
  )
}

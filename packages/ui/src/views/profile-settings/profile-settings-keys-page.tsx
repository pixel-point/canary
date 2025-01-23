import { FC } from 'react'

import { Button, ControlGroup, Fieldset, FormSeparator, FormWrapper, Legend, Spacer } from '@/components'
import { ApiErrorType, SandboxLayout, TranslationStore } from '@/views'

import { ProfileKeysList } from './components/profile-settings-keys-list'
import { ProfileTokensList } from './components/profile-settings-tokens-list'
// import { parseAsInteger, useQueryState } from 'nuqs'
import { AlertDeleteParams, IProfileSettingsStore } from './types'

interface SettingsAccountKeysPageProps {
  openTokenDialog: () => void
  openSshKeyDialog: () => void
  openAlertDeleteDialog: (data: AlertDeleteParams) => void
  error: { type: ApiErrorType; message: string } | null
  headers?: Headers
  useProfileSettingsStore: () => IProfileSettingsStore
  useTranslationStore: () => TranslationStore
}

const ErrorMessage: FC<{ message: string }> = ({ message }) => (
  <>
    <Spacer size={2} />
    <span className="text-xs font-normal text-destructive">{message}</span>
  </>
)

const SettingsAccountKeysPage: FC<SettingsAccountKeysPageProps> = ({
  useProfileSettingsStore,
  openTokenDialog,
  openSshKeyDialog,
  openAlertDeleteDialog,
  useTranslationStore,
  error
  // headers
}) => {
  // @todo: Add pagination for tokens and keys lists in following PR
  // const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  // const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')
  const { publicKeys, tokens } = useProfileSettingsStore()
  const { t } = useTranslationStore()

  return (
    <SandboxLayout.Content className="px-0">
      <h1 className="text-2xl font-medium text-foreground-1">
        {t('views:profileSettings.keysAndTokens', 'Keys and Tokens')}
      </h1>
      <Spacer size={10} />
      <FormWrapper>
        <Fieldset className="gap-y-5">
          <Legend
            title={
              <span className="flex justify-between gap-x-4">
                {t('views:profileSettings.personalAccessToken', 'Personal access token')}
                <Button type="button" variant="outline" className="text-primary" onClick={openTokenDialog}>
                  {t('views:profileSettings.addToken', 'Add new token')}
                </Button>
              </span>
            }
            description={t(
              'views:profileSettings.addTokenDescription',
              'Personal access tokens allow you to authenticate with the API.'
            )}
          />
          <ControlGroup>
            {error?.type === ApiErrorType.TokenFetch ? (
              <ErrorMessage message={error.message} />
            ) : (
              <ProfileTokensList
                tokens={tokens}
                openAlertDeleteDialog={openAlertDeleteDialog}
                useTranslationStore={useTranslationStore}
              />
            )}
          </ControlGroup>
        </Fieldset>

        <FormSeparator />

        <Fieldset className="gap-y-5">
          <div className="flex items-end justify-between">
            <Legend
              className="max-w-[400px]"
              title={t('views:profileSettings.sshKeys', 'My SSH keys')}
              description={t(
                'views:profileSettings.addSshKeyDescription',
                'SSH keys allow you to establish a secure connection to your code repository.'
              )}
            />
            <Button className="text-primary" variant="outline" type="button" onClick={openSshKeyDialog}>
              {t('views:profileSettings.addSshKey', 'Add new SSH key')}
            </Button>
          </div>
          <ControlGroup>
            {error?.type === ApiErrorType.KeyFetch ? (
              <ErrorMessage message={error.message} />
            ) : (
              <ProfileKeysList
                publicKeys={publicKeys}
                openAlertDeleteDialog={openAlertDeleteDialog}
                useTranslationStore={useTranslationStore}
              />
            )}
            {/* <PaginationComponent
                totalPages={totalPages}
                currentPage={page}
                goToPage={(pageNum: number) => setPage(pageNum)}
              /> */}
          </ControlGroup>
        </Fieldset>
      </FormWrapper>
    </SandboxLayout.Content>
  )
}

export { SettingsAccountKeysPage }

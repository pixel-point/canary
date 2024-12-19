import { Button, ControlGroup, Fieldset, FormSeparator, FormWrapper, Legend, Spacer, Text } from '@/components'
import { SandboxLayout } from '@/views'

import { ProfileKeysList } from './components/profile-settings-keys-list'
import { ProfileTokensList } from './components/profile-settings-tokens-list'
// import { parseAsInteger, useQueryState } from 'nuqs'
import { AlertDeleteParams, IProfileSettingsStore } from './types'

interface SettingsAccountKeysPageProps {
  openTokenDialog: () => void
  openSshKeyDialog: () => void
  openAlertDeleteDialog: (data: AlertDeleteParams) => void
  error: { type: string; message: string } | null
  headers?: Headers
  useProfileSettingsStore: () => IProfileSettingsStore
}
const SettingsAccountKeysPage: React.FC<SettingsAccountKeysPageProps> = ({
  useProfileSettingsStore,
  openTokenDialog,
  openSshKeyDialog,
  openAlertDeleteDialog,
  error
  // headers
}) => {
  // @todo: Add pagination for tokens and keys lists in following PR
  // const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  // const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')
  const { publicKeys, tokens } = useProfileSettingsStore()
  return (
    <SandboxLayout.Main>
      <SandboxLayout.Content>
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Keys and Tokens
        </Text>
        <Spacer size={6} />
        <FormWrapper>
          <Fieldset>
            {/* PERSONAL ACCESS TOKEN */}
            <Legend
              title={
                <span className="flex justify-between">
                  Personal access token
                  <Button type="button" variant="outline" className="text-primary" onClick={openTokenDialog}>
                    Add new token
                  </Button>
                </span>
              }
              description="Personal access tokens allow you to authenticate with the API."
            />
            <ControlGroup>
              <>
                {(!error || error.type !== 'tokenFetch') && (
                  <ProfileTokensList tokens={tokens} openAlertDeleteDialog={openAlertDeleteDialog} />
                )}
                {error && error.type === 'tokenFetch' && (
                  <>
                    <Spacer size={2} />
                    <Text size={1} className="text-destructive">
                      {error.message}
                    </Text>
                  </>
                )}
              </>
            </ControlGroup>
          </Fieldset>
          <Fieldset>
            <FormSeparator />
          </Fieldset>
          <Fieldset>
            {/* PERSONAL ACCESS TOKEN */}
            <Legend
              title={
                <span className="flex justify-between">
                  My SSH keys
                  <Button variant="outline" className="text-primary" type="button" onClick={openSshKeyDialog}>
                    Add new SSH key
                  </Button>
                </span>
              }
              description="SSH keys allow you to establish a secure connection to your code repository."
            />

            <ControlGroup>
              <>
                {(!error || error.type !== 'keyFetch') && (
                  <>
                    <ProfileKeysList publicKeys={publicKeys} openAlertDeleteDialog={openAlertDeleteDialog} />
                    {/* <PaginationComponent
                      totalPages={totalPages}
                      currentPage={page}
                      goToPage={(pageNum: number) => setPage(pageNum)}
                    /> */}
                  </>
                )}
                {error && error.type === 'keyFetch' && (
                  <>
                    <Spacer size={2} />
                    <Text size={1} className="text-destructive">
                      {error.message}
                    </Text>
                  </>
                )}
              </>
            </ControlGroup>
          </Fieldset>
        </FormWrapper>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SettingsAccountKeysPage }

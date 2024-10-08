import React from 'react'
import { Spacer, Text } from '@harnessio/canary'
import {
  FormFieldSet,
  SandboxLayout,
  ProfileKeysList,
  KeysList,
  ProfileTokensList,
  TokensList
} from '@harnessio/playground'

interface SandboxSettingsAccountKeysPageProps {
  publicKeys: KeysList[]
  tokens: TokensList[]
}
const SandboxSettingsAccountKeysPage: React.FC<SandboxSettingsAccountKeysPageProps> = ({ publicKeys, tokens }) => {
  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="2xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Keys and Tokens
        </Text>
        <Spacer size={6} />
        <form>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>Personal access token</FormFieldSet.Legend>
            <FormFieldSet.ControlGroup>
              <ProfileTokensList tokens={tokens} />
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            <FormFieldSet.Separator />
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>My SSH keys</FormFieldSet.Legend>
            <FormFieldSet.SubLegend>
              SSH keys allow you to establish a secure connection to your code repository.
            </FormFieldSet.SubLegend>
            <FormFieldSet.ControlGroup>
              <ProfileKeysList publicKeys={publicKeys} />
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsAccountKeysPage }

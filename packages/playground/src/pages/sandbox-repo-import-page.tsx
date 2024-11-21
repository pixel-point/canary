import { useNavigate } from 'react-router-dom'

import { Spacer, Text } from '@harnessio/canary'

import { ImportRepoFormType, RepoImportForm } from '../components/repo-import-form-component'
import { SandboxLayout } from '../index'

export function SandboxRepoImportPage({ isLoading = false }: { isLoading?: boolean }) {
  const navigate = useNavigate()
  const handleFormSubmit = (data: ImportRepoFormType) => {
    console.log('Form submitted', data)
  }

  const handleFormCancel = () => {
    navigate('../')
  }
  return (
    <>
      <SandboxLayout.Main hasLeftPanel hasHeader>
        <SandboxLayout.Content maxWidth="2xl">
          <Spacer size={10} />
          <Text size={6} weight={'medium'}>
            Import a repository
          </Text>
          <Spacer size={8} />
          <RepoImportForm isLoading={isLoading} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}

import { Spacer, Text } from '@harnessio/canary'

import { SandboxLayout } from '../index'

function SandboxExecutionSecurityTestsPage() {
  return (
    <SandboxLayout.Main hasHeader hasSubHeader hasLeftPanel>
      <SandboxLayout.Content>
        <Spacer size={4} />
        <Text size={5} weight={'medium'}>
          Security tests
        </Text>
        <Spacer size={6} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxExecutionSecurityTestsPage }

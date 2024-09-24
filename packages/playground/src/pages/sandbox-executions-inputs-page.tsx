import React from 'react'
import { Text, Spacer } from '@harnessio/canary'
import { SandboxLayout } from '../index'

function SandboxExecutionInputsPage() {
  return (
    <SandboxLayout.Main hasHeader hasSubHeader hasLeftPanel>
      <SandboxLayout.Content>
        <Spacer size={4} />
        <Text size={5} weight={'medium'}>
          Inputs
        </Text>
        <Spacer size={6} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxExecutionInputsPage }

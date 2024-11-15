import { Text, Spacer } from '@harnessio/canary'
import { SandboxLayout } from '../index'

function SandboxExecutionArtifactsPage() {
  return (
    <SandboxLayout.Main hasHeader hasSubHeader hasLeftPanel>
      <SandboxLayout.Content>
        <Spacer size={4} />
        <Text size={5} weight={'medium'}>
          Artifacts
        </Text>
        <Spacer size={6} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxExecutionArtifactsPage }

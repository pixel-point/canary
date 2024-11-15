import { useState } from 'react'
import { Section, Spacer, SpotlightsBox, Text } from '@harnessio/canary'
import { SandboxLayout } from '..'
import { PlaygroundSandboxLayoutSettings } from '../settings/sandbox-settings'
import { Link } from 'react-router-dom'

function SandboxSettingsPage() {
  const [loadState, setLoadState] = useState('sub-float')

  return (
    <>
      <SandboxLayout.Main hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Settings
          </Text>
          <Spacer size={6} />
          <div className="flex w-full flex-col gap-9">
            <Section.Root>
              <Section.Content>
                <Link to="account">
                  <SpotlightsBox.Root
                    logo={'harness'}
                    logoSize={64}
                    highlightTop={'#262930'}
                    highlightBottom={'#262930'}>
                    <SpotlightsBox.Content>
                      <Text size={3}>Account</Text>
                    </SpotlightsBox.Content>
                  </SpotlightsBox.Root>
                </Link>
                <Link to="project">
                  <SpotlightsBox.Root
                    logo={'harness'}
                    logoSize={64}
                    highlightTop={'#262930'}
                    highlightBottom={'#262930'}>
                    <SpotlightsBox.Content>
                      <Text size={3}>Project</Text>
                    </SpotlightsBox.Content>
                  </SpotlightsBox.Root>
                </Link>
              </Section.Content>
            </Section.Root>
          </div>
        </SandboxLayout.Content>
      </SandboxLayout.Main>
      <PlaygroundSandboxLayoutSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}

export { SandboxSettingsPage }

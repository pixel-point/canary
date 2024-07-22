import React from 'react'
import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'

export default {
  title: 'Pages/Pipeline',
  parameters: {
    layout: 'fullscreen'
  }
}

export function CreatePipeline() {
  return (
    <Container.Root>
      <Container.Sidebar>
        <GitnessNavbar />
      </Container.Sidebar>
      <Container.Main>
        <Container.Topbar>
          <GitnessTopBar />
        </Container.Topbar>
        <Container.CenteredContent>
          <p className="text-sm">Create pipeline</p>
        </Container.CenteredContent>
      </Container.Main>
    </Container.Root>
  )
}

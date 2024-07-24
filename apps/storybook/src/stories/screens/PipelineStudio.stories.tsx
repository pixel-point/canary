import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'

export default {
  title: 'Screens/Pipeline',
  parameters: {
    layout: 'fullscreen'
  }
}

export function PipelineStudio() {
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
          <p className="text-sm">Pipeline studio</p>
        </Container.CenteredContent>
      </Container.Main>
    </Container.Root>
  )
}

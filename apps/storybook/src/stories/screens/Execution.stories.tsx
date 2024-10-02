import { Tree, Folder, File, Status } from '@harnessio/canary'
import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'
import { elements } from '../../assets/mocks/mock'

export default {
  title: 'Screens/Execution',
  parameters: {
    layout: 'fullscreen'
  }
}

export function Execution() {
  const TreeFileTest = () => {
    return (
      <div className="w-[395px] h-[660px]">
        <Tree className="rounded-md bg-background overflow-hidden p-2" initialSelectedId="1" elements={elements}>
          <Folder element="DAST" value="1" status={Status.SUCCESS} duration={'15s'}>
            <File value="2" status={Status.SUCCESS} duration={'5s'} isSelect={true}>
              <p>Fortify</p>
            </File>
            <File value="3" status={Status.SUCCESS} duration={'5s'}>
              <p>Veracode</p>
            </File>
            <File value="4" status={Status.SUCCESS} duration={'5'}>
              <p>Checkmarx</p>
            </File>
          </Folder>
          <Folder element="Deploy to Prod" value="5" status={Status.FAILED}>
            <Folder element="SBOM and SLSA Validation" value="6" status={Status.FAILED}>
              <File value="9" status={Status.FAILED} duration={'15'}>
                <p>SoftwareSupply Chain Validation</p>
              </File>
              <File value="10" status={Status.FAILED}>
                <p>SLSA Verification</p>
              </File>
            </Folder>
            <File value="7" status={Status.QUEUED}>
              <p>Risk Profile OPA - New Criticals</p>
            </File>
            <File value="8" status={Status.QUEUED}>
              <p>Canary Deployment</p>
            </File>
          </Folder>
        </Tree>
      </div>
    )
  }
  return (
    <Container.Root>
      <Container.Sidebar>
        <GitnessNavbar />
      </Container.Sidebar>
      <Container.Main>
        <Container.Topbar>
          <GitnessTopBar />
        </Container.Topbar>
        <Container.Content>
          <TreeFileTest />
        </Container.Content>
      </Container.Main>
    </Container.Root>
  )
}

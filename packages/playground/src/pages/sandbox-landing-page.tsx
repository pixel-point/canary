import { SandboxLayout } from '../index'
import LandingPage from './landing-page'

function SandboxLandingPage() {
  return (
    <SandboxLayout.Main fullWidth hasLeftPanel>
      <LandingPage />
    </SandboxLayout.Main>
  )
}

export { SandboxLandingPage }

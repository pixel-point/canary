import { SandboxRoot } from '@harnessio/ui/views'
import { TypesUser } from './types'

interface RootLayoutProps {
  currentUser: TypesUser | undefined
}

export const RootLayout: React.FC<RootLayoutProps> = ({ currentUser }) => {
  return (
    <SandboxRoot
      currentUser={currentUser}
      pinnedMenu={null}
      recentMenu={[]}
      changePinnedMenu={_data => {}}
      changeRecentMenu={_data => {}}
    />
  )
}

import { Topbar, Text } from '@harnessio/canary'
import { TopBarWidget } from '@harnessio/playground'
import { TypesMembershipSpace } from '@harnessio/code-service-client'
import { useAppContext } from '../framework/context/AppContext'

export default function Header() {
  const { spaces } = useAppContext()

  const projectsItem =
    spaces.map((space: TypesMembershipSpace) => ({
      id: space?.space?.id,
      name: space?.space?.identifier
    })) || []

  if (projectsItem.length === 0) {
    //temporary for edge cases
    //will redirect to the create project page for next steps if the user doesn't have any projects
    //currently the create project page is not implemented in the playground
    return (
      <Topbar.Root>
        <Topbar.Left>
          <Text size={2} weight="medium" className="text-primary">
            Please create a new project
          </Text>
        </Topbar.Left>
      </Topbar.Root>
    )
  }

  return <TopBarWidget projects={projectsItem} />
}

import { Topbar, Text } from '@harnessio/canary'
import { TopBarWidget } from '@harnessio/playground'
import { useMembershipSpacesQuery, TypesSpace } from '@harnessio/code-service-client'

export default function Header() {
  //fetch projects api to get the list of projects
  const { data: projects, isLoading } = useMembershipSpacesQuery({
    queryParams: { page: 1, limit: 30, sort: 'identifier', order: 'asc' }
  })
  //prevent rendering the page until the projects are loaded
  if (isLoading) {
    return (
      <Topbar.Root>
        <Topbar.Left>
          <Text size={2} weight="medium" className="text-primary">
            Loading Your Projects...
          </Text>
        </Topbar.Left>
      </Topbar.Root>
    )
  }

  const projectsItem: TypesSpace[] =
    // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
    projects?.content?.map(membership => ({
      id: membership?.space?.id,
      name: membership?.space?.identifier
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

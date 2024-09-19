import { Topbar, Text } from '@harnessio/canary'
import { TopBarWidget, Project } from '@harnessio/playground'
import { useNavigate } from 'react-router-dom'
import { TypesMembershipSpace } from '@harnessio/code-service-client'
import { useAppContext } from '../framework/context/AppContext'
import { useGetSpaceURLParam } from '../framework/hooks/useGetSpaceParam'

export default function Header() {
  const navigate = useNavigate()
  const space = useGetSpaceURLParam()
  const { spaces } = useAppContext()

  const projectsItem =
    spaces?.map((space: TypesMembershipSpace) => ({
      id: space?.space?.id,
      name: space?.space?.path
    })) || []

  if (projectsItem.length === 0) {
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

  return (
    <TopBarWidget
      projects={projectsItem}
      onSelectProject={(selectedProject: Project) => {
        if (selectedProject?.name) {
          navigate(`/${selectedProject.name}/repos`)
        }
      }}
      preselectedProject={projectsItem.find(item => item.name === space)}
    />
  )
}

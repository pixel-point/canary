import { useMembershipSpacesQuery, TypesMembershipSpace } from '@harnessio/code-service-client'
import { Home } from '@harnessio/playground'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { setSelectedSpace, setSpaces } = useAppContext()
  const { data } = useMembershipSpacesQuery({
    queryParams: { page: 1, limit: 30, sort: 'identifier', order: 'asc' }
  })
  let projectList = []
  // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
  const spaces = data?.content || []

  if (spaces.length > 0) {
    setSpaces(spaces)
    projectList = spaces.map((membership: TypesMembershipSpace) => ({
      id: membership?.space?.id,
      name: membership?.space?.identifier
    }))
  }

  return (
    <Home
      isAuthed
      title="Harness"
      projects={projectList}
      onSelectProject={(selectedProject: string) => {
        setSelectedSpace(selectedProject)
        navigate(`/${selectedProject}/repos`)
      }}
    />
  )
}

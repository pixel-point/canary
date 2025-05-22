import { useNavigate } from 'react-router-dom'

import { useCreateSpaceMutation } from '@harnessio/code-service-client'
import { CreateProjectFields, CreateProjectPage } from '@harnessio/ui/views'

import { useAppContext } from '../framework/context/AppContext'
import { useRoutes } from '../framework/context/NavigationContext'

export const CreateProject = () => {
  const routes = useRoutes()
  const navigate = useNavigate()
  const { addSpaces, spaces } = useAppContext()

  const isAdditional = spaces.length >= 1

  const {
    mutate: createSpace,
    isLoading,
    error
  } = useCreateSpaceMutation(
    {},
    {
      onSuccess: response => {
        const { body: project } = response
        addSpaces([project])
        navigate(routes.toRepositories({ spaceId: project?.identifier }))
      }
    }
  )

  const handleFormSubmit = (formData: CreateProjectFields) => {
    createSpace({ body: { identifier: formData.name, description: formData.description } })
  }

  const commonProps = { isLoading, error: error?.message, onFormSubmit: handleFormSubmit }

  if (isAdditional) {
    return (
      <CreateProjectPage
        {...commonProps}
        isAdditional
        backLinkProps={{ to: routes.toHome() }}
        importProjectLinkProps={{ to: routes.toImportProject() }}
      />
    )
  }

  return (
    <CreateProjectPage
      {...commonProps}
      logoutLinkProps={{ to: routes.toLogout() }}
      importProjectLinkProps={{ to: routes.toImportProject() }}
    />
  )
}

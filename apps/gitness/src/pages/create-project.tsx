import { useState } from 'react'
import {
  useCreateSpaceMutation,
  OpenapiCreateSpaceRequest,
  CreateSpaceErrorResponse,
  CreateSpaceOkResponse
} from '@harnessio/code-service-client'
import { CreateProjectPage } from '@harnessio/playground'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../framework/context/AppContext'

export default function CreateProject() {
  const navigate = useNavigate()
  const { addSpaces } = useAppContext() // Get the spaces and addSpace function from context
  const [apiError, setApiError] = useState<string | null>(null)

  // Set up the mutation hook with the form data
  const { mutate, isLoading } = useCreateSpaceMutation(
    {},
    {
      onSuccess: (data: CreateSpaceOkResponse) => {
        setApiError(null)
        //onSuccess in react-query has allowed 200-299
        const spaceData = data?.content || data
        const spaceId = data?.content.id || data.id
        addSpaces([spaceData])
        navigate(`/${spaceId}/repos`)
      },
      onError: (error: CreateSpaceErrorResponse) => {
        const message = error.message || 'An unknown error occurred.'
        setApiError(message)
      }
    }
  )

  const handleFormSubmit = (formData: OpenapiCreateSpaceRequest) => {
    // Trigger the mutation with form data as the request body
    mutate({
      body: {
        identifier: formData.identifier || '',
        description: formData.description || '',
        is_public: formData.is_public ?? false,
        parent_ref: formData.parent_ref || ''
      }
    })
  }

  return <CreateProjectPage onFormSubmit={handleFormSubmit} isLoading={isLoading} apiError={apiError} />
}

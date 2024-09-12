import { Button, CanaryOutletFactory, CanaryOutletName, DropdownMenuItem, SplitButton } from '@harnessio/canary'
import {
  OpenapiCommitFilesRequest,
  useCommitFilesMutation,
  useCreateExecutionMutation
} from '@harnessio/code-service-client'
import { PipelineParams, usePipelineDataContext } from '../context/PipelineStudioDataProvider'
import { useParams, useNavigate } from 'react-router-dom'

// TODO: set icon adn move to "root"
CanaryOutletFactory.registerOutlet(CanaryOutletName.SPLIT_ICON, () => {
  return <>&gt;</> // <NavArrowDown strokeWidth="2" />
})

const PipelineStudioHeaderActions = (): JSX.Element => {
  const {
    pipelineData,
    pipelineYAMLFileContent,
    fetchPipelineYAMLFileContent,
    fetchingPipelineYAMLFileContent,
    yamlRevision,
    isExistingPipeline,
    isDirty
  } = usePipelineDataContext()

  const navigate = useNavigate()
  const { repoId, spaceId } = useParams<PipelineParams>()
  const repoRef = `${spaceId}/${repoId}/+`

  const { mutateAsync: commitAsync } = useCommitFilesMutation({})

  const handleSave = (execute = false): void => {
    const data: OpenapiCommitFilesRequest = {
      actions: [
        {
          action: isExistingPipeline ? 'UPDATE' : 'CREATE',
          path: pipelineData?.config_path,
          payload: yamlRevision.yaml,
          sha: isExistingPipeline ? pipelineYAMLFileContent?.sha : ''
        }
      ],
      branch: pipelineData?.default_branch || '',
      title: `${isExistingPipeline ? 'Updated' : 'Created'} pipeline ${pipelineData?.identifier}`, // TODO: check if pl is saved before edit
      message: ''
    }

    commitAsync({ repo_ref: repoRef, body: data })
      .then(() => {
        if (execute) {
          handleRun()
        } else {
          fetchPipelineYAMLFileContent?.()
        }
        // TODO: toast
      })
      .catch(error => {
        console.error(error)
        // TODO: error
      })
  }

  const { mutateAsync: createExecutionAsync, isLoading: isLoadingCreateExecution } = useCreateExecutionMutation({})

  const handleRun = (): void => {
    createExecutionAsync({
      pipeline_identifier: pipelineData?.identifier ?? '',
      repo_ref: repoRef,
      queryParams: { branch: 'main' }
    })
      .then(response => {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const executionId = (response as any)?.content?.number
        navigate(`../pipelines/${pipelineData?.identifier}/execution/${executionId}`)
        // TODO: toast
      })
      .catch(error => {
        console.error(error)
        // TODO: error
      })
  }

  const renderActionButton = () => {
    return !isDirty ? (
      <Button size="sm" onClick={handleRun} loading={isLoadingCreateExecution}>
        Run
      </Button>
    ) : (
      <SplitButton
        loading={isLoadingCreateExecution}
        size="sm"
        onClick={() => handleSave(true)}
        dropdown={<>&gt;</>}
        menu={
          <>
            <DropdownMenuItem onClick={() => handleSave(false)} disabled={isLoadingCreateExecution}>
              Save
            </DropdownMenuItem>
          </>
        }>
        Save and run
      </SplitButton>
    )
  }

  return (
    // NOTE: absolute positioning in the top right corner of the page
    <div className="absolute right-0 top-0 w-fit">
      <div className="flex items-center gap-x-3 h-14 px-4">
        {!fetchingPipelineYAMLFileContent && (
          <>
            <Button variant="ghost" size="sm">
              Settings
            </Button>
            {renderActionButton()}
          </>
        )}
      </div>
    </div>
  )
}

export default PipelineStudioHeaderActions
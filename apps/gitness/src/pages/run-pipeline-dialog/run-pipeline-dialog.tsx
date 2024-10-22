import { useEffect, useState } from 'react'
import { parse } from 'yaml'
import { omit } from 'lodash-es'
import { inputComponentFactory, InputType } from '@harnessio/playground'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Spacer,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button
} from '@harnessio/canary'
import {
  IInputDefinition,
  RenderForm,
  RootForm,
  getTransformers,
  outputTransformValues,
  useZodValidationResolver
} from '@harnessio/forms'
import {
  findPipeline,
  getContent,
  useCreateExecutionMutation,
  useListBranchesQuery
} from '@harnessio/code-service-client'
import { PipelineParams } from '../pipeline-edit/context/PipelineStudioDataProvider'
import { decodeGitContent, normalizeGitRef } from '../../utils/git-utils'
import { createFormFromPipelineInputs } from './utils/utils'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { Inputs } from '../../types/pipeline-schema'

const ADDITIONAL_INPUTS_PREFIX = '_'
interface RunPipelineDialogProps {
  open: boolean
  onClose: () => void
  pipelineId?: string
  branch?: string
  toExecutions: string
}

export default function RunPipelineDialog({ open, onClose, pipelineId, branch, toExecutions }: RunPipelineDialogProps) {
  const { pipelineId: pipelineIdFromParams = '' } = useParams<PipelineParams>()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [pipeline, setPipeline] = useState<Record<string, unknown>>({})

  const repoRef = useGetRepoRef()
  const { data: listBranchesData, isLoading: listBranchesLoading } = useListBranchesQuery({
    repo_ref: repoRef,
    queryParams: {}
  })

  useEffect(() => {
    findPipeline({ pipeline_identifier: pipelineId ?? pipelineIdFromParams, repo_ref: repoRef })
      .then(pipelineData => {
        getContent({
          path: pipelineData.config_path ?? '',
          repo_ref: repoRef,
          queryParams: { git_ref: normalizeGitRef(branch ?? pipelineData.default_branch) ?? '', include_commit: true }
        }).then(pipelineFileContent => {
          try {
            const pipelineObj = parse(decodeGitContent(pipelineFileContent?.content?.data))
            setPipeline(pipelineObj)
          } catch (ex) {
            // TODO: toast
            console.error(ex)
          }
          setLoading(false)
        })
      })
      .catch(ex => {
        // TODO: toast
        console.log(ex)
        setLoading(false)
      })
  }, [pipelineId, repoRef])

  const formDefinition = createFormFromPipelineInputs(pipeline)
  const additionalInput: IInputDefinition[] = [
    {
      label: 'Branch',
      inputType: InputType.select,
      path: `${ADDITIONAL_INPUTS_PREFIX}.branch`,
      inputConfig: {
        options: listBranchesData?.map(branchItem => ({ label: branchItem?.name, value: branchItem?.name }))
      }
    },
    { inputType: InputType.separator, path: '' }
  ]
  formDefinition.inputs = [...additionalInput, ...formDefinition.inputs]

  const resolver = useZodValidationResolver(formDefinition)

  const { mutateAsync: createExecutionAsync, isLoading: isLoadingCreateExecution } = useCreateExecutionMutation({})

  const runPipeline = ({ branch, inputsValues }: { branch: string; inputsValues: Inputs }) => {
    createExecutionAsync({
      pipeline_identifier: pipelineId ?? '',
      repo_ref: repoRef,
      queryParams: { branch: branch },
      body: inputsValues
    })
      .then(response => {
        onClose()

        const executionId = response.number
        navigate(`${toExecutions}/${executionId}`)
        // TODO: toast here ?
      })
      .catch(error => {
        console.error(error)
        // TODO: error toast here ?
      })
  }
  if (loading || listBranchesLoading) {
    // TODO
    return <>'Loading...'</>
  }

  return (
    <RootForm
      defaultValues={{ _: { branch } }}
      resolver={resolver}
      mode="onSubmit"
      onSubmit={values => {
        const transformers = getTransformers(formDefinition)
        const transformedValues = outputTransformValues(values, transformers)

        const branch = transformedValues._.branch
        const inputsValues = omit(transformedValues, '_')

        runPipeline({ branch, inputsValues })
      }}
      validateAfterFirstSubmit={true}>
      {rootForm => (
        <Dialog
          open={open}
          onOpenChange={open => {
            if (!open) onClose()
          }}>
          <DialogContent className="max-w-[500px] bg-primary-background border-border">
            <DialogHeader>
              <DialogTitle>Run Pipeline</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Spacer size={6} />
              <RenderForm className="space-y-4" factory={inputComponentFactory} inputs={formDefinition} />
            </DialogDescription>
            <DialogFooter>
              <Button onClick={onClose} className="text-primary" variant="outline">
                Cancel
              </Button>
              <Button loading={isLoadingCreateExecution} onClick={() => rootForm.submitForm()}>
                Run pipeline
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </RootForm>
  )
}

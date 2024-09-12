import { Button } from '@harnessio/canary'
import { IFormDefinition, RenderForm, RootForm } from '@harnessio/forms'
import { StepForm, StepFormSection, inputComponentFactory } from '@harnessio/playground'
import { useEffect, useMemo, useState } from 'react'
import { usePipelineDataContext } from '../context/PipelineStudioDataProvider'
import { StepDrawer, usePipelineViewContext } from '../context/PipelineStudioViewProvider'
import { parse } from 'yaml'
import { get, set } from 'lodash-es'
import { ApiInputs, apiInput2IInputDefinition } from '../utils/step-form-utils'

interface PipelineStudioStepFormProps {
  requestClose: () => void
}

export const PipelineStudioStepForm = (props: PipelineStudioStepFormProps): JSX.Element => {
  const { requestClose } = props
  const { yamlRevision, requestYamlModifications, currentStepFormDefinition, addStepIntention, editStepIntention } =
    usePipelineDataContext()
  const { setStepDrawerOpen } = usePipelineViewContext()

  const [_defaultStepValues, setDefaultStepValues] = useState({})

  useEffect(() => {
    if (editStepIntention) {
      const yamlJson = parse(yamlRevision.yaml)
      const step = get(yamlJson, editStepIntention.path)
      setDefaultStepValues(step)
      //const stepIdentifier = step?.spec?.name
      // TODO
      //   fetchPlugins(1).then(data => {
      //     const stepData = data?.find((_plugin: TypesPlugin) => _plugin.identifier === stepIdentifier)
      //     setCurrentStepFormDefinition({ ...stepData, spec: JSON.parse(stepData?.spec ?? '') })
      //   })
    }
  }, [editStepIntention])

  // const title = currentStepFormDefinition?.identifier
  // const description = currentStepFormDefinition?.description

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const inputs = (currentStepFormDefinition?.spec as any)?.spec?.inputs as ApiInputs

  const formInputs: IFormDefinition['inputs'] = useMemo(() => {
    return Object.keys(inputs ?? {}).map(inputName => {
      return apiInput2IInputDefinition(inputName, inputs[inputName], 'spec.inputs')
    })
  }, [inputs])

  const formDefinition: IFormDefinition = { inputs: formInputs } // { inputs: addNameInput(formInputs, 'spec.name') }

  return (
    <RootForm
      // TODO
      // resolver={useZodValidationResolver(formDefinition)}
      resolver={data => ({
        values: data,
        errors: {}
      })}
      mode="onSubmit"
      onSubmit={values => {
        const step = values
        set(step, 'type', 'plugin')
        set(step, 'spec.name', currentStepFormDefinition?.identifier)

        if (addStepIntention) {
          requestYamlModifications.injectInArray({
            path: addStepIntention?.path,
            position: addStepIntention?.position,
            item: step
          })
        } else if (editStepIntention) {
          requestYamlModifications.updateInArray({
            path: editStepIntention?.path,
            item: step
          })
        }

        requestClose()
      }}
      validateAfterFirstSubmit={true}>
      {rootForm => (
        <StepForm.Root>
          <StepForm.Header>
            {/* {<StepBreadcrumb title="Deploy to Dev" subTitle="Run" />} */}
            <StepForm.Title>
              <Button
                className="px-2 mr-2"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setStepDrawerOpen(StepDrawer.Collection)
                }}>
                {/* <ArrowLeft /> TODO */} &lt;
              </Button>
              Run Step
            </StepForm.Title>
            <StepForm.Description>Step description. This can be multiline description.</StepForm.Description>
            <StepForm.Actions>
              AI Button placeholder
              {/* <AIButton label="AI Autofill" /> */}
            </StepForm.Actions>
          </StepForm.Header>
          <StepFormSection.Root>
            <StepFormSection.Header>
              <StepFormSection.Title>General</StepFormSection.Title>
              {<StepFormSection.Description>Read documentation to learn more.</StepFormSection.Description>}
            </StepFormSection.Header>
            <StepFormSection.Form>
              <RenderForm className="space-y-4" factory={inputComponentFactory} inputs={formDefinition} />
            </StepFormSection.Form>
          </StepFormSection.Root>
          <StepForm.Footer>
            <Button onClick={() => rootForm.submitForm()}>Submit</Button>
            <Button variant="secondary" onClick={() => {}}>
              Cancel
            </Button>
          </StepForm.Footer>
        </StepForm.Root>
      )}
    </RootForm>
  )
}

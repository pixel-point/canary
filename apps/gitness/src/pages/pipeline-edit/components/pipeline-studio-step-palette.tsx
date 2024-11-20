import { Icon, Button } from '@harnessio/canary'
import { useListGlobalTemplatesQuery } from '@harnessio/code-service-client'
import {
  StepForm,
  StepsPalette,
  StepsPaletteContent,
  StepsPaletteItem,
  harnessSteps,
  harnessStepGroups
} from '@harnessio/views'
import { usePipelineDataContext } from '../context/PipelineStudioDataProvider'
import { StepDrawer, usePipelineViewContext } from '../context/PipelineStudioViewProvider'
import { StepSource } from '../context/data-store/types'

interface PipelineStudioStepFormProps {
  requestClose: () => void
}

const PipelineStudioStepPalette = (props: PipelineStudioStepFormProps): JSX.Element => {
  const { requestClose } = props
  const {
    state: { addStepIntention },
    setFormStep,
    requestYamlModifications
  } = usePipelineDataContext()
  const { setStepDrawerOpen } = usePipelineViewContext()

  // TODO: only 100 items
  const { data: { body: pluginsResponse } = {} } = useListGlobalTemplatesQuery({
    queryParams: { limit: 100, page: 1 }
  })

  return (
    <StepsPalette.Root>
      <StepsPalette.Header>
        <StepsPalette.Title>Add Step</StepsPalette.Title>
        {/* <Input placeholder="Search" />
        <StepPaletteFilters /> */}
      </StepsPalette.Header>
      <StepsPaletteContent.Root>
        <StepsPaletteContent.Section>
          <StepsPaletteContent.SectionHeader>Groups</StepsPaletteContent.SectionHeader>

          {harnessStepGroups.map(harnessStepGroup => (
            <StepsPaletteContent.SectionItem key={harnessStepGroup.identifier}>
              <StepsPaletteItem.Root
                onClick={() => {
                  if (addStepIntention) {
                    requestYamlModifications.injectInArray({
                      path: addStepIntention.path,
                      position: addStepIntention.position,
                      item: { [harnessStepGroup.identifier]: { steps: [] } }
                    })
                  }

                  requestClose()
                }}>
                <StepsPaletteItem.Left>
                  <Icon name="harness-plugin" size={36} />
                </StepsPaletteItem.Left>
                <StepsPaletteItem.Right>
                  <StepsPaletteItem.Header>
                    <StepsPaletteItem.Title>{harnessStepGroup.identifier}</StepsPaletteItem.Title>
                    {/* <StepsPaletteItem.BadgeWrapper>verified</StepsPaletteItem.BadgeWrapper> */}
                  </StepsPaletteItem.Header>
                  <StepsPaletteItem.Description>{harnessStepGroup.description}</StepsPaletteItem.Description>
                </StepsPaletteItem.Right>
              </StepsPaletteItem.Root>
            </StepsPaletteContent.SectionItem>
          ))}
        </StepsPaletteContent.Section>
        <StepsPaletteContent.Section>
          <StepsPaletteContent.SectionHeader>Harness</StepsPaletteContent.SectionHeader>

          {harnessSteps.map(harnessStep => (
            <StepsPaletteContent.SectionItem key={harnessStep.identifier}>
              <StepsPaletteItem.Root
                onClick={() => {
                  setFormStep({
                    stepSource: StepSource.Harness,
                    data: {
                      identifier: harnessStep.identifier,
                      description: harnessStep.description
                    }
                  })
                  setStepDrawerOpen(StepDrawer.Form)
                }}>
                <StepsPaletteItem.Left>
                  <Icon name="harness-plugin" size={36} />
                </StepsPaletteItem.Left>
                <StepsPaletteItem.Right>
                  <StepsPaletteItem.Header>
                    <StepsPaletteItem.Title>{harnessStep.identifier}</StepsPaletteItem.Title>
                  </StepsPaletteItem.Header>
                  <StepsPaletteItem.Description>{harnessStep.description}</StepsPaletteItem.Description>
                </StepsPaletteItem.Right>
              </StepsPaletteItem.Root>
            </StepsPaletteContent.SectionItem>
          ))}
        </StepsPaletteContent.Section>
        <StepsPaletteContent.Section>
          <StepsPaletteContent.SectionHeader>Templates</StepsPaletteContent.SectionHeader>
          {pluginsResponse?.map(item => (
            <StepsPaletteContent.SectionItem key={item.identifier}>
              <StepsPaletteItem.Root
                onClick={() => {
                  if (addStepIntention?.path && addStepIntention?.position && item.data) {
                    setFormStep({
                      stepSource: StepSource.Templates,
                      data: item
                    })
                    setStepDrawerOpen(StepDrawer.Form)
                  } else {
                    //TODO: TOAST HERE
                  }
                }}>
                <StepsPaletteItem.Left>
                  <Icon name="harness-plugin" size={36} />
                </StepsPaletteItem.Left>
                <StepsPaletteItem.Right>
                  <StepsPaletteItem.Header>
                    <StepsPaletteItem.Title>{item.identifier}</StepsPaletteItem.Title>
                    {/* <StepsPaletteItem.BadgeWrapper>verified</StepsPaletteItem.BadgeWrapper> */}
                  </StepsPaletteItem.Header>
                  <StepsPaletteItem.Description>{item.description}</StepsPaletteItem.Description>
                </StepsPaletteItem.Right>
              </StepsPaletteItem.Root>
            </StepsPaletteContent.SectionItem>
          ))}
        </StepsPaletteContent.Section>
      </StepsPaletteContent.Root>
      <StepForm.Footer>
        <Button variant="secondary" onClick={requestClose}>
          Cancel
        </Button>
      </StepForm.Footer>
    </StepsPalette.Root>
  )
}

export { PipelineStudioStepPalette }

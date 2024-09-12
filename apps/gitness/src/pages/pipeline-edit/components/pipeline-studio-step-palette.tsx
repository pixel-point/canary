import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Input
} from '@harnessio/canary'
import { StepsPalette, StepsPaletteContent, StepsPaletteItem, StepPaletteFilters } from '@harnessio/playground'
import { usePipelineDataContext } from '../context/PipelineStudioDataProvider'
import { StepDrawer, usePipelineViewContext } from '../context/PipelineStudioViewProvider'
import { TypesPlugin } from '../types/api-types'
import { fetchPlugins } from '../utils/api'

const PipelineStudioStepPalette = (): React.ReactElement => {
  const { addStepIntention, setCurrentStepFormDefinition } = usePipelineDataContext()
  const { setStepDrawerOpen } = usePipelineViewContext()

  const [pluginsData, setPluginsData] = useState<TypesPlugin[]>([])

  useEffect(() => {
    fetchPlugins(1).then(data => {
      setPluginsData(data.map(d => ({ ...d, spec: JSON.parse(d.spec ?? '') })))
    })
  }, [])

  return (
    <StepsPalette.Root>
      <StepsPalette.Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Deploy to Dev</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="font-thin">/</BreadcrumbSeparator>
            <BreadcrumbPage>
              <BreadcrumbLink>Add Step</BreadcrumbLink>
            </BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        <StepsPalette.Title>Add Step</StepsPalette.Title>
        {/* TODO leftIcon={<Search />} */}
        <Input placeholder="Search" />
        <StepPaletteFilters />
      </StepsPalette.Header>
      <StepsPaletteContent.Root>
        <StepsPaletteContent.Section>
          <StepsPaletteContent.SectionHeader>
            <div>Build</div>
            <div>See all &gt; </div>
          </StepsPaletteContent.SectionHeader>
          {pluginsData.map(item => (
            <StepsPaletteContent.SectionItem key={item.identifier}>
              <StepsPaletteItem.Root
                onClick={() => {
                  if (addStepIntention?.path && addStepIntention?.position && item.spec) {
                    setCurrentStepFormDefinition(item)
                    setStepDrawerOpen(StepDrawer.Form)
                  } else {
                    //TODO: TOAST HERE
                  }
                }}>
                <StepsPaletteItem.Left>
                  {/* <Box size="36" />  */}
                  []
                </StepsPaletteItem.Left>
                <StepsPaletteItem.Right>
                  <StepsPaletteItem.Header>
                    <StepsPaletteItem.Title>{item.identifier}</StepsPaletteItem.Title>
                    <StepsPaletteItem.BadgeWrapper>verified</StepsPaletteItem.BadgeWrapper>
                  </StepsPaletteItem.Header>
                  <StepsPaletteItem.Description>{item.description}</StepsPaletteItem.Description>
                </StepsPaletteItem.Right>
              </StepsPaletteItem.Root>
            </StepsPaletteContent.SectionItem>
          ))}
        </StepsPaletteContent.Section>
      </StepsPaletteContent.Root>
    </StepsPalette.Root>
  )
}

export { PipelineStudioStepPalette }

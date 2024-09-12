import { Container } from '@harnessio/playground'
import { useCallback, useEffect, useMemo } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, Sheet, SheetContent } from '@harnessio/canary'
import { PipelineStudioFooterBar } from '@harnessio/playground'
import { PipelineStudioPanel } from './pipeline-studio-panel'
import { PipelineStudioToolbar } from './pipeline-studio-toolbar'
import { StepDrawer, usePipelineViewContext } from '../context/PipelineStudioViewProvider'
import { PipelineStudioView } from '../types/types'
import { PipelineStudioStepForm } from './pipeline-studio-step-form'
import { PipelineStudioGraphView } from './pipeline-studio-graph-view'
import { PipelineStudioYamlView } from './pipeline-studio-yaml-view'
import { usePipelineDataContext } from '../context/PipelineStudioDataProvider'
import { PipelineStudioStepPalette } from './pipeline-studio-step-palette'
import PipelineStudioHeaderActions from './pipeline-studio-header-actions'

export default function PipelineEdit() {
  const { view, setView, panelOpen, stepDrawerOpen, setStepDrawerOpen, setPanelOpen } = usePipelineViewContext()
  const { problems } = usePipelineDataContext()

  //const { clearAddStepIntention, clearEditStepIntention, setCurrentStepFormDefinition } = usePipelineDataContext()

  useEffect(() => {
    setPanelOpen(view === 'yaml')
  }, [view])

  const main = useMemo(() => {
    return (
      <>
        <ResizablePanelGroup direction="vertical" className="border-5">
          <ResizablePanel order={1}>
            {view === 'visual' ? (
              <PipelineStudioGraphView />
            ) : (
              <PipelineStudioYamlView /> // TODO check this prop: setDrawerOpen={setStepDrawerOpen}
            )}
          </ResizablePanel>
          {panelOpen && (
            <>
              <ResizableHandle />
              <ResizablePanel defaultSize={30} id="panel" minSize={10} maxSize={90} order={2} className="h-full">
                <PipelineStudioPanel />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </>
    )
  }, [panelOpen, view])

  const renderSheetContent = useCallback(() => {
    switch (stepDrawerOpen) {
      case StepDrawer.Collection:
        return <PipelineStudioStepPalette />
      case StepDrawer.Form:
        return (
          <PipelineStudioStepForm
            requestClose={() => {
              setStepDrawerOpen(StepDrawer.None)
              // TODO:
              //   // cleanup
              //   clearAddStepIntention()
              //   clearEditStepIntention()
              //   setCurrentStepFormDefinition(null)
            }}
          />
        )
      default:
        return null
    }
  }, [stepDrawerOpen])

  const drawer = useMemo(
    () => (
      <Sheet
        open={stepDrawerOpen !== StepDrawer.None}
        onOpenChange={open => {
          if (!open) setStepDrawerOpen(StepDrawer.None)
        }}>
        <SheetContent className="p-0">{renderSheetContent()}</SheetContent>
      </Sheet>
    ),
    [stepDrawerOpen, setStepDrawerOpen]
  )

  return (
    <Container.Root wFull={true} hFull={true} className="h-[calc(100vh-100px)]">
      <Container.Main>
        <div>
          <PipelineStudioHeaderActions />
          <PipelineStudioToolbar view={view} setView={view => setView(view as PipelineStudioView)} />
        </div>
        {drawer}
        {main}
        <PipelineStudioFooterBar
          commitHistory={{ lastCommittedAt: Date.now(), lastCommittedBy: 'harness.io' }}
          problems={problems.problemsCount}
          togglePane={() => setPanelOpen(!panelOpen)}
        />
      </Container.Main>
    </Container.Root>
  )
}
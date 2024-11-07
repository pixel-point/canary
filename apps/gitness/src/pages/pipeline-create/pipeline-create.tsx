import { CreatePipelinePage, SandboxLayout } from '@harnessio/playground'
import CreatePipelineDialog from './PipelineCreateDialog/PipelineCreateDialog'
import { useState } from 'react'

export function PipelineCreate() {
  const [isCreatePipelineDialogOpen, setCreatePipelineDialogOpen] = useState(false)

  const closeSearchDialog = () => {
    setCreatePipelineDialogOpen(false)
  }

  return (
    <SandboxLayout.Main hasHeader hasLeftPanel fullWidth>
      <CreatePipelineDialog open={isCreatePipelineDialogOpen} onClose={closeSearchDialog} />
      <CreatePipelinePage onClickStartFromScratch={() => setCreatePipelineDialogOpen(true)} />
    </SandboxLayout.Main>
  )
}

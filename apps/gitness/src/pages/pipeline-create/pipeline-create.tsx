import { SandboxCreatePipelinePage } from '@harnessio/playground'
import CreatePipelineDialog from './PipelineCreateDialog/PipelineCreateDialog'
import { useState } from 'react'

export function PipelineCreate() {
  const [isCreatePipelineDialogOpen, setCreatePipelineDialogOpen] = useState(false)

  const closeSearchDialog = () => {
    setCreatePipelineDialogOpen(false)
  }

  return (
    <>
      <CreatePipelineDialog open={isCreatePipelineDialogOpen} onClose={closeSearchDialog} />
      <SandboxCreatePipelinePage onClickStartFromScratch={() => setCreatePipelineDialogOpen(true)} />
    </>
  )
}

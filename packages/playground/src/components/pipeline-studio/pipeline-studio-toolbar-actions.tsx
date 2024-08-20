import React from 'react'
import { Button } from '@harnessio/canary'
import { EditPencil, Copy, Download } from '@harnessio/icons-noir'

export interface PipelineStudioToolbarActionsProps {
  onCopyClick: () => void
  onEditClick: () => void
  onDownloadClick: () => void
}

export const PipelineStudioToolbarActions = (props: PipelineStudioToolbarActionsProps): JSX.Element => {
  const { onCopyClick, onEditClick, onDownloadClick } = props

  // TODO: styling is same as for button group.
  return (
    <div className="border rounded-md gap-0 divide-x">
      <Button onClick={onCopyClick} className="rounded-none bg-neutral-900 px-2" variant="secondary">
        <Copy className="w-5 h-5 text-foreground " />
      </Button>
      <Button onClick={onEditClick} className="rounded-none bg-neutral-900 px-2" variant="secondary">
        <EditPencil className="w-5 h-5 text-foreground" />
      </Button>
      <Button onClick={onDownloadClick} className="rounded-none bg-neutral-900 px-2" variant="secondary">
        <Download className="w-5 h-5 text-foreground" />
      </Button>
    </div>
  )
}

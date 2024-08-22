import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '@harnessio/canary'
import { EditPencil, Copy, Download } from '@harnessio/icons-noir'

export interface PipelineStudioToolbarActionsProps {
  onCopyClick: () => void
  onEditClick: () => void
  onDownloadClick: () => void
}

export const PipelineStudioToolbarActions = (props: PipelineStudioToolbarActionsProps): JSX.Element => {
  const { onCopyClick, onEditClick, onDownloadClick } = props

  return (
    // TODO: we use "value=''" to make toggle group controlled and prevent button selection
    <ToggleGroup type="single" variant="compact" value="">
      <ToggleGroupItem value="copy" onClick={onCopyClick}>
        <Copy className="w-5 h-5 text-foreground " />
      </ToggleGroupItem>
      <ToggleGroupItem value="edit" onClick={onEditClick}>
        <EditPencil className="w-5 h-5 text-foreground" />
      </ToggleGroupItem>
      <ToggleGroupItem value="download" onClick={onDownloadClick}>
        <Download className="w-5 h-5 text-foreground" />
      </ToggleGroupItem>
    </ToggleGroup>

    // TODO: styling is same as for toggle group.
    // <div className="border rounded-md gap-0 divide-x">
    //   <Button onClick={onCopyClick} className="rounded-none bg-neutral-900 px-2" variant="secondary">
    //     <Copy className="w-5 h-5 text-foreground " />
    //   </Button>
    //   <Button onClick={onEditClick} className="rounded-none bg-neutral-900 px-2" variant="secondary">
    //     <EditPencil className="w-5 h-5 text-foreground" />
    //   </Button>
    //   <Button onClick={onDownloadClick} className="rounded-none bg-neutral-900 px-2" variant="secondary">
    //     <Download className="w-5 h-5 text-foreground" />
    //   </Button>
    // </div>
  )
}

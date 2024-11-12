import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '@harnessio/canary'
import { Copy, Download } from '@harnessio/icons-noir'

export interface PipelineStudioToolbarActionsProps {
  onCopyClick: () => void
  onDownloadClick: () => void
}

export const PipelineStudioToolbarActions = (props: PipelineStudioToolbarActionsProps): JSX.Element => {
  const { onCopyClick, onDownloadClick } = props

  return (
    // TODO: we use "value=''" to make toggle group controlled and prevent button selection
    <ToggleGroup type="single" variant="compact" value="">
      <ToggleGroupItem value="copy" onClick={onCopyClick}>
        <Copy className="w-5 h-5 text-foreground " />
      </ToggleGroupItem>
      <ToggleGroupItem value="download" onClick={onDownloadClick}>
        <Download className="w-5 h-5 text-foreground" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

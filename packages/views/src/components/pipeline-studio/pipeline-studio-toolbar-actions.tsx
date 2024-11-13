import React from 'react'
import { ToggleGroup, ToggleGroupItem, Icon } from '@harnessio/canary'
import { CopyButton } from '../copy-button'

export interface PipelineStudioToolbarActionsProps {
  onCopyClick: () => void
  onDownloadClick: () => void
  onEditClick: () => void
  copyContent: string
  showEdit?: boolean
}

export const PipelineStudioToolbarActions = (props: PipelineStudioToolbarActionsProps): JSX.Element => {
  const { onCopyClick, onDownloadClick, onEditClick, copyContent, showEdit } = props

  return (
    // TODO: we use "value=''" to make toggle group controlled and prevent button selection
    <ToggleGroup type="single" variant="compact" value="">
      <ToggleGroupItem value="copy" onClick={onCopyClick} title="Copy">
        <CopyButton name={copyContent} />
      </ToggleGroupItem>
      {showEdit && (
        <ToggleGroupItem value="edit" onClick={onEditClick} title="Edit">
          <Icon name="edit-pen" className="w-5 h-5 text-foreground" />
        </ToggleGroupItem>
      )}
      <ToggleGroupItem value="download" onClick={onDownloadClick} title="Download">
        <Icon name="download" className="w-5 h-5 text-foreground" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

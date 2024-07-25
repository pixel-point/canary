import { Button } from '@harnessio/canary'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import React from 'react'

export default {
  title: 'Screens/Widgets/CreatePipelineResourcesCard',
  parameters: {
    layout: 'fullscreen'
  }
}

export function CreatePipelineResourcesCard() {
  return (
    <div className="flex flex-col gap-2">
      <p className="section-title-small">Resources</p>
      <p className="section-description">Explore more about Gitness and it’s architecture in the documentation.</p>
      <Button variant="link" size="sm" className="self-start p-0 mt-1">
        Read documentation
        <ChevronRightIcon className="w-3 h-3" />
      </Button>
    </div>
  )
}

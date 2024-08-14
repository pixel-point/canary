import React, { useEffect, useState } from 'react'
import { noop } from 'lodash-es'
import { PipelineStudio, getNodesFromPipelineYaml, type Node } from '@harnessio/unified-pipeline'

import pipeline from '../assets/pipeline.yaml'

export default function PipelineEdit() {
  const [nodes, setNodes] = useState<Node[]>(getNodesFromPipelineYaml(pipeline))

  useEffect(() => {
    return () => {
      setNodes([])
    }
  }, [])

  return (
    <div>
      <p>Pipeline edit</p>
      <div style={{ width: '80vw', height: '80vh' }}>
        <PipelineStudio nodes={nodes} onAddNode={noop} onDeleteNode={noop} onSelectNode={noop} />
      </div>
    </div>
  )
}

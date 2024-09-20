import { useEffect, useState } from 'react'
import { parse } from 'yaml'
import { PipelineStudio, getNodesFromPipelineYaml, type Node } from '@harnessio/unified-pipeline'
import { usePipelineDataContext } from '../context/PipelineStudioDataProvider'
import { StepDrawer, usePipelineViewContext } from '../context/PipelineStudioViewProvider'

export const PipelineStudioGraphView = (): React.ReactElement => {
  const { yamlRevision, setEditStepIntention } = usePipelineDataContext()
  const { setStepDrawerOpen } = usePipelineViewContext()

  const [nodes, setNodes] = useState<Node[]>([])

  useEffect(() => {
    return () => {
      setNodes([])
    }
  }, [])

  useEffect(() => {
    const yamlJson = parse(yamlRevision.yaml)
    const nodes: Node[] = getNodesFromPipelineYaml(yamlJson)
    setNodes(nodes)
  }, [yamlRevision])

  return (
    <div className="flex h-full w-full">
      <PipelineStudio
        nodes={nodes}
        onAddNode={() => {}}
        onDeleteNode={() => {}}
        onSelectNode={node => {
          if (node.type === 'atomic') {
            setStepDrawerOpen(StepDrawer.Form)
            setEditStepIntention({ path: node.data.path })
          }
        }}
      />
    </div>
  )
}

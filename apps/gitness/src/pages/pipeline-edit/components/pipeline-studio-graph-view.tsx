import { useEffect, useState } from 'react'
import { PipelineStudio, getNodesFromPipelineYaml, type Node } from '@harnessio/unified-pipeline'
import { usePipelineDataContext } from '../context/PipelineStudioDataProvider'
import { parse } from 'yaml'

export const PipelineStudioGraphView = (): React.ReactElement => {
  const { yamlRevision } = usePipelineDataContext()
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

  console.log(nodes)
  return (
    <div className="flex h-full w-full">
      <PipelineStudio nodes={nodes} onAddNode={() => {}} onDeleteNode={() => {}} onSelectNode={() => {}} />
    </div>
  )
}

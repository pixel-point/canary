import React from 'react'
import { Text } from '@harnessio/canary'
import { StageExecution } from './stage-execution'
import { data as mockExecution } from './mocks/mockExecution'
import { Layout } from '../layout/layout'
import { ExecutionTree } from './execution-tree'
import { elements } from '../../assets/mockExecutionTree'

interface ExecutionProps {
  pipelineId: unknown
  executionId: unknown
}

export const ExecutionDetails: React.FC<ExecutionProps> = (): React.ReactElement => {
  const stages = mockExecution.stages
  if (!stages || !stages.length) return <Text>No stages found</Text>
  return (
    <Layout.Horizontal>
      {/* Hardcoded height added temporarily */}
      <div className="h-[calc(100vh-16rem)] overflow-y-scroll">
        <StageExecution stage={stages[0]} />
      </div>
      <div className="w-[450px] h-[calc(100vh-16rem)] overflow-y-scroll">
        <ExecutionTree defaultSelectedId="2" elements={elements} onSelectNode={() => {}} />
      </div>
    </Layout.Horizontal>
  )
}

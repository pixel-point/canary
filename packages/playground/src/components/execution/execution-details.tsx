import React from 'react'
import { Text } from '@harnessio/canary'
import { StageExecution } from './stage-execution'
import { data as mockExecution } from './mocks/mockExecution'

interface ExecutionProps {
  pipelineId: unknown
  executionId: unknown
}

export const ExecutionDetails: React.FC<ExecutionProps> = (_props): React.ReactElement => {
  const stages = mockExecution.stages
  if (!stages || !stages.length) return <Text>No stages found</Text>
  return <StageExecution stage={stages[0]} />
}

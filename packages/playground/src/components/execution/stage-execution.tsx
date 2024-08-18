import React from 'react'
import { StepExecution, StepProps } from './step-execution'
import { Text } from '@harnessio/canary'

export interface StageProps {
  name: string
  steps?: StepProps[]
}

interface StageExecutionProps {
  stage: StageProps
}

export const StageExecution: React.FC<StageExecutionProps> = ({ stage }): React.ReactElement => {
  const steps = stage.steps
  if (!steps || !steps.length) return <Text>No steps found</Text>
  return <StepExecution step={steps[0]} />
}

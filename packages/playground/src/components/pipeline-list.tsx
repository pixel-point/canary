import { Icon, StackedList, Meter } from '@harnessio/canary'
import React from 'react'
import { Link } from 'react-router-dom'
import { ExecutionState } from './execution/types'
import { ExecutionStatus } from './execution/execution-status'

export enum MeterState {
  Empty = 0,
  Error = 1,
  Warning = 2,
  Success = 3
}

interface Pipeline {
  id: string
  status: ExecutionState
  name: string
  sha: string
  description: string
  version: string
  timestamp: number
  meter?: {
    id: string
    state: MeterState
  }[]
}

interface PageProps {
  pipelines?: Pipeline[]
}

const Title = ({ status, title }: { status: ExecutionState; title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <ExecutionStatus.Icon status={status} />
      {title}
    </div>
  )
}

const Description = ({ sha, description, version }: { sha: string; description: string; version: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="ml-[24px] px-1.5 rounded-md flex gap-1 items-center bg-tertiary-background/10">
        <Icon size={11} name={'tube-sign'} />
        {sha?.slice(0, 7)}
      </div>
      <div>{description}</div>
      <div className="flex gap-1 items-center">
        <Icon size={11} name={'signpost'} />
        {version}
      </div>
    </div>
  )
}

export const PipelineList = ({ ...props }: PageProps) => {
  const { pipelines } = props

  return (
    <>
      {pipelines && pipelines.length > 0 && (
        <StackedList.Root>
          {pipelines.map((pipeline, pipeline_idx) => (
            <StackedList.Item key={pipeline.name} isLast={pipelines.length - 1 === pipeline_idx} asChild>
              <Link to={`${pipeline.id}`}>
                <StackedList.Field
                  title={<Title status={pipeline.status} title={pipeline.name} />}
                  description={
                    <Description sha={pipeline.sha} description={pipeline.description} version={pipeline.version} />
                  }
                />
                <StackedList.Field
                  label
                  secondary
                  title={pipeline.meter ? <Meter.Root data={pipeline.meter} /> : pipeline.timestamp}
                  right
                />
              </Link>
            </StackedList.Item>
          ))}
        </StackedList.Root>
      )}
      {!pipelines && (
        <></> // Handle loading/no items
      )}
    </>
  )
}

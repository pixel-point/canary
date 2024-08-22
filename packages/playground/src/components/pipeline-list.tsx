import { Icon, StackedList } from '@harnessio/canary'
import React from 'react'
import { Link } from 'react-router-dom'

interface Pipeline {
  id: string
  success: boolean
  name: string
  sha: string
  description: string
  version: string
  timestamp: string
}

interface PageProps {
  pipelines?: Pipeline[]
}

const Title = ({ success, title }: { success: boolean; title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <Icon size={16} name={success ? 'success' : 'fail'} />
      {title}
    </div>
  )
}

const Description = ({ sha, description, version }: { sha: string; description: string; version: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="ml-[24px] px-1.5 rounded-md flex gap-1 items-center bg-tertiary-background/10">
        <Icon size={11} name={'tube-sign'} />
        {sha}
      </div>
      <div>{description}</div>
      <div className="flex gap-1 items-center">
        <Icon size={11} name={'signpost'} />
        {version}
      </div>
    </div>
  )
}

export default function PipelineList({ ...props }: PageProps) {
  const { pipelines } = props

  return (
    <>
      {pipelines && pipelines.length > 0 && (
        <StackedList.Root>
          {pipelines.map((pipeline, pipeline_idx) => (
            <StackedList.Item key={pipeline.name} isLast={pipelines.length - 1 === pipeline_idx} asChild>
              <Link to={`${pipeline.id}`}>
                <StackedList.Field
                  title={<Title success={pipeline.success} title={pipeline.name} />}
                  description={
                    <Description sha={pipeline.sha} description={pipeline.description} version={pipeline.version} />
                  }
                />
                <StackedList.Field title={pipeline.timestamp} right label secondary />
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

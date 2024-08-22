import { Icon, StackedList, Text } from '@harnessio/canary'
import React from 'react'
import { Link } from 'react-router-dom'

interface Execution {
  id: string
  success: boolean
  name: string
  number: number
  sha?: string
  description: string
  version?: string
  timestamp: string
  lastTimestamp: string
}

interface PageProps {
  executions?: Execution[]
}

const Title = ({ success, title }: { success: boolean; title: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <Icon size={16} name={success ? 'success' : 'fail'} />
      <Text size={2} truncate>
        {title}
      </Text>
    </div>
  )
}

const Description = ({ sha, description, version }: { sha: string; description: string; version: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="ml-[25px]">{description}</div>
      <div className="px-1.5 rounded-md flex gap-1 items-center bg-tertiary-background/10">
        <Icon size={11} name={'tube-sign'} />
        {sha}
      </div>
      <div className="flex gap-1 items-center">
        <Icon size={11} name={'signpost'} />
        {version}
      </div>
    </div>
  )
}

export default function ExecutionList({ ...props }: PageProps) {
  const { executions } = props

  return (
    <>
      {executions && executions.length > 0 && (
        <StackedList.Root>
          {executions.map((execution, execution_idx) => (
            <StackedList.Item key={execution.name} isLast={executions.length - 1 === execution_idx} asChild>
              <Link to={`executions/${execution.id}`}>
                <StackedList.Field
                  title={<Title success={execution.success} title={execution.name} />}
                  description={
                    <Description
                      sha={execution.sha || ''}
                      description={execution.description}
                      version={execution.version || ''}
                    />
                  }
                />
                <StackedList.Field
                  title={execution.timestamp}
                  description={execution.lastTimestamp}
                  right
                  label
                  secondary
                />
              </Link>
            </StackedList.Item>
          ))}
        </StackedList.Root>
      )}
      {!executions && (
        <></> // Handle loading/no items
      )}
    </>
  )
}

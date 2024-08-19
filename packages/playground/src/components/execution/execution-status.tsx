import React from 'react'
import { CheckCircleSolid, Refresh, Xmark, XmarkCircleSolid } from '@harnessio/icons-noir'
import { formatDuration } from '../../utils/TimeUtils'

export enum ExecutionState {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILURE = 'failure',
  ERROR = 'error',
  SKIPPED = 'skipped',
  KILLED = 'killed'
}

interface ExecutionStatusProps {
  status: ExecutionState
}

interface BadgeProps {
  duration: number
  minimal?: boolean
}

const Badge: React.FC<ExecutionStatusProps & BadgeProps> = props => {
  const { status, duration, minimal } = props
  switch (status) {
    case ExecutionState.RUNNING:
      return minimal ? (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[rgba(226,155,54,1)] rounded-full" />
          <span className="text-white">Running</span>
        </div>
      ) : (
        <div className="flex gap-1 items-center border-solid border border-[rgba(226,155,54,1)]/[0.12] px-1 py-0.5 rounded-md bg-[rgba(226,155,54,1)]/[0.1]">
          <div className="flex gap-1 items-center">
            <Refresh color="rgba(226,155,54,1)" size="16" className="animate-spin" />
            <span className="text-[rgba(226,155,54,1)]">Running</span>
          </div>
          {duration && <span className="text-[rgba(226,155,54,1)]">{formatDuration(duration)}</span>}
        </div>
      )
    case ExecutionState.ERROR:
    case ExecutionState.FAILURE:
      return minimal ? (
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#ED5E5E] rounded-full" />
          <span className="text-[#ED5E5E]">Failed</span>
        </div>
      ) : (
        <div className="flex gap-1 items-center border-solid border border-[#F76E6E1F] pr-1 py-[2px] rounded-md bg-[#F76E6E1A]/[0.1]">
          <div className="flex gap-0.5 items-center">
            <Xmark color="#ED5E5E" size="20" />
            <span className="text-[#ED5E5E]">Failed</span>
          </div>
          {duration && <span className="text-[#ED5E5E]">{formatDuration(duration)}</span>}
        </div>
      )
    default:
      return <></>
  }
}

const Icon: React.FC<ExecutionStatusProps> = props => {
  const { status } = props
  switch (status) {
    case ExecutionState.FAILURE:
    case ExecutionState.ERROR:
      return <XmarkCircleSolid color="#ed5e5e" size="16px" className="mt-0.5" />
    case ExecutionState.SUCCESS:
      return <CheckCircleSolid color="#63E9A6" size="16px" className="mt-0.5" />
    case ExecutionState.RUNNING:
      return <Refresh color="rgba(226,155,54,1)" size="16" className="animate-spin" />
    default:
      return <></>
  }
}

export const ExecutionStatus = { Badge, Icon }
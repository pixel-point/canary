import React, { useState } from 'react'
// import { XmarkCircle, WarningTriangle, InfoCircle } from '@harnessio/icons-noir'

export enum Severity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export interface Problem<T = unknown> {
  severity: Severity
  message: string
  position: {
    row: number
    column: number
  }
  data?: T
}

const getProblemIcon = (severity: Severity): React.ReactElement => {
  switch (severity) {
    case Severity.ERROR:
      return <div className="text-[#f76e6e]">ERROR</div> //<XmarkCircle className="text-[#f76e6e]" />
    case Severity.WARNING:
      return <div className="text-[#E29B36]">WARNING</div> //<WarningTriangle className="text-[#E29B36]" />
    case Severity.INFO:
      return <div className="text-[#f76e6e]">INFO</div> //<InfoCircle />
  }
}

export interface ProblemsProps<T = unknown> {
  problems: Problem<T>[]
  onClick: (data: Problem<T>) => void
  /** Selected problem idx, for controlled mode*/
  selectedProblemIdx?: number
}

const ProblemsComponent = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return (
      <div className="text-[13px] text-[#c9c9cf] leading-[15px] min-h-12 bg-[#070709] overflow-scroll">{children}</div>
    )
  },

  Row: function Root({
    selected,
    onClick,
    children
  }: {
    selected: boolean
    onClick?: () => void
    children: React.ReactNode
  }) {
    const rowClasses = selected ? 'bg-gray-700 text-white' : ''
    return (
      <div
        onClick={onClick}
        className={`flex flex-1 items-center width-100 text-nowrap gap-2 py-[4px] cursor-pointer ${rowClasses}`}>
        {children}
      </div>
    )
  },

  Icon: function Root({ severity }: { severity: Severity }) {
    return <div className="pl-2">{getProblemIcon(severity)}</div>
  },

  Message: function Root({ message }: { message: string }) {
    return (
      <div className="flex overflow-hidden items-center">
        <span className="truncate">{message}</span>
      </div>
    )
  },

  Position: function Root({
    position
  }: {
    position: {
      row: number
      column: number
    }
  }) {
    return (
      <div className="text-nowrap pr-2 text-[#93939f]">
        [{position.row}, {position.column}]
      </div>
    )
  }
}

// TODO: remove hardcoded colors - implement proper variables from theme
const Problems = <T,>(props: ProblemsProps<T>): React.ReactElement => {
  const { problems, onClick, selectedProblemIdx } = props
  const [selectedLine, setSelectedLine] = useState<number | undefined>()

  return (
    <ProblemsComponent.Root>
      {/* TODO: don't use idx, compose id from problem data*/}
      {problems.map((problem, idx) => {
        const { message, position, severity } = problem
        const selected = (typeof selectedProblemIdx !== 'undefined' ? selectedProblemIdx : selectedLine) === idx

        return (
          <ProblemsComponent.Row
            selected={selected}
            onClick={() => {
              if (typeof selectedProblemIdx === 'undefined') {
                setSelectedLine(idx)
              }
              onClick(problem)
            }}>
            <ProblemsComponent.Icon severity={severity} />
            <ProblemsComponent.Message message={message} />
            <ProblemsComponent.Position position={position} />
          </ProblemsComponent.Row>
        )
      })}
    </ProblemsComponent.Root>
  )
}

export { Problems }

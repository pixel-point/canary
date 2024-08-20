import React from 'react'
import moment from 'moment'
import { XmarkCircle, WarningTriangle, InfoCircle } from '@harnessio/icons-noir'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@harnessio/canary'

interface FooterProps {
  problems: {
    error: number
    warning: number
    info: number
  }
  commitHistory: {
    lastCommittedAt: number
    lastCommittedBy: string
  }
  togglePane?: () => void
}

const FooterBar: React.FC<FooterProps> = (props: FooterProps) => {
  const lastCommittedAt = props.commitHistory.lastCommittedAt
  const lastCommittedBy = props.commitHistory.lastCommittedBy
  return (
    <footer
      className={
        'flex items-center justify-between font-normal leading-[15px] px-4 h-10 bg-grey-6 shrink-0 border border-solid text-grey-60 not-italic border-[#1d1d20] text-[12px]'
      }>
      <div className="flex items-center">
        <div
          onClick={() => {
            props.togglePane?.()
          }}
          className="flex cursor-pointer hover:bg-white/20 h-10 px-2">
          <div className="flex items-center">
            <XmarkCircle />
            &nbsp;
            <span className="text-white">{props.problems.error}</span>
          </div>
          <div className={'flex items-center mx-2.5'}>
            <WarningTriangle />
            &nbsp;
            <span className="text-white">{props.problems.warning}</span>
          </div>
          <div className="flex items-center">
            <InfoCircle />
            &nbsp;
            <span className="text-white">{props.problems.info}</span>
          </div>
        </div>
        <div className={'flex ml-2'}>
          <div className="flex items-baseline">
            <span>Repository:</span>
            <Select defaultValue="harness-next">
              <SelectTrigger className="w-fit border-none px-1 text-white text-xs focus:ring-[0px]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="harness-next">harness-next</SelectItem>
                <SelectItem value="canary">canary</SelectItem>
                <SelectItem value="devops">devops</SelectItem>
                <SelectItem value="unscripted">unscripted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={'flex items-baseline ml-2.5'}>
            <span>Branch:</span>
            <Select defaultValue="main">
              <SelectTrigger className="w-fit border-none px-1 text-white text-xs focus:ring-[0px]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">main</SelectItem>
                <SelectItem value="develop">develop</SelectItem>
                <SelectItem value="release">release</SelectItem>
                <SelectItem value="feature">feature</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {lastCommittedAt && lastCommittedBy && (
        <div className="flex">
          Last edited
          <span className="text-white">&nbsp;{moment(lastCommittedAt).fromNow()}&nbsp;</span>ago by
          <span className="text-white">&nbsp;{lastCommittedBy}&nbsp;</span>
        </div>
      )}
    </footer>
  )
}

export { FooterBar }

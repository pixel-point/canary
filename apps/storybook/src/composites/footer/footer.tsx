import React from 'react'
import moment from 'moment'
import cx from 'classnames'
import { XmarkCircle, WarningTriangle, InfoCircle } from '@harnessio/icons-noir'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@harnessio/canary'

import css from './footer.module.scss'

export enum Severity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

interface FooterProps {
  problems: {
    [Severity.ERROR]: number
    [Severity.WARNING]: number
    [Severity.INFO]: number
  }
  commitHistory: {
    lastCommittedAt: number
    lastCommittedBy: string
  }
}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  const lastCommittedAt = props.commitHistory.lastCommittedAt
  const lastCommittedBy = props.commitHistory.lastCommittedBy
  return (
    <footer className={css.main}>
      <div className={css.flexCenter}>
        <div className={css.counts}>
          <div className={css.flexCenter}>
            <XmarkCircle />
            &nbsp;
            <span className={css.focus}>{props.problems[Severity.ERROR]}</span>
          </div>
          <div className={cx(css.flexCenter, css.spacing)}>
            <WarningTriangle />
            &nbsp;
            <span className={css.focus}>{props.problems[Severity.WARNING]}</span>
          </div>
          <div className={css.flexCenter}>
            <InfoCircle />
            &nbsp;
            <span className={css.focus}>{props.problems[Severity.INFO]}</span>
          </div>
        </div>
        <div className={cx(css.gitDetails, css.marginLeft25)}>
          <div className={css.flexBaseline}>
            <span>Repository:</span>
            <Select defaultValue="harness-next">
              <SelectTrigger className="w-fit border-none px-1 text-white text-xs">
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
          <div className={cx(css.flexBaseline, css.marginLeft10)}>
            <span>Branch:</span>
            <Select defaultValue="main">
              <SelectTrigger className="w-fit border-none px-1 text-white text-xs">
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
        <div className={css.commitHistory}>
          Last edited
          <span className={css.focus}>&nbsp;{moment(lastCommittedAt).fromNow()}&nbsp;</span>ago by
          <span className={css.focus}>&nbsp;{lastCommittedBy}&nbsp;</span>
        </div>
      )}
    </footer>
  )
}

export { Footer }

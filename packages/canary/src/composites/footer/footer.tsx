import React from 'react'
import moment from 'moment'

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
      <div className={css.flexContainer}>
        <div className={css.counts}>
          <div>
            <span className={css.focus}>{props.problems[Severity.ERROR]}</span>
          </div>
          <div>
            <span className={css.focus}>{props.problems[Severity.WARNING]}</span>
          </div>
          <div>
            <span className={css.focus}>{props.problems[Severity.INFO]}</span>
          </div>
        </div>
        <div className={css.gitDetails}>
          <span>Repository:</span>
          <span>Branch:</span>
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

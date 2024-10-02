export interface LivelogLine {
  out?: string
  pos?: number
  time?: number
}

export enum ExecutionState {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILURE = 'failure',
  ERROR = 'error',
  SKIPPED = 'skipped',
  KILLED = 'killed',
  WAITING_ON_DEPENDENCIES = 'waiting_on_dependencies'
}

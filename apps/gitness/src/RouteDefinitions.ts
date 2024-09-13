export type PathParams = {
  spaceId: string
  repoId?: string
  pipelineId?: string
  executionId?: string
  pullRequestId?: string
}

export const PathProps = {
  spaceId: ':spaceId*',
  repoId: ':repoId',
  pipelineId: ':pipelineId',
  executionId: ':executionId',
  pullRequestId: ':pullRequestId'
}

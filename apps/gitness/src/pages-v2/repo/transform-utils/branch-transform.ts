import {
  ListBranchesOkResponse,
  TypesBranchExtended,
  TypesCommitDivergence,
  TypesPullReq
} from '@harnessio/code-service-client'
import { BranchData } from '@harnessio/ui/views'

import { timeAgoFromISOTime } from '../../../pages/pipeline-edit/utils/time-utils'

export const transformBranchList = (
  branches: TypesBranchExtended[],
  defaultBranch?: string,
  divergence?: TypesCommitDivergence[],
  pullRequests?: TypesPullReq[]
): BranchData[] => {
  return branches.map((branch, index) => {
    const { ahead, behind } = divergence?.[index] || {}
    return {
      id: index,
      name: branch.name || '',
      sha: branch.commit?.sha || '',
      timestamp: branch.commit?.committer?.when ? timeAgoFromISOTime(branch.commit.committer.when) : '',
      default: branch.name === defaultBranch || branch.is_default || false,
      user: {
        name: branch.commit?.committer?.identity?.name || '',
        avatarUrl: ''
      },
      behindAhead: {
        behind: behind || 0,
        ahead: ahead || 0,
        default: defaultBranch === branch.name || branch.is_default || false
      },
      pullRequests: pullRequests?.filter((pr: TypesPullReq) => pr?.source_branch === branch.name) || []
    }
  })
}

export function apiBranches2BranchNames(apiBranches?: ListBranchesOkResponse) {
  return apiBranches?.map(apiBranch => apiBranch.name ?? '')
}

export function apiBranches2DefaultBranchName(apiBranches?: ListBranchesOkResponse, defaultBranch = 'main') {
  return apiBranches?.find(apiBranch => apiBranch.is_default)?.name ?? defaultBranch
}

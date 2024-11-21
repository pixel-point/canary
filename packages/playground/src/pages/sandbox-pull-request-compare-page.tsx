import { noop } from 'lodash-es'

import { mockBranchList } from '../data/mockBranchList'
import { mockCommitData } from '../data/mockCommitData'
import { mockDiffData } from '../data/mockDiffData'
import { SandboxPullRequestCompare } from '../layouts/SandboxPullRequestCompareLayout'

const SandboxPullRequestComparePage = () => {
  return (
    <>
      <SandboxPullRequestCompare
        diffStats={{ commits: 3, files_changed: 2, additions: 2, deletions: 0 }}
        diffData={mockDiffData}
        branchList={mockBranchList}
        mergeability
        apiError=""
        sourceBranch="main"
        targetBranch="main"
        isLoading={false}
        isSuccess={false}
        onFormCancel={noop}
        onFormSubmit={noop}
        onFormDraftSubmit={noop}
        selectSourceBranch={noop}
        selectTargetBranch={noop}
        commitData={mockCommitData}
        isBranchSelected={true}
        setIsBranchSelected={noop}
      />
    </>
  )
}

export default SandboxPullRequestComparePage

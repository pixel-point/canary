import React, { useMemo } from 'react'
import {
  Accordion,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  StackedList,
  Text
} from '@harnessio/canary'
import {
  MergeCheckStatus,
  PullRequestState,
  TypesPullReq,
  TypeCheckData,
  EnumCheckStatus,
  PullRequestChangesSectionProps,
  PullRequestAction
} from './interfaces'
import PullRequestCheckSection from './sections/pull-request-check-section'
import PullRequestCommentSection from './sections/pull-request-comment-section'
import PullRequestChangesSection from './sections/pull-request-changes-section'
import PullRequestMergeSection from './sections/pull-request-merge-section'

interface PullRequestPanelProps extends PullRequestChangesSectionProps {
  pullReqMetadata: TypesPullReq
  conflictingFiles?: string[]
  PRStateLoading: boolean
  checks?: TypeCheckData[]
  ruleViolation?: boolean //TODO: fix type
  checksInfo: { header: string; content: string; status: EnumCheckStatus }
  commentsInfo: { header: string; content?: string | undefined; status: string }
  actions: PullRequestAction[]
}

interface HeaderProps {
  isDraft?: boolean
  isClosed: boolean
  unchecked: boolean
  mergeable: boolean
  isOpen: boolean
  ruleViolation?: boolean
}

const HeaderTitle = ({ ...props }: HeaderProps) => {
  return (
    <div className="inline-flex gap-2 items-center">
      <Text weight="medium">
        {props.isDraft
          ? 'This pull request is still a work in progress'
          : props.isClosed
            ? 'This pull request is closed'
            : props.unchecked
              ? 'Checking for ability to merge automatically...'
              : props.mergeable === false && props.isOpen
                ? 'Cannot merge pull request'
                : props.ruleViolation
                  ? 'Cannot merge pull request'
                  : `Pull request can be merged`}
      </Text>
    </div>
  )
}

const PullRequestPanel = ({
  pullReqMetadata,
  // PRStateLoading,
  checks,
  changesInfo,
  checksInfo,
  commentsInfo,
  ruleViolation,
  minApproval,
  minReqLatestApproval,
  approvedEvaluations,
  changeReqEvaluations,
  codeOwners,
  latestApprovalArr,
  reqNoChangeReq,
  changeReqReviewer,
  reqCodeOwnerApproval,
  reqCodeOwnerLatestApproval,
  codeOwnerChangeReqEntries,
  codeOwnerPendingEntries,
  codeOwnerApprovalEntries,
  latestCodeOwnerApprovalArr,
  conflictingFiles,
  actions
}: PullRequestPanelProps) => {
  const mergeable = useMemo(() => pullReqMetadata.merge_check_status === MergeCheckStatus.MERGEABLE, [pullReqMetadata])
  const isClosed = pullReqMetadata.state === PullRequestState.CLOSED
  const isOpen = pullReqMetadata.state === PullRequestState.OPEN
  //   const isConflict = pullReqMetadata.merge_check_status === MergeCheckStatus.CONFLICT
  const isDraft = pullReqMetadata.is_draft
  const unchecked = useMemo(
    () => pullReqMetadata.merge_check_status === MergeCheckStatus.UNCHECKED && !isClosed,
    [pullReqMetadata, isClosed]
  )
  const checkData = checks || []

  return (
    <StackedList.Root>
      <StackedList.Item isHeader disableHover>
        <StackedList.Field
          title={
            <HeaderTitle
              isDraft={isDraft}
              isClosed={isClosed}
              unchecked={unchecked}
              mergeable={mergeable}
              isOpen={isOpen}
              ruleViolation={ruleViolation}
            />
          }
        />
        <StackedList.Field
          right
          title={
            <Button
              variant="split"
              size="xs_split"
              theme={
                mergeable && checksInfo.status === 'success'
                  ? 'success'
                  : checksInfo.status === 'pending' || checksInfo.status === 'running'
                    ? 'warning'
                    : 'error'
              }
              dropdown={
                <DropdownMenu>
                  <DropdownMenuTrigger insideSplitButton>
                    <Icon name="chevron-down" size={11} className="chevron-down" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="mt-1">
                    <DropdownMenuGroup>
                      {actions &&
                        actions.map((action, action_idx) => {
                          return <DropdownMenuItem key={action_idx}>{action.title}</DropdownMenuItem>
                        })}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              }>
              Squash and merge
            </Button>
          }
        />
      </StackedList.Item>
      <StackedList.Item disableHover className="py-0 hover:bg-transparent cursor-default">
        <Accordion type="multiple" className="w-full">
          {!pullReqMetadata.merged && (
            <PullRequestChangesSection
              changesInfo={changesInfo}
              minApproval={minApproval}
              minReqLatestApproval={minReqLatestApproval}
              approvedEvaluations={approvedEvaluations}
              changeReqEvaluations={changeReqEvaluations}
              codeOwners={codeOwners}
              latestApprovalArr={latestApprovalArr}
              reqNoChangeReq={reqNoChangeReq}
              changeReqReviewer={changeReqReviewer}
              codeOwnerChangeReqEntries={codeOwnerChangeReqEntries}
              reqCodeOwnerApproval={reqCodeOwnerApproval}
              reqCodeOwnerLatestApproval={reqCodeOwnerLatestApproval}
              codeOwnerPendingEntries={codeOwnerPendingEntries}
              codeOwnerApprovalEntries={codeOwnerApprovalEntries}
              latestCodeOwnerApprovalArr={latestCodeOwnerApprovalArr}
            />
          )}
          {!pullReqMetadata.merged && <PullRequestCommentSection commentsInfo={commentsInfo} />}
          <PullRequestCheckSection checkData={checkData} checksInfo={checksInfo} />

          {!pullReqMetadata.merged && (
            <PullRequestMergeSection
              unchecked={unchecked}
              mergeable={mergeable}
              pullReqMetadata={pullReqMetadata}
              conflictingFiles={conflictingFiles}
            />
          )}
        </Accordion>
      </StackedList.Item>
    </StackedList.Root>
  )
}

export default PullRequestPanel

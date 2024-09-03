import { CheckCircleSolid } from '@harnessio/icons-noir'
import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger, Icon, StackedList, Text } from '@harnessio/canary'
import { LineDescription, LineTitle } from '../pull-request-line-title'
import { isEmpty } from 'lodash-es'
import cx from 'classnames'
import {
  TypesCodeOwnerEvaluation,
  TypesCodeOwnerEvaluationEntry,
  TypesOwnerEvaluation,
  TypesPullReqReviewer,
  TypesUserGroupOwnerEvaluation
} from '../interfaces'

interface PullRequestChangesSectionProps {
  changesInfo: { header: string; content: string; status: string }
  minApproval?: number
  codeOwners?: TypesCodeOwnerEvaluation | null
  minReqLatestApproval?: number
  approvedEvaluations?: TypesPullReqReviewer[]
  changeReqEvaluations?: TypesPullReqReviewer[]
  latestApprovalArr?: TypesPullReqReviewer[]
  reqNoChangeReq?: boolean
  changeReqReviewer?: string
  codeOwnerChangeReqEntries?: (
    | {
        owner_evaluations: TypesOwnerEvaluation[]
        line_number?: number
        pattern?: string
        user_group_owner_evaluations?: TypesUserGroupOwnerEvaluation[] | null
      }
    | undefined
  )[]
  reqCodeOwnerApproval?: boolean
  reqCodeOwnerLatestApproval?: boolean
  codeOwnerPendingEntries?: TypesCodeOwnerEvaluationEntry[]
  codeOwnerApprovalEntries?: (
    | {
        owner_evaluations: TypesOwnerEvaluation[]
        line_number?: number
        pattern?: string
        user_group_owner_evaluations?: TypesUserGroupOwnerEvaluation[] | null
      }
    | undefined
  )[]
  latestCodeOwnerApprovalArr?: (
    | {
        entryEvaluation: TypesOwnerEvaluation[]
      }
    | undefined
  )[]
}

const PullRequestChangesSection = ({
  changesInfo,
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
  latestCodeOwnerApprovalArr
}: PullRequestChangesSectionProps) => {
  // TODO: consider when states change like refetchReviewers
  // refetchCodeOwners

  const getStatusIcon = (status: string) => {
    switch (status) {
      // TODO: fix icons to use from nucleo
      case 'pending':
        return <Icon name="pending-clock" className="text-warning" />
      case 'warning':
        return <Icon name="triangle-warning" className="text-tertiary-background" />
      case 'error':
        return <Icon name="triangle-warning" className="text-destructive" />
      default:
        return <Icon name="success" className="text-success" />
    }
  }
  function renderCodeOwnerStatus() {
    if (codeOwnerPendingEntries && codeOwnerPendingEntries?.length > 0 && reqCodeOwnerLatestApproval) {
      return (
        <div className="flex pl-2">
          <Icon name="circle" className="text-warning" />
          <Text className="mt-0.5 pl-2 text-xs">{'Waiting on code owner reviews of latest changes'}</Text>
        </div>
      )
    }

    if (codeOwnerPendingEntries && codeOwnerPendingEntries?.length > 0 && reqCodeOwnerApproval) {
      return (
        <div className="flex pl-2">
          <Icon name="circle" className="text-warning" />
          <Text className="mt-0.5 pl-2 text-xs">{`Changes are pending approval from code owners`}</Text>
        </div>
      )
    }

    if (
      codeOwnerPendingEntries &&
      codeOwnerApprovalEntries &&
      codeOwnerApprovalEntries?.length > 0 &&
      codeOwnerPendingEntries?.length > 0
    ) {
      return (
        <div className="flex pl-2">
          <Icon name="circle" className="text-tertiary-background" />
          <Text className="mt-0.5 pl-2 text-xs">{`Some changes were approved by code owners`}</Text>
        </div>
      )
    }
    if (latestCodeOwnerApprovalArr && latestCodeOwnerApprovalArr?.length > 0 && reqCodeOwnerLatestApproval) {
      return (
        <Text className="flex ml-2">
          <CheckCircleSolid className="text-success" />
          <Text className="mt-0.5 pl-2 text-xs">{`Latest changes were approved by code owners`}</Text>
        </Text>
      )
    }
    if (codeOwnerApprovalEntries && codeOwnerApprovalEntries?.length > 0 && reqCodeOwnerApproval) {
      return (
        <Text className="flex ml-2">
          <CheckCircleSolid className="text-success" />
          <Text className="mt-0.5 pl-2 text-xs">{`Changes were approved by code owners`}</Text>
        </Text>
      )
    }
    if (codeOwnerApprovalEntries && codeOwnerApprovalEntries?.length > 0) {
      if (
        reqCodeOwnerLatestApproval &&
        minReqLatestApproval &&
        latestCodeOwnerApprovalArr &&
        latestCodeOwnerApprovalArr.length < minReqLatestApproval
      ) {
        return (
          <div className="flex pl-2">
            <Icon name="pending-clock" className="text-warning" />
            <Text className="mt-0.5 pl-2 text-xs">{`Latest changes are pending approval from required reviewers`}</Text>
          </div>
        )
      }
      return (
        <div className="flex pl-2">
          <Icon name="circle" className="text-warning" />
          <Text className="mt-0.5 pl-2 text-xs">{`Changes were approved by code owners`}</Text>
        </div>
      )
    }

    return (
      <div className="flex pl-2">
        <Icon name="circle" className="text-tertiary-background" />

        <Text className="mt-0.5 pl-2 text-xs">{`No codeowner reviews`}</Text>
      </div>
    )
  }

  const viewBtn =
    (minApproval && minReqLatestApproval && minApproval > minReqLatestApproval) ||
    (!isEmpty(approvedEvaluations) && minReqLatestApproval === 0) ||
    (minApproval && minApproval > 0 && minReqLatestApproval === undefined) ||
    (minReqLatestApproval && minReqLatestApproval > 0) ||
    !isEmpty(changeReqEvaluations) ||
    !isEmpty(codeOwners) ||
    false

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className="text-left">
        <StackedList.Field
          title={<LineTitle text={changesInfo.header} icon={getStatusIcon(changesInfo.status)} />}
          description={<LineDescription text={changesInfo.content} />}
        />
        {viewBtn && <Text className="text-xs px-2 py-1.5">Show more</Text>}
      </AccordionTrigger>
      <AccordionContent>
        <div>
          {(minApproval && minReqLatestApproval && minApproval > minReqLatestApproval) ||
            (!isEmpty(approvedEvaluations) && minReqLatestApproval === 0) ||
            (minApproval && minApproval > 0 && minReqLatestApproval === undefined && (
              <div className="ml-4">
                <div className="flex pt-2 border-t mt-3 ml-2 items-center justify-between">
                  {approvedEvaluations && minApproval <= approvedEvaluations?.length ? (
                    <Text className="flex ml-2">
                      <CheckCircleSolid className="text-success" />
                      <Text className="mt-0.5 pl-2 text-xs">
                        {`Changes were approved by ${approvedEvaluations?.length} ${approvedEvaluations?.length === 1 ? 'reviewer' : 'reviewers'}`}
                      </Text>
                    </Text>
                  ) : (
                    <div className="flex ml-2">
                      <Icon name="circle" className="text-warning" />
                      <Text className="mt-0.5 pl-2 text-xs">{`${(approvedEvaluations && approvedEvaluations.length) || 0}/${minApproval} approvals completed`}</Text>
                    </div>
                  )}
                  <div className="border rounded-full bg-transparent">
                    <Text className="text-xs text-tertiary-background px-2 py-1.5">required</Text>
                  </div>
                </div>
              </div>
            ))}
          {minReqLatestApproval && minReqLatestApproval > 0 && (
            <div className="ml-4">
              <div className="flex pt-2 border-t mt-3 ml-2 items-center justify-between">
                {latestApprovalArr && minReqLatestApproval && minReqLatestApproval <= latestApprovalArr?.length ? (
                  <Text className="flex ml-2">
                    <CheckCircleSolid className="text-success" />
                    <Text className="mt-0.5 pl-2 text-xs">{`Latest changes were approved by ${latestApprovalArr?.length || minReqLatestApproval || 0} ${(latestApprovalArr?.length || minReqLatestApproval) === 1 ? 'reviewer' : 'reviewers'}`}</Text>
                  </Text>
                ) : (
                  <div className="flex ml-2">
                    <Icon name="circle" className="text-warning" />
                    <Text className="mt-0.5 pl-2 text-xs">
                      {`${latestApprovalArr?.length || minReqLatestApproval || 0} ${(latestApprovalArr?.length || minReqLatestApproval) === 1 ? 'approval' : 'approvals'} pending on latest changes`}
                    </Text>
                  </div>
                )}
                <div className="border rounded-full bg-transparent">
                  <Text className="text-xs text-tertiary-background px-2 py-1.5">required</Text>
                </div>
              </div>
            </div>
          )}
          {!isEmpty(changeReqEvaluations) && (
            <div className="ml-4">
              <div className="flex pt-2 border-t mt-3 ml-2 items-center justify-between">
                <Text className="flex ml-2">
                  <Icon
                    name="triangle-warning"
                    className={cx('', {
                      'text-destructive': reqNoChangeReq,
                      'text-tertiary-background': !reqNoChangeReq
                    })}
                  />
                  <Text className="mt-0.5 pl-2 text-xs">{`${changeReqReviewer} requested changes to the pull request`}</Text>
                </Text>
                {reqNoChangeReq && (
                  <div className="border rounded-full bg-transparent">
                    <Text className="text-xs text-tertiary-background px-2 py-1.5">required</Text>
                  </div>
                )}
              </div>
            </div>
          )}
          {!isEmpty(codeOwners) && !isEmpty(codeOwners.evaluation_entries) && (
            <div className="ml-4">
              <div className="flex pt-2 border-t mt-3 ml-2 items-center justify-between">
                {codeOwnerChangeReqEntries && codeOwnerChangeReqEntries?.length > 0 ? (
                  <Text>
                    <Icon
                      name="triangle-warning"
                      className={cx('', {
                        'text-destructive': reqCodeOwnerApproval || reqCodeOwnerLatestApproval,
                        'text-tertiary-background': !reqCodeOwnerApproval || !reqCodeOwnerLatestApproval
                      })}
                    />
                    <Text className="mt-0.5 pl-2 text-xs">{'Code owners requested changes to the pull request'}</Text>
                  </Text>
                ) : (
                  renderCodeOwnerStatus()
                )}
                {(reqCodeOwnerApproval || reqCodeOwnerLatestApproval) && (
                  <div className="border rounded-full bg-transparent">
                    <Text className="text-xs text-tertiary-background px-2 py-1.5">required</Text>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* TODO: add codeowners table */}
          {/* {codeOwners && !isEmpty(codeOwners?.evaluation_entries) && (
          <Container
            className={css.codeOwnerContainer}
            padding={{ top: 'small', bottom: 'small', left: 'xxxlarge', right: 'small' }}>
            <CodeOwnerSection data={codeOwners} pullReqMetadata={pullReqMetadata} repoMetadata={repoMetadata} />
          </Container>
        )} */}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default PullRequestChangesSection

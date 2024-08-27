import React, { useState } from 'react'
import { Text } from '@harnessio/canary'
import cx from 'classnames'

import { isEmpty } from 'lodash-es'
import {
  NavArrowUp,
  NavArrowDown,
  WarningTriangleSolid,
  CheckCircleSolid,
  Clock,
  ChatBubble
} from '@harnessio/icons-noir'
import { EnumCheckStatus, TypeCheckData } from '../interfaces'
import { timeDistance } from '../utils'
import { ExecutionState } from '../../execution/types'

interface PullRequestMergeSectionProps {
  checkData: TypeCheckData[]
  checksInfo: { header: string; content: string; status: EnumCheckStatus }
}
const PullRequestCheckSection = ({ checkData, checksInfo }: PullRequestMergeSectionProps) => {
  const [isExpanded, setExpanded] = useState(false)

  const getStatusIcon = (status: EnumCheckStatus) => {
    switch (status) {
      case ExecutionState.PENDING:
        return <Clock className="mt-1" />
      case ExecutionState.RUNNING:
        return <ChatBubble className="text-warning mt-1" />
      case ExecutionState.FAILURE:
      case ExecutionState.ERROR:
        return <WarningTriangleSolid className="text-destructive mt-1" />
      default:
        return <CheckCircleSolid className="text-success mt-1" />
    }
  }

  return (
    !isEmpty(checkData) && (
      <div className={cx('pt-4 border-b', { 'pb-4': !isExpanded, '!pb-1': isExpanded })}>
        <div className="flex justify-between">
          <div className="flex">
            {getStatusIcon(checksInfo.status)}
            <div className="pl-4 flex flex-col">
              <Text size={2}>{checksInfo.header}</Text>
              <Text className="text-tertiary-background" size={1}>
                {checksInfo.content}
              </Text>
            </div>
          </div>
          <button
            // className={cx('mr-3')}
            onClick={() => {
              setExpanded(!isExpanded)
            }}>
            {isExpanded ? 'Show less' : 'Show more'}
            {isExpanded ? <NavArrowUp className="pt-1" /> : <NavArrowDown className="pt-1" />}
          </button>
        </div>

        {isExpanded ? (
          <div className="flex flex-col pl-4 mx-4 pt-2">
            {checkData.map(check => {
              const time = timeDistance(check.check.created, check.check.updated)
              return (
                <div className="flex justify-between py-2 border-t">
                  <div className="flex">
                    {getStatusIcon(check.check.status as EnumCheckStatus)}

                    <div className="truncate min-w-[200px] max-w-[200px] pl-3 pt-0.5"> {check.check.identifier}</div>
                    <div className="truncate max-w-[200px] pl-3 pt-0.5">
                      {check.check.status === ExecutionState.SUCCESS
                        ? `Succeeded in ${time}`
                        : check.check.status === ExecutionState.FAILURE
                          ? `Failed in ${time}`
                          : check.check.status === ExecutionState.RUNNING
                            ? 'Running...'
                            : check.check.status === ExecutionState.PENDING
                              ? 'Pending...'
                              : `Errored in ${time}`}
                    </div>
                  </div>
                  <div className="grid grid-cols-[84px_auto] items-center">
                    <div className="col-span-1">
                      {/* TODO: figure out how to do link in this? */}
                      {/* <Link
        className="text-blue-500 mx-2"
        to={
          routes.toCODEPullRequest({
            repoPath: repoMetadata.path as string,
            pullRequestId: String(pullReqMetadata.number),
            pullRequestSection: PullRequestSection.CHECKS
          }) + `?uid=${check.check.identifier}`
        }
      ></Link> */}
                      {check.check.status !== ExecutionState.PENDING && (
                        <Text weight="medium" size={1}>
                          Details
                        </Text>
                      )}
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {check.required ? (
                        <div className="border rounded-full bg-transparent">
                          <Text className="text-xs text-tertiary-background px-2 py-1.5">required</Text>
                        </div>
                      ) : (
                        <div className="min-w-[70px]"></div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    )
  )
}

export default PullRequestCheckSection

import React, { useMemo, useState } from 'react'
import cx from 'classnames'
import { SplitButton, Text } from '@harnessio/canary'
import { MergeCheckStatus, PullRequestState, TypesPullReq } from './interfaces'
import { isEmpty } from 'lodash-es'
import { NavArrowUp, NavArrowDown, WarningTriangleSolid, CheckCircleSolid, Clock } from '@harnessio/icons-noir'
import { mockChangesData } from './mocks/mockChangesData'
interface PullRequestPanelProps {
  pullReqMetadata: TypesPullReq
  PRStateLoading: boolean
  checks?: []
}

const PullRequestPanel = ({ pullReqMetadata, PRStateLoading, checks }: PullRequestPanelProps) => {
  const [isExpanded, setExpanded] = useState(false)

  const mergeable = useMemo(() => pullReqMetadata.merge_check_status === MergeCheckStatus.MERGEABLE, [pullReqMetadata])
  const isClosed = pullReqMetadata.state === PullRequestState.CLOSED
  const isOpen = pullReqMetadata.state === PullRequestState.OPEN
  //   const isConflict = pullReqMetadata.merge_check_status === MergeCheckStatus.CONFLICT
  const isDraft = pullReqMetadata.is_draft
  const unchecked = useMemo(
    () => pullReqMetadata.merge_check_status === MergeCheckStatus.UNCHECKED && !isClosed,
    [pullReqMetadata, isClosed]
  )
  const ruleViolation = false
  const checkData = checks || []
  const changesData = mockChangesData
  return (
    <div className=" border mt-1 border-border rounded-md">
      <div className="flex flex-col">
        <div
          className={cx('py-2 px-5 border-b w-full flex items-center justify-between  rounded-tl-md rounded-tr-md ', {
            'bg-gradient-to-r from-[#182c23] to-grey-12 bg-opacity-45': !PRStateLoading,
            '!bg-gradient-to-r !from-[#2a1717] !to-grey-12 !bg-opacity-45':
              ruleViolation || (mergeable === false && !unchecked && !isClosed && !isDraft)
            //   TODO: add the other states like checking mergeability, pr closed, pr draft, pr merged
          })}>
          <Text weight="medium" size={3}>
            {isDraft
              ? 'This pull request is still a work in progress'
              : isClosed
                ? 'This pull request is closed'
                : unchecked
                  ? 'Checking for ability to merge automatically...'
                  : mergeable === false && isOpen
                    ? 'Cannot merge pull request'
                    : ruleViolation
                      ? 'Cannot merge pull request'
                      : `Pull request can be merged`}
          </Text>
          {/* TODO: Add other states in button and think of way to incorporate drymerge callback? */}
          {/* TODO: handle drymerge */}
          <SplitButton variant="outline">Squash and merge</SplitButton>
        </div>
        <div className="px-5">
          {/* TODO: create new components for each new section  */}
          {!pullReqMetadata.merged && (
            <div className="py-4  border-b">
              <div className="flex justify-between">
                <div className="flex ">
                  <CheckCircleSolid className="text-success mt-1 " />
                  <div className="pl-4 flex flex-col">
                    <Text size={2}>{changesData.header}</Text>
                    <Text className="text-tertiary-background" size={1}>
                      {changesData.content}
                    </Text>
                  </div>
                </div>
              </div>
              {/* TODO: add expanded section and show more/less button */}
            </div>
          )}
          {/* {!pullReqMetadata.merged && <div className=" py-4  border-b">comments section</div>} */}
          {!isEmpty(checkData) && <div className=" py-4  border-b">checks section</div>}
          {!pullReqMetadata.merged && (
            <div className="py-4  ">
              <div className="flex justify-between">
                <div className="flex ">
                  {unchecked ? (
                    // TODO: update icon for unchecked status
                    <Clock className="text-warning mt-1 " />
                  ) : (
                    <>
                      {mergeable ? (
                        <CheckCircleSolid className="text-success mt-1" />
                      ) : (
                        <WarningTriangleSolid className="text-destructive mt-1 " />
                      )}
                    </>
                  )}

                  {unchecked ? (
                    <div className="pl-4">
                      <p className="pb-1 text-white">Merge check in progress...</p>
                      <p className="text-grey-60">Checking for ability to merge automatically...</p>
                    </div>
                  ) : (
                    <div>
                      {!mergeable && <p className="pl-4 pb-1 text-white">Conflicts found in this branch</p>}
                      <p className={`pl-4 ${mergeable ? 'text-white' : 'text-grey-60'}`}>
                        {mergeable ? (
                          //   getString('prHasNoConflicts')
                          <> {`This branch has no conflicts with ${pullReqMetadata.target_branch} branch`}</>
                        ) : (
                          <>
                            Use the{' '}
                            <span
                              onClick={() => {
                                // TODO:add commandline information modal
                                // toggleShowCommandLineInfo(!showCommandLineInfo)
                              }}
                              className="pl-1 pr-1 text-blue-500 cursor-pointer">
                              {/* {getString('commandLine')} */}
                              command line
                            </span>{' '}
                            to resolve conflicts
                            {/* {getString('pr.useCmdLineToResolveConflicts')} */}
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>
                {!mergeable && (
                  <button
                    // className={cx('text-blue-500 p-0')}
                    onClick={() => {
                      setExpanded(!isExpanded)
                    }}>
                    {isExpanded ? 'Show less' : 'Show more'}
                    {isExpanded ? <NavArrowUp className="pt-1" /> : <NavArrowDown className="pt-1" />}
                  </button>
                )}
              </div>
            </div>
            // TODO: add table to show conflicting files
          )}
        </div>
      </div>
    </div>
  )
}

export default PullRequestPanel

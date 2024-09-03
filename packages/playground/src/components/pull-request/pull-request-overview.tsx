import React, { useMemo } from 'react'
import { Icon } from '@harnessio/canary'
import { CommentItem, TypesPullReq, TypesPullReqActivity } from './interfaces'
import { isSystemComment } from './utils'
import PullRequestTimelineItem from './pull-request-timeline-item'
import PullRequestSystemComments from './pull-request-system-comments'

interface PullRequestOverviewProps {
  data: CommentItem<TypesPullReqActivity>[][]
  pullReqMetadata: TypesPullReq
}

const PullRequestOverview: React.FC<PullRequestOverviewProps> = ({ data, pullReqMetadata }) => {
  const renderedActivityBlocks = useMemo(() => {
    return (
      <div className="flex flex-col">
        <div>
          {data?.map((commentItems, index) => {
            if (isSystemComment(commentItems)) {
              return (
                <PullRequestSystemComments
                  commentItems={commentItems}
                  isLast={data.length - 1 === index}
                  pullReqMetadata={pullReqMetadata}
                />
              )
            } else {
              return (
                <PullRequestTimelineItem
                  key={index} // Consider using a unique ID if available
                  header={[
                    {
                      avatar: (
                        <>
                          <div className='h-6 w-6 rounded-full bg-tertiary-background bg-[url("../images/user-avatar.svg")] bg-cover'></div>
                        </>
                      ),
                      name: commentItems[0]?.payload?.author?.display_name,
                      // TODO: fix comment to tell between comment or code comment?
                      description: `commented 3 hours ago `
                    }
                  ]}
                  content={commentItems[0]?.payload?.text as string}
                  icon={<Icon name="chaos-engineering" size={14} />}
                  isLast={data.length - 1 === index}
                />
              )
            }
          })}
        </div>
      </div>
    ) // [activityBlocks, currentUser, pullReqMetadata, activities]
  }, [data])

  return <div>{renderedActivityBlocks}</div>
}

export default PullRequestOverview

import React from 'react'
import PullRequestTimelineItem from './pull-request-timeline-item'
import { Avatar, AvatarFallback, Icon, Text } from '@harnessio/canary'
import { getInitials } from '../../utils/utils'
import { GeneralPayload, LabelActivity, PayloadAuthor, TypesPullReqActivity } from './interfaces'

interface PullRequestSystemLabelItemProps {
  payload?: TypesPullReqActivity | undefined
  isLast: boolean
  avatarUrl: string
}
const PullRequestSystemLabelItem: React.FC<PullRequestSystemLabelItemProps> = ({ payload, isLast }) => {
  return (
    <PullRequestTimelineItem
      key={payload?.id} // Consider using a unique ID if available
      header={[
        {
          avatar: (
            <Avatar className="w-6 h-6 rounded-full p-0">
              {/* <AvatarImage src={avatarUrl} /> */}

              <AvatarFallback>
                <Text size={1} color="tertiaryBackground">
                  {/* TODO: fix fallback string */}
                  {getInitials(payload?.author?.display_name || '')}
                </Text>
              </AvatarFallback>
            </Avatar>
          ),
          name: (payload?.payload?.author as PayloadAuthor)?.display_name,
          description: (
            <Text color="tertiaryBackground">
              {((payload?.payload?.payload as GeneralPayload)?.type as LabelActivity) === 'assign' ? (
                <>applied</>
              ) : (
                <>
                  {((payload?.payload?.payload as GeneralPayload)?.type as LabelActivity) === 'reassign'
                    ? 'reassigned'
                    : 'removed'}
                </>
              )}{' '}
              label
            </Text>
          )
        }
      ]}
      icon={<Icon name="edit-pen" size={14} className="p-0.5" />}
      isLast={isLast}
    />
  )
}

export default PullRequestSystemLabelItem

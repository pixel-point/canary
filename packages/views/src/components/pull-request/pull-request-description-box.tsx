import PullRequestTimelineItem from './pull-request-timeline-item'
import { Avatar, AvatarFallback, Icon, Text } from '@harnessio/canary'
import { MarkdownViewer } from '../markdown-viewer'
import { getInitials, timeAgo } from '../../utils/utils'

interface PullRequestDescBoxProps {
  isLast: boolean
  author?: string
  prNum?: string
  createdAt?: number
  description?: string
}

const PullRequestDescBox: React.FC<PullRequestDescBoxProps> = ({ isLast, author, prNum, createdAt, description }) => {
  // Format the parsed date as relative time from now
  const formattedTime = timeAgo(createdAt || 0)
  return (
    <PullRequestTimelineItem
      icon={<Icon name="pr-open" size={12} />}
      isLast={isLast}
      header={[
        {
          avatar: (
            <Avatar size="6">
              {/* <AvatarImage src={AvatarUrl} /> */}
              <AvatarFallback>
                <Text size={0} color="tertiaryBackground">
                  {getInitials(author || '')}
                </Text>
              </AvatarFallback>
            </Avatar>
          ),
          name: author,
          // TODO: make pr num clickable?
          description: (
            <Text size={2} className="gap-x-2" color="tertiaryBackground">
              {`created pull request`}
              <Text size={2} className="pl-1">
                {`${prNum} `}
              </Text>
              {formattedTime}
            </Text>
          )
        }
      ]}
      hideReply
      contentClassName="pb-0"
      content={
        description && (
          <div className="flex px-4 py-4">
            <Text size={2} color="primary">
              {description && <MarkdownViewer source={description} />}
            </Text>
          </div>
        )
      }
      key={`description`}
    />
  )
}

export default PullRequestDescBox

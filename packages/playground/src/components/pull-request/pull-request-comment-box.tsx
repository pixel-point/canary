import React, { useState } from 'react'
import { Avatar, AvatarFallback, Text, Button, Textarea, AvatarImage } from '@harnessio/canary'
import { getInitials } from '../../utils/utils'
import AvatarUrl from '../../../public/images/user-avatar.svg'
interface PullRequestCommentBoxProps {
  onSaveComment: (comment: string) => void
  currentUser?: string
}

//  TODO: will have to eventually implement a commenting and reply system similiar to gitness

const PullRequestCommentBox: React.FC<PullRequestCommentBoxProps> = ({ onSaveComment, currentUser }) => {
  const [comment, setComment] = useState('')

  const handleSaveComment = () => {
    if (comment.trim()) {
      onSaveComment(comment)
      setComment('') // Clear the comment box after saving
    }
  }

  return (
    <div className="flex gap-x-2">
      <Avatar size="6">
        <AvatarImage src={AvatarUrl} />
        <AvatarFallback>
          <Text size={0} color="tertiaryBackground">
            {getInitials(currentUser || '')}
          </Text>
        </AvatarFallback>
      </Avatar>
      <div className="px-2 w-full rounded-md pb-3 border ">
        <Textarea
          value={comment}
          className="border-transparent shadow focus-visible:ring-transparent hover:border-transparent w-full focus:outline-none"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) => setComment(e.target.value)}
          placeholder="Add your comment here"
        />
        <div className="w-full relative">
          <Button variant={'default'} className="float-right" onClick={handleSaveComment} disabled={!comment.trim()}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  )
}

export { PullRequestCommentBox }

import React from 'react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  Button,
  Icon,
  Spacer
} from '@harnessio/canary'

interface MemberProps {
  display_name?: string
}
interface FormDeleteMemberDialogProps {
  member: MemberProps
  onClose: () => void
  onDelete: () => void
  isDeleting: boolean
  deleteSuccess: boolean
}

export const FormDeleteMemberDialog: React.FC<FormDeleteMemberDialogProps> = ({
  member,
  onClose,
  onDelete,
  isDeleting,
  deleteSuccess
}) => {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure to remove {member.display_name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove {member.display_name} in the project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Spacer size={3} />
        <AlertDialogFooter>
          {!isDeleting && !deleteSuccess && <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>}
          {deleteSuccess ? (
            <Button size="default" theme="success" className="self-start pointer-events-none">
              Member removed&nbsp;&nbsp;
              <Icon name="tick" size={14} />
            </Button>
          ) : (
            <Button size="default" theme="error" className="self-start" onClick={onDelete} disabled={isDeleting}>
              {isDeleting ? 'Removing member...' : 'Yes, remove member'}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

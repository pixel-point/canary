import React from 'react'

import {
  Spacer,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  Button,
  Icon
} from '@harnessio/canary'

interface UsersProps {
  uid: string
  display_name?: string // Add a default value of undefined
}

interface FormResetPasswordrDialogProps {
  user: UsersProps
  onClose: () => void
  onDelete: () => void
  isDeleting: boolean
  deleteSuccess: boolean
}

//Form Delete Member Dialog
export const FormDeleteUserDialog: React.FC<FormResetPasswordrDialogProps> = ({
  user,
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
          <AlertDialogTitle>Are you absolutely sure to remove {user.display_name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove {user.display_name} in the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Spacer size={3} />
        <AlertDialogFooter>
          {!isDeleting && !deleteSuccess && <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>}
          {deleteSuccess ? (
            <Button size="default" theme="success" className="self-start pointer-events-none">
              Users removed&nbsp;&nbsp;
              <Icon name="tick" size={14} />
            </Button>
          ) : (
            <Button size="default" theme="error" className="self-start" onClick={onDelete} disabled={isDeleting}>
              {isDeleting ? 'Removing User...' : 'Yes, remove User'}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

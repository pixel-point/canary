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
  admin: boolean
  uid: string
  display_name?: string // Add a default value of undefined
}

interface FormRemoveUserDialogProps {
  user: UsersProps | null
  onClose: () => void
  onRemove: () => void
  isRemoving: boolean
  removeSuccess: boolean
}

//Form Remove Admin Dialog
export const FormRemoveAdminDialog: React.FC<FormRemoveUserDialogProps> = ({
  user,
  onClose,
  onRemove,
  isRemoving,
  removeSuccess
}) => {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove {user?.display_name} as an admin?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove a admin tag for {user?.display_name} ({user?.uid}).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Spacer size={3} />
        <AlertDialogFooter>
          {!isRemoving && !removeSuccess && <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>}
          {removeSuccess ? (
            <Button size="default" theme="success" className="self-start pointer-events-none">
              Admin removed&nbsp;&nbsp;
              <Icon name="tick" size={14} />
            </Button>
          ) : (
            <Button
              size="default"
              theme="error"
              className="self-start"
              onClick={onRemove}
              disabled={isRemoving || removeSuccess}>
              {isRemoving ? 'Removing admin...' : 'Yes, removed admin'}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

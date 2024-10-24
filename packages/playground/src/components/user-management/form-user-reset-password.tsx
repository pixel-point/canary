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
  display_name?: string
}

interface FormResetPasswordrDialogProps {
  user: UsersProps | null
  onReset: () => void
  onClose: () => void
  isResetting: boolean
  resetSuccess: boolean
}

export const FormResetPasswordDialog: React.FC<FormResetPasswordrDialogProps> = ({
  user,
  onReset,
  onClose,
  isResetting,
  resetSuccess
}) => {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to reset password for {user?.display_name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will send a password reset email to {user?.display_name} ({user?.uid}).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Spacer size={3} />
        <AlertDialogFooter>
          {!isResetting && !resetSuccess && <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>}
          {/* TODO: check the page flow of reset password */}
          {resetSuccess ? (
            <Button size="default" theme="success" className="self-start pointer-events-none">
              Password reset email sent&nbsp;&nbsp;
              <Icon name="tick" size={14} />
            </Button>
          ) : (
            <Button size="default" theme="error" className="self-start" onClick={onReset} disabled={isResetting}>
              {isResetting ? 'Resetting password...' : 'Yes, reset password'}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

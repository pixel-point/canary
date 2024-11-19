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
  Spacer,
  Text,
  Badge
} from '@harnessio/canary'
import type { FormDeleteMemberDialogProps } from './interfaces'

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
          <AlertDialogTitle className="text-left">
            Are you absolutely sure you want to delete
            <Badge type="admin" className="mx-2" variant="muted" disableHover={true}>
              <Text>{member.display_name}</Text>
            </Badge>
            ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            This will permanently delete &quot;{member.display_name}&quot; in the project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Spacer size={3} />
        <AlertDialogFooter>
          {!isDeleting && !deleteSuccess && (
            <AlertDialogCancel onClick={onClose} className="mt-0">
              Cancel
            </AlertDialogCancel>
          )}
          {deleteSuccess ? (
            <Button size="default" theme="success" className="pointer-events-none flex gap-2 self-start">
              Member removed
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

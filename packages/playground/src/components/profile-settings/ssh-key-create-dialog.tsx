import { SshKeyCreateForm } from './ssh-key-create-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@harnessio/canary'

interface SshKeyCreateDialogProps {
  open: boolean
  onClose: () => void
}

export const SshKeyCreateDialog: React.FC<SshKeyCreateDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-border bg-primary-background max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-left">New SSH key</DialogTitle>
        </DialogHeader>
        <SshKeyCreateForm />
      </DialogContent>
    </Dialog>
  )
}

import { TokenCreateForm } from './token-create-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@harnessio/canary'

interface TokenCreateDialogProps {
  open: boolean
  onClose: () => void
}

export const TokenCreateDialog: React.FC<TokenCreateDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] border-border bg-primary-background">
        <DialogHeader>
          <DialogTitle className="text-left">Create a token</DialogTitle>
        </DialogHeader>
        <TokenCreateForm />
      </DialogContent>
    </Dialog>
  )
}

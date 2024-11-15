import { TokenCreateForm, TokenFormType } from './token-create-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@harnessio/canary'

interface TokenCreateDialogProps {
  open: boolean
  onClose: () => void
  handleCreateToken: (data: TokenFormType) => void
  error: { type: string; message: string } | null
  isLoading: boolean
}

export const TokenCreateDialog: React.FC<TokenCreateDialogProps> = ({
  open,
  onClose,
  handleCreateToken,
  error,
  isLoading
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-primary-background border-border max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-left">Create a token</DialogTitle>
        </DialogHeader>
        <TokenCreateForm handleCreateToken={handleCreateToken} onClose={onClose} error={error} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  )
}

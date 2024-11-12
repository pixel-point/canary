import { TokenCreateForm } from './token-create-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@harnessio/canary'
import React from 'react'
interface TokenCreateDialogProps {
  open: boolean
  onClose: () => void
}

export const TokenCreateDialog: React.FC<TokenCreateDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-border bg-primary-background max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-left">Create a token</DialogTitle>
        </DialogHeader>
        <TokenCreateForm />
      </DialogContent>
    </Dialog>
  )
}

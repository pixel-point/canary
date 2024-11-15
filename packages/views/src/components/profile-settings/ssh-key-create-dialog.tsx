import { SshKeyCreateForm } from './ssh-key-create-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@harnessio/canary'
import React from 'react'

interface SshKeyCreateDialogProps {
  open: boolean
  onClose: () => void
}

export const SshKeyCreateDialog: React.FC<SshKeyCreateDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-primary-background border-border max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-left">New SSH key</DialogTitle>
        </DialogHeader>
        <SshKeyCreateForm />
      </DialogContent>
    </Dialog>
  )
}

import React, { useState } from 'react'
import { Root as SearchBox } from './search-box'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'
import { Spacer } from './spacer'
import { Text } from '..'

interface ProjectProps {
  avatarLink: React.ReactNode
}

function Root({ avatarLink }: ProjectProps) {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false)

  const openSearchDialog = () => {
    setSearchDialogOpen(true)
  }

  const closeSearchDialog = () => {
    setSearchDialogOpen(false)
  }

  return (
    <div className="flex flex-col w-full items-start justify-items-start">
      <div className="h-[55px] flex items-center gap-2.5">
        {avatarLink}
        <Text size={4} color="primary" weight="bold">
          harness
        </Text>
      </div>
      <SearchBox
        textSize={1}
        width="full"
        placeholder="Search..."
        hasShortcut
        shortcutLetter="K"
        shortcutModifier="cmd"
        onSearch={openSearchDialog}
        showOnFocus
      />
      <Dialog open={isSearchDialogOpen} onOpenChange={closeSearchDialog}>
        <DialogContent className="max-w-[800px] h-[600px] bg-primary-background border-border">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              <Spacer size={6} />
              <SearchBox width="full" placeholder="Search..." />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { Root }

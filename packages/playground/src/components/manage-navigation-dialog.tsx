import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
  Button,
  Input,
  Spacer,
  Icon,
  SearchBox,
  ButtonGroup,
  Text
} from '@harnessio/canary'
import { useForm, SubmitHandler } from 'react-hook-form'
// import { Root as SearchBox } from './search-box'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'

export const ManageNavigationDialog: React.FC<{
  user: undefined
  onSave: () => void
  onClose: () => void
  isSubmitting: boolean
  submitted: boolean
  handleUpdateUser: () => void
}> = ({ user, onSave, onClose, isSubmitting, submitted, handleUpdateUser }) => {
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const openSearchDialog = () => {
    setSearchDialogOpen(true)
  }

  const closeSearchDialog = () => {
    setSearchDialogOpen(false)
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  // Form edit submit handler
  const onSubmit: SubmitHandler<any> = data => {
    // handleUpdateUser(data)
    onSave()
    // resetNewMemberForm(data)
  }

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Manage navigation</AlertDialogTitle>
        </AlertDialogHeader>
        <SearchBox.Root
          className="w-full mt-6"
          placeholder="Add menu element"
          value=""
          handleChange={handleSearchChange}
          showOnFocus
          textSize={2}
          hasSearchIcon={false}
        />
        {/* <Dialog open={isSearchDialogOpen} onOpenChange={closeSearchDialog}>
          <DialogContent className="max-w-[800px] h-[600px] bg-primary-background border-border">
            <DialogHeader>
              <DialogTitle>Search</DialogTitle>
              <DialogDescription>
                <Spacer size={6} />
                <SearchBox width="full" placeholder="Search..." />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}

        <AlertDialogFooter>
          <ButtonGroup.Root>
            {!submitted ? (
              <>
                <Button variant="outline" onClick={onClose} disabled={submitted}>
                  Cancel
                </Button>
                <Button type="submit" theme="primary" disabled={submitted}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                type="button"
                size="sm"
                theme="success"
                className="pointer-events-none flex gap-2"
                disabled={submitted}>
                Saved
                <Icon name="tick" size={14} />
              </Button>
            )}
          </ButtonGroup.Root>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

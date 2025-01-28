import { createContext, useState } from 'react'

import { DialogLabels } from '@/views/user-management/types'

import { DialogsContextType, DialogState } from './types'

export const DialogsContext = createContext<DialogsContextType | undefined>(undefined)

export const DialogsProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogsOpenState, setDialogsOpenState] = useState<DialogState>({
    [DialogLabels.DELETE_USER]: false,
    [DialogLabels.EDIT_USER]: false,
    [DialogLabels.TOGGLE_ADMIN]: false,
    [DialogLabels.RESET_PASSWORD]: false,
    [DialogLabels.CREATE_USER]: false
  })

  const openDialog = (dialogType: DialogLabels) => {
    setDialogsOpenState(prev => ({
      ...prev,
      [dialogType]: true
    }))
  }

  const closeDialog = (dialogType: DialogLabels) => {
    setDialogsOpenState(prev => ({
      ...prev,
      [dialogType]: false
    }))
  }

  return (
    <DialogsContext.Provider value={{ dialogsOpenState, openDialog, closeDialog }}>{children}</DialogsContext.Provider>
  )
}

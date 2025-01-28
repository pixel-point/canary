import { DialogLabels } from '@/views/user-management/types'

export type DialogState = {
  [K in DialogLabels]: boolean
}

export interface DialogsContextType {
  dialogsOpenState: DialogState
  openDialog: (dialogType: DialogLabels) => void
  closeDialog: (dialogType: DialogLabels) => void
}

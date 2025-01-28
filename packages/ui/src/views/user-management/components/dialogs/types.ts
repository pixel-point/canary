import { IDialogErrorStates, IDialogHandlers, IDialogLoadingStates } from '@views/user-management/types'

export interface IDialogsProps {
  handlers: IDialogHandlers
  loadingStates: IDialogLoadingStates
  errorStates: IDialogErrorStates
}

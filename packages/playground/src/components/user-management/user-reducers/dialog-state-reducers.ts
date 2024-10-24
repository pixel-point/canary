interface UsersProps {
  uid: string
  display_name?: string
  email: string
  created: number
  updated?: number
  avatarUrl?: string
  blocked?: boolean
  admin: boolean
}

interface DialogState {
  isDialogDeleteOpen: boolean
  isDialogEditOpen: boolean
  isDialogRemoveAdminOpen: boolean
  isDialogResetPasswordOpen: boolean
  isDeleting: boolean
  isSubmitting: boolean
  submitted: boolean
  isRemoving: boolean
  isResetting: boolean
  deleteSuccess: boolean
  submitSuccess: boolean
  removeSuccess: boolean
  resetSuccess: boolean
  selectedUser: UsersProps | null // Holds the currently selected user for edit/delete actions
}

type DialogAction =
  | { type: 'OPEN_DIALOG'; dialogType: 'delete' | 'edit' | 'removeAdmin' | 'resetPassword'; user: UsersProps }
  | { type: 'CLOSE_DIALOG'; dialogType: 'delete' | 'edit' | 'removeAdmin' | 'resetPassword' }
  | { type: 'START_DELETING' }
  | { type: 'DELETE_SUCCESS' }
  | { type: 'START_SUBMITTING' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'START_REMOVING' }
  | { type: 'REMOVE_SUCCESS' }
  | { type: 'START_RESETTING' }
  | { type: 'RESET_PASSWORD_SUCCESS' }
  | { type: 'RESET_DELETE' }
  | { type: 'RESET_SUBMIT' }
  | { type: 'RESET_REMOVE' }
  | { type: 'RESET_PASSWORD_RESET' }

export const initialDialogState: DialogState = {
  isDialogDeleteOpen: false,
  isDialogEditOpen: false,
  isDialogRemoveAdminOpen: false,
  isDialogResetPasswordOpen: false,
  isDeleting: false,
  deleteSuccess: false,
  isSubmitting: false,
  submitted: false,
  isRemoving: false,
  removeSuccess: false,
  isResetting: false,
  resetSuccess: false,
  submitSuccess: false,
  selectedUser: null
}

export function dialogStateReducer(state: DialogState, action: DialogAction): DialogState {
  switch (action.type) {
    case 'OPEN_DIALOG':
      return {
        ...state,
        [`isDialog${capitalize(action.dialogType)}Open`]: true,
        selectedUser: action.user
      }
    case 'CLOSE_DIALOG':
      return {
        ...state,
        [`isDialog${capitalize(action.dialogType)}Open`]: false
      }
    case 'START_DELETING':
      return { ...state, isDeleting: true }
    case 'DELETE_SUCCESS':
      return { ...state, isDeleting: false, deleteSuccess: true }
    case 'RESET_DELETE':
      return { ...state, deleteSuccess: false }

    case 'START_SUBMITTING':
      return { ...state, isSubmitting: true }
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, submitted: true }
    case 'RESET_SUBMIT':
      return { ...state, submitted: false }

    case 'START_REMOVING':
      return { ...state, isRemoving: true }
    case 'REMOVE_SUCCESS':
      return { ...state, isRemoving: false, removeSuccess: true }
    case 'RESET_REMOVE':
      return { ...state, removeSuccess: false }

    case 'START_RESETTING':
      return { ...state, isResetting: true }
    case 'RESET_PASSWORD_SUCCESS':
      return { ...state, isResetting: false, resetSuccess: true }
    case 'RESET_PASSWORD_RESET':
      return { ...state, resetSuccess: false }
    default:
      return state
  }
}

// Helper function to capitalize the first letter of the dialogType
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

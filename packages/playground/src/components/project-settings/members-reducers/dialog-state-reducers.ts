interface MembersProps {
  display_name: string
  role: string
  email: string
  timestamp?: string
  avatarUrl?: string
}

export interface DialogState {
  isDialogEditOpen: boolean
  isDialogDeleteOpen: boolean
  editMember: MembersProps | null
  deleteMember: MembersProps | null
  isSubmitting: boolean
  submitted: boolean
  isDeleting: boolean
  deleteSuccess: boolean
}

export const initialDialogState: DialogState = {
  isDialogEditOpen: false,
  isDialogDeleteOpen: false,
  editMember: null,
  deleteMember: null,
  isSubmitting: false,
  submitted: false,
  isDeleting: false,
  deleteSuccess: false
}

type Action =
  | { type: 'OPEN_DIALOG'; dialogType: 'edit' | 'delete'; member: MembersProps }
  | { type: 'CLOSE_DIALOG'; dialogType: 'edit' | 'delete' }
  | { type: 'START_SUBMITTING' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'RESET_SUBMIT' }
  | { type: 'START_DELETING' }
  | { type: 'DELETE_SUCCESS' }
  | { type: 'RESET_DELETE' }

export function dialogStateReducer(state: DialogState, action: Action): DialogState {
  switch (action.type) {
    case 'OPEN_DIALOG':
      return {
        ...state,
        [`isDialog${capitalize(action.dialogType)}Open`]: true,
        editMember: action.member,
        deleteMember: action.member
      }
    case 'CLOSE_DIALOG':
      return { ...state, [`isDialog${capitalize(action.dialogType)}Open`]: false, submitted: false }
    case 'START_SUBMITTING':
      return { ...state, isSubmitting: true }
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, submitted: true }
    case 'RESET_SUBMIT':
      return { ...state, submitted: false }
    case 'START_DELETING':
      return { ...state, isDeleting: true }
    case 'DELETE_SUCCESS':
      return { ...state, isDeleting: false, deleteSuccess: true }
    case 'RESET_DELETE':
      return { ...state, deleteSuccess: false }
    default:
      return state
  }
}
// Helper function to capitalize the first letter of the dialogType
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

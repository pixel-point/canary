export interface MembersProps {
  display_name: string
  role: string
  email: string
  timestamp?: string
  avatarUrl?: string
  uid: string
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

// Enum for dialog types
export enum DialogType {
  EDIT = 'edit',
  DELETE = 'delete'
}

// Enum for action types
export enum ActionType {
  OPEN_DIALOG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG',
  START_SUBMITTING = 'START_SUBMITTING',
  SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
  RESET_SUBMIT = 'RESET_SUBMIT',
  START_DELETING = 'START_DELETING',
  DELETE_SUCCESS = 'DELETE_SUCCESS',
  RESET_DELETE = 'RESET_DELETE'
}

export type Action =
  | { type: ActionType.OPEN_DIALOG; dialogType: DialogType; member: MembersProps }
  | { type: ActionType.CLOSE_DIALOG; dialogType: DialogType }
  | { type: ActionType.START_SUBMITTING }
  | { type: ActionType.SUBMIT_SUCCESS }
  | { type: ActionType.RESET_SUBMIT }
  | { type: ActionType.START_DELETING }
  | { type: ActionType.DELETE_SUCCESS }
  | { type: ActionType.RESET_DELETE }

export interface FormDeleteMemberDialogProps {
  member: MembersProps
  onClose: () => void
  onDelete: () => void
  isDeleting: boolean
  deleteSuccess: boolean
}

export interface FormEditDialogProps {
  member: { display_name: string; role: string }
  onSave: (newRole: string) => void
  onClose: () => void
  isSubmitting: boolean
  submitted: boolean
}

export type DialogState = {
  isDialogDeleteOpen: boolean
  selectedMember: {
    display_name: string
    role: string
    email: string
    uid: string
  } | null
}

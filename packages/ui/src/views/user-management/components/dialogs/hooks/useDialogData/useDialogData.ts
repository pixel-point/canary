import { generateAlphaNumericHash } from '@/utils/utils'
import { DialogLabels } from '@/views/user-management/components/dialogs'
import { UsersProps } from '@/views/user-management/types'
import { useDialogs } from '@views/user-management/providers/DialogsProvider'
import { useUserManagementStore } from '@views/user-management/providers/StoreProvider'

export const useDialogData = () => {
  const { useAdminListUsersStore } = useUserManagementStore()
  const { openDialog } = useDialogs()

  const { setUser, setPassword, setGeteneratePassword } = useAdminListUsersStore()

  const prepareDialogData = (user: UsersProps | null, dialogType: DialogLabels) => {
    if (user) setUser(user)

    if (dialogType === DialogLabels.RESET_PASSWORD) {
      setGeteneratePassword(false)
      setPassword(generateAlphaNumericHash(10))

      return
    }

    if (dialogType === DialogLabels.CREATE_USER) {
      setGeteneratePassword(true)
      setPassword(generateAlphaNumericHash(10))

      return
    }
  }

  const handleDialogOpen = (user: UsersProps | null, dialogType: DialogLabels) => {
    prepareDialogData(user, dialogType)
    openDialog(dialogType)
  }

  return {
    handleDialogOpen
  }
}

import { DialogsProvider } from '@views/user-management/providers/DialogsProvider'
import { UserManagementStoreProvider } from '@views/user-management/providers/StoreProvider'
import { IUserManagementPageProps } from '@views/user-management/types'

import { UserManagementPageContent } from './components'

export const UserManagementPage: React.FC<IUserManagementPageProps> = ({
  useAdminListUsersStore,
  useTranslationStore,
  handlers,
  loadingStates,
  errorStates
}) => {
  return (
    <UserManagementStoreProvider
      useAdminListUsersStore={useAdminListUsersStore}
      useTranslationStore={useTranslationStore}
    >
      <DialogsProvider>
        <UserManagementPageContent handlers={handlers} loadingStates={loadingStates} errorStates={errorStates} />
      </DialogsProvider>
    </UserManagementStoreProvider>
  )
}

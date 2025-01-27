import { Spacer } from '@/components'
import { useUserManagementStore } from '@/views/user-management/providers/store-provider'

export const Header = () => {
  const { useTranslationStore, useAdminListUsersStore } = useUserManagementStore()

  const { users } = useAdminListUsersStore()

  const { t } = useTranslationStore()

  return (
    <>
      <Spacer size={7} />
      <span className="text-2xl font-medium text-foreground-1">
        {t('views:userManagement.usersHeader', 'Users')}{' '}
        <span className="text-2xl font-medium text-foreground-4">({users?.length || 0})</span>
      </span>
      <Spacer size={6} />
    </>
  )
}

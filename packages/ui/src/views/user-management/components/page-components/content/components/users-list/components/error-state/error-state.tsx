import { NoData } from '@/components'
import { useStates } from '@/views/user-management/providers/state-provider'
import { useUserManagementStore } from '@/views/user-management/providers/store-provider'

export const ErrorState = () => {
  const { useTranslationStore } = useUserManagementStore()

  const { t } = useTranslationStore()

  const { errorStates } = useStates()
  const { fetchUsersError } = errorStates

  return (
    <NoData
      textWrapperClassName="max-w-[350px]"
      iconName="no-data-error"
      title={t('views:noData.errorApiTitle', 'Failed to load users')}
      description={[
        fetchUsersError ||
          t(
            'views:noData.errorApiDescription',
            'An error occurred while loading the data. Please try again and reload the page.'
          )
      ]}
      primaryButton={{
        label: t('views:notFound.button', 'Reload page'),
        onClick: () => {
          window.location.reload()
        }
      }}
    />
  )
}

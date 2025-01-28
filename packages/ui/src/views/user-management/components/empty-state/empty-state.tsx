import { NoData } from '@/components'
import { IEmptyStateProps } from '@/views/user-management/components/empty-state/types'

export const EmptyState = ({ t, onButtonClick }: IEmptyStateProps) => {
  return (
    <NoData
      textWrapperClassName="w-[350px]"
      iconName="no-data-members"
      title={t('views:noData.noUsers', 'No Users Found')}
      description={[
        t(
          'views:noData.noUsersDescription',
          'There are no users in this scope. Click on the button below to start adding them.'
        )
      ]}
      primaryButton={{
        label: t('views:userManagement.newUserButton', 'New user'),
        onClick: onButtonClick
      }}
    />
  )
}

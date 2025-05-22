import { FC } from 'react'

import { useRouterContext, useTranslation } from '@/context'
import { NoData, Pagination } from '@components/index'
import { Spacer } from '@components/spacer'

import ConnectorDetailsActivitiesList from './connector-details-activities-list'
import { ConnectorDetailsActivityProps } from './types'

const ConnectorDetailsActivities: FC<ConnectorDetailsActivityProps> = ({
  apiConnectorActivityError,
  currentPage,
  totalItems,
  pageSize,
  goToPage,
  isLoading,
  activities,
  ...props
}) => {
  const { t } = useTranslation()
  const { navigate } = useRouterContext()

  if (apiConnectorActivityError) {
    return (
      <NoData
        textWrapperClassName="max-w-[350px]"
        iconName="no-data-error"
        title={t('views:noData.errorApiTitle', 'Failed to load', {
          type: 'entities'
        })}
        description={[
          apiConnectorActivityError ||
            t(
              'views:noData.errorApiDescription',
              'An error occurred while loading the data. Please try again and reload the page.'
            )
        ]}
        primaryButton={{
          label: t('views:notFound.button', 'Reload page'),
          onClick: () => {
            navigate(0) // Reload the page
          }
        }}
      />
    )
  }

  return (
    <div>
      <Spacer size={4} />
      <ConnectorDetailsActivitiesList activities={activities} isLoading={isLoading} {...props} />
      <Spacer size={8} />
      <Pagination totalItems={totalItems} pageSize={pageSize} currentPage={currentPage} goToPage={goToPage} />
    </div>
  )
}

export { ConnectorDetailsActivities }

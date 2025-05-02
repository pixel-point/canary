import { FC } from 'react'

import { Icon, NoData, SkeletonList, SkeletonTable, StatusBadge, Table } from '@/components'
import { cn } from '@utils/cn'
import { timeAgo } from '@utils/utils'
import { isDelegateSelected } from '@views/delegates/utils'
import { defaultTo } from 'lodash-es'

import { DelegateConnectivityListProps } from '../types'

const Title = ({ title }: { title: string }): JSX.Element => (
  <span className="max-w-full truncate font-medium">{title}</span>
)

export const DelegateConnectivityList: FC<DelegateConnectivityListProps> = ({
  delegates,
  useTranslationStore,
  isLoading,
  selectedTags
}) => {
  const { t } = useTranslationStore()

  if (isLoading) {
    return <SkeletonList />
  }

  if (!delegates.length) {
    return (
      <NoData
        withBorder
        iconName="no-data-cog"
        title={t('views:noData.noDelegates', 'No delegates yet')}
        description={[t('views:noData.noDelegates', 'There are no delegates in this project yet.')]}
      />
    )
  }

  return (
    <Table.Root tableClassName="table-fixed" variant="asStackedList">
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[25%]">Delegate</Table.Head>
          <Table.Head className="w-[25%] whitespace-nowrap">Heartbeat</Table.Head>
          <Table.Head className="w-1/5">Tags</Table.Head>
          <Table.Head className="w-[10%] text-center">Selected</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body hasHighlightOnHover>
        {delegates.map(
          ({ groupId, groupName, activelyConnected, lastHeartBeat, groupCustomSelectors, groupImplicitSelectors }) => {
            return (
              <Table.Row key={groupId}>
                <Table.Cell className="content-center truncate">
                  <div className="flex items-center gap-2.5">
                    <Title title={groupName} />
                  </div>
                </Table.Cell>
                <Table.Cell className="content-center">
                  <div className="inline-flex items-center gap-2">
                    <Icon
                      name="dot"
                      size={8}
                      className={cn(activelyConnected ? 'text-icons-success' : 'text-icons-danger')}
                    />
                    {lastHeartBeat ? timeAgo(lastHeartBeat) : null}
                  </div>
                </Table.Cell>
                <Table.Cell className="content-center truncate">
                  <div className="flex flex-wrap gap-2">
                    {groupCustomSelectors.map((selector: string) => (
                      <StatusBadge variant="secondary" theme="merged" key={selector}>
                        {selector}
                      </StatusBadge>
                    ))}
                  </div>
                </Table.Cell>
                <Table.Cell className="relative text-right" style={{ verticalAlign: 'middle' }}>
                  {isDelegateSelected(
                    [...defaultTo(groupImplicitSelectors, []), ...defaultTo(groupCustomSelectors, [])],
                    defaultTo(selectedTags, [])
                  ) && <Icon name="tick" size={12} className="text-icons-success mx-auto" />}
                </Table.Cell>
              </Table.Row>
            )
          }
        )}
      </Table.Body>
    </Table.Root>
  )
}

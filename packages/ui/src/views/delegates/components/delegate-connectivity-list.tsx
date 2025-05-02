import { Badge, Icon, NoData, SkeletonList, Table } from '@/components'
import { cn } from '@utils/cn'
import { timeAgo } from '@utils/utils'
import { defaultTo } from 'lodash-es'

import { DelegateConnectivityListProps } from '../types'
import { isDelegateSelected } from '../utils'

const Title = ({ title }: { title: string }): JSX.Element => (
  <span className="max-w-full truncate font-medium">{title}</span>
)

export function DelegateConnectivityList({
  delegates,
  useTranslationStore,
  isLoading,
  selectedTags
}: DelegateConnectivityListProps): JSX.Element {
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
    <Table.Root className="table-auto" variant="asStackedList">
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-3/12">Delegate</Table.Head>
          <Table.Head className="w-3/12 whitespace-nowrap">Heartbeat</Table.Head>
          <Table.Head className="w-5/12">Tags</Table.Head>
          <Table.Head className="w-1/12 text-center">Selected</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body hasHighlightOnHover>
        {delegates.map(
          ({ groupId, groupName, activelyConnected, lastHeartBeat, groupCustomSelectors, groupImplicitSelectors }) => {
            return (
              <Table.Row key={groupId}>
                <Table.Cell className="max-w-28 content-center !py-4">
                  <div className="flex items-center gap-2.5">
                    <Title title={groupName} />
                  </div>
                </Table.Cell>
                <Table.Cell className="content-center !py-4">
                  <div className="inline-flex items-center gap-2">
                    <Icon
                      name="dot"
                      size={8}
                      className={cn(activelyConnected ? 'text-icons-success' : 'text-icons-danger')}
                    />
                    {lastHeartBeat ? timeAgo(lastHeartBeat) : null}
                  </div>
                </Table.Cell>
                <Table.Cell className="max-w-56 truncate !py-4">
                  <div className="flex flex-wrap content-center gap-1.5">
                    {groupCustomSelectors.map((selector: string) => (
                      <Badge variant="soft" theme="merged" key={selector}>
                        {selector}
                      </Badge>
                    ))}
                  </div>
                </Table.Cell>
                <Table.Cell className="content-center !py-4 !align-middle">
                  {isDelegateSelected(
                    [...defaultTo(groupImplicitSelectors, []), ...defaultTo(groupCustomSelectors, [])],
                    selectedTags || []
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

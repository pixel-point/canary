import { Link, useNavigate } from 'react-router-dom'

import { Badge, MoreActionsTooltip, NoData, PaginationComponent, Spacer, StackedList, Text } from '@/components'
import { TranslationStore, WebhookType } from '@/views'

const Title = ({ title, isEnabled }: { title: string; isEnabled: boolean }) => (
  <div className="inline-flex items-center gap-2.5">
    <span className="font-medium">{title}</span>
    <Badge size="sm" disableHover borderRadius="full" theme={isEnabled ? 'success' : 'muted'}>
      {isEnabled ? 'Enabled' : 'Disabled'}
    </Badge>
  </div>
)

export interface RepoWebhookListProps {
  webhooks: WebhookType[]
  error?: string
  useTranslationStore: () => TranslationStore
  isDirtyList: boolean
  handleReset: () => void
  totalPages: number
  page: number
  setPage: (val: number) => void
  openDeleteWebhookDialog: (id: number) => void
}

export function RepoWebhookList({
  webhooks,
  error,
  useTranslationStore,
  isDirtyList,
  handleReset,
  totalPages,
  page,
  setPage,
  openDeleteWebhookDialog
}: RepoWebhookListProps) {
  const { t } = useTranslationStore()
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('create')
  }

  if (error) {
    return (
      <>
        <Spacer size={2} />
        <Text size={1} className="text-destructive">
          {error || 'Something went wrong'}
        </Text>
      </>
    )
  }

  if (!webhooks.length) {
    return (
      <NoData
        withBorder
        textWrapperClassName="max-w-[350px]"
        iconName={isDirtyList ? 'no-search-magnifying-glass' : 'no-data-webhooks'}
        title={
          isDirtyList
            ? t('views:noData.noResults', 'No search results')
            : t('views:noData.noWebhooks', 'No webhooks yet')
        }
        description={[
          isDirtyList
            ? t(
                'views:noData.noResultsDescription',
                'No webhooks match your search. Try adjusting your keywords or filters.',
                {
                  type: 'webhooks'
                }
              )
            : t(
                'views:noData.noWebhooksDescription',
                'Add or manage webhooks to automate tasks and connect external services to your project.'
              )
        ]}
        primaryButton={
          isDirtyList
            ? {
                label: t('views:noData.clearFilters', 'Clear filters'),
                onClick: handleReset
              }
            : {
                label: t('views:webhookData.create', 'Create webhook'),
                onClick: handleNavigate
              }
        }
      />
    )
  }

  return (
    <>
      <StackedList.Root>
        {webhooks.map((webhook, webhook_idx) => (
          <Link key={webhook.id} to={`${webhook.id}`}>
            <StackedList.Item
              key={webhook.createdAt}
              className="cursor-pointer py-3 pr-1.5"
              isLast={webhooks.length - 1 === webhook_idx}
            >
              <StackedList.Field
                primary
                description={<span className="leading-none">{webhook.description}</span>}
                title={<Title title={webhook.name} isEnabled={webhook.enabled} />}
                className="gap-1.5"
              />
              <StackedList.Field
                title={
                  <MoreActionsTooltip
                    actions={[
                      {
                        title: t('views:webhookData.edit', 'Edit webhook'),
                        to: `${webhook.id}`
                      },
                      {
                        isDanger: true,
                        title: t('views:webhookData.delete', 'Delete webhook'),
                        onClick: () => openDeleteWebhookDialog(webhook.id)
                      }
                    ]}
                  />
                }
                right
                label
                secondary
              />
            </StackedList.Item>
          </Link>
        ))}
      </StackedList.Root>
      <PaginationComponent totalPages={totalPages} currentPage={page} goToPage={setPage} t={t} />
    </>
  )
}

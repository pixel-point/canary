import { FC } from 'react'

import { Icon, MoreActionsTooltip, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components'
import { timeAgo } from '@utils/utils'
import { TranslationStore } from '@views/repo'

import { KeysList } from '../types'

interface ProfileKeysListProps {
  publicKeys: KeysList[]
  openAlertDeleteDialog: (params: { identifier: string; type: string }) => void
  useTranslationStore: () => TranslationStore
}

export const ProfileKeysList: FC<ProfileKeysListProps> = ({
  publicKeys,
  openAlertDeleteDialog,
  useTranslationStore
}) => {
  const { t } = useTranslationStore()
  return (
    <Table variant="asStackedList">
      <TableHeader>
        <TableRow>
          <TableHead>{t('views:profileSettings.name', 'Name')}</TableHead>
          <TableHead>{t('views:profileSettings.added', 'Added')}</TableHead>
          <TableHead>{t('views:profileSettings.lastUsedDate', 'Last used date')}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {publicKeys.length ? (
          publicKeys.map((key: KeysList) => (
            <TableRow key={key.identifier}>
              <TableCell>
                <div className="inline-flex items-center gap-x-2.5">
                  <Icon name="ssh-key" size={32} />
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground-1">{key.identifier}</span>
                    <span className="max-w-[200px] truncate text-12 text-foreground-3">{key.fingerprint}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="h-1">
                <span className="text-foreground-1">{timeAgo(new Date(key.created!).getTime())}</span>
              </TableCell>
              <TableCell className="h-1">
                {/* TODO: pass the data to KeysList item about last used date */}
                {/* <span className="text-foreground-1">
                  {key.last_used ? new Date(key.last_used).toLocaleString() : 'Never used'}
                </span> */}
              </TableCell>
              <TableCell className="text-right">
                <MoreActionsTooltip
                  isInTable
                  actions={[
                    {
                      isDanger: true,
                      title: t('views:profileSettings.deleteSshKey', 'Delete SSH key'),
                      onClick: () => {
                        openAlertDeleteDialog({ identifier: key.identifier!, type: 'key' })
                      }
                    }
                  ]}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="hover:bg-transparent">
            <TableCell className="!p-4" colSpan={4}>
              <p className="text-center text-14 text-foreground-4">
                {t(
                  'views:profileSettings.noDataKeysDescription',
                  'There are no SSH keys associated with this account.'
                )}
              </p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

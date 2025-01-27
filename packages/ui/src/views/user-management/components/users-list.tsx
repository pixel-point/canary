import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  MoreActionsTooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components'
import { getInitials } from '@/utils/utils'
import { TranslationStore } from '@/views'

import { DialogLabels, UsersProps } from '../types'

interface PageProps {
  users: UsersProps[]
  handleDialogOpen: (user: UsersProps | null, dialogLabel: string) => void
  useTranslationStore: () => TranslationStore
}

export const UsersList = ({ users, handleDialogOpen, useTranslationStore }: PageProps) => {
  const { t } = useTranslationStore()

  return (
    <Table variant="asStackedList">
      <TableHeader>
        <TableRow>
          <TableHead>{t('views:projectSettings.membersTable.user', 'User')}</TableHead>
          <TableHead>{t('views:projectSettings.membersTable.email', 'Email')}</TableHead>
          {/*<TableHead>{t('views:projectSettings.membersTable.role', 'Role')}</TableHead>*/}
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => {
          return (
            <TableRow key={user.uid}>
              <TableCell className="content-center">
                <div className="flex items-center gap-2">
                  <Avatar className="size-6 rounded-full p-0" size="6">
                    {!!user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                    <AvatarFallback>{getInitials(user.uid!, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground-8 truncate">
                    {user.display_name}
                    {user.admin && (
                      <Badge
                        className="m-auto ml-2 h-5 rounded-full bg-tertiary-background/10 p-2 text-center text-xs font-normal text-tertiary-background"
                        variant="outline"
                        size="xs"
                      >
                        Admin
                      </Badge>
                    )}
                  </span>
                </div>
              </TableCell>
              <TableCell className="content-center text-foreground-2">{user.email}</TableCell>
              {/* TODO: uncomment when user.role returned from back-end */}
              {/* <TableCell className="w-1/5 content-center">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="flex items-center gap-x-1.5 text-foreground-2 hover:text-foreground-1">
                    {getRoleLabel(user.role)}
                    <Icon className="chevron-down text-icons-7" name="chevron-fill-down" size={6} />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    align="start"
                    className="w-[300px]"
                    onCloseAutoFocus={event => event.preventDefault()}
                  >
                    {roleOptions.map(role => (
                      <DropdownMenu.Item
                        key={role.uid}
                        className="flex-col items-start gap-y-1.5 px-3 py-2"
                        onClick={() => onEdit({ ...user, role: role.uid })}
                      >
                        <span className="leading-none">{role.label}</span>
                        <span className="leading-tight text-foreground-4">{role.description}</span>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </TableCell> */}
              <TableCell className="text-right">
                <MoreActionsTooltip
                  isInTable
                  actions={[
                    {
                      title: user.admin ? 'Remove Admin' : 'Set as Admin',
                      onClick: () => handleDialogOpen(user, DialogLabels.TOGGLE_ADMIN)
                    },
                    {
                      title: 'Reset Password',
                      onClick: () => handleDialogOpen(user, DialogLabels.RESET_PASSWORD)
                    },
                    {
                      title: 'Edit User',
                      onClick: () => handleDialogOpen(user, DialogLabels.EDIT_USER)
                    },
                    {
                      isDanger: true,
                      title: t('views:projectSettings.removeMember', 'Remove member'),
                      onClick: () => handleDialogOpen(user, DialogLabels.DELETE_USER)
                    }
                  ]}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

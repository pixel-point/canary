import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  MoreActionsTooltip,
  SkeletonList,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components'
import { getInitials } from '@/utils/utils'
import { DialogLabels } from '@/views/user-management/components/dialogs'
import { useDialogData } from '@/views/user-management/components/dialogs/hooks'
import { ErrorState } from '@/views/user-management/components/page-components/content/components/users-list/components/error-state'
import { NoSearchResults } from '@/views/user-management/components/page-components/content/components/users-list/components/no-search-results'
import { useSearch } from '@/views/user-management/providers/search-provider'
import { useStates } from '@/views/user-management/providers/state-provider/hooks/use-states'
import { useUserManagementStore } from '@/views/user-management/providers/store-provider'

export const UsersList = () => {
  const { useAdminListUsersStore } = useUserManagementStore()

  const { users } = useAdminListUsersStore()
  const { searchQuery } = useSearch()
  const { handleDialogOpen } = useDialogData()

  const { loadingStates, errorStates } = useStates()
  const { isFetchingUsers } = loadingStates
  const { fetchUsersError } = errorStates

  if (isFetchingUsers) {
    return <SkeletonList />
  }

  if (fetchUsersError) {
    return <ErrorState />
  }

  // here should be additional check for users.length === 0,
  // but until backend is not ready I leave only searchQuery to make it possible to see how this component works
  // TODO: add additional check for users.length === 0 when backend will be ready
  if (searchQuery) {
    return <NoSearchResults />
  }

  return (
    <Table variant="asStackedList">
      <TableHeader className="h-[46px]">
        <TableRow>
          <TableHead className="w-[346px]">User</TableHead>
          <TableHead className="w-[346px]">Email</TableHead>
          <TableHead className="w-[346px]">Role binding</TableHead>
          <TableHead>
            <></>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          users.map(user => {
            return (
              <TableRow key={user.uid} className="h-[48px]">
                {/* NAME */}
                <TableCell className="my-6 content-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6 rounded-full p-0">
                      {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                      <AvatarFallback>{getInitials(user.uid!, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="truncate whitespace-nowrap text-sm font-medium text-foreground-8">{user.uid}</span>
                  </div>
                </TableCell>

                {/* EMAIL */}
                <TableCell className="my-6 content-center">
                  <div className="flex gap-1.5">
                    <span className="truncate whitespace-nowrap text-sm text-foreground-3">{user.email}</span>
                  </div>
                </TableCell>

                {/* ROLE BINDING */}
                <TableCell className="my-6 content-center">
                  <div className="flex gap-1.5">
                    <Badge variant="outline" size="sm" theme={user.admin ? 'emphasis' : 'destructive'}>
                      {user.admin ? 'Admin' : 'User'}
                    </Badge>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <MoreActionsTooltip
                    isInTable
                    actions={[
                      {
                        title: user.admin ? 'Remove admin' : 'Set as Admin',
                        onClick: () => handleDialogOpen(user, DialogLabels.TOGGLE_ADMIN)
                      },
                      {
                        title: 'Reset password',
                        onClick: () => handleDialogOpen(user, DialogLabels.RESET_PASSWORD)
                      },
                      {
                        title: 'Edit user',
                        onClick: () => handleDialogOpen(user, DialogLabels.EDIT_USER)
                      },
                      {
                        isDanger: true,
                        title: 'Delete user',
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

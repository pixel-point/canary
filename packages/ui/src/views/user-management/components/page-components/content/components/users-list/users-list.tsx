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
  TableRow,
  Text
} from '@/components'
import { getInitials } from '@/utils/utils'
import { PageProps } from '@/views/user-management/components/page-components/content/components/users-list/types'
import { DialogLabels } from '@/views/user-management/types'

export const UsersList = ({ users, handleDialogOpen }: PageProps) => {
  return (
    <Table variant="asStackedList">
      <TableHeader className="h-[46px]">
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role binding</TableHead>
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
                    <Text size={2} weight="medium" wrap="nowrap" truncate className="text-primary">
                      {user.uid}
                    </Text>
                  </div>
                </TableCell>

                {/* EMAIL */}
                <TableCell className="my-6 content-center">
                  <div className="flex gap-1.5">
                    <Text wrap="nowrap" size={1} truncate className="text-tertiary-background">
                      {user.email}
                    </Text>
                  </div>
                </TableCell>

                {/* ROLE BINDING */}
                <TableCell className="my-6 content-center">
                  <div className="flex gap-1.5">
                    <Text wrap="nowrap" size={1} truncate className="text-tertiary-background">
                      {user.admin && (
                        <Badge
                          variant="outline"
                          size="xs"
                          className="bg-tertiary-background/10 text-tertiary-background m-auto ml-2 h-5 rounded-full p-2 text-center text-xs font-normal"
                        >
                          Admin
                        </Badge>
                      )}
                    </Text>
                  </div>
                </TableCell>

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
                        title: 'Delete User',
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

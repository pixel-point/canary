import { useState } from 'react'
import { Spacer, Text, ListActions, SearchBox, Button } from '@harnessio/canary'
import pluralize from 'pluralize'
import {
  SandboxLayout,
  SkeletonList,
  NoData,
  MembersList,
  FormEditMemberDialog,
  FormDeleteMemberDialog,
  useCommonFilter,
  PaginationComponent,
  MembersProps
} from '@harnessio/playground'
import {
  useMembershipListQuery,
  TypesMembershipUser,
  EnumMembershipRole,
  MembershipListQueryQueryParams
} from '@harnessio/code-service-client'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import { Link } from 'react-router-dom'
import { timeAgoFromEpochTime } from '../pipeline-edit/utils/time-utils'
import { useQueryState, parseAsInteger } from 'nuqs'
import { PageResponseHeader } from '../../types'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

const ProjectSettingsMemebersPage = () => {
  const space_ref = useGetSpaceURLParam()
  const [totalMembers, setTotalMembers] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [dialogState, setDialogState] = useState({
    isDialogEditOpen: false,
    isDialogDeleteOpen: false,
    selectedMember: null as { display_name: string; role: string; email: string } | null
  })

  const { sort, query: currentQuery } = useCommonFilter<MembershipListQueryQueryParams['sort']>()
  const [query, _] = useQueryState('query', { defaultValue: currentQuery || '' })
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const { isLoading, data: { body: members, headers } = {} } = useMembershipListQuery(
    { space_ref: space_ref ?? '', queryParams: { query, sort } },
    {
      onSuccess: ({ body: members }) => {
        setTotalMembers(members.length) // Update total members count
      }
    }
  )

  const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setDialogState(prev => ({ ...prev, isDialogDeleteOpen: false, selectedMember: null }))
    }, 2000)
  }

  const handleRoleSave = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setDialogState(prev => ({ ...prev, isDialogEditOpen: false, selectedMember: null }))
    }, 2000)
  }

  const renderMemberListContent = () => {
    if (isLoading) return <SkeletonList />
    if (!members?.length) {
      return (
        //add this layout to target the content in the center of the page without header and subheader
        <SandboxLayout.Main hasLeftPanel>
          <SandboxLayout.Content maxWidth="3xl" className="h-screen">
            <NoData
              iconName="no-data-members"
              title="No Members yet"
              description={['Add your first team members by inviting them to join this project.']}
              primaryButton={{ label: 'Invite new members' }}
            />
          </SandboxLayout.Content>
        </SandboxLayout.Main>
      )
    }
    return (
      <>
        <MembersList
          members={members.map((member: TypesMembershipUser) => ({
            display_name: member.principal?.display_name ?? '',
            role: member.role as EnumMembershipRole | string,
            email: member.added_by?.email ?? '',
            avatarUrl: '',
            timestamp: member.created ? timeAgoFromEpochTime(member.created) : 'no time available'
          }))}
          onEdit={(member: MembersProps) =>
            setDialogState({
              ...dialogState,
              isDialogEditOpen: true,
              selectedMember: {
                display_name: member.display_name,
                role: member.role === 'space_owner' ? 'Owner' : member.role,
                email: member.email
              }
            })
          }
          onDelete={(member: MembersProps) =>
            setDialogState({
              ...dialogState,
              isDialogDeleteOpen: true,
              selectedMember: member
            })
          }
        />
        {/* TODO Delete Dialog: error & delete updated*/}
        {dialogState.isDialogDeleteOpen && dialogState.selectedMember && (
          <FormDeleteMemberDialog
            isDeleting={isDeleting}
            deleteSuccess={!isDeleting}
            member={{ ...dialogState.selectedMember, email: dialogState.selectedMember.email }} // Add the 'email' property
            onDelete={handleDelete}
            onClose={() => setDialogState(prev => ({ ...prev, isDialogDeleteOpen: false }))}
          />
        )}

        {/* TODO: Edit Dialog: error & edit updated*/}
        {dialogState.isDialogEditOpen && dialogState.selectedMember && (
          <FormEditMemberDialog
            isSubmitting={isSubmitting}
            submitted={!isSubmitting}
            member={dialogState.selectedMember}
            onSave={handleRoleSave}
            onClose={() => setDialogState(prev => ({ ...prev, isDialogEditOpen: false }))}
          />
        )}
      </>
    )
  }

  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="3xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Team
        </Text>
        <Text size={5} weight={'medium'} color="tertiaryBackground">
          {totalMembers ? `, ${totalMembers} ${pluralize('member', totalMembers)}` : ''}
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search Members" />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="All Team Roles" items={filterOptions} />
            <ListActions.Dropdown title="Last added" items={sortOptions} />
            <Link to={`/spaces/${space_ref}/settings/members/create`}>
              <Button variant="default">Invite New Members</Button>
            </Link>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderMemberListContent()}
        <Spacer size={8} />
        {totalPages > 1 && (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={page}
            goToPage={(pageNum: number) => setPage(pageNum)}
          />
        )}
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { ProjectSettingsMemebersPage }

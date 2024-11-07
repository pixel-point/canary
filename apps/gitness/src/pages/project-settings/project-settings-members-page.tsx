import { useState, useCallback } from 'react'
import { Spacer, Text, ListActions, SearchBox, Button } from '@harnessio/canary'
import debounce from 'lodash-es/debounce'
import {
  SandboxLayout,
  SkeletonList,
  NoData,
  MembersList,
  FormDeleteMemberDialog,
  useCommonFilter,
  PaginationComponent,
  Filter
} from '@harnessio/playground'
import {
  useMembershipListQuery,
  TypesMembershipUser,
  EnumMembershipRole,
  MembershipListQueryQueryParams,
  useMembershipUpdateMutation,
  useMembershipDeleteMutation
} from '@harnessio/code-service-client'
import { useGetSpaceURLParam } from '../../framework/hooks/useGetSpaceParam'
import { Link } from 'react-router-dom'
import { timeAgoFromEpochTime } from '../pipeline-edit/utils/time-utils'
import { useQueryState, parseAsInteger } from 'nuqs'
import { PageResponseHeader } from '../../types'
import { DialogState } from './types'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const SortOptions = [
  { name: 'Name', value: 'name' },
  { name: 'Created', value: 'created' }
]

const ProjectSettingsMemebersPage = () => {
  const space_ref = useGetSpaceURLParam()

  const [dialogState, setDialogState] = useState<DialogState>({
    isDialogDeleteOpen: false,
    selectedMember: null
  })

  const { sort, query: currentQuery } = useCommonFilter<MembershipListQueryQueryParams['sort']>()
  const [query, setQuery] = useQueryState('query', {
    defaultValue: currentQuery || ''
  })
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  // Define the query parameters for useMembershipListQuery
  const queryParams: MembershipListQueryQueryParams = {
    query,
    order: 'asc',
    sort,
    page,
    limit: 30
  }

  const {
    isLoading,
    data: { body: membersData, headers } = {},
    refetch
  } = useMembershipListQuery({ space_ref: space_ref ?? '', queryParams: queryParams })

  const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')

  // edit api call
  const { mutateAsync: updateRole } = useMembershipUpdateMutation(
    { space_ref },
    {
      onError: error => {
        //no design nere
        alert('Error updating membership role: ' + error.message)
      }
    }
  )

  // delete api call
  const {
    isLoading: deleteLoading,
    mutateAsync: deleteMember,
    isSuccess: deleteSuccess
  } = useMembershipDeleteMutation(
    { space_ref: space_ref, user_uid: dialogState.selectedMember?.uid ?? '' },
    {
      onError: error => {
        //no design here
        alert('Error deleting membership role: ' + error.message)
      }
    }
  )

  const handleDelete = async () => {
    if (dialogState.selectedMember?.uid) {
      await deleteMember({ user_uid: dialogState.selectedMember.uid })
      refetch()
      setDialogState(prev => ({
        ...prev,
        isDialogDeleteOpen: false,
        selectedMember: null
      }))
    }
  }

  const handleRoleChange = async (user_uid: string, newRole: EnumMembershipRole) => {
    const owners = membersData?.filter(member => (member.role as EnumMembershipRole) === 'space_owner') ?? []
    const isOnlyOwner = owners.length === 1
    const isCurrentUserOwner = owners.some(member => member.principal?.uid === user_uid)

    // Check if the current user is the only owner and is trying to change their role
    if (isOnlyOwner && isCurrentUserOwner && newRole !== 'space_owner') {
      alert('Cannot change role. At least one owner is required.')
      return
    }

    // Proceed with the role change if validation passes
    await updateRole({ user_uid, body: { role: newRole } })
    refetch()
  }

  // Debounce the search term change to avoid frequent updates
  const debouncedSetQuery = useCallback(
    debounce(term => setQuery(term), 300), // 300 ms debounce delay
    [setQuery]
  )

  // Update search term on input change and debounce the API call
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value
    setQuery(newTerm)
    debouncedSetQuery(newTerm)
  }

  const renderMemberListContent = () => {
    if (isLoading) return <SkeletonList />
    if (!membersData?.length) {
      if (query) {
        return (
          <NoData
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButton={{ label: 'Clear search' }}
            secondaryButton={{ label: 'Clear filters' }}
          />
        )
      }
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
          members={membersData.map((member: TypesMembershipUser) => ({
            display_name: member.principal?.display_name ?? '',
            role: member.role === 'space_owner' ? 'Owner' : (member.role ?? ''), // Ensure role is always a string
            email: member.added_by?.email ?? '',
            avatarUrl: '',
            timestamp: member.created ? timeAgoFromEpochTime(member.created) : 'No time available',
            uid: member.principal?.uid ?? ''
          }))}
          onEdit={member => handleRoleChange(member.uid, member.role as EnumMembershipRole)}
          onDelete={member =>
            setDialogState({
              ...dialogState,
              isDialogDeleteOpen: true,
              selectedMember: member
            })
          }
        />
        {dialogState.isDialogDeleteOpen && dialogState.selectedMember && (
          <FormDeleteMemberDialog
            isDeleting={deleteLoading}
            deleteSuccess={deleteSuccess}
            member={{
              ...dialogState.selectedMember,
              email: dialogState.selectedMember.email,
              uid: dialogState.selectedMember.uid // Add the 'uid' property
            }}
            onDelete={handleDelete}
            onClose={() => setDialogState(prev => ({ ...prev, isDialogDeleteOpen: false }))}
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
          , {membersData?.length ?? ''} members
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search Members" handleChange={handleInputChange} defaultValue={query} />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="All Team Roles" items={filterOptions} />
            <Filter showSearch={false} sortOptions={SortOptions} />
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

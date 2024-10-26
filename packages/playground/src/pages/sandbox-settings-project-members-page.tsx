import React, { useState, useReducer } from 'react'
import { Spacer, Text, ListActions, SearchBox, Button } from '@harnessio/canary'
import { SandboxLayout, SkeletonList, NoData } from '..'
import { mockMemberData } from '../data/mockMembersData'
import { MembersList } from '../components/project-settings/members-list'
import { PlaygroundListSettings } from '../settings/list-settings'
import { PaginationComponent } from '../components/pagination'
import { useNavigate } from 'react-router-dom'
import {
  dialogStateReducer,
  initialDialogState
} from '../components/project-settings/members-reducers/dialog-state-reducers'
import { FormEditMemberDialog } from '../components/project-settings/form-member-edit-dialog'
import { FormDeleteMemberDialog } from '../components/project-settings/form-member-delete-dialog'
import { DialogType, ActionType } from '../components/project-settings/interfaces'
const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
import { MembersProps } from '../components/project-settings/interfaces'

function SandboxSettingsProjectMembersPage() {
  const navigate = useNavigate()
  const [loadState, setLoadState] = useState('data-loaded')
  const [dialogState, dispatch] = useReducer(dialogStateReducer, initialDialogState)

  const openDialog = (dialogType: DialogType, member: MembersProps) => {
    dispatch({ type: ActionType.OPEN_DIALOG, dialogType, member })
  }

  const closeDialog = (dialogType: DialogType) => {
    dispatch({ type: ActionType.CLOSE_DIALOG, dialogType })
  }

  // Delete project handler
  const handleDelete = () => {
    dispatch({ type: ActionType.START_DELETING })

    setTimeout(() => {
      dispatch({ type: ActionType.DELETE_SUCCESS })
      closeDialog(DialogType.DELETE)
      dispatch({ type: ActionType.RESET_DELETE })
    }, 2000)
  }

  const handleRoleSave = () => {
    dispatch({ type: ActionType.START_SUBMITTING })

    setTimeout(() => {
      dispatch({ type: ActionType.SUBMIT_SUCCESS })
      closeDialog(DialogType.EDIT)
      dispatch({ type: ActionType.RESET_SUBMIT })
    }, 2000)
  }

  const renderMemberListContent = () => {
    switch (loadState) {
      case 'loading':
        return <SkeletonList />
      case 'data-loaded':
        return (
          <>
            <MembersList
              onEdit={member => openDialog(DialogType.EDIT, member)}
              onDelete={member => openDialog(DialogType.DELETE, member)}
              members={mockMemberData as MembersProps[]}
            />
            {/* Delete Dialog */}
            {dialogState.isDialogDeleteOpen && (
              <FormDeleteMemberDialog
                isDeleting={dialogState.isDeleting}
                deleteSuccess={dialogState.deleteSuccess}
                onDelete={handleDelete}
                member={dialogState.deleteMember!}
                onClose={() => {
                  closeDialog(DialogType.DELETE)
                  dispatch({ type: ActionType.RESET_DELETE })
                }}
              />
            )}
            {/* Edit Dialog */}
            {dialogState.isDialogEditOpen && dialogState.editMember && (
              <FormEditMemberDialog
                member={dialogState.editMember}
                onSave={handleRoleSave}
                onClose={() => {
                  closeDialog(DialogType.EDIT)
                  dispatch({ type: ActionType.RESET_SUBMIT })
                }}
                isSubmitting={dialogState.isSubmitting}
                submitted={dialogState.submitted}
              />
            )}
          </>
        )
      case 'no-search-matches':
        return (
          <>
            <Spacer size={10} />
            <NoData
              iconName="no-search-magnifying-glass"
              title="No search results"
              description={['Check your spelling and filter options,', 'or search for a different keyword.']}
              primaryButton={{ label: 'Clear search' }}
              secondaryButton={{ label: 'Clear filters' }}
            />
          </>
        )
    }
  }

  if (loadState === 'no-data') {
    return (
      //add this layout to target the content in the center of the page without header and subheader
      <SandboxLayout.Main hasLeftPanel>
        <SandboxLayout.Content maxWidth="3xl" className="h-screen">
          <NoData
            iconName="no-data-members"
            title="No Members yet"
            description={['Add your first team members by inviting them to join this project.']}
            primaryButton={{ label: 'Invite new members', to: '/sandbox/settings/project/create-new-member' }}
          />
          <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    )
  }

  const handleInviteClick = () => {
    navigate('/sandbox/settings/project/create-new-member')
  }

  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="3xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Team
        </Text>
        <Text size={5} weight={'medium'} color="tertiaryBackground">
          {loadState === 'data-loaded' || loadState === 'no-search-matches' ? ', 30 members' : ''}
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search Members" />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="All Team Roles" items={filterOptions} />
            <ListActions.Dropdown title="Last added" items={sortOptions} />
            <Button variant="default" onClick={handleInviteClick}>
              Invite New Members
            </Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderMemberListContent()}
        <Spacer size={8} />
        {loadState === 'data-loaded' && (
          <PaginationComponent
            totalPages={10}
            currentPage={5}
            nextPage={() => {}}
            previousPage={() => {}}
            handleClick={() => {}}
          />
        )}
        <PlaygroundListSettings loadState={loadState} setLoadState={setLoadState} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsProjectMembersPage }

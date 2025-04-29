import { Drawer } from '@components/drawer'
import { defaultTo } from 'lodash-es'

import mockDelegatesList from '../../../../../../apps/design-system/src/subjects/views/delegates/mock-delegates-list.json'
import { getMatchedDelegatesCount, isDelegateSelected } from '../utils'
import { useTranslationStore } from './../../../../../../apps/design-system/src/utils/viewUtils'
import { DelegateSelectorForm, DelegateSelectorFormFields } from './delegate-selector-form'

const delegatesData = mockDelegatesList.map(delegate => ({
  groupId: delegate.groupId,
  groupName: delegate.groupName,
  lastHeartBeat: delegate.lastHeartBeat,
  activelyConnected: delegate.activelyConnected,
  groupCustomSelectors: delegate.groupCustomSelectors || [],
  groupImplicitSelectors: [...Object.keys(defaultTo(delegate.groupImplicitSelectors, {}))]
}))

const mockTagsList = [
  'sanity-windows',
  'eightfivetwoold',
  'qa-automation',
  'sanity',
  'self-hosted-vpc-delegate',
  'local',
  '_testDocker',
  'myrunner',
  'macos-arm64',
  'west1-delegate-qa',
  'linux-amd64',
  'eightfivetwo',
  'automation-eks-delegate'
]

/* ----------  DRAWER COMPONENT  -------------- */
interface DrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
  preSelectedTags: string[]
  onSubmit: (data: DelegateSelectorFormFields) => void
  disableAnyDelegate?: boolean
}

export const DelegateSelectorDrawer = ({
  open,
  setOpen,
  preSelectedTags,
  onSubmit,
  disableAnyDelegate
}: DrawerProps) => (
  <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
    <Drawer.Content className="flex h-full w-1/2 flex-col p-0">
      <Drawer.Header className="border-cn-borders-3 sticky top-0 border-b p-4">
        <Drawer.Title className="text-cn-foreground-1 text-xl">Delegate selector</Drawer.Title>
        <Drawer.Close onClick={() => setOpen(false)} />
      </Drawer.Header>

      <DelegateSelectorForm
        delegates={delegatesData}
        tagsList={mockTagsList}
        useTranslationStore={useTranslationStore}
        isLoading={false}
        onFormSubmit={onSubmit}
        onBack={() => setOpen(false)}
        isDelegateSelected={isDelegateSelected}
        getMatchedDelegatesCount={getMatchedDelegatesCount}
        preSelectedTags={preSelectedTags}
        disableAnyDelegate={disableAnyDelegate}
      />
    </Drawer.Content>
  </Drawer.Root>
)

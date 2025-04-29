import { Drawer, Icon, StyledLink } from '@/components'
import { DelegateSelectorForm, DelegateSelectorFormFields, TranslationStore } from '@/views'

import { DelegateItem } from '../types'
import { getMatchedDelegatesCount, isDelegateSelected } from '../utils'

interface DrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
  preSelectedTags: string[]
  tagsList: string[]
  onSubmit: (data: DelegateSelectorFormFields) => void
  useTranslationStore: () => TranslationStore
  delegatesData: DelegateItem[]
  disableAnyDelegate?: boolean
}

const DelegateSelectorDrawer = ({
  open,
  setOpen,
  preSelectedTags,
  tagsList,
  onSubmit,
  useTranslationStore,
  disableAnyDelegate,
  delegatesData
}: DrawerProps) => (
  <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
    <Drawer.Content className="w-1/2">
      <Drawer.Header>
        <Drawer.Title>Delegate selector</Drawer.Title>
      </Drawer.Header>

      <div className="flex">
        Haven&apos;t installed a delegate yet?
        <StyledLink className="ml-1 flex flex-row items-center" variant="accent" to="#">
          Install delegate <Icon name="attachment-link" className="ml-1" size={12} />
        </StyledLink>
      </div>

      <DelegateSelectorForm
        delegates={delegatesData}
        tagsList={tagsList}
        useTranslationStore={useTranslationStore}
        isLoading={false}
        onFormSubmit={onSubmit}
        onBack={() => setOpen(false)}
        isDelegateSelected={isDelegateSelected}
        getMatchedDelegatesCount={getMatchedDelegatesCount}
        preSelectedTags={preSelectedTags}
        disableAnyDelegate={disableAnyDelegate}
      />

      <Drawer.Footer>
        <Drawer.Close onClick={() => setOpen(false)} />
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
)

export { DelegateSelectorDrawer }

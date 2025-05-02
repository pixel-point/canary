import { FC } from 'react'

import { Drawer, Icon, StyledLink } from '@/components'
import { DelegateSelectorForm, DelegateSelectorFormFields, TranslationStore } from '@/views'

import { DelegateItem } from '../types'

interface DelegateSelectorDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
  preSelectedTags: string[]
  tagsList: string[]
  onSubmit: (data: DelegateSelectorFormFields) => void
  useTranslationStore: () => TranslationStore
  delegatesData: DelegateItem[]
  disableAnyDelegate?: boolean
}

const DelegateSelectorDrawer: FC<DelegateSelectorDrawerProps> = ({
  open,
  setOpen,
  preSelectedTags,
  tagsList,
  onSubmit,
  useTranslationStore,
  disableAnyDelegate,
  delegatesData
}) => (
  <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
    <Drawer.Content className="w-[716px]">
      <Drawer.Header>
        <Drawer.Title>Delegate selector</Drawer.Title>
        <Drawer.Close className="sr-only" onClick={() => setOpen(false)} />
      </Drawer.Header>

      <Drawer.Inner>
        <div className="px-6 pt-5 leading-[18px]">
          Haven&apos;t installed a delegate yet?
          <StyledLink className="ml-1 inline-flex items-center" variant="accent" to="#">
            Install delegate <Icon name="attachment-link" className="ml-2" size={12} />
          </StyledLink>
        </div>

        <DelegateSelectorForm
          delegates={delegatesData}
          tagsList={tagsList}
          useTranslationStore={useTranslationStore}
          isLoading={false}
          onFormSubmit={onSubmit}
          onBack={() => setOpen(false)}
          preSelectedTags={preSelectedTags}
          disableAnyDelegate={disableAnyDelegate}
          FooterWrapper={Drawer.Footer}
        />
      </Drawer.Inner>
    </Drawer.Content>
  </Drawer.Root>
)

export { DelegateSelectorDrawer }

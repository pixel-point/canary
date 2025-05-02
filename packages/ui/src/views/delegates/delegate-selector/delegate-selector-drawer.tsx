import { FC } from 'react'

import { TranslationStore } from '@/views'
import { Drawer } from '@components/drawer'

import { DelegateItem } from '../types'
import { getMatchedDelegatesCount, isDelegateSelected } from '../utils'
import { DelegateSelectorForm, DelegateSelectorFormFields } from './delegate-selector-form'

interface DrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
  delegates: DelegateItem[]
  tagsList: string[]
  preSelectedTags: string[]
  useTranslationStore: () => TranslationStore
  onSubmit: (data: DelegateSelectorFormFields) => void
  disableAnyDelegate?: boolean
}

export const DelegateSelectorDrawer: FC<DrawerProps> = ({
  open,
  setOpen,
  delegates,
  tagsList,
  preSelectedTags,
  useTranslationStore,
  onSubmit,
  disableAnyDelegate
}) => (
  <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
    <Drawer.Content className="flex h-full flex-col p-0" style={{ width: 716 }}>
      <Drawer.Header className="border-cn-borders-3 sticky top-0 border-b px-6 py-5">
        <Drawer.Title className="text-cn-foreground-1 text-xl font-medium">Delegate selector</Drawer.Title>
        <Drawer.Close onClick={() => setOpen(false)} className="sr-only" />
      </Drawer.Header>

      <DelegateSelectorForm
        delegates={delegates}
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
    </Drawer.Content>
  </Drawer.Root>
)

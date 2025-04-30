import { FC } from 'react'

import { Drawer, Icon, ScrollArea, StyledLink } from '@/components'
import { DelegateItem, DelegateSelectorForm, DelegateSelectorFormFields, TranslationStore } from '@/views'

/* ----------  DRAWER COMPONENT  -------------- */
interface DrawerProps {
  open: boolean
  tagsList: string[]
  delegatesData: DelegateItem[]
  setOpen: (open: boolean) => void
  preSelectedTags: string[]
  onSubmit: (data: DelegateSelectorFormFields) => void
  disableAnyDelegate?: boolean
  useTranslationStore: () => TranslationStore
}

export const DelegateSelectorDrawer: FC<DrawerProps> = ({
  open,
  setOpen,
  onSubmit,
  tagsList,
  delegatesData,
  preSelectedTags,
  disableAnyDelegate,
  useTranslationStore
}: DrawerProps) => (
  <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
    <Drawer.Content className="flex h-full w-[716px] flex-col p-0">
      <Drawer.Header className="border-cn-borders-3 border-b px-6 py-5">
        <Drawer.Title className="text-cn-foreground-1 text-xl font-normal leading-[25px]">
          Delegate selector
        </Drawer.Title>
      </Drawer.Header>

      <ScrollArea>
        <div className="flex grow flex-col overflow-auto pb-7">
          <div className="flex flex-wrap px-6 pb-6 pt-5 leading-[18px]">
            <p className="m-0 p-0">Haven&apos;t installed a delegate yet?</p>
            <StyledLink
              className="text-cn-foreground-accent ml-1 flex flex-row items-center gap-x-1 font-semibold"
              variant="accent"
              to="#"
            >
              Install delegate <Icon name="attachment-link" size={12} />
            </StyledLink>
          </div>

          <DelegateSelectorForm
            tagsList={tagsList}
            delegates={delegatesData}
            isLoading={false}
            onFormSubmit={onSubmit}
            onBack={() => setOpen(false)}
            preSelectedTags={preSelectedTags}
            disableAnyDelegate={disableAnyDelegate}
            useTranslationStore={useTranslationStore}
          />
        </div>
      </ScrollArea>

      <Drawer.Footer>
        <Drawer.Close className="sr-only" onClick={() => setOpen(false)} />
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
)

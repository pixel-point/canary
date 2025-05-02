import { FC, useCallback, useMemo, useState } from 'react'

import { TranslationStore } from '@/views'
import { Button } from '@components/button'
import { ButtonGroup } from '@components/button-group'
import { Drawer } from '@components/drawer'
import { ControlGroup } from '@components/form-primitives'
import { Icon } from '@components/icon'
import { ScrollArea } from '@components/scroll-area'
import { StyledLink } from '@components/styled-link'

import { DelegateItem } from '../types'
import { getDefaultFormValues, getMatchedDelegatesCount, isDelegateSelected } from '../utils'
import { DelegateSelectionTypes, DelegateSelectorForm, type DelegateSelectorFormFields } from './delegate-selector-form'

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
}) => {
  const [{ type: delegateType, tags: selectedTags }, setFormState] = useState(
    getDefaultFormValues(preSelectedTags, disableAnyDelegate)
  )

  const matchedDelegates = useMemo(
    () => getMatchedDelegatesCount(delegates, selectedTags?.map(tag => tag.id) ?? []),
    [delegates, selectedTags]
  )

  const handleBack = useCallback(() => setOpen(false), [setOpen])
  const handleChangeFields = useCallback(data => {
    setFormState(data)
  }, [])

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
      <Drawer.Content className="flex h-full w-[716px] flex-col p-0">
        <Drawer.Header className="border-cn-borders-3 sticky top-0 border-b px-6 py-5">
          <Drawer.Title className="text-cn-foreground-1 text-xl font-medium">Delegate selector</Drawer.Title>
          <Drawer.Close onClick={handleBack} className="sr-only" />
        </Drawer.Header>

        <ScrollArea scrollThumbClassName="bg-sidebar-background-8">
          <div className="px-6 py-5">
            <span className="text-cn-foreground-4 mr-1">Haven&apos;t installed a delegate yet?</span>
            <StyledLink className="inline-flex flex-row items-center" variant="accent" to="#">
              Install delegate <Icon name="attachment-link" className="ml-1" size={12} />
            </StyledLink>
          </div>
          <DelegateSelectorForm
            delegates={delegates}
            tagsList={tagsList}
            useTranslationStore={useTranslationStore}
            isLoading={false}
            onFormSubmit={onSubmit}
            isDelegateSelected={isDelegateSelected}
            preSelectedTags={preSelectedTags}
            disableAnyDelegate={disableAnyDelegate}
            onChangeFields={handleChangeFields}
          />
        </ScrollArea>

        <div className="bg-cn-background-2 border-cn-borders-3 sticky bottom-0 z-10 border-t px-6 py-5 shadow-md">
          <ControlGroup>
            <ButtonGroup className="flex flex-row justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" form="delegate-selector-form">
                Connect&nbsp;
                {delegateType === DelegateSelectionTypes.TAGS ? matchedDelegates : 'any'}&nbsp;
                {delegateType === DelegateSelectionTypes.TAGS && matchedDelegates > 1 ? 'delegates' : 'delegate'}
              </Button>
            </ButtonGroup>
          </ControlGroup>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  )
}

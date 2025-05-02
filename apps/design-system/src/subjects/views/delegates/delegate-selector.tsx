import { useState } from 'react'

import { useTranslationStore } from '@utils/viewUtils'
import { defaultTo } from 'lodash-es'

import { StyledLink } from '@harnessio/ui/components'
import {
  DelegateItem,
  DelegateSelectionTypes,
  DelegateSelectorDrawer,
  DelegateSelectorFormFields,
  DelegateSelectorInput
} from '@harnessio/ui/views'

import mockDelegatesList from './mock-delegates-list.json'

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

const delegates: DelegateItem[] = mockDelegatesList.map(delegate => ({
  groupId: delegate.groupId,
  groupName: delegate.groupName,
  lastHeartBeat: delegate.lastHeartBeat,
  activelyConnected: delegate.activelyConnected,
  groupCustomSelectors: delegate.groupCustomSelectors || [],
  groupImplicitSelectors: [...Object.keys(defaultTo(delegate.groupImplicitSelectors, {}))]
}))

const renderSelectedValue = (type: DelegateSelectionTypes | null, tags: string[]) =>
  type === DelegateSelectionTypes.TAGS ? tags.join(', ') : type === DelegateSelectionTypes.ANY ? 'any delegate' : null

export const DelegateSelector = () => {
  /* ---- FIRST (ANY allowed) ---- */
  const [openA, setOpenA] = useState(false)
  const [typeA, setTypeA] = useState<DelegateSelectionTypes | null>(null)
  const [tagsA, setTagsA] = useState<string[]>([])

  /* ---- SECOND (ANY disabled) --- */
  const [openB, setOpenB] = useState(false)
  const [typeB, setTypeB] = useState<DelegateSelectionTypes | null>(null)
  const [tagsB, setTagsB] = useState<string[]>([])

  const handleSubmitA = ({ type, tags }: DelegateSelectorFormFields) => {
    setTypeA(type === DelegateSelectionTypes.ANY ? DelegateSelectionTypes.ANY : DelegateSelectionTypes.TAGS)
    setTagsA(type === DelegateSelectionTypes.TAGS ? tags.map(t => t.id) : [])
    setOpenA(false)
  }

  const handleSubmitB = ({ tags }: DelegateSelectorFormFields) => {
    setTypeB(DelegateSelectionTypes.TAGS)
    setTagsB(tags.map(t => t.id))
    setOpenB(false)
  }

  return (
    <div className="p-5">
      <DelegateSelectorInput
        placeholder={<StyledLink to="#"> select a delegate</StyledLink>}
        value={renderSelectedValue(typeA, tagsA)}
        label="Delegate selector"
        onClick={() => setOpenA(true)}
        onEdit={() => setOpenA(true)}
        onClear={() => setTagsA([])}
        renderValue={tag => tag}
        className="mb-8 max-w-xs"
      />

      <DelegateSelectorDrawer
        open={openA}
        setOpen={setOpenA}
        delegates={delegates}
        tagsList={mockTagsList}
        useTranslationStore={useTranslationStore}
        preSelectedTags={tagsA}
        onSubmit={handleSubmitA}
      />

      <div className="pt-10">
        <DelegateSelectorInput
          placeholder={<StyledLink to="#">select a delegate (any disabled)</StyledLink>}
          value={renderSelectedValue(typeB, tagsB)}
          label="Delegate selector"
          onClick={() => setOpenB(true)}
          onEdit={() => setOpenB(true)}
          onClear={() => setTagsB([])}
          renderValue={tag => tag}
          className="mb-8 max-w-xs"
        />

        <DelegateSelectorDrawer
          open={openB}
          setOpen={setOpenB}
          delegates={delegates}
          tagsList={mockTagsList}
          preSelectedTags={tagsB}
          useTranslationStore={useTranslationStore}
          onSubmit={handleSubmitB}
          disableAnyDelegate
        />
      </div>
    </div>
  )
}

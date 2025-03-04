import { useMemo, useRef, useState } from 'react'
import { LinkProps } from 'react-router-dom'

import { Button, DropdownMenu, Icon, ScrollArea, SearchBox, StyledLink } from '@/components'
import { useDebounceSearch } from '@/hooks'
import {
  HandleAddLabelType,
  ILabelType,
  LabelAssignmentType,
  LabelMarker,
  LabelType,
  LabelValuesType,
  LabelValueType,
  TranslationStore
} from '@/views'
import { debounce } from 'lodash-es'

import { LabelValueSelector } from './label-value-selector'

const getSelectedValueId = (label?: LabelAssignmentType) => {
  if (!!label && 'assigned_value' in label) {
    return label.assigned_value?.id ?? undefined
  }
}

export interface LabelsWithValueType extends ILabelType {
  values?: LabelValueType[]
  isCustom?: boolean
  isSelected: boolean
  selectedValueId?: number
}

interface LabelsHeaderProps {
  labelsList: ILabelType[]
  labelsValues: LabelValuesType
  selectedLabels: LabelAssignmentType[]
  addLabel?: (data: HandleAddLabelType) => void
  editLabelsProps: LinkProps
  removeLabel?: (id: number) => void
  searchQuery?: string
  setSearchQuery?: (query: string) => void
  useTranslationStore: () => TranslationStore
}

export const LabelsHeader = ({
  labelsList,
  labelsValues,
  selectedLabels,
  addLabel,
  editLabelsProps,
  removeLabel,
  searchQuery,
  setSearchQuery,
  useTranslationStore
}: LabelsHeaderProps) => {
  const { t } = useTranslationStore()
  const [labelWithValuesToShow, setLabelWithValuesToShow] = useState<LabelsWithValueType | null>(null)

  const { search, handleSearchChange, handleResetSearch } = useDebounceSearch({
    handleChangeSearchValue: setSearchQuery,
    searchValue: searchQuery
  })

  const labelsListWithValues = useMemo(() => {
    return labelsList.map(label => {
      const isCustom = label.type === LabelType.DYNAMIC
      const selectedLabel = selectedLabels.find(it => it.id === label.id)
      const labelValues = labelsValues[label.key]

      let res: LabelsWithValueType = {
        ...label,
        isSelected: !!selectedLabel,
        selectedValueId: getSelectedValueId(selectedLabel)
      }

      if (isCustom) {
        res = { ...res, isCustom: true }
      }

      if (labelValues) {
        res = { ...res, values: labelValues }
      }

      return res
    })
  }, [labelsList, labelsValues, selectedLabels])

  const handleOnSelect = (label: LabelsWithValueType) => (e: Event) => {
    e.preventDefault()

    if (label.isCustom || !!label?.values?.length) {
      setLabelWithValuesToShow(label)
      return
    }

    handleAddOrRemoveLabel({ label_id: label.id }, label.isSelected)
  }

  const handleAddOrRemoveLabel = (data: HandleAddLabelType, isSelected: boolean) => {
    if (isSelected) {
      removeLabel?.(data.label_id)
    } else {
      addLabel?.(data)
    }

    handleCloseValuesView()
  }

  const handleCloseValuesView = useRef(
    debounce(() => {
      setLabelWithValuesToShow(null)
      handleResetSearch()
    }, 300)
  ).current

  return (
    <article className="flex items-center justify-between">
      <h5 className="text-14 font-medium text-foreground-1">{t('views:pullRequests.labels')}</h5>

      <DropdownMenu.Root onOpenChange={isOpen => !isOpen && handleCloseValuesView()}>
        <DropdownMenu.Trigger asChild>
          <Button
            className="text-icons-1 hover:text-icons-2 data-[state=open]:text-icons-2"
            size="icon"
            variant="custom"
          >
            <Icon name="vertical-ellipsis" size={12} />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          className="w-80"
          align="end"
          sideOffset={-6}
          alignOffset={10}
          onCloseAutoFocus={event => event.preventDefault()} // Prevent focus on hidden content
        >
          {labelWithValuesToShow && (
            <LabelValueSelector
              useTranslationStore={useTranslationStore}
              label={labelWithValuesToShow}
              handleAddOrRemoveLabel={handleAddOrRemoveLabel}
              onSearchClean={handleCloseValuesView}
            />
          )}

          {!labelWithValuesToShow && (
            <>
              {!!setSearchQuery && (
                <>
                  <div className="px-2 py-1.5">
                    <SearchBox.Root
                      className="w-full"
                      placeholder={t('views:pullRequests.searchLabels', 'Search labels')}
                      value={search}
                      handleChange={handleSearchChange}
                      showOnFocus
                      hasSearchIcon
                    />
                  </div>
                  <DropdownMenu.Separator />
                </>
              )}

              {!!labelsListWithValues.length && (
                <ScrollArea viewportClassName="max-h-[224px]">
                  {labelsListWithValues?.map((label, idx) => (
                    <DropdownMenu.Item key={`${label.id}-${idx}`} onSelect={handleOnSelect(label)}>
                      <div className="relative grid w-full gap-y-1.5 pr-7">
                        <LabelMarker
                          color={label.color}
                          label={label.key}
                          type={label.type}
                          counter={label?.values?.length}
                        />

                        {!!label?.description && (
                          <span className="w-full truncate text-foreground-4">{label.description}</span>
                        )}

                        {label.isSelected && (
                          <Icon className="absolute right-0 top-1 text-icons-2" name="tick" size={12} />
                        )}
                      </div>
                    </DropdownMenu.Item>
                  ))}
                </ScrollArea>
              )}

              {!labelsListWithValues.length && (
                <span className="block px-5 py-4 text-center leading-tight text-foreground-2">
                  {t('views:pullRequests.noLabels', 'No labels found')}
                </span>
              )}

              <DropdownMenu.Separator />

              <div className="p-2">
                {/* TODO: replace with StyledLink variant when its update is merged (https://github.com/harness/canary/pull/1134) */}
                <StyledLink className="text-foreground-8 hover:decoration-foreground-8" {...editLabelsProps}>
                  {t('views:pullRequests.editLabels', 'Edit labels')}
                </StyledLink>
              </div>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </article>
  )
}

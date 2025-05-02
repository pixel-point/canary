import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form'

import { Alert, Fieldset, FormSeparator, FormWrapper, MultiSelect, MultiSelectOptionType, Text } from '@/components'
import { getMatchedDelegatesCount, SandboxLayout, TranslationStore } from '@/views'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioOption, RadioSelect } from '@views/components/RadioSelect'
import { z } from 'zod'

import { DelegateConnectivityList } from '../components/delegate-connectivity-list'
import { DelegateItem } from '../types'
import { getDefaultFormValues } from '../utils'

export enum DelegateSelectionTypes {
  ANY = 'any',
  TAGS = 'tags'
}

const delegateSelectorFormSchema = z
  .object({
    type: z.string(),
    tags: z.array(
      z.object({
        id: z.string(),
        label: z.string()
      })
    )
  })
  .superRefine((data, ctx) => {
    if (data.type === DelegateSelectionTypes.TAGS && data.tags?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a Tag',
        path: ['tags']
      })
    }
  })

export type DelegateSelectorFormFields = z.infer<typeof delegateSelectorFormSchema>

export interface DelegateSelectorFormProps {
  delegates: DelegateItem[]
  tagsList: string[]
  useTranslationStore: () => TranslationStore
  onFormSubmit: (data: DelegateSelectorFormFields) => void
  apiError?: string
  isLoading: boolean
  isDelegateSelected: (selectors: string[], tags: string[]) => boolean
  preSelectedTags?: string[]
  disableAnyDelegate?: boolean
  onChangeFields?: (data: DelegateSelectorFormFields) => void
}

export const DelegateSelectorForm: FC<DelegateSelectorFormProps> = ({
  delegates,
  tagsList,
  useTranslationStore,
  onFormSubmit,
  apiError = null,
  isLoading,
  isDelegateSelected,
  preSelectedTags,
  disableAnyDelegate,
  onChangeFields
}) => {
  const { t } = useTranslationStore()
  const [searchTag, setSearchTag] = useState('')
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<DelegateSelectorFormFields>({
    resolver: zodResolver(delegateSelectorFormSchema),
    mode: 'onChange',
    defaultValues: getDefaultFormValues(preSelectedTags, disableAnyDelegate)
  })

  const onSubmit: SubmitHandler<DelegateSelectorFormFields> = data => {
    onFormSubmit(data)
    reset()
  }

  const [delegateType, selectedTags] = useWatch({
    control,
    name: ['type', 'tags']
  })

  useEffect(() => {
    onChangeFields?.({ type: delegateType, tags: selectedTags })
  }, [delegateType, selectedTags, onChangeFields])

  const matchedDelegates = useMemo(
    () =>
      getMatchedDelegatesCount(
        delegates,
        selectedTags.map(tag => tag.id)
      ),
    [delegates, selectedTags]
  )

  const options: Array<RadioOption<DelegateSelectionTypes>> = useMemo(
    () => [
      {
        id: 'any',
        title: 'Any delegate',
        description: 'Use any available delegate',
        value: DelegateSelectionTypes.ANY,
        disabled: disableAnyDelegate
      },
      {
        id: 'tags',
        title: 'Delegate with tags',
        description: 'Use delegate with following tags',
        value: DelegateSelectionTypes.TAGS
      }
    ],
    [disableAnyDelegate]
  )

  const handleTagChange = useCallback(
    (option: MultiSelectOptionType) => {
      const selectedTagIds = selectedTags.map(tag => tag.id)

      setValue!(
        'tags',
        selectedTagIds.includes(option.id as string)
          ? selectedTags.filter(tag => tag.id !== option.id)
          : [
              ...selectedTags,
              {
                id: option.id as string,
                label: option.label
              }
            ],
        { shouldValidate: true }
      )
    },
    [selectedTags, setValue]
  )

  return (
    <SandboxLayout.Content className="px-6 pb-5 pt-0">
      <FormWrapper
        id="delegate-selector-form"
        className="flex h-full flex-col gap-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fieldset className="mb-0">
          <RadioSelect
            id="type"
            {...register('type')}
            options={options}
            value={delegateType}
            onValueChange={value => setValue('type', value)}
          />
        </Fieldset>

        {apiError && (
          <Alert.Container variant="destructive" className="mb-8">
            <Alert.Description>{apiError?.toString()}</Alert.Description>
          </Alert.Container>
        )}
        <FormSeparator />

        {delegateType === DelegateSelectionTypes.TAGS && (
          <>
            <Fieldset>
              {/* TAGS */}
              <MultiSelect
                {...register('tags')}
                selectedItems={selectedTags}
                t={t}
                label="Tags"
                placeholder="Enter tags"
                handleChange={handleTagChange}
                options={tagsList.map(tag => {
                  return { id: tag, label: tag }
                })}
                searchValue={searchTag}
                handleChangeSearchValue={setSearchTag}
                error={errors.tags?.message?.toString()}
              />
            </Fieldset>
            <div>
              <Text as="h2" size={3} className="mb-5 font-medium">
                Test Delegate connectivity
              </Text>
              <p className="mb-3">Matches: {matchedDelegates}</p>
              <DelegateConnectivityList
                delegates={delegates}
                useTranslationStore={useTranslationStore}
                isLoading={isLoading}
                selectedTags={selectedTags.map(tag => tag.id)}
                isDelegateSelected={isDelegateSelected}
              />
            </div>
          </>
        )}
      </FormWrapper>
    </SandboxLayout.Content>
  )
}

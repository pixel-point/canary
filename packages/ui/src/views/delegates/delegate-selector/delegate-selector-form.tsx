import { useCallback, useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import {
  Alert,
  Button,
  ButtonGroup,
  ControlGroup,
  Fieldset,
  FormSeparator,
  FormWrapper,
  Icon,
  MultiSelect,
  MultiSelectOptionType,
  StyledLink,
  Text
} from '@/components'
import { SandboxLayout, TranslationStore } from '@/views'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioOption, RadioSelect } from '@views/components/RadioSelect'
import { z } from 'zod'

import { DelegateConnectivityList } from '../components/delegate-connectivity-list'
import { DelegateItem } from '../types'

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
  onBack: () => void
  apiError?: string
  isLoading: boolean
  isDelegateSelected: (selectors: string[], tags: string[]) => boolean
  getMatchedDelegatesCount: (delegates: DelegateItem[], tags: string[]) => number
  preSelectedTags?: string[]
  disableAnyDelegate?: boolean
}

export const DelegateSelectorForm = (props: DelegateSelectorFormProps): JSX.Element => {
  const {
    delegates,
    tagsList,
    useTranslationStore,
    onFormSubmit,
    onBack,
    apiError = null,
    isLoading,
    isDelegateSelected,
    getMatchedDelegatesCount,
    preSelectedTags,
    disableAnyDelegate
  } = props
  const { t } = useTranslationStore()
  const [searchTag, setSearchTag] = useState('')
  const [matchedDelegates, setMatchedDelegates] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<DelegateSelectorFormFields>({
    resolver: zodResolver(delegateSelectorFormSchema),
    mode: 'onChange',
    defaultValues: {
      type: preSelectedTags?.length || disableAnyDelegate ? DelegateSelectionTypes.TAGS : DelegateSelectionTypes.ANY,
      tags: preSelectedTags?.length ? preSelectedTags.map(tag => ({ id: tag, label: tag })) : []
    }
  })

  const onSubmit: SubmitHandler<DelegateSelectorFormFields> = data => {
    onFormSubmit(data)
    reset()
  }

  const delegateType = watch('type')
  const selectedTags = watch('tags')

  useEffect(() => {
    setMatchedDelegates(
      getMatchedDelegatesCount(
        delegates,
        selectedTags.map(tag => tag.id)
      )
    )
  }, [getMatchedDelegatesCount, delegates, selectedTags])

  const options: Array<RadioOption<DelegateSelectionTypes>> = [
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
  ]

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
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="flex p-4">
          Haven&apos;t installed a delegate yet?
          <StyledLink className="ml-1 flex flex-row items-center" variant="accent" to="#">
            Install delegate <Icon name="attachment-link" className="ml-1" size={12} />
          </StyledLink>
        </div>
        <SandboxLayout.Content className="px-4 py-0">
          <FormWrapper id="delegate-selector-form" className="flex h-full flex-col" onSubmit={handleSubmit(onSubmit)}>
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
                <Fieldset className="py-2">
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
                <Text size={4}>Test Delegate connectivity</Text>
                <p>Matches: {matchedDelegates}</p>
                <DelegateConnectivityList
                  delegates={delegates}
                  useTranslationStore={useTranslationStore}
                  isLoading={isLoading}
                  selectedTags={selectedTags.map(tag => tag.id)}
                  isDelegateSelected={isDelegateSelected}
                />
              </>
            )}
          </FormWrapper>
        </SandboxLayout.Content>
      </div>
      <div className="bg-cn-background-2 border-cn-borders-3 sticky bottom-0 z-10 border-t p-4 shadow-md">
        <ControlGroup>
          <ButtonGroup className="flex flex-row justify-between">
            <Button type="button" variant="ghost" onClick={onBack}>
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
    </>
  )
}

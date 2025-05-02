import { FC, useCallback, useEffect, useState } from 'react'
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
  ScrollArea,
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

export const DelegateSelectorForm: FC<DelegateSelectorFormProps> = ({
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
}) => {
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
      <ScrollArea scrollThumbClassName="bg-sidebar-background-8">
        <div className="px-6 py-5">
          <span className="text-cn-foreground-4 mr-1">Haven&apos;t installed a delegate yet?</span>
          <StyledLink className="inline-flex flex-row items-center text-blue-500" variant="accent" to="#">
            Install delegate <Icon name="attachment-link" className="ml-1" size={12} />
          </StyledLink>
        </div>
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
                  <div className="mb-5">
                    <Text size={3} className="font-medium">
                      Test Delegate connectivity
                    </Text>
                  </div>
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
      </ScrollArea>
      <div className="bg-cn-background-2 border-cn-borders-3 sticky bottom-0 z-10 border-t px-6 py-5 shadow-md">
        <ControlGroup>
          <ButtonGroup className="flex flex-row justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
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

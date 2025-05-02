import { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import {
  Alert,
  Button,
  ButtonGroup,
  ControlGroup,
  Fieldset,
  FormSeparator,
  FormWrapper,
  MultiSelect,
  MultiSelectOptionType,
  Spacer,
  Text
} from '@/components'
import { SandboxLayout, TranslationStore } from '@/views'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioOption, RadioSelect } from '@views/components/RadioSelect'
import { z } from 'zod'

import { DelegateConnectivityList } from '../components/delegate-connectivity-list'
import { DelegateItem } from '../types'
import { getMatchedDelegatesCount } from '../utils'

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
  preSelectedTags?: string[]
  disableAnyDelegate?: boolean
  FooterWrapper?: React.ComponentType<{ children: React.ReactNode }>
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
    preSelectedTags,
    disableAnyDelegate,
    FooterWrapper = Fragment
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
    <SandboxLayout.Content className="h-full p-0">
      <Spacer size={6} />
      <FormWrapper className="flex h-full flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="mb-0 px-6">
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
        <FormSeparator className="mx-6" />

        {delegateType === DelegateSelectionTypes.TAGS && (
          <div className="px-6">
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
            <Text className="mb-5 mt-9 leading-none tracking-tight" size={3} weight="medium" as="p">
              Test delegate connectivity
            </Text>
            <Text className="text-cn-foreground-4 mb-3 mt-5 font-medium leading-tight" size={2} as="p">
              Matches: {matchedDelegates}
            </Text>
            <DelegateConnectivityList
              delegates={delegates}
              useTranslationStore={useTranslationStore}
              isLoading={isLoading}
              selectedTags={selectedTags.map(tag => tag.id)}
            />
          </div>
        )}

        <FooterWrapper>
          <div className="bg-cn-background-2 inset-x-0 bottom-0 px-6 py-5 shadow-md">
            <ControlGroup>
              <ButtonGroup className="flex flex-row justify-between">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button type="submit">
                  Connect&nbsp;
                  {delegateType === DelegateSelectionTypes.TAGS ? matchedDelegates : 'any'}&nbsp;
                  {delegateType === DelegateSelectionTypes.TAGS && matchedDelegates > 1 ? 'delegates' : 'delegate'}
                </Button>
              </ButtonGroup>
            </ControlGroup>
          </div>
        </FooterWrapper>
      </FormWrapper>
    </SandboxLayout.Content>
  )
}

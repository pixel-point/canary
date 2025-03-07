import { FC, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import { Alert, Button, ControlGroup, Dialog, Fieldset, FormWrapper, Input, Label, Textarea } from '@/components'
import { IBranchSelectorStore, RepoTagsStore, TranslationStore } from '@/views/repo'
import { BranchSelector } from '@/views/repo/components'
import { CreateTagFormFields, makeCreateTagFormSchema } from '@/views/repo/repo-tags/components/create-tag/schema'
import { zodResolver } from '@hookform/resolvers/zod'

const INITIAL_FORM_VALUES: CreateTagFormFields = {
  name: '',
  target: '',
  message: ''
}

interface CreateTagDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateTagFormFields) => void
  branchQuery?: string
  setBranchQuery: (query: string) => void
  useRepoBranchesStore: () => IBranchSelectorStore
  useRepoTagsStore: () => RepoTagsStore
  error?: string
  useTranslationStore: () => TranslationStore
  isLoading?: boolean
}

export const CreateTagDialog: FC<CreateTagDialogProps> = ({
  open,
  onClose,
  onSubmit,
  useRepoBranchesStore,
  useRepoTagsStore,
  error,
  useTranslationStore,
  isLoading,
  branchQuery,
  setBranchQuery
}) => {
  const { t } = useTranslationStore()
  const { defaultBranch, setSelectedBranchTag } = useRepoBranchesStore()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isSubmitSuccessful }
  } = useForm<CreateTagFormFields>({
    resolver: zodResolver(makeCreateTagFormSchema(t)),
    mode: 'onChange',
    defaultValues: INITIAL_FORM_VALUES
  })

  const resetForm = useCallback(() => {
    clearErrors()
    reset({
      ...INITIAL_FORM_VALUES,
      target: defaultBranch || ''
    })
    setSelectedBranchTag({ name: defaultBranch || '', sha: '' })
  }, [clearErrors, reset, defaultBranch, setSelectedBranchTag])

  useEffect(() => {
    if (isSubmitSuccessful) {
      resetForm()
      onClose()
    }
  }, [isSubmitSuccessful, onClose, resetForm])

  useEffect(() => {
    if (defaultBranch) {
      setValue('target', defaultBranch, { shouldValidate: true })
      setSelectedBranchTag({ name: defaultBranch, sha: '' })
    }
  }, [defaultBranch, setValue, setSelectedBranchTag])

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSelectChange = (fieldName: keyof CreateTagFormFields, value: string) => {
    setValue(fieldName, value, { shouldValidate: true })
  }

  const handleViewAllClick = (params: { viewAllUrl: string }) => {
    if (location.pathname === params.viewAllUrl) {
      // Using setTimeout to avoid conflict between DropdownMenu and Dialog closing
      // This prevents focus management issues. Without it, the dialog close, but the interface is not responsive
      setTimeout(() => {
        handleClose()
      }, 0)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Content className="max-w-xl border-border bg-background-1" aria-describedby={undefined}>
        <Dialog.Header>
          <Dialog.Title className="font-medium">{t('views:repos.createTagTitle', 'Create a tag')}</Dialog.Title>
        </Dialog.Header>

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Fieldset>
            <Input
              id="name"
              label={t('views:forms.tagName', 'Name')}
              {...register('name')}
              placeholder={t('views:forms.enterTagName', 'Enter a tag name here')}
              size="md"
              error={errors.name?.message}
              disabled={isLoading}
            />
          </Fieldset>

          <Fieldset>
            <ControlGroup>
              <Label htmlFor="target" className="mb-2.5" color="secondary">
                {t('views:forms.basedOn', 'Based on')}
              </Label>
              <BranchSelector
                useRepoBranchesStore={useRepoBranchesStore}
                useRepoTagsStore={useRepoTagsStore}
                useTranslationStore={useTranslationStore}
                onSelectBranch={value => {
                  handleSelectChange('target', value.name)
                  setSelectedBranchTag(value)
                }}
                searchQuery={branchQuery}
                setSearchQuery={setBranchQuery}
                buttonSize="md"
                dynamicWidth
                onViewAllClick={handleViewAllClick}
              />
            </ControlGroup>
          </Fieldset>

          <Fieldset>
            <Textarea
              id="description"
              {...register('message')}
              placeholder={t('views:repos.repoTagDescriptionPlaceholder', 'Enter tag description here')}
              label={t('views:repos.description', 'Description')}
              error={errors.message?.message}
              disabled={isLoading}
            />
          </Fieldset>

          {error && (
            <Alert.Container variant="destructive">
              <Alert.Title>
                {t('views:repos.error', 'Error:')} {error}
              </Alert.Title>
            </Alert.Container>
          )}

          <Dialog.Footer className="-mx-5 -mb-5">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              {t('views:repos.cancel', 'Cancel')}
            </Button>
            <Button type="submit" disabled={isLoading} loading={isLoading}>
              {isLoading
                ? t('views:repos.creatingTagButton', 'Creating tag...')
                : t('views:repos.createTagButton', 'Create tag')}
            </Button>
          </Dialog.Footer>
        </FormWrapper>
      </Dialog.Content>
    </Dialog.Root>
  )
}

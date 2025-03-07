import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Alert, Button, ControlGroup, Dialog, Fieldset, FormWrapper, Input } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { TranslationStore } from '@views/repo'
import { BranchSelector } from '@views/repo/components'
import { z } from 'zod'

import { CreateBranchDialogProps, CreateBranchFormFields } from '../types'

export const createBranchFormSchema = (t: TranslationStore['t']) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: t('views:repos.createBranchDialog.validation.name', 'Branch name is required') })
      .regex(/^[a-zA-Z0-9._-\s]+$/, {
        message: t(
          'views:repos.createBranchDialog.validation.nameRegex',
          'Name must contain only letters, numbers, and the characters: - _ .'
        )
      })
      .refine(data => !data.includes(' '), {
        message: t('views:repos.createBranchDialog.validation.noSpaces', 'Name cannot contain spaces')
      }),
    target: z
      .string()
      .min(1, { message: t('views:repos.createBranchDialog.validation.target', 'Base branch is required') })
  })

export function CreateBranchDialog({
  open,
  onClose,
  onSubmit,
  isCreatingBranch,
  error,
  useTranslationStore,
  useRepoBranchesStore,
  handleChangeSearchValue
}: CreateBranchDialogProps) {
  const { t } = useTranslationStore()
  const { setSelectedBranchTag, defaultBranch } = useRepoBranchesStore()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<CreateBranchFormFields>({
    resolver: zodResolver(createBranchFormSchema(t)),
    mode: 'onChange',
    defaultValues: {
      name: '',
      target: ''
    }
  })

  const handleClose = () => {
    clearErrors()
    reset()
    setValue('name', '', { shouldValidate: false })
    setValue('target', defaultBranch || '', { shouldValidate: false })
    setSelectedBranchTag({ name: defaultBranch || '', sha: '' })
    handleChangeSearchValue('')
    onClose()
  }

  const handleFormSubmit = async (data: CreateBranchFormFields) => {
    await onSubmit(data)

    if (!error && !isCreatingBranch) {
      handleClose()
    }
  }

  const handleSelectChange = (fieldName: keyof CreateBranchFormFields, value: string) => {
    setValue(fieldName, value, { shouldValidate: true })
  }

  useEffect(() => {
    if (defaultBranch) {
      setValue('target', defaultBranch, { shouldValidate: true })
      setSelectedBranchTag({ name: defaultBranch, sha: '' })
    }
  }, [defaultBranch, setValue])

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Content className="max-w-[460px] border-border bg-background-1" aria-describedby={undefined}>
        <Dialog.Header>
          <Dialog.Title className="font-medium">{t('views:repos.createBranchTitle', 'Create a branch')}</Dialog.Title>
        </Dialog.Header>
        <FormWrapper onSubmit={handleSubmit(handleFormSubmit)}>
          <Fieldset>
            <Input
              id="name"
              label="Branch name"
              {...register('name')}
              placeholder={t('views:forms.enterBranchName', 'Enter branch name')}
              size="md"
              error={
                errors.name?.message ? t('views:forms.createBranchError', errors.name?.message?.toString()) : undefined
              }
            />
          </Fieldset>

          <Fieldset>
            <ControlGroup>
              {/* TODO: Currently the search within BranchSelector is not working, we need to review the current passed states for it to work */}
              <BranchSelector
                useRepoBranchesStore={useRepoBranchesStore}
                useTranslationStore={useTranslationStore}
                onSelectBranch={value => {
                  handleSelectChange('target', value.name)
                  setSelectedBranchTag(value)
                }}
                setSearchQuery={handleChangeSearchValue}
                buttonSize="md"
                isBranchOnly
                dynamicWidth
              />
            </ControlGroup>
          </Fieldset>

          {error ? (
            <Alert.Container variant="destructive">
              <Alert.Title>
                {t('views:repos.error', 'Error:')} {error}
              </Alert.Title>
            </Alert.Container>
          ) : null}

          <Dialog.Footer className="-mx-5 -mb-5">
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              loading={isCreatingBranch}
              disabled={isCreatingBranch}
            >
              {t('views:repos.cancel', 'Cancel')}
            </Button>
            <Button type="submit" disabled={isCreatingBranch || !isValid}>
              {t('views:repos.createBranchButton', 'Create branch')}
            </Button>
          </Dialog.Footer>
        </FormWrapper>
      </Dialog.Content>
    </Dialog.Root>
  )
}

import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AlertDialog, Button, ControlGroup, FormWrapper, Input, Spacer, Textarea } from '@/components'
import { ApiErrorType } from '@/views'
import { zodResolver } from '@hookform/resolvers/zod'
import { TranslationStore } from '@views/repo'
import { z } from 'zod'

type SshKeyFormType = z.infer<typeof formSchema>

interface ProfileSettingsKeysCreateDialogProps {
  open: boolean
  onClose: () => void
  handleCreateSshKey: (data: SshKeyFormType) => void
  error: { type: string; message: string } | null
  useTranslationStore: () => TranslationStore
}

const formSchema = z.object({
  identifier: z.string().min(1, { message: 'Please provide a name' }),
  content: z.string().min(1, { message: 'Please add the public key' })
})

export const ProfileSettingsKeysCreateDialog: FC<ProfileSettingsKeysCreateDialogProps> = ({
  open,
  onClose,
  handleCreateSshKey,
  useTranslationStore,
  error
}) => {
  const { t } = useTranslationStore()
  const [formElement, setFormElement] = useState<HTMLFormElement | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<SshKeyFormType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      content: ''
    }
  })

  const content = watch('content')
  const identifier = watch('identifier')

  const handleFormSubmit: SubmitHandler<SshKeyFormType> = data => {
    handleCreateSshKey(data)
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{t('views:profileSettings.newSshKey', 'New SSH key')}</AlertDialog.Title>
        </AlertDialog.Header>
        <FormWrapper formRef={setFormElement} onSubmit={handleSubmit(handleFormSubmit)}>
          <ControlGroup>
            <Input
              id="identifier"
              value={identifier}
              size="md"
              {...register('identifier')}
              placeholder={t('views:profileSettings.enterNamePlaceholder', 'Enter the name')}
              label={t('views:profileSettings.newSshKey', 'New SSH key')}
              error={errors.identifier?.message?.toString()}
              autoFocus
            />
          </ControlGroup>
          <ControlGroup>
            <Textarea
              id="content"
              value={content}
              {...register('content')}
              label={t('views:profileSettings.publicKey', 'Public key')}
              error={errors.content?.message?.toString()}
            />
            {error?.type === ApiErrorType.KeyCreate && (
              <>
                <span className="text-14 text-destructive">{error.message}</span>
                <Spacer size={4} />
              </>
            )}
          </ControlGroup>
        </FormWrapper>
        <AlertDialog.Footer>
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            {t('views:profileSettings.cancel', 'Cancel')}
          </Button>
          <Button type="button" size="sm" disabled={!isValid} onClick={() => formElement?.requestSubmit()}>
            {t('views:profileSettings.saveButton', 'Save')}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

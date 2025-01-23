import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { AlertDialog, Button, ControlGroup, CopyButton, FormWrapper, Input, Text } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { IProfileSettingsStore } from '@views/profile-settings/types'
import { TranslationStore } from '@views/repo'
import { z } from 'zod'

const formSchema = z.object({
  identifier: z.string(),
  lifetime: z.string(),
  token: z.string()
})

export type TokenSuccessFormType = z.infer<typeof formSchema>

interface ProfileSettingsTokenSuccessDialogProps {
  open: boolean
  onClose: () => void
  useProfileSettingsStore: () => IProfileSettingsStore
  useTranslationStore: () => TranslationStore
}

export const ProfileSettingsTokenSuccessDialog: FC<ProfileSettingsTokenSuccessDialogProps> = ({
  open,
  onClose,
  useProfileSettingsStore,
  useTranslationStore
}) => {
  const { createdTokenData } = useProfileSettingsStore()
  const { t } = useTranslationStore()
  const { setValue } = useForm<TokenSuccessFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: createdTokenData || {
      identifier: '',
      lifetime: '',
      token: ''
    }
  })

  useEffect(() => {
    if (createdTokenData) {
      setValue('identifier', createdTokenData.identifier)
      setValue('lifetime', createdTokenData.lifetime)
      setValue('token', createdTokenData.token)
    }
  }, [createdTokenData, setValue])

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{t('views:profileSettings.createToken', 'Create a token')}</AlertDialog.Title>
        </AlertDialog.Header>
        <FormWrapper>
          <ControlGroup>
            <Input
              id="identifier"
              value={createdTokenData?.identifier}
              size="md"
              readOnly
              label={t('views:profileSettings.name', 'Name')}
              rightElement={
                <CopyButton className="absolute right-2.5 bg-background-1" name={createdTokenData?.identifier || ''} />
              }
            />
          </ControlGroup>
          <ControlGroup>
            <Input
              id="lifetime"
              value={createdTokenData?.lifetime}
              size="md"
              label={t('views:profileSettings.expiration', 'Expiration')}
              readOnly
            />
          </ControlGroup>
          <ControlGroup>
            <Input
              className="truncate"
              id="token"
              value={createdTokenData?.token}
              size="md"
              readOnly
              label={t('views:profileSettings.token', 'Token')}
              rightElement={
                <CopyButton className="absolute right-2.5 bg-background-1" name={createdTokenData?.token || ''} />
              }
            />
          </ControlGroup>
          <ControlGroup>
            <Text>
              {t(
                'views:profileSettings.tokenSuccessDescription',
                'Your token has been generated. Please make sure to copy and store your token somewhere safe, you won’t beable to see it again.'
              )}
            </Text>
          </ControlGroup>
        </FormWrapper>
        <AlertDialog.Footer>
          <Button type="button" variant="outline" size="default" onClick={onClose}>
            {t('views:profileSettings.gotItButton', 'Got it')}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

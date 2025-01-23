import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  AlertDialog,
  Button,
  ControlGroup,
  FormWrapper,
  Input,
  Select,
  SelectContent,
  SelectItem,
  Spacer,
  Text
} from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { TranslationStore } from '@views/repo'
import { z } from 'zod'

import { ApiErrorType, TokenFormType } from '../types'

interface ProfileSettingsTokenCreateDialogProps {
  open: boolean
  onClose: () => void
  handleCreateToken: (data: TokenFormType) => void
  error: { type: string; message: string } | null
  isLoading: boolean
  useTranslationStore: () => TranslationStore
}

export const tokenCreateFormSchema = z.object({
  identifier: z.string().min(1, { message: 'Please provide a name' }),
  lifetime: z.string().min(1, { message: 'Please select an expiration' })
})

const expirationOptions = [
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
  { value: '90', label: '90 days' },
  { value: 'never', label: 'Never' }
]

export const ProfileSettingsTokenCreateDialog: FC<ProfileSettingsTokenCreateDialogProps> = ({
  open,
  onClose,
  handleCreateToken,
  error,
  isLoading,
  useTranslationStore
}) => {
  const { t } = useTranslationStore()
  const [formElement, setFormElement] = useState<HTMLFormElement | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<TokenFormType>({
    resolver: zodResolver(tokenCreateFormSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      lifetime: ''
    }
  })

  const expirationValue = watch('lifetime')
  const identifier = watch('identifier')

  const handleSelectChange = (fieldName: keyof TokenFormType, value: string) => {
    setValue(fieldName, value, { shouldValidate: true })
  }

  const handleFormSubmit: SubmitHandler<TokenFormType> = data => {
    handleCreateToken(data)
  }

  const calculateExpirationDate = (lifetime: string): string => {
    if (lifetime === 'never') return ''

    const days = parseInt(lifetime, 10)
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + days)

    return expirationDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{t('views:profileSettings.createToken', 'Create a token')}</AlertDialog.Title>
        </AlertDialog.Header>
        <FormWrapper formRef={setFormElement} onSubmit={handleSubmit(handleFormSubmit)}>
          <ControlGroup>
            <Input
              id="identifier"
              value={identifier}
              size="md"
              {...register('identifier')}
              placeholder={t('views:profileSettings.enterTokenPlaceholder', 'Enter token name')}
              label={t('views:profileSettings.name', 'Name')}
              error={errors.identifier?.message?.toString()}
              autoFocus
            />
          </ControlGroup>
          <ControlGroup>
            <Select
              value={expirationValue}
              onValueChange={value => handleSelectChange('lifetime', value)}
              label={t('views:profileSettings.expiration', 'Expiration')}
              placeholder={t('views:profileSettings.select', 'Select')}
              error={errors.lifetime?.message?.toString()}
            >
              <SelectContent>
                {expirationOptions.map(expirationOption => {
                  return (
                    <SelectItem key={expirationOption.value} value={expirationOption.value}>
                      {expirationOption.label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {isValid && (
              <span className="mt-1.5">
                {watch('lifetime') === 'never' ? (
                  <Text color="tertiaryBackground">
                    {t('views:profileSettings.tokenExpiryNone', 'Token will never expire')}
                  </Text>
                ) : (
                  <Text color="tertiaryBackground">
                    {t('views:profileSettings.tokenExpiryDate', ' Token will expire on')}{' '}
                    {calculateExpirationDate(watch('lifetime'))}
                  </Text>
                )}
              </span>
            )}
            {error?.type === ApiErrorType.TokenCreate && (
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
          <Button type="button" size="sm" disabled={!isValid || isLoading} onClick={() => formElement?.requestSubmit()}>
            {!isLoading
              ? t('views:profileSettings.generateTokenButton', 'Generate Token')
              : t('views:profileSettings.generatingTokenButton', 'Generating Token...')}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

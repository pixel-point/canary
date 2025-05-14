import { FC } from 'react'

import { Button, FormInput, Icon, Select, SelectRootProps } from '@/components'
import { cn } from '@/utils'
import { ColorsEnum, TranslationStore } from '@/views'
import { TextInputProps } from '@components/form-input/components/text-input'

interface LabelFormColorAndNameGroupProps {
  className?: string
  isValue?: boolean
  useTranslationStore: () => TranslationStore
  handleDeleteValue?: () => void
  selectProps?: SelectRootProps
  inputProps?: TextInputProps
}

export const LabelFormColorAndNameGroup: FC<LabelFormColorAndNameGroupProps> = ({
  className,
  isValue = false,
  useTranslationStore,
  handleDeleteValue,
  selectProps,
  inputProps
}) => {
  const { t } = useTranslationStore()

  const isWithDeleteButton = isValue && !!handleDeleteValue

  return (
    <div
      className={cn(
        'grid grid-cols-[8rem_1fr] gap-x-2.5',
        isWithDeleteButton && 'grid-cols-[8rem_1fr_auto]',
        className
      )}
    >
      <Select.Root {...selectProps}>
        <Select.Content>
          {Object.values(ColorsEnum).map(color => (
            <Select.Item key={color} value={color}>
              <div className="flex max-w-full items-center gap-x-1.5">
                <div className={`bg-label-foreground-${color} size-2 min-h-2 min-w-2 rounded-full`} />
                <span className="truncate text-cn-foreground-3">{color}</span>
              </div>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <FormInput.Text
        placeholder={
          isValue
            ? t('views:labelData.form.colorValuePlaceholder', 'Enter value name')
            : t('views:labelData.form.colorLabelPlaceholder', 'Enter label name')
        }
        {...inputProps}
      />

      {isWithDeleteButton && (
        <Button
          className="size-4 flex-none self-center text-icons-1 hover:text-icons-2"
          variant="ghost"
          iconOnly
          onClick={handleDeleteValue}
        >
          <Icon name="close" size={14} />
        </Button>
      )}
    </div>
  )
}

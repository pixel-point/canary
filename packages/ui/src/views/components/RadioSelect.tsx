import { Icon, Option, RadioButton, RadioGroup, StackedList } from '@components/index'
import { cn } from '@utils/cn'

export interface RadioOption<T extends string> {
  id: string
  title: string
  description: string
  value: T
  disabled?: boolean
}

interface RadioSelectProps<T extends string> {
  options: RadioOption<T>[]
  value: T
  onValueChange: (value: T) => void
  id?: string
  className?: string
}

export const RadioSelect = <T extends string>({
  options,
  value,
  onValueChange,
  id,
  className
}: RadioSelectProps<T>) => {
  return (
    <RadioGroup value={value} onValueChange={onValueChange as (value: string) => void} id={id} className={className}>
      <div className="flex flex-col gap-2.5">
        {options.map(({ id, disabled, description, title, value: optionValue }) => {
          const isChecked = value === optionValue

          return (
            <Option
              key={id}
              id={id}
              control={
                <RadioButton value={value} disabled={disabled} asChild>
                  <StackedList.Root
                    className={cn('overflow-hidden w-full', {
                      'border-cn-borders-accent': isChecked
                    })}
                  >
                    <StackedList.Item
                      className={cn('cursor-pointer !rounded px-4 py-3', {
                        'bg-gradient-to-b from-white/[0.04] to-white/0': isChecked,
                        'cursor-not-allowed': disabled
                      })}
                      aria-disabled={disabled}
                      isHeader
                      isLast
                      disableHover
                      onClick={() => !disabled && onValueChange(optionValue)}
                    >
                      <StackedList.Field
                        title={<span className="font-semibold">{title}</span>}
                        description={description}
                        className={cn('gap-0', {
                          'text-cn-foreground-4': !isChecked
                        })}
                      />
                      {isChecked && <Icon name="tick" size={18} className="text-icons-8 ml-auto" />}
                    </StackedList.Item>
                  </StackedList.Root>
                </RadioButton>
              }
            />
          )
        })}
      </div>
    </RadioGroup>
  )
}

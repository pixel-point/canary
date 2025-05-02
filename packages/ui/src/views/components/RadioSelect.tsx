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
      <div className="flex flex-col gap-2">
        {options.map(option => {
          return (
            <Option
              key={option.id}
              id={option.id}
              control={
                <RadioButton
                  className="data-[state=checked]:border-icons-2 disabled:border-icons-4 relative border disabled:cursor-not-allowed"
                  value={option.value}
                  disabled={option.disabled}
                  asChild
                >
                  <StackedList.Root
                    className={cn('overflow-hidden border-cn-borders-2 w-full', {
                      'border-cn-borders-accent': value === option.value
                    })}
                  >
                    <StackedList.Item
                      className={cn('cursor-pointer !rounded px-4 py-3', {
                        'bg-gradient-to-b from-white/[0.04] to-white/0': value === option.value,
                        'cursor-not-allowed pointer-events-none': option.disabled,
                        'hover:bg-gradient-to-b hover:from-white/[0.04] hover:to-white/0':
                          value !== option.value && !option.disabled
                      })}
                      aria-disabled={option.disabled}
                      isHeader
                      isLast
                      disableHover
                      onClick={() => !option.disabled && onValueChange(option.value)}
                      actions={value === option.value ? <Icon name="tick" /> : undefined}
                    >
                      <StackedList.Field
                        title={option.title}
                        titleClassName="font-medium leading-tight"
                        description={option.description}
                        descriptionClassName={cn('leading-tight', {
                          'text-cn-foreground-4': value !== option.value,
                          '': option.disabled
                        })}
                        className={`${value !== option.value && 'text-cn-foreground-4'} gap-1`}
                      />
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

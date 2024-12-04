import { FC, ReactElement, ReactNode } from 'react'

import { Checkbox, Label, RadioButton, Text } from '@/components'
import { cn } from '@utils/cn'

type ControlType = ReactElement<typeof RadioButton> | ReactElement<typeof Checkbox>

/**
 * Interface for Option component props
 */
interface OptionProps {
  /** The radio button or checkbox control element */
  control: ControlType
  /** Unique identifier for the input */
  id: string
  /** Label text for the input */
  label?: string
  /** Optional description text or node below the label */
  description?: string | ReactNode
  /** Additional CSS classes */
  className?: string
  /** Indicates if the item is currently selected */
  ariaSelected?: boolean
}

/**
 * Individual item that contains a control (radio button or checkbox) with optional label and description
 * @component
 * @example
 * <Option
 *   control={<RadioButton value="option1" />}
 *   id="option1"
 *   label="Option 1"
 *   description="Description for Option 1"
 * />
 */
export const Option: FC<OptionProps> = ({ control, id, label, description, ariaSelected, className }) => {
  return (
    <div
      className={cn('flex items-start', className)}
      role="option"
      aria-labelledby={`${id}-label`}
      aria-selected={ariaSelected}
    >
      {control}
      <div className="flex flex-col gap-0">
        <Label htmlFor={id} className="cursor-pointer pl-4 font-medium leading-tight">
          {label}
        </Label>
        {description && (
          <Text
            className="ml-4 mt-1.5 leading-snug tracking-tight"
            as="p"
            size={2}
            color="tertiaryBackground"
            id={`${id}-description`}
            role="note"
          >
            {description}
          </Text>
        )}
      </div>
    </div>
  )
}

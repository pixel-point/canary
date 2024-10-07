import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'
import { Text } from './text'
import { Icon } from './icon'
import { CheckIcon } from '@radix-ui/react-icons'

interface DropdownItemProps {
  name: string
  value?: string
}

interface DropdownProps {
  title: string
  items: Array<DropdownItemProps>
  onChange?: (value: string) => void
  selectedValue?: string | null
}

function Root({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-6 justify-between">{children}</div>
}

function Left({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-grow gap-6 items-center">{children}</div>
}

function Right({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-6 items-center">{children}</div>
}

function Dropdown({ title, items, onChange, selectedValue }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-tertiary-background gap-1.5 hover:text-primary cursor-pointer ease-in-out duration-100">
        <Text weight={selectedValue ? 'bold' : 'normal'} size={2} className="text-primary/80">
          {title}
        </Text>
        <Icon name="chevron-down" size={12} className="chevron-down" />
      </DropdownMenuTrigger>
      {items && (
        <DropdownMenuContent align="end">
          {items.map((i, i_idx) => {
            return (
              <DropdownMenuItem className="cursor-pointer" onClick={() => onChange?.(i.value ?? i.name)} key={i_idx}>
                <div className="w-4 mr-1">{Boolean(i.value) && selectedValue === i.value ? <CheckIcon /> : null}</div>
                {i.name}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

export { Root, Left, Right, Dropdown }
export type { DropdownItemProps, DropdownProps }

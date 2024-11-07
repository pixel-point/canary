import React, { useEffect } from 'react'
import { Input } from './input'
import { Icon } from './icon'
import { Text } from './text'
import { cn } from '@/lib/utils'
import { noop } from 'lodash-es'

enum TextSize {
  'text-[12px]' = 0,
  'text-xs' = 1,
  'text-sm' = 2,
  'text-base' = 3,
  'text-xl' = 4,
  'text-2xl' = 5,
  'text-3xl' = 6,
  'text-4xl' = 7,
  'text-5xl' = 8,
  'text-6xl' = 9,
  'text-7xl' = 10,
  'text-8xl' = 11,
  'text-9xl' = 12
}

interface SearchBoxProps {
  placeholder: string
  width?: 'full' | 'fixed'
  hasShortcut?: boolean
  shortcutLetter?: string
  shortcutModifier?: string
  textSize?: TextSize
  onSearch?: () => void
  handleChange?: React.ChangeEventHandler<HTMLInputElement>
  showOnFocus?: boolean // New prop to control dialog appearance on focus
  defaultValue?: string
  className?: string
}

const Root = ({
  textSize = TextSize['text-sm'],
  placeholder,
  width = 'fixed',
  hasShortcut = false,
  shortcutLetter,
  shortcutModifier,
  onSearch,
  handleChange = noop,
  defaultValue,
  showOnFocus = false,
  className
}: SearchBoxProps) => {
  const textSizeClass = TextSize[textSize]

  const handleSearch = () => {
    if (onSearch) {
      onSearch()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleFocus = () => {
    if (showOnFocus) {
      handleSearch()
    }
  }

  useEffect(() => {
    const handleShortcutKey = (e: KeyboardEvent) => {
      if (hasShortcut && shortcutLetter && shortcutModifier) {
        const isModifierPressed =
          (shortcutModifier === 'cmd' && e.metaKey) || // For Mac Command key
          (shortcutModifier === 'ctrl' && e.ctrlKey) || // For Ctrl key on Windows/Linux
          (shortcutModifier === 'alt' && e.altKey) || // For Alt key
          (shortcutModifier === 'shift' && e.shiftKey) // For Shift key

        if (isModifierPressed && e.key.toLowerCase() === shortcutLetter.toLowerCase()) {
          e.preventDefault() // Prevent the default behavior (optional)
          handleSearch()
        }
      }
    }

    window.addEventListener('keydown', handleShortcutKey)

    return () => {
      window.removeEventListener('keydown', handleShortcutKey)
    }
  }, [hasShortcut, shortcutLetter, shortcutModifier, handleSearch])

  return (
    <div className={cn('relative', width === 'full' ? 'w-full' : 'w-96', className)}>
      <Icon
        name="search"
        size={12}
        className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-tertiary-background"
      />
      {hasShortcut && (
        <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-tertiary-background flex gap-0.5 items-center shadow-border shadow-[0_0_0_1px] rounded-sm px-1.5 opacity-80 hover:opacity-100 ease-in-out duration-100 cursor-pointer">
          <Icon name="apple-shortcut" size={12} />
          <Text size={0} color="tertiaryBackground">
            {shortcutLetter}
          </Text>
        </div>
      )}
      <Input
        placeholder={placeholder}
        // TODO: Restore the line and remove temp fix below
        // className={cn('border-input-foreground pl-7', textSizeClass, { 'pr-10': hasShortcut })}

        // Start of temporary fix
        defaultValue={defaultValue}
        className={cn('border-input-foreground', textSizeClass)}
        style={{
          paddingLeft: '1.75rem', // Equivalent to 'pl-7' in Tailwind (28px)
          paddingRight: hasShortcut ? '2.5rem' : undefined // Equivalent to 'pr-10' in Tailwind (40px) if `hasShortcut` is true
        }}
        // End of temporary fix
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onInput={handleChange}
      />
    </div>
  )
}

export { Root }

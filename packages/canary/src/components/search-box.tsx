import type { FormEventHandler, InputHTMLAttributes } from 'react'
import { useEffect } from 'react'

import { cn } from '@/lib/utils'
import { noop } from 'lodash-es'

import { Icon } from './icon'
import { Input } from './input'
import { Text } from './text'

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
  handleChange?: FormEventHandler<HTMLInputElement>
  showOnFocus?: boolean // New prop to control dialog appearance on focus
  defaultValue?: InputHTMLAttributes<HTMLInputElement>['defaultValue']
  value?: InputHTMLAttributes<HTMLInputElement>['value']
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
  value,
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
      <Icon name="search" size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-icons-1" />
      {hasShortcut && !!shortcutLetter && (
        <div className="absolute right-1.5 top-1/2 flex h-5 -translate-y-1/2 cursor-pointer items-center gap-0.5 rounded-sm border bg-background-3 px-1 text-foreground-2 duration-100 ease-in-out">
          <Icon name="apple-shortcut" size={12} />
          <Text size={0} className="text-inherit">
            {shortcutLetter}
          </Text>
        </div>
      )}
      <Input
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={cn('h-8 pl-7', { 'pr-10': hasShortcut }, textSizeClass)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onInput={handleChange}
        value={value}
      />
    </div>
  )
}

export { Root }

import { useEffect, forwardRef } from 'react'
import type { InputHTMLAttributes, ForwardedRef, ChangeEventHandler } from 'react'
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
  hasSearchIcon?: boolean
  shortcutLetter?: string
  shortcutModifier?: string
  textSize?: TextSize
  onSearch?: () => void
  handleChange?: ChangeEventHandler<HTMLInputElement>
  showOnFocus?: boolean // New prop to control dialog appearance on focus
  defaultValue?: InputHTMLAttributes<HTMLInputElement>['defaultValue']
  value?: InputHTMLAttributes<HTMLInputElement>['value']
  className?: string
}

const Root = forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      textSize = TextSize['text-sm'],
      placeholder,
      width = 'fixed',
      hasShortcut = false,
      shortcutLetter,
      shortcutModifier,
      onSearch,
      handleChange = noop,
      defaultValue,
      hasSearchIcon = true,
      value,
      showOnFocus = false,
      className
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
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
            (shortcutModifier === 'cmd' && e.metaKey) ||
            (shortcutModifier === 'ctrl' && e.ctrlKey) ||
            (shortcutModifier === 'alt' && e.altKey) ||
            (shortcutModifier === 'shift' && e.shiftKey)

          if (isModifierPressed && e.key.toLowerCase() === shortcutLetter.toLowerCase()) {
            e.preventDefault()
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
        {hasSearchIcon && (
          <Icon name="search" size={12} className="text-icons-1 absolute left-2.5 top-1/2 -translate-y-1/2" />
        )}
        {hasShortcut && !!shortcutLetter && (
          <div className="bg-background-3 text-foreground-2 absolute right-1.5 top-1/2 flex h-5 -translate-y-1/2 cursor-pointer items-center gap-0.5 rounded-sm border px-1 duration-100 ease-in-out">
            <Icon name="apple-shortcut" size={12} />
            <Text size={0} className="text-inherit">
              {shortcutLetter}
            </Text>
          </div>
        )}
        <Input
          ref={ref}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={cn('h-8', { 'pr-10': hasShortcut, 'pl-7': hasSearchIcon }, textSizeClass)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onInput={handleChange}
          value={value}
        />
      </div>
    )
  }
)

Root.displayName = 'Root'

export { Root }

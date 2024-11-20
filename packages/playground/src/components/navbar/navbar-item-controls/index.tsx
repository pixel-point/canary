import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
  Icon
} from '@harnessio/canary'
import { useState } from 'react'
import type { NavbarItem } from '../types'

export type NavbarLinkBaseProps = {
  item: NavbarItem
}

export type PinnedLinkProps = NavbarLinkBaseProps & {
  isPinned: true
  isRecent?: false
  handleUnpinItem: (item: NavbarItem) => void
  handleCustomNav: () => void
}

export type RecentLinkProps = NavbarLinkBaseProps & {
  isPinned?: false
  isRecent: true
  handlePinItem: (item: NavbarItem) => void
  handleRemoveRecentItem: (item: NavbarItem) => void
}

export type NavbarItemControlsProps = PinnedLinkProps | RecentLinkProps

export const NavbarItemControls = (props: NavbarItemControlsProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={cn(
        'absolute right-0 top-1/2 -translate-y-1/2 transition-opacity duration-200',
        isOpen ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'
      )}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="text-foreground-4 hover:text-foreground-2 size-3 rotate-90 focus:outline-none"
            size="custom"
            variant="custom">
            <Icon name="more-dots-fill" size={12} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-background-1 border-borders-1 rounded-md border p-1 shadow-lg"
          align="end"
          sideOffset={7}>
          {'isPinned' in props && props.isPinned && (
            <>
              <DropdownMenuItem onClick={props.handleCustomNav}>Reorder</DropdownMenuItem>
              <DropdownMenuItem onClick={() => props.handleUnpinItem(props.item)}>Unpin</DropdownMenuItem>
            </>
          )}
          {'isRecent' in props && props.isRecent && (
            <>
              <DropdownMenuItem onClick={() => props.handlePinItem(props.item)}>Pin</DropdownMenuItem>
              <DropdownMenuItem onClick={() => props.handleRemoveRecentItem(props.item)}>Remove</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

import { useState } from 'react'
import {
  Button,
  Icon,
  Text,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@harnessio/canary'

interface ReviewersHeaderProps {
  usersList?: { display_name?: string; id?: number; uid?: string }[]
  addReviewers?: (id?: number) => void
  refetchReviewers: () => void
  currentUserId?: string
}

const ReviewersHeader = ({ usersList, addReviewers, refetchReviewers, currentUserId }: ReviewersHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <Text size={2} weight="medium">
        Reviewers
      </Text>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button size="sm" variant="ghost" className="text-tertiary-background px-2 py-1">
            <Icon name="vertical-ellipsis" size={12} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search users..." className="h-9" />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                {usersList?.map(({ display_name, id, uid }, idx: number) => {
                  if (uid === currentUserId) return null
                  return (
                    <CommandItem
                      key={idx}
                      value={uid}
                      onSelect={() => {
                        if (display_name) {
                          addReviewers?.(id)
                          setIsOpen(false)
                          refetchReviewers?.()
                        }
                      }}>
                      {display_name}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ReviewersHeader

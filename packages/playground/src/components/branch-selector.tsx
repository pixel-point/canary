import React, { useState } from 'react'
import {
  Text,
  Icon,
  Button,
  Badge,
  DropdownMenu,
  SearchBox,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Tabs,
  TabsList,
  TabsTrigger,
  cn
} from '@harnessio/canary'
import { Link } from 'react-router-dom'
import { BranchProps } from '../types/branch'

interface BaseItem {
  name: string
}

interface BaseListProps {
  viewAllUrl: string
}

interface BranchListProps extends BaseListProps {
  items: BranchProps[]
}

interface TagListProps extends BaseListProps {
  items?: BaseItem[]
}

interface DropdownMenuExtendedContentProps {
  name: string
  branchList: BranchListProps
  tagList: TagListProps
  selectBranch: (branch: BranchProps | BaseItem) => void
}

interface BranchSelectorProps extends DropdownMenuExtendedContentProps {
  size?: 'default' | 'sm'
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'full'
  prefix?: string
  className?: string
}

enum BranchSelectorTab {
  BRANCHES = 'branches',
  TAGS = 'tags'
}

const BRANCH_SELECTOR_LABELS = {
  [BranchSelectorTab.BRANCHES]: {
    label: 'Branches',
    searchPlaceholder: 'Find a branch'
  },
  [BranchSelectorTab.TAGS]: {
    label: 'Tags',
    searchPlaceholder: 'Find a tag'
  }
} as const

const filterItems = (items: BranchProps[] | BaseItem[], query: string) => {
  if (!query.trim()) return items

  return items.filter(item => item.name.toLowerCase().includes(query.toLowerCase().trim()))
}

const DropdownMenuExtendedContent = ({ name, branchList, tagList, selectBranch }: DropdownMenuExtendedContentProps) => {
  const [activeTab, setActiveTab] = useState<BranchSelectorTab>(BranchSelectorTab.BRANCHES)
  const [searchQuery, setSearchQuery] = useState('')

  const sourceItems = activeTab === BranchSelectorTab.BRANCHES ? branchList.items : (tagList.items ?? [])
  const filteredItems = filterItems(sourceItems, searchQuery)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const viewAllUrl = activeTab === BranchSelectorTab.BRANCHES ? branchList.viewAllUrl : tagList.viewAllUrl

  return (
    <DropdownMenuContent className="w-[298px] p-0" align="start">
      <div className="px-3 pt-2">
        <Text className="leading-none" size={2} weight="medium">
          Switch branches/tags
        </Text>
        <SearchBox.Root
          className="w-full mt-[18px]"
          placeholder={BRANCH_SELECTOR_LABELS[activeTab].searchPlaceholder}
          value={searchQuery}
          handleChange={handleSearchChange}
          showOnFocus
        />
      </div>
      <Tabs
        className="mt-2"
        variant="branch"
        value={activeTab}
        onValueChange={value => {
          setActiveTab(value as BranchSelectorTab)
          setSearchQuery('')
        }}>
        <TabsList>
          <TabsTrigger className="data-[state=active]:bg-background-2" value="branches">
            Branches
          </TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-background-2" value="tags">
            Tags
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-1">
        {filteredItems.length === 0 && (
          <div className="text-center px-5 py-4">
            <Text className="text-foreground-2 leading-tight" size={2}>
              Nothing to show
            </Text>
          </div>
        )}

        <div className="max-h-[360px] overflow-y-auto px-1">
          {filteredItems.map(item => {
            const isSelected = item.name === name
            const isDefault = activeTab === BranchSelectorTab.BRANCHES && (item as BranchProps).default

            return (
              <DropdownMenuItem
                className={cn('cursor-pointer hover:bg-background-4 py-2 leading-none', {
                  'justify-between gap-x-2': isDefault,
                  'bg-background-4': isSelected,
                  'pl-7': !isSelected
                })}
                onClick={() => selectBranch(item)}
                key={item.name}>
                <div className="flex items-center w-full gap-x-2 min-w-0">
                  {isSelected && <Icon name="tick" size={12} className="min-w-[12px] text-foreground-1" />}
                  <Text
                    className={cn('text-foreground-2', {
                      'text-foreground-1': isSelected
                    })}
                    truncate>
                    {item.name}
                  </Text>
                </div>

                {isDefault && (
                  <Badge
                    className="text-foreground-3 bg-transparent font-medium"
                    variant="outline"
                    // TODO: Review and update 'muted' theme implementation
                    // Current 'muted' theme styles don't fully match the design requirements
                    // Steps before updating:
                    // 1. Audit all instances of 'muted' theme usage
                    // 2. Compare with design specs across different components
                    // 3. Ensure changes won't break existing implementations
                    // 4. Consider creating a new theme variant if changes affect existing usage
                    // 5. After theme update, remove overriding classes (text-primary-muted, bg-transparent, -tracking, font-medium)
                    //    as they should be part of the theme definition
                    theme="muted"
                    size="18"
                    borderRadius="full"
                    disableHover>
                    Default
                  </Badge>
                )}
              </DropdownMenuItem>
            )
          })}
        </div>

        <div className="px-3 py-2 mt-1 border-t border-borders-4">
          <Link to={viewAllUrl}>
            <Text className="text-ring hover:text-foreground-1 transition-colors duration-200 leading-none">
              View all {activeTab === BranchSelectorTab.BRANCHES ? 'branches' : 'tags'}
            </Text>
          </Link>
        </div>
      </div>
    </DropdownMenuContent>
  )
}

export const BranchSelector = ({
  name,
  branchList,
  tagList,
  size = 'default',
  selectBranch,
  width = 'auto',
  prefix = undefined,
  className
}: BranchSelectorProps) => {
  const widthClasses: { [key in NonNullable<BranchSelectorProps['width']>]: string } = {
    auto: 'w-auto',
    sm: 'w-16',
    md: 'w-32',
    lg: 'w-48',
    full: 'w-full'
  }

  const isTag = tagList.items?.some(tag => tag.name === name) ?? false

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            widthClasses[width],
            'overflow-hidden flex gap-1.5 items-center px-3 data-[state=open]:border-borders-8 [&_svg]:data-[state=open]:text-foreground-1',
            className
          )}
          variant="outline"
          size={size}>
          {prefix ? null : (
            <Icon className="min-w-[12px] text-icons-9 fill-transparent" name={isTag ? 'tag' : 'branch'} size={12} />
          )}
          <Text className="w-full text-primary/90" truncate align="left">
            {prefix ? `${prefix}: ${name}` : name}
          </Text>
          <Icon className="min-w-[10px] chevron-down ml-0 text-tertiary-background" name="chevron-down" size={10} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuExtendedContent branchList={branchList} tagList={tagList} name={name} selectBranch={selectBranch} />
    </DropdownMenu>
  )
}

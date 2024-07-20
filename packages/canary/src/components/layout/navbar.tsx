import companyAvatar from '@/assets/company-avatar.svg'
import userAvatar from '@/assets/user-avatar.svg'
import navItemPlaceholder from '@/assets/navbar-item-placeholder.svg'
import navMore from '@/assets/navbar-more.svg'
import React from 'react'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../accordion'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../dropdown-menu'
import { ChevronDownIcon } from '@radix-ui/react-icons'

const primaryMenuItems = [
  {
    text: 'Repositories',
    iconSrc: navItemPlaceholder
  },
  {
    text: 'Pipelines',
    iconSrc: navItemPlaceholder
  },
  {
    text: 'Executions',
    iconSrc: navItemPlaceholder
  },
  {
    text: 'Featured flags',
    iconSrc: navItemPlaceholder
  }
]

const pinnedMenuItems = [
  {
    text: 'Chaos engineering',
    iconSrc: navItemPlaceholder
  },
  {
    text: 'Environment',
    iconSrc: navItemPlaceholder
  },
  {
    text: 'Secrets',
    iconSrc: navItemPlaceholder
  },
  {
    text: 'Connectors',
    iconSrc: navItemPlaceholder
  }
]

// const moreMenuItems = [
//   {
//     text: 'Repositories',
//     iconSrc: navItemPlaceholder
//   },
//   {
//     text: 'Pipelines',
//     iconSrc: navItemPlaceholder
//   },
//   {
//     text: 'Executions',
//     iconSrc: navItemPlaceholder
//   },
//   {
//     text: 'Featured flags',
//     iconSrc: navItemPlaceholder
//   }
// ]

const secondaryMenuItems = [
  {
    text: 'System administration',
    iconSrc: navItemPlaceholder
  }
]

const SectionItem = React.memo(
  ({ iconSrc, text, active }: { iconSrc: string; text: string; active?: boolean; onClick?: () => void }) => {
    return (
      <div
        className={cn('flex gap-2.5 items-center cursor-pointer group select-none py-1.5', { 'text-primary': active })}>
        <img
          src={iconSrc}
          className={cn('navbar-section-icon opacity-100 ease-in-out duration-150', {
            'opacity-100': active,
            'group-hover:opacity-100': !active
          })}
        />
        <p
          className={cn('-tracking-[2%] ease-in-out duration-150 truncate', {
            'text-primary': active,
            'group-hover:text-primary': !active
          })}>
          {text}
        </p>
      </div>
    )
  }
)

const Company = React.memo(() => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="select-none outline-none">
        <div className="p-5 grid grid-cols-[auto_1fr_auto] items-center justify-items-start gap-2.5">
          <img src={companyAvatar} className="navbar-company-avatar" />
          <p className="text-[15px] text-primary">Pixel Point</p>
          <ChevronDownIcon className="h-3 w-3 shrink-0 text-primary transition-transform" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] p-2.5 mr-5">
        <p className="text-xs text-foreground">Nothing to see...</p>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

const PrimaryList = React.memo(() => {
  function handleMore() {}

  return (
    <div className="p-5 py-3.5 border-b border-[#18181B] flex flex-col gap-1.5">
      {primaryMenuItems.map((itm, itm_idx) => (
        <SectionItem key={itm_idx} text={itm.text} iconSrc={itm.iconSrc} active={itm_idx == 1} />
      ))}
      <SectionItem text="More" iconSrc={navMore} onClick={handleMore} />
    </div>
  )
})

const PinnedList = React.memo(() => {
  return (
    <div className="p-5 py-0.5">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="group">
            <p className="text-xs text-[#60606C] font-light group-hover:text-primary ease-in-out duration-150">
              Pinned
            </p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1.5">
            {pinnedMenuItems.map((itm, itm_idx) => (
              <SectionItem key={itm_idx} text={itm.text} iconSrc={itm.iconSrc} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
})

const SecondaryList = React.memo(() => {
  return (
    <div className="p-5 border-t border-[#18181B] flex flex-col gap-1.5">
      {secondaryMenuItems.map((itm, itm_idx) => (
        <SectionItem key={itm_idx} text={itm.text} iconSrc={itm.iconSrc} />
      ))}
    </div>
  )
})

const AIRegion = React.memo(() => {
  return <div className="py-12 px-5 flex place-content-center"></div>
})

const User = React.memo(() => {
  return (
    <div className="p-5 py-3.5 border-t border-[#18181B] grid grid-rows-2 grid-cols-[auto_1fr] gap-x-3 items-center justify-start cursor-pointer">
      <img src={userAvatar} className="col-start-1 row-span-2" />
      <p className="col-start-2 row-start-1 text-xs text-primary">Steven M.</p>
      <p className="col-start-2 row-start-2 text-xs font-light">Admin</p>
    </div>
  )
})

export default function NavBar() {
  return (
    <div className="select-none grid grid-rows-[auto_1fr_auto_auto] w-[220px] h-screen overflow-y-auto border-r border-[#18181B] bg-background text-sm text-[#AEAEB7]">
      <Company />
      <div className="grid content-start">
        <PrimaryList />
        <PinnedList />
        <SecondaryList />
      </div>
      <AIRegion />
      <User />
    </div>
  )
}

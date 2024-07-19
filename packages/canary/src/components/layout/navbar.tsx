import companyAvatar from '@/assets/company-avatar.svg'
import userAvatar from '@/assets/user-avatar.svg'
import React from 'react'
import { cn } from '@/lib/utils'

const primaryMenuItems = [
  {
    text: 'Repositories',
    iconSrc: companyAvatar
  },
  {
    text: 'Pipelines',
    iconSrc: companyAvatar
  },
  {
    text: 'Executions',
    iconSrc: companyAvatar
  },
  {
    text: 'Featured flags',
    iconSrc: companyAvatar
  }
]

const pinnedMenuItems = [
  {
    text: 'Chaos engineering',
    iconSrc: companyAvatar
  },
  {
    text: 'Environment',
    iconSrc: companyAvatar
  },
  {
    text: 'Secrets',
    iconSrc: companyAvatar
  },
  {
    text: 'Connectors',
    iconSrc: companyAvatar
  }
]

const secondaryMenuItems = [
  {
    text: 'System administration',
    iconSrc: companyAvatar
  }
]

const SectionItem = React.memo(({ iconSrc, text, active }: { iconSrc: string; text: string; active?: boolean }) => {
  return (
    <div
      className={cn('flex gap-2.5 items-center cursor-pointer group select-none py-1.5', { 'text-primary': active })}>
      <img
        src={iconSrc}
        className={cn('navbar-section-icon opacity-50 ease-in-out duration-150', {
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
})

const Company = React.memo(() => {
  return (
    <div className="p-6 py-5 flex gap-2.5">
      <img src={companyAvatar} className="navbar-company-avatar" />
      <p className="text-[15px] text-primary">Pixel Point</p>
    </div>
  )
})

const PrimaryList = React.memo(() => {
  return (
    <div className="p-6 py-5 border-b border-[#18181B] flex flex-col gap-1.5">
      {primaryMenuItems.map((itm, itm_idx) => (
        <SectionItem key={itm_idx} text={itm.text} iconSrc={itm.iconSrc} active={itm_idx == 0} />
      ))}
      <SectionItem text="More" iconSrc={companyAvatar} />
    </div>
  )
})

const PinnedList = React.memo(() => {
  return (
    <div className="p-6 py-5 flex flex-col gap-1.5">
      <p className="text-xs text-[#60606C] mb-1">Pinned</p>
      {pinnedMenuItems.map((itm, itm_idx) => (
        <SectionItem key={itm_idx} text={itm.text} iconSrc={itm.iconSrc} />
      ))}
    </div>
  )
})

const SecondaryList = React.memo(() => {
  return (
    <div className="p-6 py-5 border-t border-[#18181B] flex flex-col gap-1.5">
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
    <div className="py-6 px-5 border-t border-[#18181B] grid grid-rows-2 grid-cols-[auto_1fr] gap-x-3 items-center justify-start cursor-pointer">
      <img src={userAvatar} className="col-start-1 row-span-2" />
      <p className="col-start-2 row-start-1 text-xs text-primary">Steven M.</p>
      <p className="col-start-2 row-start-2 text-xs font-light">Admin</p>
    </div>
  )
})

export default function NavBar() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto_auto] w-[220px] h-screen overflow-y-auto border-r border-[#18181B] bg-background text-sm text-[#AEAEB7]">
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

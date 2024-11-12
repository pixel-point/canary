import React from 'react'
import { cn } from '@/lib/utils.ts'
import { Text } from '../text.tsx'
import noiseBg from './noise.png'
import { Icon } from '@/components/icon.tsx'

interface NavbarRootProps {
  className?: string
  children: React.ReactNode
  isSubMenu?: boolean
}

function Root({ className, children, isSubMenu = false }: NavbarRootProps) {
  return (
    <div
      className={cn(
        'select-none grid grid-rows-[auto_1fr_auto] w-[220px] h-screen overflow-y-auto border-r border-border-5 bg-background-7',
        { 'bg-background-7/70' : isSubMenu },
        className
      )}
    >
      {!isSubMenu && (
        <>
          <div
            className="absolute -top-[82px] left-1/2 -translate-x-1/2 h-[164px] w-[392px] rounded-[392px] z-[-1]"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, rgba(48, 48, 54, 0.4) 0%, rgba(48, 48, 54, 0) 100%)"
            }}
          />
          <div
            className="absolute -top-[51px] -left-[132px] h-[325px] w-[263px] rounded-[325px] z-[-1]"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, rgba(73, 73, 73, 0.25) 0%, rgba(73, 73, 73, 0.15) 44.95%, rgba(73, 73, 73, 0) 100%)"
            }}
          />
          <div
            className="absolute top-[22%] -right-[93px] h-[333px] w-[186px] rounded-[333px] z-[-1]"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, rgba(58, 58, 58, 0.2) 0%, rgba(58, 58, 58, 0) 100%)"
            }}
          />
          <div
            className="absolute bottom-[161px] -left-[139px] h-[362px] w-[297px] rounded-[362px] z-[-1]"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, rgba(73, 73, 73, 0.2) 0%, rgba(73, 73, 73, 0) 100%)"
            }}
          />
          <div
            className={`absolute top-0 left-0 h-full w-full z-[-1] mix-blend-overlay opacity-20 bg-repeat`}
            style={{ backgroundImage: `url(${noiseBg})` }}
          />
        </>
      )}
      {children}
    </div>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="sticky top-0 z-20 items-center grid">{children}</div>
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-w-0">{children}</div>
}

interface GroupProps {
  children: React.ReactNode
  title?: string
  topBorder?: boolean
  isSubMenu?: boolean
}

function Group({ children, title, topBorder, isSubMenu = false }: GroupProps) {
  return (
    <div
      className={cn(
        'w-full overflow-x-hidden px-5 pb-3 flex flex-col',
        { 'border-t border-border-8 pt-2.5': topBorder },
        isSubMenu ? 'pb-2.5' : 'pb-3 gap-1.5'
      )}
    >
      {title && (
        <div className={cn(
          'text-foreground-7 mt-1.5',
          isSubMenu ? 'mb-3' : 'mb-2'
        )}>
          <p className="text-xs font-normal">{title}</p>
        </div>
      )}
      {children}
    </div>
  )
}

interface ItemProps {
  icon?: React.ReactElement<SVGSVGElement>
  text: string
  description?: string
  active?: boolean
  className?: string
  submenuItem?: boolean
  onClick?: () => void
}

function Item({ icon, text, description, active, submenuItem, className }: ItemProps) {
  if (submenuItem) {
    return (
      <div
        className={cn(
          'group relative grid grid-cols-[auto_1fr] gap-3 items-center cursor-pointer group select-none py-2',
          { 'gap-0': !icon },
          className
        )}>
        <div
          className={cn(
            'absolute -inset-x-3 w-auto h-full bg-transparent group-hover:bg-background-4 rounded-[10px] z-0',
            { 'bg-background-4': active }
          )}
        />
        <div
          className='flex z-10 col-start-1 row-span-full items-center'>
          {icon ?
            <div
              className='relative flex place-content-center place-items-center h-8 w-8 bg-background-2 rounded border border-border-1 sub-menu-icon-bg'
            >
              <Icon
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground-3"
                name='sub-menu-ellipse'
                size={18}
              />
              {icon}
            </div> :
            <div />
          }
        </div>
        <div className="flex flex-col items-start col-start-2 min-w-0">
          <Text
            size={2}
            truncate
            weight="medium"
            className={cn(
              'text-foreground-2 w-full group-hover:text-foreground-1 ease-in-out duration-0 z-10',
              {
                'text-foreground-1': active
              }
            )}>
            {text}
          </Text>
          {!!description && (
            <Text
              size={0}
              truncate
              className={cn(
                'leading-[1.125rem] text-foreground-5 w-full group-hover:text-foreground-3 ease-in-out duration-0 truncate z-10',
                {
                  'text-foreground-3': active
                }
              )}>
              {description}
            </Text>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group flex gap-2.5 items-baseline cursor-pointer group select-none py-1',
        { 'gap-0': !icon },
        className
      )}>
      {icon && (
        <div
          className={cn(
            'w-3 min-w-3 h-5 flex z-10 items-center text-icons-4 group-hover:text-icons-2 ease-in-out duration-100',
            { 'text-icons-2': active }
          )}>
          {icon}
        </div>
      )}
      <Text
        size={2}
        weight="medium"
        className={cn(
          'text-foreground-3 group-hover:text-foreground-1 ease-in-out duration-100 z-10',
          {
            'text-foreground-1': active
          }
        )}>
        {text}
      </Text>
    </div>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky bottom-0 z-20 grid px-4 h-[72px] items-center border-t border-border-8">
      {children}
    </div>
  )
}

export { Root, Header, Content, Group, Item, Footer }

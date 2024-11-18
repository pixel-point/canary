import { cn } from '@/lib/utils'
import { Text } from '../text'
import noiseBg from './noise.png'
import { Icon } from '@/components/icon'
import { isSafari } from '@/utils/isSafari'

interface NavbarRootProps {
  className?: string
  children: React.ReactNode
  isSubMenu?: boolean
}

function Root({ className, children, isSubMenu = false }: NavbarRootProps) {
  return (
    <div
      className={cn(
        'border-border-5 bg-background-7 grid h-screen w-[220px] select-none grid-rows-[auto_1fr_auto] overflow-y-auto border-r',
        { 'bg-background-7/70 backdrop-blur-[20px]': isSubMenu },
        className
      )}>
      {!isSubMenu && (
        <>
          <div
            className="absolute -top-[82px] left-1/2 z-[-1] h-[164px] w-[392px] -translate-x-1/2 rounded-[392px]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(48, 48, 54, 0.4) 0%, rgba(48, 48, 54, 0) 100%)'
            }}
          />
          <div
            className="absolute -left-[132px] -top-[51px] z-[-1] h-[325px] w-[263px] rounded-[325px]"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(73, 73, 73, 0.25) 0%, rgba(73, 73, 73, 0.15) 44.95%, rgba(73, 73, 73, 0) 100%)'
            }}
          />
          <div
            className="absolute -right-[93px] top-[22%] z-[-1] h-[333px] w-[186px] rounded-[333px]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(58, 58, 58, 0.2) 0%, rgba(58, 58, 58, 0) 100%)'
            }}
          />
          <div
            className="absolute -left-[139px] bottom-[161px] z-[-1] h-[362px] w-[297px] rounded-[362px]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(73, 73, 73, 0.2) 0%, rgba(73, 73, 73, 0) 100%)'
            }}
          />
          <div
            className={cn(
              `absolute left-0 top-0 z-[-1] size-full bg-repeat opacity-20 mix-blend-overlay`,
              isSafari() ? 'opacity-5' : 'opacity-20'
            )}
            style={{ backgroundImage: `url(${noiseBg})` }}
          />
        </>
      )}
      {isSubMenu && <div className="bg-background-7/50 fixed left-0 top-0 size-full" />}
      {children}
    </div>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="sticky top-0 z-20 grid items-center">{children}</div>
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="flex min-w-0 flex-col">{children}</div>
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
        'flex w-full flex-col overflow-x-hidden px-5',
        { 'border-border-8 border-t pt-2.5': topBorder },
        isSubMenu ? 'pb-2.5' : 'gap-1.5 pb-3'
      )}>
      {title && (
        <div className={cn('text-foreground-7 mt-1.5', isSubMenu ? 'mb-3' : 'mb-2.5')}>
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
          'group relative grid cursor-pointer select-none grid-cols-[auto_1fr] items-center gap-3 py-2',
          { 'gap-0': !icon },
          className
        )}>
        <div
          className={cn(
            'group-hover:bg-background-4 absolute -inset-x-3 z-0 h-full w-auto rounded-[10px] bg-transparent',
            { 'bg-background-4': active }
          )}
        />
        <div className="z-10 col-start-1 row-span-full flex items-center">
          {icon ? (
            <div className="border-border-1 sub-menu-icon-bg bg-background-2 relative flex size-8 place-content-center place-items-center rounded border">
              <Icon
                className="text-foreground-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                name="sub-menu-ellipse"
                size={18}
              />
              {icon}
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="col-start-2 flex min-w-0 flex-col items-start">
          <Text
            size={2}
            truncate
            weight="medium"
            className={cn('text-foreground-2 group-hover:text-foreground-1 z-10 w-full duration-0 ease-in-out', {
              'text-foreground-1': active
            })}>
            {text}
          </Text>
          {!!description && (
            <Text
              size={0}
              truncate
              className={cn(
                'text-foreground-5 group-hover:text-foreground-3 z-10 w-full truncate leading-[1.125rem] duration-0 ease-in-out',
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
    <div className={cn('group flex cursor-pointer select-none gap-2.5 py-1', { 'gap-0': !icon }, className)}>
      {icon && (
        <div
          className={cn(
            'text-icons-4 group-hover:text-icons-2 relative z-10 mt-[3px] flex h-3 w-3 min-w-3 items-center duration-100 ease-in-out',
            { 'text-icons-2': active }
          )}>
          {active && (
            <span
              className="absolute left-1/2 top-1/2 z-[-1] size-7 -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.11) 17.63%, rgba(255, 255, 255, 0.07) 40.23%, rgba(255, 255, 255, 0.03) 61.54%, rgba(255, 255, 255, 0.01) 80%, rgba(255, 255, 255, 0.00) 100%)'
              }}
            />
          )}
          {icon}
        </div>
      )}
      <Text
        size={2}
        weight="medium"
        className={cn('text-foreground-3 group-hover:text-foreground-1 z-10 text-left duration-100 ease-in-out', {
          'text-foreground-1': active
        })}>
        {text}
      </Text>
    </div>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div className="border-border-8 sticky bottom-0 z-20 grid h-[72px] items-center border-t px-4">{children}</div>
}

export { Root, Header, Content, Group, Item, Footer }

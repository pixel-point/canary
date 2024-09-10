import React from 'react'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'
import { Text } from './text'

interface NavbarRootProps {
  className?: string
  children: React.ReactNode
}

function Root({ className, children }: NavbarRootProps) {
  return (
    <div
      className={cn(
        'select-none grid grid-rows-[auto_1fr_auto] w-[220px] h-screen overflow-y-auto border-r border-border-background bg-primary-background',
        className
      )}>
      {children}
    </div>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="px-5 h-[57px] items-center grid">{children}</div>
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="grid content-start">{children}</div>
}

function Group({ children, topBorder }: { children: React.ReactNode; topBorder?: boolean }) {
  return (
    <div
      className={cn('p-5 py-3.5 flex flex-col gap-1.5', {
        'border-t border-border-background': topBorder
      })}>
      {children}
    </div>
  )
}

function AccordionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 py-0.5 border-t border-border-background">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="group text-primary opacity-40">
            <p className="text-xs font-normal group-hover:text-primary ease-in-out duration-150">{title}</p>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1.5">{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

interface ItemProps {
  icon: React.ReactElement<SVGSVGElement>
  text: string
  active?: boolean
  onClick?: () => void
}

function Item({ icon, text, active }: ItemProps) {
  return (
    <div className={cn('group flex gap-2.5 items-center cursor-pointer group select-none py-1.5')}>
      <div
        className={cn(
          'flex items-center text-secondary-muted group-hover:text-primary ease-in-out duration-100 truncate',
          { 'text-primary': active }
        )}>
        {icon}
      </div>
      <Text
        size={2}
        weight="medium"
        className={cn(
          '-tracking-[0.02em] text-primary-muted group-hover:text-primary ease-in-out duration-100 truncate',
          {
            'text-primary': active
          }
        )}>
        {text}
      </Text>
    </div>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div className="grid px-5 h-[76px] items-center border-t border-border-background">{children}</div>
}

export { Root, Header, Content, Group, AccordionGroup, Item, Footer }

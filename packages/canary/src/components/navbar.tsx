import React from 'react'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

function Root({ children }: { children: React.ReactNode }) {
  return (
    <div className="select-none grid grid-rows-[auto_1fr_auto] w-[220px] h-screen overflow-y-auto border-r text-sm text-grey-70 bg-secondary-background">
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
        'border-t': topBorder
      })}>
      {children}
    </div>
  )
}

function AccordionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 py-0.5 border-t">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="group">
            <p className="text-xs text-grey-40 font-normal group-hover:text-primary ease-in-out duration-150">
              {title}
            </p>
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
    <div
      className={cn('navbar-item flex gap-2.5 items-center cursor-pointer group select-none py-1.5', {
        active: active
      })}>
      <div className="flex items-center">{icon}</div>
      <p className="-tracking-[2%]">{text}</p>
    </div>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div className="grid px-5 h-[76px] items-center border-t">{children}</div>
}

export { Root, Header, Content, Group, AccordionGroup, Item, Footer }

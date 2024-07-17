import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const containerVariants = cva('flex min-h-screen', {
  variants: {
    alignContent: {
      default: '',
      center: 'items-center justify-center'
    }
  },
  defaultVariants: {
    alignContent: 'default'
  }
})

interface ContainerProps {
  children: ReactNode
  alignContent?: 'default' | 'center'
}

export default function Container({ children, alignContent = 'default' }: ContainerProps) {
  return <div className={cn(containerVariants({ alignContent }))}>{children}</div>
}

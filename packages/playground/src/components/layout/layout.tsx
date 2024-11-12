<<<<<<< HEAD
import { ReactNode } from 'react'
=======
import type { ReactNode } from 'react'
import React from 'react'
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
import cx from 'classnames'

interface LayoutProps {
  children: ReactNode
  gap?: string
  className?: string
}

const Vertical: React.FC<LayoutProps> = ({ children, gap = 'space-y-4', className }) => {
  return <div className={cx(`flex flex-col ${gap}`, className)}>{children}</div>
}

const Horizontal: React.FC<LayoutProps> = ({ children, gap = 'space-x-4', className }) => {
  return <div className={cx(`flex ${gap}`, className)}>{children}</div>
}

export const Layout = {
  Vertical,
  Horizontal
}

import { ReactNode } from 'react'

interface topBarProps {
  children: ReactNode
}

export default function BottomBar({ children }: topBarProps) {
  return <div className="fixed z-10 top-0 left-0 right-0 py-8 flex justify-center bg-background">{children}</div>
}

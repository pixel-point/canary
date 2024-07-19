import { ReactNode } from 'react'

interface bottomBarProps {
  children: ReactNode
}

export default function BottomBar({ children }: bottomBarProps) {
  return <div className="fixed z-10 bottom-0 left-0 right-0 py-8 flex justify-center bg-background">{children}</div>
}

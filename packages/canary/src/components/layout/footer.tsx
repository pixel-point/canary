import { ReactNode } from 'react'

interface footerProps {
  children: ReactNode
}

export default function Footer({ children }: footerProps) {
  return <div className="fixed bottom-0 left-0 right-0 py-8 flex justify-center">{children}</div>
}

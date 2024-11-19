interface DockProps {
  children: React.ReactNode
}

function Root({ ...props }: DockProps) {
  const { children } = props

  return <div className="fixed inset-x-auto bottom-0 flex items-center justify-center py-6">{children}</div>
}

export { Root }

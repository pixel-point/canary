import { Text } from './text'

function Root({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col border-t pt-9">{children}</div>
}

function Header({ name, action }: { name: string; action?: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between gap-4 pb-5">
      <Text as="p" size={4} color="primary" weight="medium">
        {name}
      </Text>
      {action && <>{action}</>}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>
}

export { Root, Header, Content }

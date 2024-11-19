import {
  Text,
  Icon,
  Spacer,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  IconProps
} from '@harnessio/canary'

interface DetailsProps {
  id: string
  iconName: 'tube-sign' | 'open-pr' | 'tag' | 'branch' | IconProps['name']
  name: string
  count: number
}

interface PageProps {
  title: string
  details: DetailsProps[]
  timestamp?: string
  onAddDescription?: () => void
  description?: string
}

export const RepoSummaryPanel = ({ ...props }: PageProps) => {
  const { title, details, timestamp, onAddDescription, description } = props

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Text size={4} weight={'medium'} truncate>
          {title}
        </Text>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm_icon">
              <Icon name="ellipsis" size={12} className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center gap-1.5" onClick={onAddDescription}>
              <Icon name="plus" size={12} className="text-tertiary-background" />
              <Text>Add description</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Spacer size={2} />
      {description?.length && <Text>{description}</Text>}
      <Spacer size={2} />
      {timestamp && (
        <Text size={1} color={'tertiaryBackground'}>
          Created {timestamp}
        </Text>
      )}
      <Spacer size={5} />
      <div className="flex flex-col gap-3">
        {details &&
          details.map(item => (
            <div key={item.id} className="flex items-center gap-1.5">
              <Icon name={item.iconName} size={14} className="text-tertiary-background" />
              <Text>{item.name}</Text>
              <Badge variant="outline" size="sm">
                {item.count}
              </Badge>
            </div>
          ))}
      </div>
    </div>
  )
}

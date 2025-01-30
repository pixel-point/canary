import { Button, Icon } from '..'

export interface AddNodeProp {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export function AddNode(props: AddNodeProp) {
  const { onClick } = props

  return (
    <div className="border-border-2 flex size-full items-center justify-center rounded-full border bg-primary-foreground">
      <Button
        className="self-center rounded-full p-3"
        style={{ alignSelf: 'center' }}
        variant="outline"
        size="lg"
        onMouseDown={e => e.stopPropagation()}
        onClick={onClick}
      >
        <Icon name="plus" size={15} />
      </Button>
    </div>
  )
}

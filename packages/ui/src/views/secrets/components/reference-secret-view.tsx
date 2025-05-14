import { Button, Caption, TextInput } from '@/components'

interface ReferenceSecretViewProps {
  onTest: (value: string) => void
  value: string
  setValue: (value: string) => void
}

export const ReferenceSecretView: React.FC<ReferenceSecretViewProps> = ({ onTest, value, setValue }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full items-center gap-2">
        <div className="grow">
          <TextInput
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter reference secret value"
          />
        </div>
        <Button onClick={() => onTest(value)} variant="ghost">
          Test
        </Button>
      </div>
      <Caption className="text-cn-foreground-4">
        Enter the path to an existing secret in your Vault instance. Click Test to verify the secret exists.
      </Caption>
    </div>
  )
}

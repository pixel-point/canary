import { CloneRepoForm } from './clone-repo-form'
import { Tabs, TabsList, TabsTrigger, Popover, PopoverContent, PopoverTrigger, Button, Text } from '@harnessio/canary'
import { useState } from 'react'

export interface CloneRepoDialogProps {
  sshUrl: string
  httpsUrl: string
  handleCreateToken: () => void
}

export const CloneRepoDialog: React.FC<CloneRepoDialogProps> = ({ httpsUrl, sshUrl, handleCreateToken }) => {
  const [currentTab, setCurrentTab] = useState('https')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">Clone repository</Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[400px] border-border bg-primary-background" side="bottom" align="end">
        <Text className="mb-2 text-left text-lg">Git clone URL</Text>
        <Tabs variant="underline" value={currentTab} onValueChange={setCurrentTab} className="mb-2">
          <TabsList>
            <TabsTrigger value="https" className="h-6">
              HTTPS
            </TabsTrigger>
            <TabsTrigger value="ssh" className="h-6">
              SSH
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <CloneRepoForm
          sshUrl={sshUrl}
          httpsUrl={httpsUrl}
          currentTab={currentTab}
          handleCreateToken={handleCreateToken}
        />
      </PopoverContent>
    </Popover>
  )
}

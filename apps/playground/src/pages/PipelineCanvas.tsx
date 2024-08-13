import React from 'react'
import { StudioMixed } from '../../../../packages/unified-pipeline/src/pages/studio/Studio'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@harnessio/canary'

export const PipelineCanvas: React.FC = () => {
  return (
    <Tabs defaultValue="1" className="p-1">
      <TabsList>
        <TabsTrigger value="1">Visual</TabsTrigger>
        <TabsTrigger value="2">YAML</TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <div style={{ width: '100vw', height: '100vh' }}>
          <StudioMixed />
        </div>
      </TabsContent>
      <TabsContent value="2">YAML view</TabsContent>
    </Tabs>
  )
}

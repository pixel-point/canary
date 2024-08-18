import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@harnessio/canary'
import ConsoleLogs from './execution/console-logs'
import { data } from './execution/mocks/mockStepLogs'

enum StepExecutionTab {
  LOG = 'log',
  INPUT = 'input',
  OUTPUT = 'output'
}

export default function ExecutionDetails() {
  return (
    <div>
      <Tabs defaultValue={StepExecutionTab.LOG} className="w-full h-full">
        <TabsList>
          <TabsTrigger className="h-full" value={StepExecutionTab.LOG}>
            Logs
          </TabsTrigger>
          <TabsTrigger value={StepExecutionTab.INPUT}>Inputs</TabsTrigger>
          <TabsTrigger value={StepExecutionTab.OUTPUT}>Output</TabsTrigger>
        </TabsList>
        <TabsContent value={StepExecutionTab.LOG}>
          <ConsoleLogs logs={data[0]} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

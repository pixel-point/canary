import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@harnessio/canary'
import ConsoleLogs from './console-logs'
import { data } from './mocks/mockStepLogs'
import { Layout } from '../layout/layout'
import { ExecutionTree } from './execution-tree'
import { elements } from '../../assets/mockExecutionTree'

export interface StepProps {
  name: string
}

interface StageExecutionProps {
  step: StepProps
}

enum StepExecutionTab {
  LOG = 'log',
  INPUT = 'input',
  OUTPUT = 'output'
}

export const StepExecution: React.FC<StageExecutionProps> = (props): React.ReactElement => {
  return (
    <Tabs defaultValue={StepExecutionTab.LOG} className="w-full h-full mt-2">
      <Layout.Vertical gap="space-y-3">
        <TabsList className="w-fit">
          <TabsTrigger className="h-full" value={StepExecutionTab.LOG}>
            Logs
          </TabsTrigger>
          <TabsTrigger value={StepExecutionTab.INPUT}>Inputs</TabsTrigger>
          <TabsTrigger value={StepExecutionTab.OUTPUT}>Output</TabsTrigger>
        </TabsList>
        <TabsContent value={StepExecutionTab.LOG}>
          <Layout.Horizontal>
            {/* Hardcoded value added temporarily */}
            <div className="border-t pt-4 h-[calc(100vh-20.5rem)] overflow-y-scroll">
              <ConsoleLogs logs={data[0]} />
            </div>
            <div className="w-[450px] h-[calc(100vh-20.5rem)] overflow-y-scroll">
              <ExecutionTree defaultSelectedId="2" elements={elements} onSelectNode={() => {}} />
            </div>
          </Layout.Horizontal>
        </TabsContent>
      </Layout.Vertical>
    </Tabs>
  )
}

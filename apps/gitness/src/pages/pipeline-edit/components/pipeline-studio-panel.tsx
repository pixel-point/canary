import { Badge, Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@harnessio/canary'
import { PipelineStudioProblemsPanel } from './pipeline-studio-problems-panel'
import { usePipelineDataContext } from '../context/PipelineStudioDataProvider'
import { usePipelineViewContext } from '../context/PipelineStudioViewProvider'

export const PipelineStudioPanel = (): JSX.Element => {
  const { problems } = usePipelineDataContext()
  const { setPanelOpen } = usePipelineViewContext()

  return (
    <Tabs defaultValue="problems" variant="underline" className="h-full">
      <div className="flex flex-row justify-between border-b">
        <TabsList className="bg-transparent ml-4">
          <TabsTrigger value="problems">
            Problems
            {problems.problemsCount.all > 0 && (
              <Badge className="rounded-full font-normal text-xs p-2 h-5 ml-2 bg-red-950 text-red-400">
                {problems.problemsCount.all}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>
        <div>
          <Button
            onClick={() => {
              setPanelOpen(false)
            }}
            variant="ghost"
            size="sm"
            className="m-1 px-2">
            {/* <Xmark /> */} x
          </Button>
        </div>
      </div>
      <TabsContent value="problems" className="overflow-scroll h-full py-2">
        <PipelineStudioProblemsPanel />
      </TabsContent>
      <TabsContent value="suggestions">Suggestions placeholder</TabsContent>
    </Tabs>
  )
}

import { useYamlEditorContext } from '@harnessio/yaml-editor'
import { NoProblemsFound, Problems } from '@harnessio/playground'
import { usePipelineDataContext } from '../context/PipelineStudioDataProvider'

export function PipelineStudioProblemsPanel(): JSX.Element {
  const { problems } = usePipelineDataContext()
  const { updateCursorPosition } = useYamlEditorContext()

  return problems.problems.length === 0 ? (
    <NoProblemsFound />
  ) : (
    <Problems
      problems={problems.problems}
      onClick={problem => {
        if (problem.position.row && problem.position.column) {
          updateCursorPosition({
            lineNumber: problem.position.row,
            column: problem.position.column
          })
        }
      }}
    />
  )
}

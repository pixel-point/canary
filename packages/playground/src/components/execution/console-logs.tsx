import React, { FC } from 'react'
import { Text } from '@harnessio/canary'
import { LivelogLine } from './types'
import { formatDuration } from '../../utils/TimeUtils'

interface ConsoleLogsProps {
  logs: LivelogLine[]
}

export const createStreamedLogLineElement = (log: LivelogLine) => {
  const lineElement = document.createElement('div')
  lineElement.className = ''

  if (typeof log.pos === 'number') {
    const lineNumberElement = document.createElement('span')
    lineNumberElement.className = ''
    lineNumberElement.textContent = (log.pos + 1).toString()
    lineElement.appendChild(lineNumberElement)
  }

  const logTextElement = document.createElement('span')
  logTextElement.className = ''
  logTextElement.textContent = log.out as string
  lineElement.appendChild(logTextElement)

  const flexExpanderElement = document.createElement('span')
  flexExpanderElement.className = ''
  lineElement.appendChild(flexExpanderElement)

  const timeElement = document.createElement('span')
  timeElement.className = ''
  timeElement.textContent = `${log.time}s`
  lineElement.appendChild(timeElement)

  return lineElement
}

const ConsoleLogs: FC<ConsoleLogsProps> = ({ logs }) => (
  <>
    {logs.map(({ pos, time, out }, index) => (
      <div className="flex items-baseline justify-between leading-[21px] mb-2" key={index}>
        <div className="flex items-baseline">
          {pos !== undefined && !isNaN(pos) && pos >= 0 && (
            <Text className="text-log flex justify-end min-w-5">{pos + 1}</Text>
          )}
          {out && <Text className="text-ring font-mono text-sm font-normal ml-2 flex gap-1">{out}</Text>}
        </div>
        <Text className="text-log text-sm font-normal mr-2 flex gap-1">{formatDuration(time ? time * 1_000 : 0)}</Text>
      </div>
    ))}
  </>
)

export default ConsoleLogs

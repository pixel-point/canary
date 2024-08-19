import React, { FC } from 'react'
import { LivelogLine } from './types'

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

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp)

  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0')

  // Convert milliseconds to MsMsMsMS format
  const milliSecs = milliseconds.padEnd(4, '0') // Pad to 4 digits

  return `${hours}:${minutes}:${seconds}.${milliSecs}`
}

const ConsoleLogs: FC<ConsoleLogsProps> = ({ logs }) => {
  return (
    <>
      {logs.map((log, index) => {
        return (
          <div className="flex items-baseline leading-[21px] mb-2" key={index}>
            {typeof log.pos === 'number' && (
              <div className={'flex justify-end text-primary min-w-5'}>{log.pos + 1}</div>
            )}
            <div className="text-ring font-mono text-sm font-normal ml-2">
              {log.time && <span>[{formatTimestamp(log.time)}]</span>}
              <span>{log.out}</span>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ConsoleLogs

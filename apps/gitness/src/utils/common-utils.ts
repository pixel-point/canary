import { LivelogLine } from '@harnessio/code-service-client'

export const createAndDownloadBlob = (output: string, fileName: string) => {
  if (!output?.length) return
  const link = document.createElement('a')
  const blob = new Blob([output], { type: 'application/text' })

  link.download = fileName
  link.href = URL.createObjectURL(blob)
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const getLogsText = (logs: LivelogLine[]) => {
  let output = ''
  for (let i = 0; i < logs.length; ++i) {
    output += logs[i].out
  }
  return output
}

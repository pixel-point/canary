import moment from 'moment'

export const formatDuration = (seconds: number): string => {
  const duration = moment.duration(seconds, 'seconds')
  const minutes = String(duration.minutes()).padStart(2, '0')
  const secs = String(duration.seconds()).padStart(2, '0')
  return `${minutes}:${secs}`
}

export const getDuration = (startTime?: number, endTime?: number): number => {
  if (!endTime || !startTime) return 0
  if (startTime > endTime) return 0
  return endTime - startTime
}

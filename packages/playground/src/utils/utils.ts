export const getInitials = (name: string, length?: number) => {
  // Split the name into an array of words, ignoring empty strings
  const words = name.split(' ').filter(Boolean)

  // Get the initials from the words
  const initials = words
    .map(word => word[0].toUpperCase()) // Get the first letter of each word
    .join('')

  // If length is provided, truncate the initials to the desired length
  return length ? initials.slice(0, length) : initials
}

const LOCALE = Intl.NumberFormat().resolvedOptions?.().locale || 'en-US'

/**
 * Format a timestamp to medium format date (i.e: Jan 1, 2021)
 * @param timestamp Timestamp
 * @param dateStyle Optional DateTimeFormat's `dateStyle` option.
 */
export function formatDate(timestamp: number | string, dateStyle = 'medium'): string {
  return timestamp
    ? new Intl.DateTimeFormat(LOCALE, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: TS built-in type for DateTimeFormat is not correct
        dateStyle
      }).format(new Date(timestamp))
    : ''
}

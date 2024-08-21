export const getInitials = (name: string) => {
  // Split the name into an array of words
  const words = name.split(' ')
  // Map over the words to get the first letter of each
  const initials = words.map(word => word[0].toUpperCase()).join('')
  // Return the initials
  return initials
}

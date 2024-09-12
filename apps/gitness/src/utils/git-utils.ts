export const REFS_TAGS_PREFIX = 'refs/tags/'
export const REFS_BRANCH_PREFIX = 'refs/heads/'

export const decodeGitContent = (content = '') => {
  try {
    // Decode base64 content for text file
    return decodeURIComponent(escape(window.atob(content)))
  } catch (_exception) {
    try {
      // Return original base64 content for binary file
      return content
    } catch (exception) {
      console.error(exception) // eslint-disable-line no-console
    }
  }
  return ''
}

export const isRefATag = (gitRef: string | undefined) => gitRef?.includes(REFS_TAGS_PREFIX) || false
export const isRefABranch = (gitRef: string | undefined) => gitRef?.includes(REFS_BRANCH_PREFIX) || false

// Check if gitRef is a git commit hash (https://github.com/diegohaz/is-git-rev, MIT © Diego Haz)
export const isGitRev = (gitRef = ''): boolean => /^[0-9a-f]{7,40}$/i.test(gitRef)

export const normalizeGitRef = (gitRef: string | undefined) => {
  if (isRefATag(gitRef)) {
    return gitRef
  } else if (isRefABranch(gitRef)) {
    return gitRef
  } else if (gitRef === '') {
    return ''
  } else if (gitRef && isGitRev(gitRef)) {
    return gitRef
  } else {
    return `refs/heads/${gitRef}`
  }
}

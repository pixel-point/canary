export function parseSpecificDiff(rawDiff: string, sourceFileName: string, targetFileName: string) {
  // Split the raw diff into individual diffs
  const diffs = rawDiff.split(/(?=^diff --git)/gm)

  // Iterate over each diff
  for (const diff of diffs) {
    // Check if the diff contains the target file name
    if (
      diff.includes(`a/${sourceFileName === 'dev/null' ? targetFileName : sourceFileName}`) ||
      diff.includes(`b/${targetFileName}`)
    ) {
      return diff // Return the matched diff
    }
  }

  // Return undefined if no specific diff is found
  return undefined
}

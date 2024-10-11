export interface PathParts {
  path: string
  parentPath: string
}

export function splitPathWithParents(fullResourcePath: string) {
  const pathParts = fullResourcePath?.split('/')
  const result: PathParts[] = []
  if (pathParts.length) {
    let parentPath = ''

    pathParts.map((path, index) => {
      parentPath += (index === 0 ? '' : '/') + path

      result.push({
        path: path,
        parentPath: parentPath
      })
    })
  }
  return result
}

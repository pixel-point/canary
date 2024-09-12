import { get } from 'lodash-es'
import { parse, parseDocument, stringify } from 'yaml'

export function injectItemInArray(
  yaml: string,
  injectData: { path: string; position: 'after' | 'before' | 'last' | undefined; item: unknown }
): string {
  const { path, position, item } = injectData

  // if position is "last" path points to array
  if (position === 'last') {
    const doc = parseDocument(yaml)

    doc.addIn(path.split('.'), item)
    const arr = doc.getIn(path.split('.')) as { flow: boolean } //as Collection
    arr.flow = false

    return doc.toString()
  }
  // if position is "after" or "before" path points to array element
  else if (position === 'after' || position === 'before') {
    // TODO use DOC
    const yamlJson = parse(yaml)
    const pathParts = path.split('.')
    const index = parseInt(pathParts.pop() ?? '0')
    const arrayPath = pathParts.join('.')
    const arr = get(yamlJson, arrayPath)
    arr.splice(position == 'before' ? index : index + 1, 0, item)
    return stringify(yamlJson)
  }

  return yaml
}

export function updateItemInArray(yaml: string, injectData: { path: string; item: unknown }): string {
  const { path, item } = injectData

  // if position is "last" path points to array
  const doc = parseDocument(yaml)

  doc.setIn(path.split('.'), item)

  return doc.toString()
}

export function deleteItemInArray(yaml: string, data: { path: string }) {
  const { path } = data

  const doc = parseDocument(yaml)

  doc.deleteIn(path.split('.'))

  return doc.toString()
}

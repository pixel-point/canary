import { IssueLevel, RuleType } from '../consts.js'

const viewBoxElems = ['svg']

export const widthHeightRules = {
  name: 'widthHeightRules',
  description: 'Width/height rules for SVG root element',
  fn: (_, params) => {
    const { inputFile, svgContent, reportIssue } = params
    const issues = []

    return {
      root: {
        exit: () => {
          if (issues.length) {
            reportIssue({
              inputFile,
              svgContent,
              issues
            })
          }
        }
      },
      element: {
        enter: (node, parentNode) => {
          if (viewBoxElems.includes(node.name)) {
            if (node.name === 'svg' && parentNode.type === 'root') {
              if (node.attributes.width !== node.attributes.height) {
                issues.push({
                  ruleType: RuleType.viewBoxDifferentWidthHeight,
                  attributes: [`width="${node.attributes.width}"`, `height="${node.attributes.height}"`],
                  level: IssueLevel.ERROR
                })
              }
            }
          }
        }
      }
    }
  }
}

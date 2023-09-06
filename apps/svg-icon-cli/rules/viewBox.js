import { RuleType } from '../consts.js'

const viewBoxElems = ['svg' /*, 'pattern', 'symbol'*/]

export const viewBoxRules = {
  name: 'viewBoxRules',
  description: 'Icon rules for SVG viewBox',
  fn: () => {
    return {
      element: {
        enter: (node, parentNode) => {
          if (viewBoxElems.includes(node.name)) {
            if (node.name === 'svg' && parentNode.type === 'root') {
              if (!node.attributes.viewBox) {
                throw { ruleType: RuleType.viewBoxEmpty, attributes: ['<svg'] }
              }

              const nums = node.attributes.viewBox.split(/[ ,]+/g)

              if (nums[0] !== nums[1] || nums[2] !== nums[3]) {
                throw {
                  ruleType: RuleType.viewBoxUnbalanced,
                  attributes: [`viewBox="${node.attributes.viewBox}"`]
                }
              }
            }
          }
        }
      }
    }
  }
}

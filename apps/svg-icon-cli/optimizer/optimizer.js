import { optimize } from 'svgo'
import chalk from 'chalk'
import { viewBoxRules } from '../rules/viewBox.js'
import { widthHeightRules } from '../rules/widthHeight.js'
import { currentColorRules } from '../rules/currentColor.js'

export const optimizeAndVerifySVGContent = ({
  filename,
  inputFile,
  svgContent,
  icon,
  singleColor,
  allowedColors = [],
  reportIssue
}) => {
  try {
    return optimize(svgContent, {
      path: filename,
      multipass: true,
      plugins: [
        ...(icon
          ? [viewBoxRules, widthHeightRules].map(rule => ({
              params: { inputFile, svgContent, reportIssue },
              ...runOnce(rule)
            }))
          : []),
        ...(singleColor
          ? [
              {
                params: {
                  inputFile,
                  svgContent,
                  reportIssue,
                  allowedColors
                },
                ...runOnce(currentColorRules)
              }
            ]
          : []),
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false
            }
          }
        },
        'removeStyleElement',
        'removeScriptElement',
        'removeXMLNS'
      ]
    }).data
  } catch (exception) {
    if (exception.ruleType) {
      console.error(chalk.red('✘ ' + chalk.bgRed('[ERROR]') + ' ' + exception.ruleType))
      console.error(`└─── ${chalk.magenta.underline(inputFile)}\r\n`)
      console.error(highlightAttrs(svgContent, exception.attributes))
    } else {
      console.error(exception)
    }
  }
}

const highlightAttrs = (str, attributes = []) => {
  for (const attr of attributes) {
    str = str.replace(attr, chalk.yellow.bold.underline(attr))
  }
  return str
}

// Execute custom plugins (rules) only once. This is because the rules should
// solely target the original SVG content, excluding any transformed versions
// that might be processed by other SVGO plugins.
const runOnce = plugin => ({
  ...plugin,
  fn: (ast, params, info) => (info.multipassCount ? {} : plugin.fn(ast, params, info))
})

#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import sade from 'sade'
import chalk from 'chalk'
import { optimizeAndVerifySVGContent } from '../optimizer/optimizer.js'
import { getTemplate } from '../templates/template.js'
import { IssueLevel, DefaultOptions } from '../consts.js'
import { uniq } from 'lodash-es'

sade('svg2icon', true)
  .describe('Generate icon components from a collection of SVG files')
  .example(
    'svg2icon --source=src/icons --dest=src/components --iconSetName=noir --singleColor --allowedColors black,white --icon --size=16/16 --strokeWidth=1.5 --index --lib=react'
  )
  .option('--source', 'Icon input source folder', DefaultOptions.source)
  .option('--dest', 'Component output folder', DefaultOptions.dest)
  .option('--iconSetName', 'Icon set name', DefaultOptions.iconSetName)
  .option('--singleColor', 'Enforce single color', DefaultOptions.singleColor)
  .option(
    '--allowedColors',
    'Limit to a single color, chosen from an approved list (separated by commas)',
    DefaultOptions.allowedColors
  )
  .option('--icon', 'Enforce square icon', DefaultOptions.icon)
  .option('--size', 'Default icon size', DefaultOptions.size)
  .option('--strokeWidth', 'Default icon stroke width', DefaultOptions.strokeWidth)
  .option('--index', 'Generate index file', DefaultOptions.index)
  .option('--lib', 'Component target library (WebC, React, Vue, etc...)', DefaultOptions.lib)
  .action(
    async ({
      source: _source,
      dest: _dest,
      iconSetName,
      singleColor,
      allowedColors,
      icon,
      size,
      strokeWidth,
      index,
      lib
    }) => {
      const source = path.normalize(_source)
      const dest = path.normalize(_dest)
      const sourceDir = fs.opendirSync(source)
      const iconNames = []
      const template = getTemplate(lib)
      let hasTransformError = false

      // Clean up dest folder to ensure generated components
      // match source svg files
      fs.rmSync(dest, { recursive: true, force: true })
      fs.mkdirSync(dest)

      // Generate component files from svg files
      for await (const file of sourceDir) {
        try {
          const [iconName, ext = ''] = file.name.split('.')
          const inputFile = path.join(source, file.name)
          const outputFile = path.join(dest, template.componentFile(iconName))

          if (ext.toLowerCase() === 'svg') {
            const inputSVG = fs.readFileSync(inputFile, 'utf8')
            const outputSVG = optimizeAndVerifySVGContent({
              filename: file.name,
              inputFile,
              svgContent: inputSVG,
              icon,
              singleColor,
              allowedColors: allowedColors.split(',').map(color => color.trim()),
              reportIssue
            })

            if (outputSVG) {
              fs.writeFileSync(
                outputFile,
                template.renderComponent({
                  iconSetName,
                  iconName,
                  svg: outputSVG,
                  size,
                  strokeWidth
                })
              )
            } else {
              hasTransformError = true
            }

            if (index) {
              iconNames.push(iconName)
            }
          }
        } catch (err) {
          console.error(err)
          process.exit(1) // eslint-disable-line no-undef
        }
      }

      if (hasTransformError) {
        process.exit(1) // eslint-disable-line no-undef
      }

      // Generate index file if --index is specified
      // otherwise clear it up
      const indexFile = path.join(dest, template.INDEX_FILE)

      if (iconNames.length) {
        fs.writeFileSync(indexFile, template.renderIndex(iconNames))
      } else {
        fs.rmSync(indexFile, { force: true })
      }

      printReportAndExit()
    }
  )
  .parse(process.argv) // eslint-disable-line no-undef

const metrics = {
  errors: [],
  warns: []
}

function reportIssue({ inputFile, svgContent, issues }) {
  const hasError = !!issues.find(issue => issue.level === IssueLevel.ERROR)
  console.log(`${hasError ? chalk.bgRed('[ERROR]') : chalk.bgYellow('[WARN]')} ${chalk.blue.underline(inputFile)}\r\n`)
  let highlightContent = svgContent

  for (const issue of issues) {
    const { ruleType, attributes, level } = issue
    const isError = level === IssueLevel.ERROR

    if (isError) {
      console.log(' - ' + chalk.red(ruleType))
      metrics.errors.push(inputFile)
    } else {
      console.log(' - ' + chalk.yellow(ruleType))
      metrics.warns.push(inputFile)
    }

    for (const attr of attributes) {
      highlightContent = highlightAttrs(highlightContent, attr, isError)
    }
  }

  console.log('\r\n' + highlightContent + '\r\n')
}

function printReportAndExit() {
  if (metrics.errors.length) {
    console.log(
      chalk.bold.red(`${metrics.errors.length} error${metrics.errors.length > 1 ? 's' : ''}`) +
        ` found in ${uniq(metrics.errors)
          .map(file => chalk.blue.underline(file))
          .join(', ')}`
    )
  }

  if (metrics.warns.length) {
    console.log(
      chalk.bold.yellow(`${metrics.warns.length} warning${metrics.warns.length > 1 ? 's' : ''}`) +
        ` found in ${uniq(metrics.warns)
          .map(file => chalk.blue.underline(file))
          .join(', ')}`
    )
  }

  if (metrics.errors.length || metrics.warns.length) {
    console.log()
  }

  if (metrics.errors.size) {
    process.exit(1) // eslint-disable-line no-undef
  }
}

const highlightAttrs = (str, attr = '', isError) =>
  str.replaceAll(attr, chalk[isError ? 'red' : 'yellow'].bold.underline(attr)).trim()

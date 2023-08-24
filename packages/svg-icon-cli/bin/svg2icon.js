#!/usr/bin/env node
import { opendirSync, readFileSync, writeFileSync, rmSync } from 'fs'
import path from 'path'
import sade from 'sade'
import { upperFirst, camelCase } from 'lodash-es'

sade('svg2icon', true)
  .describe('Generate React components from SVG files')
  .example(
    'svg2icon --source=src/icons --dest=src/components --iconSetName=noir --singleColor --icon --strokeWidth=3 --size=24/24'
  )
  .option('--source', 'Icon input source folder', 'src/icons')
  .option('--dest', 'Component output folder', 'src/components')
  .option('--iconSetName', 'Icon set name', '')
  .option('--singleColor', 'Enforce single color', true)
  .option('--icon', 'Enforce square icon', true)
  .option('--size', 'Default icon size', '16/16')
  .option('--strokeWidth', 'Default icon stroke width', '1')
  .option('--indexFile', 'Generate index file', true)
  .action(async ({ source, dest, iconSetName, icon, size, strokeWidth, indexFile }) => {
    console.log({ source, dest, iconSetName, icon, size, strokeWidth, indexFile })

    const iconsFolder = path.join('src', 'icons')
    const dir = opendirSync(iconsFolder)
    const componentNames = []
    const indexTs = path.join(dest, `index.ts`)

    for await (const file of dir) {
      try {
        const [iconName, ext = ''] = file.name.split('.')

        if (ext.toLowerCase() === 'svg') {
          const svg = readFileSync(path.join(iconsFolder, file.name), 'utf8').replace(/(\r\n|\n|\r)/gm, '')
          let componentName = upperFirst(camelCase(iconName))

          // Prefix `Svg` to component name if it starts with a number
          if (/^\d/.test(componentName)) {
            componentName = `Svg${componentName}`
          }

          writeFileSync(
            path.join(dest, `${componentName}.tsx`),
            componentFileTemplate({ iconSetName, iconName, componentName, svg })
          )

          if (indexFile) {
            componentNames.push(componentName)
          }
        }
      } catch (err) {
        console.error(err)
        process.exit(1) // eslint-disable-line no-undef
      }

      if (componentNames.length) {
        writeFileSync(indexTs, indexTsFileTemplate(componentNames))
      } else {
        rmSync(indexTs, { force: true })
      }
    }
  })
  .parse(process.argv) // eslint-disable-line no-undef

const componentFileTemplate = ({ iconSetName, iconName, componentName, svg }) =>
  `// This file's contents are automatically generated. Modifying it manually is discouraged.
import { registerIcon } from '@harnessio/svg-icon'
import type { IconProps } from '@harnessio/svg-icon-react'
import { Icon } from '@harnessio/svg-icon-react'

const name = '${iconName}${iconSetName ? '/' + iconSetName : ''}'

registerIcon(
  name,
  \`${svg}\`
)

export function ${componentName}(props: IconProps) {
  return <Icon name={name} {...props} />
}`

const indexTsFileTemplate = componentNames =>
  `// This file's contents are automatically generated. Modifying it manually is discouraged.
${componentNames
  .sort()
  .map(componentName => `export { ${componentName} } from './${componentName}'`)
  .join('\r\n')}`

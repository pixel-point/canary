import { useMemo, ChangeEvent, useState, useCallback, useEffect, useRef } from 'react'
import * as Noir from '@harnessio/icons-noir-react'
import { getIcon } from '@harnessio/svg-icon'
import { matchSorter } from 'match-sorter'
import * as prettier from 'prettier/standalone'
import MarkdownPreview from '@uiw/react-markdown-preview'
import htmlPlugin from 'prettier/plugins/html'
import Keywords from 'react-keywords'
import { IconContextProvider } from '@harnessio/svg-icon-react'
import {
  ButtonRoleProps,
  CloseDialogButtonProps,
  dialogConfig,
  IconMetadata,
  getIconSetMetadata,
  promptCustomValue,
  useDebouncedState,
  DialogConfigAttributes
} from './Utils'
import './App.css'

const NoirMetadata = getIconSetMetadata(Noir)

export default function App() {
  const [search, setSearch] = useDebouncedState('')
  const { size, strokeWidth, color, Settings } = useSettings()
  const [selectedIcon, setSelectedIcon] = useState<IconMetadata>()
  const filteredData = useMemo(
    () =>
      matchSorter(NoirMetadata, search, { keys: ['ComponentName', 'name'], threshold: matchSorter.rankings.CONTAINS }),
    [search]
  )
  const [openIconDialog, setOpenIconDialog] = useState(false)

  return (
    <IconContextProvider
      size={size}
      strokeWidth={strokeWidth}
      color={color}
      // renderHook={props => console.log('render icon', props.name, props)}
    >
      <header className="page-header">
        <div className="search-container">
          <input
            placeholder="Search..."
            type="search"
            autoCapitalize="none"
            tabIndex={1}
            autoFocus
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value)
              window.scrollTo({ top: 0 })
            }}
          />
        </div>
        <details className="settings-container" open={false}>
          <summary>
            <Noir.Settings size="24" color="inherit" className="settings-icon" />
          </summary>
          <Settings />
        </details>
      </header>
      <main>
        <details open className="iconset-list">
          <summary>
            <Noir.NavArrowDown size="24" color="inherit" />
            &nbsp;Noir
          </summary>
          <div>
            {filteredData.map(({ name, fqn, Component, ComponentName }) => {
              const title = `<${ComponentName} />`

              return (
                <section key={name}>
                  <div
                    className="box"
                    title={title}
                    onClick={() => {
                      setSelectedIcon({ name, fqn, Component, ComponentName })
                      setOpenIconDialog(true)
                    }}
                    {...ButtonRoleProps}>
                    <Component />
                  </div>
                  <p className="icon-name">
                    &lt;
                    <Keywords value={search}>{ComponentName}</Keywords> /&gt;
                  </p>
                </section>
              )
            })}
          </div>
        </details>
        {selectedIcon && openIconDialog && (
          <IconDialog selectedIcon={selectedIcon} open={true} onClose={() => setOpenIconDialog(false)} />
        )}
      </main>
    </IconContextProvider>
  )
}

const IconDialog: React.FC<DialogConfigAttributes & { selectedIcon: IconMetadata }> = ({
  selectedIcon,
  open,
  ...others
}) => {
  const ref = useRef<HTMLDialogElement>(null)
  const { size, strokeWidth, color, Settings } = useSettings()
  const [svg, setSvg] = useState('')
  const markdown = useMemo(
    () => `
#### Import
\`\`\`tsx
import { ${selectedIcon.ComponentName} } from '@harnessio/icons-noir-react'
\`\`\`

#### Usage
\`\`\`tsx
<${selectedIcon.ComponentName} size="${size}" strokeWidth="${strokeWidth}" color="${color}" />
\`\`\`

#### SVG
\`\`\`svg
${svg}
\`\`\``,
    [selectedIcon, size, strokeWidth, color, svg]
  )
  const svgContent = useMemo(() => getIcon(selectedIcon.fqn) as string, [selectedIcon])

  useEffect(() => {
    prettier.format(svgContent, { parser: 'html', plugins: [htmlPlugin] }).then(setSvg)
  }, [svgContent])

  useEffect(() => {
    open && ref.current?.showModal()
  }, [open])
  const gridSize = 128

  return (
    <dialog ref={ref} {...dialogConfig(others)}>
      <header className="dialog-header">
        <selectedIcon.Component size="24" strokeWidth="1.5" color="inherit" />
        <h5>{`<${selectedIcon?.ComponentName} />`}</h5>
        <button className="close" {...CloseDialogButtonProps}>
          <Noir.Cancel color="inherit" strokeWidth="2" size="24" />
        </button>
      </header>
      <div className="dialog-main">
        <div className="icon-settings">
          <div className="box no-hover">
            <div className="grid">
              <svg>
                <defs>
                  <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="lightgray" strokeWidth="0.5" />
                  </pattern>
                  <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                    <rect width={gridSize} height={gridSize} fill="url(#smallGrid)" />
                    <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="gray" strokeWidth=".5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <rect
                  width={size}
                  height={size}
                  x="50%"
                  y="50%"
                  transform={`translate(-${Number(size) / 2},-${Number(size) / 2})`}
                  fill="none"
                  stroke="gray"
                  strokeWidth=".5"
                />
              </svg>
            </div>
            <selectedIcon.Component size={size} strokeWidth={strokeWidth} color={color} />
          </div>
          <Settings />
        </div>
        <div className="markdown">
          <MarkdownPreview source={markdown} />
          <div>
            <a
              href={`data:image/svg+xml;base64,${btoa(svgContent)}`}
              rel="noreferrer"
              download={`${selectedIcon.name}.svg`}
              className="download">
              <Noir.Download color="inherit" size="18" strokeWidth="1.5" />
              <span>Download SVG</span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  )
}

function useSettings() {
  const [sizeCollection, setSizeCollection] = useState([16, 24, 32, 64])
  const [size, setSize] = useDebouncedState('32', 0)
  const [strokeWidthCollection, setStrokeWidthCollection] = useState([1, 1.5, 2])
  const [strokeWidth, setStrokeWidth] = useDebouncedState('1', 0)
  const [color, setColor] = useDebouncedState('#0278d5')
  const Component = useCallback(
    () => (
      <div className="settings">
        <label>
          Size:
          <select
            value={size}
            onInput={(e: ChangeEvent<HTMLSelectElement>) => {
              const { value } = e.target

              if (value === 'custom') {
                const _value = promptCustomValue()
                if (_value > 0 && _value <= 256 && !sizeCollection.includes(_value)) {
                  setSizeCollection([...sizeCollection, _value].sort())
                  setSize(String(_value))
                }
              } else {
                setSize(value)
              }
            }}>
            {sizeCollection
              .sort((a, b) => (a > b ? 1 : -1))
              .map(_size => (
                <option key={_size} value={_size}>
                  {_size}
                </option>
              ))}
            <option disabled>─</option>
            <option value="custom">Custom...</option>
          </select>
        </label>
        <label>
          Stroke width:
          <select
            value={strokeWidth}
            onInput={(e: ChangeEvent<HTMLSelectElement>) => {
              const { value } = e.target

              if (value === 'custom') {
                const _value = promptCustomValue()
                if (_value > 0 && _value <= 5 && !sizeCollection.includes(_value)) {
                  setStrokeWidthCollection([...strokeWidthCollection, _value].sort())
                  setStrokeWidth(String(_value))
                }
              } else {
                setStrokeWidth(value)
              }
            }}>
            {strokeWidthCollection
              .sort((a, b) => (a > b ? 1 : -1))
              .map(_width => (
                <option key={_width} value={_width}>
                  {_width}
                </option>
              ))}
            <option disabled>─</option>
            <option value="custom">Custom...</option>
          </select>
        </label>
        <label>
          Color:
          <input
            type="color"
            defaultValue={color}
            placeholder={color}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              setColor(e.target.value)
            }}
          />
        </label>
      </div>
    ),
    [
      size,
      strokeWidth,
      color,
      sizeCollection,
      strokeWidthCollection,
      setColor,
      setSize,
      setStrokeWidth,
      setSizeCollection,
      setStrokeWidthCollection
    ]
  )

  return {
    size,
    strokeWidth,
    color,
    Settings: Component
  }
}

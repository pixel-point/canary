import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator, Icon, Input
} from '@/components'
import { debounce } from 'lodash-es'

interface InputPathBreadcrumbItemProps {
  path: string
  changeFileName: (value: string) => void
  gitRefName: string
}

const InputPathBreadcrumbItem = ({
  path,
  changeFileName,
  gitRefName
}: InputPathBreadcrumbItemProps) => {
  const [fileName, setFileName] = useState('')

  const debouncedChangeFileName = debounce(value => {
    changeFileName(value)
  }, 300)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFileName(value)
    debouncedChangeFileName(value)
  }

  useEffect(() => {
    setFileName(path)
  }, [path])

  return (
    <div className="text-foreground-4 flex items-center gap-1.5">
      <Input
        className="w-[200px]"
        id="fileName"
        value={fileName}
        placeholder="Add a file name"
        onChange={handleInputChange}
      />
      <span>in</span>
      <span className="bg-background-8 text-foreground-8 flex h-6 items-center gap-1 rounded px-2.5">
        <Icon className="text-icons-9" name="branch" size={14} />
        {gitRefName}
      </span>
    </div>
  )
}

interface PathParts {
  path: string
  parentPath: string
}

interface PathBreadcrumbsProps {
  items: PathParts[]
  isEdit: boolean
  isNew: boolean
  changeFileName: (value: string) => void
  gitRefName: string
}

const PathBreadcrumbs = ({ items, isEdit, isNew, changeFileName, gitRefName }: PathBreadcrumbsProps) => {
  const length = items.length

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map(({ parentPath, path }, idx) => {
          const isLast = length === idx + 1

          if (isLast) {
            return (
              <BreadcrumbItem key={idx}>
                {isEdit ?
                  <InputPathBreadcrumbItem
                    path={path}
                    changeFileName={changeFileName}
                    gitRefName={gitRefName}
                  /> :
                  <BreadcrumbPage>{path}</BreadcrumbPage>
                }
              </BreadcrumbItem>
            )
          }

          return (
            <Fragment key={idx}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={parentPath}>{path}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { PathParts, PathBreadcrumbs }

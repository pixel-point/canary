import { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { FileExplorer } from '@harnessio/playground'
import { OpenapiContentInfo, getContent, OpenapiGetContentOutput } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { normalizeGitRef } from '../utils/git-utils'
import { PathParams } from '../RouteDefinitions'

interface ExplorerProps {
  selectedBranch: string
  repoDetails: OpenapiGetContentOutput
}

const generateLocalStorageKey = (repoRef: string, gitRef: string, keyType: string) => {
  return `${repoRef}_${gitRef}_${keyType}`
}

const sortEntriesByType = (entries: OpenapiContentInfo[]): OpenapiContentInfo[] => {
  return entries.sort((a, b) => {
    if (a.type === 'dir' && b.type === 'file') {
      return -1
    } else if (a.type === 'file' && b.type === 'dir') {
      return 1
    }
    return 0
  })
}

export default function Explorer({ selectedBranch, repoDetails }: ExplorerProps) {
  const repoRef = useGetRepoRef()
  const { spaceId, repoId, resourcePath } = useParams<PathParams>()
  const subResourcePath = useParams()['*'] || ''
  const fullResourcePath = subResourcePath ? `${resourcePath}/${subResourcePath}` : resourcePath
  const location = useLocation()
  const isFileEditMode = location.pathname.includes('edit')

  const uniqueOpenFoldersKey = generateLocalStorageKey(repoRef, selectedBranch, 'openFolderPaths')
  const uniqueFolderContentsKey = generateLocalStorageKey(repoRef, selectedBranch, 'folderContents')
  const [openFolderPaths, setOpenFolderPaths] = useState<string[]>(() => {
    const storedPaths = localStorage.getItem(uniqueOpenFoldersKey)
    return storedPaths ? JSON.parse(storedPaths) : []
  })

  const [folderTree, setFolderTree] = useState<OpenapiContentInfo[]>([])
  const [folderContentsCache, setFolderContentsCache] = useState<{ [folderPath: string]: OpenapiContentInfo[] }>(() => {
    const storedContents = localStorage.getItem(uniqueFolderContentsKey)
    return storedContents ? JSON.parse(storedContents) : {}
  })

  const handleOpenFoldersChange = (newOpenFolderPaths: string[]) => {
    const newlyOpenedFolders = newOpenFolderPaths.filter(path => !openFolderPaths.includes(path))

    // Fetch contents for newly opened folders only if not already in cache
    newlyOpenedFolders.forEach(folderPath => {
      if (!folderContentsCache[folderPath]) {
        fetchFolderContents(folderPath).then(contents => {
          setFolderContentsCache(prev => {
            const updatedCache = { ...prev, [folderPath]: contents }
            localStorage.setItem(uniqueFolderContentsKey, JSON.stringify(updatedCache))
            return updatedCache
          })
          updateFolderTree(folderPath, contents)
        })
      }
    })

    // Persist open folder paths for the current repoRef + gitRef
    localStorage.setItem(uniqueOpenFoldersKey, JSON.stringify(newOpenFolderPaths))
    setOpenFolderPaths(newOpenFolderPaths)
  }

  const fetchFolderContents = async (folderPath: string): Promise<OpenapiContentInfo[]> => {
    try {
      const response = await getContent({
        path: folderPath,
        repo_ref: repoRef,
        queryParams: { include_commit: false, git_ref: normalizeGitRef(selectedBranch) }
      })
      return response?.content?.entries || []
    } catch (error) {
      console.error(`Error fetching contents for folder "${folderPath}":`, error)
      return []
    }
  }

  const updateFolderTree = (folderPath: string, newContents: OpenapiContentInfo[]) => {
    const updateTreeRecursive = (entries: OpenapiContentInfo[]): OpenapiContentInfo[] =>
      entries.map(entry => {
        if (entry.path === folderPath && entry.type === 'dir') {
          return { ...entry, entries: newContents }
        } else if (entry.type === 'dir' && entry.entries) {
          return { ...entry, entries: updateTreeRecursive(entry.entries) }
        }
        return entry
      })

    setFolderTree(prevTree => updateTreeRecursive(prevTree))
  }

  const renderEntries = (entries: OpenapiContentInfo[], parentPath: string = '') => {
    const sortedEntries = sortEntriesByType(entries)
    return sortedEntries.map((item, idx) => {
      const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name
      const fullPath = `/${spaceId}/repos/${repoId}/code/${selectedBranch}/~/${itemPath}`

      if (item.type === 'file') {
        return isFileEditMode && itemPath === fullResourcePath ? (
          <FileExplorer.FileItem
            key={itemPath || idx.toString()}
            isActive={itemPath === fullResourcePath}
            link={fullPath}>
            {item.name}
          </FileExplorer.FileItem>
        ) : (
          <Link to={fullPath} key={itemPath}>
            <FileExplorer.FileItem
              key={itemPath || idx.toString()}
              isActive={itemPath === fullResourcePath}
              link={fullPath}>
              {item.name}
            </FileExplorer.FileItem>
          </Link>
        )
      } else {
        return (
          <FileExplorer.FolderItem
            key={itemPath || idx.toString()}
            value={itemPath}
            link={fullPath}
            isActive={itemPath === fullResourcePath}
            content={
              // If the folder's content is already cached, render it. Otherwise, show loading.
              folderContentsCache[itemPath] ? (
                <FileExplorer.Root onValueChange={handleOpenFoldersChange} value={openFolderPaths}>
                  {renderEntries(folderContentsCache[itemPath], itemPath)}
                </FileExplorer.Root>
              ) : (
                <div>Loading...</div>
              )
            }>
            {item.name}
          </FileExplorer.FolderItem>
        )
      }
    })
  }

  // Reset state when repoRef or selectedBranch changes and clear localStorage for previous repoRef and selectedBranch
  const prevRepoRef = useRef(repoRef)
  const prevSelectedBranch = useRef(selectedBranch)
  useEffect(() => {
    if (prevRepoRef.current !== repoRef || prevSelectedBranch.current !== selectedBranch) {
      localStorage.removeItem(
        generateLocalStorageKey(prevRepoRef.current, prevSelectedBranch.current, 'openFolderPaths')
      )
      localStorage.removeItem(
        generateLocalStorageKey(prevRepoRef.current, prevSelectedBranch.current, 'folderContents')
      )
      setOpenFolderPaths([])
      setFolderContentsCache({})
      setFolderTree([])
    }
    prevRepoRef.current = repoRef
    prevSelectedBranch.current = selectedBranch
  }, [repoRef, selectedBranch])

  // Update folderTree when repoDetails change
  useEffect(() => {
    if (repoDetails?.content?.entries) {
      setFolderTree(repoDetails.content.entries)
    }
  }, [repoDetails?.content?.entries])

  const hasExpandedFolders = useRef(false)

  useEffect(() => {
    if (hasExpandedFolders.current) return

    // Automatically expand folders along the fullResourcePath
    const expandFoldersAlongPath = async () => {
      if (fullResourcePath) {
        const pathSegments = fullResourcePath.split('/')
        const isFile = pathSegments[pathSegments.length - 1].includes('.')
        const folderSegments = isFile ? pathSegments.slice(0, -1) : pathSegments

        const folderPaths: string[] = []
        let currentPath = ''
        folderSegments.forEach(segment => {
          currentPath = currentPath ? `${currentPath}/${segment}` : segment
          folderPaths.push(currentPath)
        })

        // Update openFolderPaths
        setOpenFolderPaths(prevOpenFolderPaths => {
          const newOpenFolderPaths = [...prevOpenFolderPaths]
          folderPaths.forEach(folderPath => {
            if (!newOpenFolderPaths.includes(folderPath)) {
              newOpenFolderPaths.push(folderPath)
            }
          })
          localStorage.setItem(uniqueOpenFoldersKey, JSON.stringify(newOpenFolderPaths))
          return newOpenFolderPaths
        })

        // Fetch contents for folders along the path
        for (const folderPath of folderPaths) {
          if (!folderContentsCache[folderPath]) {
            const contents = await fetchFolderContents(folderPath)
            setFolderContentsCache(prev => {
              const updatedCache = { ...prev, [folderPath]: contents }
              localStorage.setItem(uniqueFolderContentsKey, JSON.stringify(updatedCache))
              return updatedCache
            })
            updateFolderTree(folderPath, contents)
          }
        }

        hasExpandedFolders.current = true
      }
    }
    expandFoldersAlongPath()
  }, [fullResourcePath])

  return (
    <FileExplorer.Root onValueChange={handleOpenFoldersChange} value={openFolderPaths}>
      {folderTree.length && renderEntries(folderTree)}
    </FileExplorer.Root>
  )
}

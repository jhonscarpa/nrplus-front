import { createContext, ReactNode, useEffect, useState } from 'react'
import { IPropsFile } from '../@types/file'
import { api } from '../utils/axios'
import { filesRoutes } from '../utils/routesApi'
import { AxiosError } from 'axios'

interface IPropsFilesRequest {
  files: IPropsFile[]
  page: number
  pageSize: number
  totalFiles: number
}

interface IPropsFileContext {
  archives: IPropsFilesRequest
  updateListFiles: (files: IPropsFile[]) => void
  loadingGetFiles: boolean
}

export const FilesContext = createContext({} as IPropsFileContext)

interface IPropsFilesContextProvider {
  children: ReactNode
}

export function FilesContextProvider({ children }: IPropsFilesContextProvider) {
  const [archives, setArchives] = useState<IPropsFilesRequest>(
    {} as IPropsFilesRequest,
  )
  const [loadingGetFiles, setLoadingGetFiles] = useState(false)

  useEffect(() => {
    getFiles()
  }, [])

  async function getFiles() {
    setLoadingGetFiles(true)
    try {
      const response = await api.get(filesRoutes.LIST_FILES, {
        params: {
          page: 1,
          pageSize: 10,
        },
      })
      const typeArchive = response.data.files.map((file: IPropsFile) => {
        const type = file.Key.split('.')[file.Key.split('.').length - 1]
        return {
          ...file,
          typeArchive: type,
        }
      })
      setArchives({ ...response.data, files: typeArchive })
      setLoadingGetFiles(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message)
        setLoadingGetFiles(false)
      }
    }
  }

  function updateListFiles(files: IPropsFile[]): void {
    if (!archives.files) {
      getFiles()
    } else {
      setArchives({ ...archives, files: [...files, ...archives.files] })
    }
  }

  return (
    <FilesContext.Provider
      value={{ archives, updateListFiles, loadingGetFiles }}
    >
      {children}
    </FilesContext.Provider>
  )
}

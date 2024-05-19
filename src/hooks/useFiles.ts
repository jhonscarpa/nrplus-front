import { useContext } from 'react'
import { FilesContext } from '../context/FilesContext'

export function useFiles() {
  const context = useContext(FilesContext)
  return context
}

import { useDropzone } from 'react-dropzone'
import { api } from '../../utils/axios'
import { filesRoutes } from '../../utils/routesApi'
import { CloudArrowUp } from '@phosphor-icons/react'
import { useState } from 'react'
import { handleToast } from '../../libs/Toast'
import { AxiosError } from 'axios'
import { useFiles } from '../../hooks/useFiles'
import { IPropsFile } from '../../@types/file'

export function DropZoneInput() {
  const { updateListFiles } = useFiles()
  const [hover, setHover] = useState<boolean>(false)
  const onDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData()
    acceptedFiles.forEach((file: File) => {
      formData.append('files', file)
    })
    try {
      const response = await api.post(filesRoutes.UPLOAD_FILES, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      const typeArchive = response.data.files.map((file: IPropsFile) => {
        const type = file.Key.split('.')[file.Key.split('.').length - 1]
        return {
          ...file,
          typeArchive: type,
        }
      })
      updateListFiles(typeArchive)
    } catch (error) {
      if (error instanceof AxiosError) {
        handleToast(true, error.response?.data.message)
      }
    }
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      className="w-full h-full  border-[3px]  border-dashed	border-[#C0C0BF] bg-white flex flex-col justify-center items-center group hover:cursor-pointer hover:bg-brand-green hover:border-white transition-colors"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <input {...getInputProps()} />
      <CloudArrowUp
        className="size-20 text-[#C0C0BF] group-hover:text-white"
        weight="fill"
      />
      <p className="text-2xl font-outfit font-light text-blue-900 group-hover:text-white group-hover:content">
        {hover ? 'Drop File Here' : 'Upload Documents'}
      </p>
    </div>
  )
}

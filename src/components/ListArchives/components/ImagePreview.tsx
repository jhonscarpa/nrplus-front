import { useEffect, useState } from 'react'
import { api } from '../../../utils/axios'
import { filesRoutes } from '../../../utils/routesApi'

interface IPropsImagePreview {
  Key: string
}

export function ImagePreview({ Key }: IPropsImagePreview) {
  const [linkPreview, setLinkPreview] = useState('')
  useEffect(() => {
    getPreviewImg()
  }, [])

  async function getPreviewImg() {
    const response = await api.get(filesRoutes.DOWNLOAD_ONE_FILE(Key))
    setLinkPreview(response.data.downloadFile)
  }
  return (
    <div className="flex justify-center items-center h-auto">
      
      <img src={linkPreview} className="object-cover w-full h-full" />
    </div>
  )
}

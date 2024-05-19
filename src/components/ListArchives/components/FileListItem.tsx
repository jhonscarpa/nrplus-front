import { DownloadSimple, Eye, Resize } from '@phosphor-icons/react'
import { IPropsFile } from '../../../@types/file'
import { selectImg } from '../../../utils/selectImg'
import { api } from '../../../utils/axios'
import { filesRoutes } from '../../../utils/routesApi'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { PDFPreview } from './PDFPreview'
import { ImagePreview } from './ImagePreview'
import { TailSpin } from 'react-loader-spinner'
import { AxiosError } from 'axios'
import { handleToast } from '../../../libs/Toast'

interface IPropsFileListItem {
  file: IPropsFile
}

export function FileListItem({ file }: IPropsFileListItem) {
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [pdfData, setPdfData] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function downloadOneArchive() {
    setLoading(true)
    try {
      const response = await api.get(filesRoutes.DOWNLOAD_ONE_FILE(file.Key))
      window.open(response.data.downloadFile)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  async function handleGetPreview() {
    setLoading(true)
    try {
      const response = await api.get(filesRoutes.PREVIEW_FILE(file.Key), {
        responseType: 'blob',
        params: {
          typeFile: file.typeArchive,
        },
      })
      const arrayBuffer = response.data
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      setPdfData(url)

      setShowPreviewModal(true)
      setLoading(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        handleToast(true, error.response?.data.message)
      }

      setLoading(false)
    }
  }

  const convertSizeFile = Number((file.Size / 1024).toFixed(0))
  const imageExtension = ['jpg', 'png', 'jpeg', 'svg']
  const fileIsImg = imageExtension.includes(file.typeArchive)

  return (
    <li
      className="flex items-center py-8 px-6 rounded-xl bg-white data-[disabled=true]:opacity-50 data-[disabled=true]:border data-[disabled=true]:border-gray-200"
      data-disabled={loading}
    >
      <img src={selectImg[file.typeArchive]} className="size-16 mr-3" />
      <div className="flex flex-col gap-2 items-start justify-center mr-12">
        <h4
          title={file.Key}
          className="truncate max-w-52 font-outfit font-medium text-base text-blue-900"
        >
          {file.Key}
        </h4>
        <span className="flex items-center gap-2 font-normal text-base text-[#C0C0BF]">
          <Resize weight="fill" /> Document size: {convertSizeFile}KB
        </span>
      </div>
      <div className="flex gap-8 items-center ml-auto">
        {loading ? (
          <TailSpin
            visible={true}
            height="25"
            width="25"
            color="#4E95FF"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        ) : (
          <>
            <button
              onClick={downloadOneArchive}
              title={`Baixar arquivo ${file.Key}`}
            >
              <DownloadSimple className="size-6 text-brand-green hover:cursor-pointer" />{' '}
            </button>

            <button
              onClick={
                fileIsImg ? () => setShowPreviewModal(true) : handleGetPreview
              }
              title={`Visualizar arquivo ${file.Key}`}
              disabled={loading}
            >
              <Eye
                className="size-6 text-brand-blue hover:cursor-pointer"
                weight="fill"
              />
            </button>
          </>
        )}
      </div>

      <Dialog.Root open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
            <Dialog.Content className="bg-white w-auto h-auto  overflow-hidden">
              {fileIsImg ? (
                <ImagePreview Key={file.Key} />
              ) : (
                <PDFPreview pdfData={pdfData} />
              )}
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </li>
  )
}

import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

interface IPropsPDFPreview {
  pdfData: string | Uint8Array
}
export function PDFPreview({ pdfData }: IPropsPDFPreview) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <div>
      {pdfData ? (
        <Worker
          workerUrl={
            'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'
          }
        >
          <div className="h-screen w-[50vw] overflow-auto max-h-screen scrollbar-thin">
            <Viewer fileUrl={pdfData} plugins={[defaultLayoutPluginInstance]} />
          </div>
        </Worker>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  )
}

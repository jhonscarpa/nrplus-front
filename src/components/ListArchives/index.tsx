import { Files } from '@phosphor-icons/react'
import { useFiles } from '../../hooks/useFiles'
import { FileListItem } from './components/FileListItem'
import { InfinitySpin } from 'react-loader-spinner'

export function ListArchives() {
  const { archives, loadingGetFiles } = useFiles()
  return (
    <div className="w-full h-auto flex flex-col gap-8">
      <span className="font-outfit font-light text-2xl text-black">
        {archives.files ? 'Upload list' : 'Empty States'}
      </span>
      <div className="h-[40rem] bg-[#FBFBFB] px-14 pt-12 pb-28 overflow-auto  scrollbar-thumb-[#F3EFEF]  scrollbar-track-white scrollbar-thin">
        {archives.files ? (
          <ul className="flex flex-col gap-8 h-auto ">
            {archives.files.map(file => (
              <FileListItem key={file.Key} file={file} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col justify-center items-center h-full max-h-[40rem] bg-[#FBFBFB]">
            {loadingGetFiles ? (
              <InfinitySpin width="200" color="#4E95FF" />
            ) : (
              <>
                <Files className="size-32 text-[#C0C0BF]" />
                <span className="mt-5 font-outfit font-light text-2xl text-[#c0c0bf]">
                  No document here
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
